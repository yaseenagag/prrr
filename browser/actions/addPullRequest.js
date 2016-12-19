import request from '../request'
import state from '../state'
import loadPullRequests from './loadPullRequests'

export default function addPullRequest({repository, number}) {
  return request('post', '/api/pull-requests', {repository, number})
    .then(loadPullRequests)
}
