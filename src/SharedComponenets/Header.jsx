import React from "react"
import { NavLink ,Link } from "react-router-dom"


export default function Header() {
    function fakeLogOut() {
        localStorage.removeItem("loggedin")

    }
    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink to="/host" className={({isActive}) => isActive? "active" : ""}>Host</NavLink>
                <NavLink to="/about" className={({isActive}) => isActive? "active" : ""}>About</NavLink>
                <NavLink to="/van" className={({isActive}) => isActive? "active" : ""}>Vans</NavLink>
                <Link to="login" className="login-link">
                <img
                        src="../src/assets/images/avatar-icon.png"
                        className="login-icon"
                    />
                </Link>
               
            </nav>
        </header>
    )
}