import { createContext } from "react"
import { getItems, getTodos } from "lib/api"

export const RootContext = createContext()
export const Provider = RootContext.Provider

export const fetchTodos = async () => {
    const data = await getTodos()

    return data.reverse()
}

export const fetchItems = async (todoId) => {
    const data = await getItems(todoId)

    return data
}

export const dispatchEvent = async (action, payload) => {
    if (action === "GET_TODOS") return await fetchTodos()
    if (action === "GET_ITEMS") return await fetchItems(payload)
}