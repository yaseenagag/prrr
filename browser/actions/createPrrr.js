import request from '../request'
import state from '../state'
import loadPrrrs from './loadPrrrs'

export default function createPrrr({owner, repo, number}) {
  return request('post', '/api/pull-request-review-requests', {owner, repo, number})
    .then(loadPrrrs)
}
