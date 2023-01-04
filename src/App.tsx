import { useDispatch, useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import { AppDispatch, RootState } from "./redux/store"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import User from "./pages/User"
import Topnav from "./components/Topnav"
import { useEffect } from "react"
import { getUsers } from "./redux/userReducer"

function App() {
    const { loggedIn } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <div id="body-2" style={{ overflowX: "hidden" }}>
            {loggedIn ? (
                <>
                    <Topnav />
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/dashboard" />}
                        />
                        <Route
                            path="/login"
                            element={<Navigate to="/dashboard" />}
                        />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/user/:id" element={<User />} />
                        <Route path="*" element={<div>Not found</div>} />
                    </Routes>
                </>
            ) : (
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route
                        path="/dashboard"
                        element={<Navigate to="/login" />}
                    />
                    <Route
                        path="/user/:id"
                        element={<Navigate to="/login" />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<div>Not found</div>} />
                </Routes>
            )}
        </div>
    )
}

export default App
