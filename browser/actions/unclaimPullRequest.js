import request from '../request'
import state from '../state'
import loadPullRequests from './loadPullRequests'

export default function unclaimPullRequest(pullRequestId) {
  return request('post', `/api/pull-requests/${pullRequestId}/unclaim`)
    .then(loadPullRequests)
}
