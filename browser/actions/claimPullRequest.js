import request from '../request'
import state from '../state'
import loadPullRequests from './loadPullRequests'

export default function claimPullRequest(pullRequestId) {
  return request('post', `/api/pull-requests/${pullRequestId}/claim`)
    .then(loadPullRequests)
}
