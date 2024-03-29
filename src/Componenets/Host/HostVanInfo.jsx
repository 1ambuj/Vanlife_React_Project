import React from "react"
import { useOutletContext } from "react-router-dom"
export default function HostVanInfo(){
    const {currentVan} = useOutletContext()
    return(
        <section className="host-van-detail-info">
            <h4>Name: {currentVan.name}</h4>
            <h4>Cotegary : {currentVan.type}</h4>
            <h4>Description : {currentVan.description}</h4>
          
            <h4>Vasibility : <span>Public</span></h4>
        </section>
    )
}