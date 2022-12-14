import { useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { Provider, fetchTodos, dispatchEvent } from "lib/context"
import { signUp } from "lib/api"

import Navbar from "components/Navbar/Navbar.component"

import HomePage from "routes/home/Home.component"

const App = () => {
    const [todos, setTodos] = useState([])

    const signUpUser = async () => {
        const { auth_token } = await signUp()
        document.cookie = `token=${auth_token}`
    }

    const fetchDataTodos = async () => {
        const dataTodos = await fetchTodos()
        setTodos(dataTodos)
    }

    useEffect(() => {
        signUpUser()
        fetchDataTodos()
    }, [])

    return (
        <Provider value={{ todos, dispatchEvent }}>
            <>
                <Navbar onUpdated={fetchDataTodos} />
                <Routes>
                    <Route path="/v1" element={<HomePage />} />
                    <Route path="*" element={<Navigate to="/v1" replace />} />
                </Routes>
            </>
        </Provider>
    )
}

export default App;
