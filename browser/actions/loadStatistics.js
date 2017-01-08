import request from '../request'

export default function loadStatistics( setState ) {
  return request('get', '/api/statistics')
    .then(response => {
      setState({ allPrrrs: response.json })
    })
    .catch(loadPrrrsError => {
      console.log( loadPrrrsError )
      setState({loadPrrrsError})
    })
}
