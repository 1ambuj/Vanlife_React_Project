import React from "react"
import {Navigate , Outlet,useLocation} from "react-router-dom"
export default function AuthRequired(){
    const location =useLocation()
   
    const auth = localStorage.getItem("loggedin")
    if(!auth){
        return <Navigate to="/login" 
                 state={{message:"you have to first login", path:location.pathname}}
                 replace
              />
    }
    return <Outlet />
}