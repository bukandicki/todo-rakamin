import apiClient from "./apiClient"

export const signIn = async ({ email, password }) => {
    const { data } = await apiClient.get("/auth/login", { email, password })

    return data
}

export const signUp = async () => {
    const { data } = await apiClient.post("/signup", {
        name: "Tony",
        email: "tony@stark.com",
        password: "password",
        password_confirmation: "password"
    })

    return data
}
