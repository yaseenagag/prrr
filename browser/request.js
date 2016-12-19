// ensure fetch pollyfill is loaded

export default (method, path, payload={}, options={}) => {
  options.method = method

  // enables cookies by default
  if ('credentials' in options); else {
    options.credentials = 'same-origin'
  }

  if (method.toLowerCase() === 'post' && payload){
    options.headers = options.headers || {}
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(payload)
  }

  return fetch(path, options)
    .then(response =>
      response.json().then(json => {
        response.json = json
        if (response.ok) return response

        let error
        if (response.json.error){
          error = new Error(response.json.error.message)
          Object.assign(error, response.json.error)
        }else{
          error = new Error('request error')
        }
        error.response = response
        throw error
      })
    )
}
