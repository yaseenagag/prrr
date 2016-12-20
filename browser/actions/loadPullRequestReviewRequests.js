import request from '../request'
import state from '../state'

export default function loadPullRequestReviewRequests() {
  return request('get', '/api/pull-request-review-requests')
    .then(response => {
      state.set({
        pullRequestReviewRequests: response.json,
        loadPullRequestReviewRequestsError: null,
      })
    })
    .catch(loadPullRequestReviewRequestsError => {
      state.set({loadPullRequestReviewRequestsError})
    })
}
