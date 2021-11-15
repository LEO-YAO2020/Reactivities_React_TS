import { User, UserFormValues } from './../models/user'
import { Activity } from './../models/activity'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { history } from '../..'
import { store } from '../stores/store'

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000)
    return response
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!
    switch (status) {
      case 400:
        if (typeof data === 'string') {
          toast.error(data)
          return
        }
        if (config.method === 'get') {
          history.push('/not-found')
        }
        if (data.errors) {
          const modalStateErrors = []
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key])
            }
          }
          throw modalStateErrors.flat()
        } else {
          toast.error(data)
        }
        break
      case 401:
        toast.error('Unauthorized, please log in again (401)')
        break
      case 403:
        toast.error('Access denied (403)')
        break
      case 404:
        history.push('/notfound')
        break
      case 408:
        toast.error('Request timeout (408)')
        break
      case 500:
        toast.error('Server error (500)')
        break
      case 501:
        toast.error('Service not implemented (501)')
        break
      case 502:
        toast.error('Network error (502)')
        break
      case 503:
        toast.error('Service unavailable (503)')
        break
      case 504:
        toast.error('Gateway timeout(504)')
        break
      case 505:
        toast.error('HTTP version is not supported(505)')
        break
      default:
        toast.error(`Connection error(${error.response?.status})!`)
    }
    return Promise.reject(error)
  }
)
const responseBody = <T>(response: AxiosResponse<T>) => response.data

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
  list: () => request.get<Activity[]>('/activities'),
  details: (id: string) => request.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => request.post<void>('/activities', activity),
  update: (activity: Activity) => request.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.delete<void>(`/activities/${id}`)
}

const Account = {
  current: () => request.get<User>('/account'),
  login: (user: UserFormValues) => request.post<User>('/account/login', user),
  register: (user: UserFormValues) => request.post<User>('/account/register', user)
}

const agent = {
  Activities,
  Account
}

export default agent
