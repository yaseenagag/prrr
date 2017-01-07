import request from '../request'
import state from '../state'
import loadMetrics from './loadMetrics'
import polling from './utils/polling'

export default function startPollingForMetrics(){
  polling.start(loadMetrics)
}
