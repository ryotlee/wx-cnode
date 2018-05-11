const BASE_URI = 'https://cnodejs.org/api/v1'

function promisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = (res) => {
        resolve(res)
      }
      obj.fail = (err) => {
        reject(err)
      }
      fn(obj)
    })
  }
}
/**
 * GET 请求
 */
function $get(url, data) {
  return promisify(wx.request)({
    url: BASE_URI + url,
    data: data,
    method: 'GET'
  })
}
/**
 * POST请求
 */
function $post(url, data, method = 'POST') {
  let options = {
    url: BASE_URI + url,
    data: data,
    method: method || 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  return promisify(wx.request)(options)
}

const _ = {
  $get,
  $post
}

/**
 * 微信api
 */
const wxApis = [
  "login",
  "checkSession",
  "getUserInfo"
]

export default wxApis.reduce((acc, curr) => {
  acc[curr] = promisify(wx[curr])
  return acc
}, _)