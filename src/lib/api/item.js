import apiClient from "./apiClient"

export const getItems = async (id) => {
    const { data } = await apiClient.get(`/todos/${id}/items`)

    return data
}

export const createItem = async ({ id, name, progress_percentage }) => {
    const { data } = await apiClient.post(`/todos/${id}/items`, { name, progress_percentage })

    return data
}

export const editItem = async ({ move, id, target_todo_id, progress_percentage }) => {
    const { data } = await apiClient.patch(`/todos/${id}/items/${target_todo_id}`, {
        ...(move !== undefined ? { target_todo_id: move } : { progress_percentage })
    })

    return data
}

export const deleteItem = async ({ id, target_todo_id, name }) => {
    const { data } = await apiClient.delete(`/todos/${id}/items/${target_todo_id}`, { target_todo_id, name })

    return data
}
