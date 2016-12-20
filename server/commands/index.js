import knex from '../knex'

export default class Commands {

  constructor(currentUser, _knex=knex){
    this.currentUser = currentUser
    this.knex = _knex
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

  findOrCreateUserFromGithubProfile(githubProfile){
    const github_id = githubProfile.id
    const userAttributes = {
      github_id: github_id,
      name: githubProfile.displayName,
      email: githubProfile.emails[0].value,
      avatar_url: githubProfile.photos[0].value,
    }
    return this.knex
      .table('users')
      .where('github_id', github_id)
      .first('*')
      .then(user => user ? user : this.createUser(userAttributes))
  }

  addPullRequest({repository, number}){
    return this.knex
      .insert({
        repository,
        number,
        requested_by: this.currentUser.github_id,
        created_at: new Date,
        updated_at: new Date,
      })
      .into('pull_requests')
      .catch( error => {
        if (error && error.message.includes('duplicate key value violates unique constraint')){
          const newError = new Error('duplicate')
          newError.originalError = error
          newError.repository = repository
          newError.number = number
          throw newError
        }
        throw error
      })
  }

  claimPullRequest(pullRequestId){
    return this.knex
      .table('pull_requests')
      .update({
        claimed_by: this.currentUser.github_id,
        claimed_at: new Date,
        updated_at: new Date,
      })
      .where('id', pullRequestId)
      .whereNull('claimed_by')
      .whereNull('claimed_at')
      .returning('*')
      .then(firstRecord)
  }

  unclaimPullRequest(pullRequestId){
    return this.knex
      .table('pull_requests')
      .update({
        claimed_by: null,
        claimed_at: null,
        updated_at: new Date,
      })
      .where('id', pullRequestId)
      .whereNotNull('claimed_by')
      .whereNotNull('claimed_at')
      .returning('*')
      .then(firstRecord)
  }
}


function firstRecord(records){
  return records[0]
}
