import request from '../request'
import state from '../state'
import loadSession from './loadSession'

export default function logout() {
  return request('post', '/api/logout')
    .catch(logoutError => {
      state.set({logoutError})
      throw logoutError
    })
    .then(_ => loadSession())
}
