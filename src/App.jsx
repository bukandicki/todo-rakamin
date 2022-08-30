import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "routes/home/Home.component"

const App = () => {
    return (
        <Routes>
            <Route path="/v1" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/v1" replace />} />
        </Routes>
    )
}

export default App;
