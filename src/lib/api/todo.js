import apiClient from "./apiClient"

export const getTodos = async () => {
    const { data } = await apiClient.get("/todos")

    return data
}

export const createTodo = async ({ title, description }) => {
    const { data } = await apiClient.post("/todos", { title, description })

    return data
}
