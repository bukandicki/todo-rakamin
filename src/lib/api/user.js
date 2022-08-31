import apiClient from "./apiClient"

export const signUp = async ({ email, password }) => {
    const { data } = await apiClient.get("/auth/login", { email, password })

    return data
}

export const signIn = async ({ name, email, password, password_confirmation }) => {
    const { data } = await apiClient.post("/signup", { name, email, password, password_confirmation })

    return data
}
