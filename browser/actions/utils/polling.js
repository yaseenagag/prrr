import Visibility from 'visibilityjs'


function start(_load, delay=1000){

  const load = function(){
    if (Visibility.hidden()) return scheduleNextLoad()
    _load()
      .then(prrrs => {
        scheduleNextLoad()
      })
      .catch(error => {
        scheduleNextLoad()
        throw error
      })
  }

  const scheduleNextLoad = function(){
    clearTimeout(_load.timeout)
    _load.timeout = setTimeout(load, delay)
  }

  load()
}

function stop(_load){
  clearTimeout(_load.timeout)
}

export default { start, stop }
