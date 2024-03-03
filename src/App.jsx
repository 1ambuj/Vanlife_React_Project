import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from "./Componenets/Home"
import About from "./Componenets/About"
import Van from "./Componenets/Van"
import Dashboard from "./Componenets/Host/Dashboard"
import {BrowserRouter , Routes , Route} from "react-router-dom"
import Layout from './SharedComponenets/Layout'
import HostLayout from './SharedComponenets/HostLayout'
import  VansDetail  from "./Componenets/vansDetail"
import Vans from "./Componenets/Host/Vans"
import Income from "./Componenets/Host/Incomes"
import Review from "./Componenets/Host/Review"
import HostVanDetail from "./Componenets/Host/hostVanDetails"
import HostVanInfo from "./Componenets/Host/HostVanInfo"
import HostVanPricing from "./Componenets/Host/HostVanPricing"
import HostVanPhotos from "./Componenets/Host/HostVanPhotos"
import NotFound from "./Componenets/NotFound"
import Login from "./Componenets/loginForm"
import AuthRequired from "./Componenets/AuthRequired"
import "./server"
import './App.css'

function App() {
  return (
     <div className="container">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path="about" element={<About />}/>
                <Route path="van" element={<Van />}/>
                <Route path="van/:id" element={<VansDetail />}/>
                <Route
                  path="login"
                  element={<Login />}
                />
                <Route  element={<AuthRequired />}>
                  <Route path="host" element={<HostLayout />}>
                      <Route  index element={<Dashboard />} />
                      <Route path="income" element={<Income />} />
                      <Route path="vans" element={<Vans />} />
                      <Route path="review" element={<Review />} />
                      <Route path="vans/:id" element={<HostVanDetail />} >
                          <Route index element={<HostVanInfo />} />
                          <Route path="price" element={<HostVanPricing />} />
                          <Route path="photos" element={<HostVanPhotos />} />
                      </Route>
                  </Route>
                </Route>
                <Route  path="*" element={<NotFound />} />
              </Route>
            </Routes>
        </BrowserRouter>
     </div>
  )
}

export default App
