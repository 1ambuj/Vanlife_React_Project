import React from "react"
import {NavLink, Outlet} from "react-router-dom"

export default function HostLayout(){
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    return(
        <>
         <nav className="host-nav">
            <NavLink to="/host" style={({ isActive }) => isActive ? activeStyles : null} end>Dashboard</NavLink>
            <NavLink to="income" style={({ isActive }) => isActive ? activeStyles : null}>Income</NavLink>
            <NavLink to="vans" style={({ isActive }) => isActive ? activeStyles : null}>Vans</NavLink>
            <NavLink to="Review" style={({ isActive }) => isActive ? activeStyles : null}>Review</NavLink>
         </nav>
         <Outlet />
        </>
    )
}