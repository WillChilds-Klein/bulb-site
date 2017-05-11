function checkStatus(resp) {
  if (resp.status >= 200 && resp.status < 300) {
    return resp
  }
  const error = Error(`HTTP Code: ${resp.status}`)
  error.status = resp.statusText
  error.response = resp
  console.log(error)
  throw error;
}

async function parseJSON(resp) {
  return await resp.json()
}

function wrapHTTPMethod(method) {
  // TODO: have anonymous func below take params={}
  return async function (path, data=null) {
    const default_opts = {
        method: method,
        mode: 'same-origin',
        accept: 'application/json',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
    }

    if (data) {
      default_opts.body = data
    }

    return fetch(path, default_opts)
      .then(checkStatus)
      .then(parseJSON)
  }
}

export const get = wrapHTTPMethod('GET')
export const put = wrapHTTPMethod('PUT')
export const post = wrapHTTPMethod('POST')
export const del = wrapHTTPMethod('DELETE')
