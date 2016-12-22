import request from '../request'
import state from '../state'

export default function loadSession() {
  return request('get', '/api/session')
    .then(response => {
      const session = response.json
      state.set({
        session,
        loadSessionError: null,
      })
    })
    .catch(loadSessionError => {
      state.set({loadSessionError})
    })
}

loadSession()
