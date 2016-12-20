import request from '../request'
import state from '../state'
import loadPullRequestReviewRequests from './loadPullRequestReviewRequests'

export default function createPullRequestReviewRequest({owner, repo, number}) {
  return request('post', '/api/pull-request-review-requests', {owner, repo, number})
    .then(loadPullRequestReviewRequests)
}
