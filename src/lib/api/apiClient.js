import axios from "axios"

// Hardcoded
const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjIyNzYyNDF9.DOQVSH0cazOsU3NbD5qvIgnDTH-tmx_KXLFa-yH_--8"

const apiClient = axios.create({
    baseURL: "https://todos-project-api.herokuapp.com",
    headers: { Authorization: `Bearer ${token}` }
})

export default apiClient
