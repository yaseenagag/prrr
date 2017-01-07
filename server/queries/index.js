import knex from '../knex'
import Github from '../Github'
import moment from 'moment'

export default class Queries {

  constructor(currentUser, _knex=knex){
    this.currentUser = currentUser
    this.knex = _knex
    if (this.currentUser)
      this.github = new Github(this.currentUser.github_access_token)
  }

  getUserByGithubId(githubId){
    return this.knex
      .select('*')
      .from('users')
      .where('github_id', githubId)
      .first()
  }

  getUserByGithubUsername(githubUsername){
    return this.knex
      .select('*')
      .from('users')
      .where('github_username', githubUsername)
      .first()
  }

  getPrrrs(){
    return this.knex
      .select('*')
      .from('pull_request_review_requests')
      .orderBy('created_at', 'desc')
      .where({
        archived_at: null,
        completed_at: null,
      })
  }

  getPrrrById(prrrId){
    return this.knex
      .select('*')
      .from('pull_request_review_requests')
      .where('id', prrrId)
      .first()
  }

  getPrrrForPullRequest(pullRequest){
    return this.knex
      .select('*')
      .from('pull_request_review_requests')
      .where({
        owner: pullRequest.base.repo.owner.login,
        repo: pullRequest.base.repo.name,
        number: pullRequest.number,
      })
      .first()
  }

  getPullRequest({owner, repo, number}){
    return this.github.pullRequests.get({owner, repo, number})
  }

  getRequestorForPrrr(prrr){
    return knex
      .select('*')
      .from('users')
      .where('github_username', prrr.requested_by)
      .first()
  }

  formatDate(date){
    return moment(date).format('YYYY-MM-DD')
    // return this.knex.raw('?', [moment(date).toDate()])+''
  }

  metrics(){
    // TODO change to startOf to get last week
    // this is doing THIS WEEK for now
    const lastWeek = {
      from: moment().endOf('week').subtract(1, 'week'),
      to:   moment().endOf('week'),
    }

    const loadAllPrrsFromLastWeek = () =>
      this.knex
        .select('*')
        .from('pull_request_review_requests')
        .whereBetween('created_at', [
          this.formatDate(lastWeek.from),
          this.formatDate(lastWeek.to),
        ])
        .orderBy('created_at', 'desc')


    const LongestTimeForPrrrToBeReviewedLastWeek = prrrs => {
      const durations = prrrs
        .filter(prrr => prrr.completed_at)
        .map(prrr =>
          moment(prrr.completed_at).diff(moment(prrr.created_at))
        )
      return Math.max.apply(Math, durations)
    }

    return loadAllPrrsFromLastWeek()
      .then(prrrs => {
        return {
          version: 1,
          longestTimeForPrrrToBeReviewedLastWeek: LongestTimeForPrrrToBeReviewedLastWeek(prrrs),
          WTF: '??/',
          from: lastWeek.from,
          to: lastWeek.to,
          count: prrrs.length,
        }
      })
    // return Promise.resolve(lastWeek)


    // return Promise.all([
    //   LongestTimeForPrrrToBeReviewedLastWeek(),
    // ]).then(([
    //   longestTimeForPrrrToBeReviewedLastWeek,
    // ]) => {

    // })

    // return this.knex
    //   .select('*')
    //   .from('pull_request_review_requests')
    //   .orderBy('created_at', 'desc')
    //   .then(prrrs => {
    //     return {
    //       count: prrrs.length,
    //     }
    //   })
  }

}


// _Total code reviews last week
// _Total code reviews per reviewer
// _Longest time for PR to be reviewed last week
// _Average time for PR to be claimed last week
// _Average time for PR to be completed last week
// _Total number of projects that requested reviews
// _Average number of reviews requested per project
