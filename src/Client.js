import 'whatwg-fetch'

function checkStatus(resp) {
  if (resp.ok) {
    return resp
  }
  // throw custom exceptions here for 401, 404, 500, etc.
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
    //let access_token = 'master_key'
    let access_token = ''
    if (window.localStorage.getItem('access_token')) {
      access_token = window.localStorage.getItem('access_token')
      console.log(access_token)
    }
    let headers = method === 'GET' || method === 'DELETE'
      ? {
          'Authorization': 'Bearer ' + access_token,
        }
      : {
          'content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + access_token,
        };
    const default_opts = {
        method: method,
        mode: 'cors',
        accept: 'application/json',
        headers: headers,
        body: body,
    };

    let api_host = 'https://dev.buttaface.space';
    if (process.env.NODE_ENV === 'development') {
      api_host = 'http://localhost:8080';
    }

    let url = api_host + path

    return fetch(url, default_opts)
      .then(checkStatus)
      .then(parseJSON);
  }
}

export const get = wrapHTTPMethod('GET')
export const put = wrapHTTPMethod('PUT')
export const post = wrapHTTPMethod('POST')
export const del = wrapHTTPMethod('DELETE')
