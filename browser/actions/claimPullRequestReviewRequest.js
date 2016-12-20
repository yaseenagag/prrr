import request from '../request'
import state from '../state'
import loadPullRequestReviewRequests from './loadPullRequestReviewRequests'

export default function claimPullRequestReviewRequest(pullRequestId) {
  return request('post', `/api/pull-request-review-requests/${pullRequestId}/claim`)
    .then(loadPullRequestReviewRequests)
}
