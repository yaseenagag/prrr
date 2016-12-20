import knex from '../knex'
import Github from '../Github'

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

  getPullRequestReviewRequests(){
    return this.knex
      .select('*')
      .from('pull_request_review_requests')
      .orderBy('created_at', 'asc')
  }

  getPullRequestReviewRequestById(pullRequestReviewRequestId){
    return this.knex
      .select('*')
      .from('pull_request_review_requests')
      .where('id', pullRequestReviewRequestId)
      .first()
  }

  getPullRequest({owner, repo, number}){
    return this.github.pullRequests.get({owner, repo, number})
  }

  getRequestorForPullRequestReviewRequest(pullRequestReviewRequest){
    return knex
      .select('*')
      .from('users')
      .where('github_username', pullRequestReviewRequest.requested_by)
      .first()
  }

}
