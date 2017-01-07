import request from '../request'
import state from '../state'

export default function loadMetrics() {
  return request('get', '/api/metrics')
    .then(response => {
      state.set({
        metrics: response.json,
        loadMetricsError: null,
      })
    })
    .catch(loadMetricsError => {
      state.set({loadMetricsError})
    })
}
