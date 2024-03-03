import React from "react"
import { useNavigate,useLocation } from "react-router-dom"
import {loginUser} from "../Api.js"

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status , setStatus] = React.useState("idle")
    const [error , setError] = React.useState()
    const location = useLocation()
    const navigate = useNavigate()
    const path = location.state?.path || "/host"
    function handleSubmit(e) {
        e.preventDefault()
        console.log('submitting')
        setStatus("submiting")
        loginUser(loginFormData)
        .then(data => {
            setError(null)
            localStorage.setItem("loggedin", true)
            navigate(path,{replace: true})
        })
       
        .catch(err => {
            setError(err)
        })
        .finally(() => {
            setStatus("idle")
        })
        
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            {location.state?<h3 className="before-login">{location.state.message}</h3>:null}
            <h1 className="form-title">Sign in to your account</h1>
            {
                error?.message &&
                <h3 className="before-login">{error.message}</h3>
            }
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                    id="my-email"
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                    id="my-password"
                />
                <button disabled={status==="submiting"}>{status === "submiting" ? "Logging in..." : "Log in"}</button>
            </form>
        </div>
    )
}