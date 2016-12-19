import request from '../request'
import state from '../state'

export default function loadPullRequests() {
  return request('get', '/api/pull-requests')
    .then(response => {
      state.set({
        pullRequests: response.json,
        loadPullRequestsError: null,
      })
    })
    .catch(loadPullRequestsError => {
      state.set({loadPullRequestsError})
    })
}
