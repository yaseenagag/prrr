import request from '../request'
import state from '../state'
import loadPrrrs from './loadPrrrs'
import polling from './utils/polling'

export default function stopPollingForPrrs(){
  polling.stop(loadPrrrs)
}
