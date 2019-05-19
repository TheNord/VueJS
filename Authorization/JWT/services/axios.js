import axios from 'axios'

const axiosInstance = axios.create({
  timeout: 3000
})

// на каждом запросе через axios вызываем функцию (добавляем заголовок авторизации)
axiosInstance.interceptors.request.use(function(config) {
  const token = localStorage.getItem('meetuper-jwt') || ''

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, function (err) {
  return Promise.reject(err)
})

export default axiosInstance
