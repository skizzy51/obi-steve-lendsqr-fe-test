import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../redux/userReducer"
import "../styles/css/Login.css"

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div className="LoginPage">
            <div className="section1">
                <div className="logo">
                    <img src="/lendsqr-logo.svg" alt="logo" />
                </div>

                <div className="content">
                    <img src="/login-page-img.svg" alt="bg-img" />
                </div>
            </div>
            <div className="section2">
                <div className="content">
                    <img src="/lendsqr-logo.svg" alt="logo" />
                    <h1>Welcome!</h1>
                    <h4>Enter details to login.</h4>
                    <input type="email" className="email" placeholder="Email" />
                    <input
                        type="password"
                        className="password"
                        placeholder="Password"
                    />
                    <span>FORGOT PASSWORD?</span>
                    <button
                        onClick={() => {
                            dispatch(login())
                            navigate("/dashboard")
                        }}
                    >
                        LOG IN
                    </button>
                </div>
            </div>
        </div>
    )
}
