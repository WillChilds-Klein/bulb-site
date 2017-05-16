import 'whatwg-fetch'

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
  return async function (path, data) {
    let body = data ? JSON.stringify(data)
                    : null
    let headers = method === 'GET' || method === 'DELETE'
      ? null
      : {
          'content-type': 'application/json; charset=UTF-8',
        }
    const default_opts = {
        method: method,
        mode: 'cors',
        accept: 'application/json',
        headers: headers,
        body: body,
    }

    let url = 'https://dev.buttaface.space' + path
    //let url = path

    return fetch(url, default_opts)
      .then(checkStatus)
      .then(parseJSON)
  }
}

export const get = wrapHTTPMethod('GET')
export const put = wrapHTTPMethod('PUT')
export const post = wrapHTTPMethod('POST')
export const del = wrapHTTPMethod('DELETE')
