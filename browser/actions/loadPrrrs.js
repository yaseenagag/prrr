import request from '../request'
import state from '../state'

export default function loadPrrrs() {
  return request('get', '/api/pull-request-review-requests')
    .then(response => {
      state.set({
        prrrs: response.json,
        loadPrrrsError: null,
      })
    })
    .catch(loadPrrrsError => {
      state.set({loadPrrrsError})
    })
}
