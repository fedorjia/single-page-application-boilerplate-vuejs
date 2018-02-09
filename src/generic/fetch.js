import axios from 'axios'
import qs from 'qs'

const _url = (url) => {
  return `${url}`
}

/**
 * wrapper response body
 */
const _body = (res) => {
  if (res.status !== 200) {
    throw new Error('连接错误,status: ' + res.status)
  } else {
    const data = res.data
    if (data.status !== 200) {
      throw data.body
    }
    return data.body
  }
}

// instance of axios
const instance = axios.create()

/**
 * interceptor for request
 */
instance.interceptors.request.use((config) => {
  config.headers['async-fetch'] = 'fetch'
  return config
}, (err) => {
  return Promise.reject(err)
})

/**
 * interceptor for response
 */
instance.interceptors.response.use((res) => {
  // res.data
  return res
}, (err) => {
  if (err && err.response) {
    delete err.response.request
    delete err.response.config
  }
  return Promise.reject(err)
})

/**
 * fetch apis
 */
export default {

  async raw (option) {
    return instance(option)
  },

  async request (option) {
    return _body(await instance(option))
  },

  async get (url, params = {}) {
    return _body(await instance.get(_url(url), { params: params }))
  },

  async post (url, params = {}) {
    return _body(await instance.post(_url(url), qs.stringify(params)))
  },

  async put (url, params = {}) {
    return _body(await instance.put(_url(url), qs.stringify(params)))
  },

  async patch (url, params = {}) {
    return _body(await instance.patch(_url(url), qs.stringify(params)))
  },

  async delete (url, params = {}) {
    return _body(await instance.delete(_url(url), qs.stringify(params)))
  },

  async all (items) {
    if (!Array.isArray(items)) {
      throw new Error('fetch all must be array')
    }
    const task = []
    for (let item of items) {
      item.url = _url(item.url)
      task.push(this.raw(item))
    }
    let o = await axios.all(task)

    let result = []
    for (let res of o) {
      result.push(_body(res))
    }
    return result
  }
}
