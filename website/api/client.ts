import axios from "axios"

export const api = axios.create({
  baseURL: "http://apitaskmgt.biyss.com",
  headers: {
    "Content-Type": "application/json",
  },
})



// Optional: request interceptor
api.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json"
    config.headers["api-access-key"] = "A31AB78E-C4C7-4C9E-AD98-6D6A1B801E45"
  return config
})

// Optional: response error handling
api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  }
)

