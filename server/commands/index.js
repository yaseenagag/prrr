import knex from '../knex'
import Queries from '../queries'
import Github from '../Github'

export default class Commands {

  constructor(currentUser, _knex=knex){
    this.currentUser = currentUser
    this.knex = _knex
    this.queries = new Queries(currentUser, _knex)
    if (this.currentUser)
      this.github = new Github(this.currentUser.github_access_token)
  }

  as(user){
    return new this.constructor(user, this.knex)
  }

  createRecord(table, attributes){
    return this.knex
      .table(table)
      .insert(attributes)
      .returning('*')
      .then(firstRecord)
  }

  createUser(attributes){
    attributes.created_at = attributes.updated_at = new Date
    return this.createRecord('users', attributes)
  }

  findOrCreateUserFromGithubProfile({accessToken, refreshToken, profile}){
    const userAttributes = {
      name: profile.displayName || profile.username,
      email: profile.emails[0].value,
      avatar_url: (
        profile.photos &&
        profile.photos[0] &&
        profile.photos[0].value
      ),
      github_id: profile.id,
      github_username: profile.username,
      github_access_token: accessToken,
      github_refresh_token: refreshToken,
    }
    return this.knex
      .table('users')
      .where('github_id', profile.id)
      .first('*')
      .then(user => user ? user : this.createUser(userAttributes))
  }

  createPrrr({owner, repo, number}){
    return this.github.pullRequests.get({owner, repo, number})
      .catch(originalError => {
        const error = new Error('Pull Request Not Found')
        error.originalError = originalError
        error.status = 400
        throw error
      })
      .then(pullRequest =>
        this.github.repos.checkCollaborator({
          owner,
          repo,
          username: this.currentUser.github_username,
        })
          .then( response => pullRequest )
          .catch( originalError => {
            const error = new Error(`You are not a collaborator on ${owner}/${repo}`)
            error.originalError = originalError
            error.status = 400
            throw error
          })
      )
      .then(pullRequest =>
        this.knex
          .insert({
            owner,
            repo,
            number,
            requested_by: this.currentUser.github_username,
            created_at: new Date,
            updated_at: new Date,
          })
          .into('pull_request_review_requests')
          .catch( originalError => {
            let error = originalError
            if (error && error.message.includes('duplicate key value violates unique constraint')){
              error = new Error('duplicate')
              error.originalError = originalError
            }
            error.owner = owner
            error.repo = repo
            error.number = number
            throw error
          })
      )



  }

  addCurrentUserToPrrrRepo(prrrId){
    return this.queries.getPrrrById(prrrId)
      .then(prrr => {
        if (this.currentUser.github_username === prrr.owner)
          return {prrr, ownerUser: this.currentUser}

        return this.queries.getUserByGithubUsername(prrr.owner)
          .catch(error => {
          })
          .then(ownerUser => {
            if (ownerUser) return ({ownerUser, prrr})
            throw new Error(`unable to add ${this.currentUser.github_username} to ${prrr.owner}/${prrr.repo} because ${prrr.owner} does not have a Prrr account`)
          })
      })
      .then(({ownerUser, prrr}) => {
        const github = this.as(ownerUser).github
        return github.repos.checkCollaborator({
          owner:    prrr.owner,
          repo:     prrr.repo,
          username: this.currentUser.github_username,
        })
        .catch(error => {
          return github.repos.addCollaborator({
            owner:      prrr.owner,
            repo:       prrr.repo,
            username:   this.currentUser.github_username,
            permission: 'push',
          })
        })
      })
  }

  markPullRequestAsClaimed(prrrId){
    return this.knex
      .table('pull_request_review_requests')
      .update({
        claimed_by: this.currentUser.github_username,
        claimed_at: new Date,
        updated_at: new Date,
      })
      .where('id', prrrId)
      .whereNull('claimed_by')
      .whereNull('claimed_at')
      .returning('*')
      .then(firstRecord)
  }

  claimPrrr(prrrId){
    return this.addCurrentUserToPrrrRepo(prrrId)
      .then(_ => this.markPullRequestAsClaimed(prrrId))
  }

  unclaimPrrr(prrrId){
    return this.knex
      .table('pull_request_review_requests')
      .update({
        claimed_by: null,
        claimed_at: null,
        updated_at: new Date,
      })
      .where('id', prrrId)
      .whereNotNull('claimed_by')
      .whereNotNull('claimed_at')
      .returning('*')
      .then(firstRecord)
  }

  archivePrrr(purrId){
    return this.knex
      .table('pull_request_review_requests')
      .update({
        archived_at: new Date,
      })
      .where('id', purrId)
  }
}

const firstRecord = records => records[0]
