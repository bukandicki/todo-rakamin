import axios from "axios"

const token = document.cookie
  .split('; ')
  .find((row) => row.startsWith('token='))
  ?.split('=')[1]

const apiClient = axios.create({
    baseURL: "https://todos-project-api.herokuapp.com",
    headers: { Authorization: `Bearer ${token}` }
})

export default apiClient
