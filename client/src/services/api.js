import axios from 'axios'

// Create axios instance with base URL
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// Posts API
export const getPosts = async (page = 1, limit = 10) => {
  return api.get(`/posts?page=${page}&limit=${limit}`)
}

export const getPost = async (id) => {
  return api.get(`/posts/${id}`)
}

export const createPost = async (formData) => {
  return api.post('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const likePost = async (postId, username) => {
  return api.post(`/posts/${postId}/like`, { username })
}

export const sharePost = async (postId, username) => {
  return api.post(`/posts/${postId}/share`, { username })
}

export const getPostLikes = async (postId) => {
  return api.get(`/posts/${postId}/likes`)
}

// Auth API
export const register = async (userData) => {
  return api.post('/auth/register', userData)
}

export const login = async (credentials) => {
  return api.post('/auth/login', credentials)
}

export const getProfile = async () => {
  return api.get('/auth/profile')
}

// Health check
export const healthCheck = async () => {
  return api.get('/health')
}

export default api
