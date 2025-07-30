import axios from 'axios'

const backendUrl = 'http://localhost:5678'

const axiosInstance = axios.create({
    baseURL:backendUrl,
    withCredentials: true
})

export default axiosInstance