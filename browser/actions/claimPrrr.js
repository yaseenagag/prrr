import request from '../request'
import state from '../state'
import loadPrrrs from './loadPrrrs'

export default function claimPrrr(prrrId) {
  return request('post', `/api/pull-request-review-requests/${prrrId}/claim`)
    .then(loadPrrrs)
}
