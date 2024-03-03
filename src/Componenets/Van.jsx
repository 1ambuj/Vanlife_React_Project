import React from "react"
import {useState , useEffect} from "react"
import { Link , useSearchParams } from "react-router-dom"
import {getVans} from "../Api.js"

export default function Vans() {
    const [searchParams,  setSearchParams] = useSearchParams()
    const [vans, setVans] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
     useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                setVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadVans()
        
    }, [])
    const typeFilter  = searchParams.get("type")
    const displayType = typeFilter?
    vans.filter((van)=> {
        return van.type === typeFilter
    }):vans

    const vanElements = displayType.map(van => (
        <div key={van.id} className="van-tile">
            <Link to={van.id}
              state={{search: `${searchParams.toString()}`, type : typeFilter}}
            >
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))
    function  handleFilterChange(key , value){
        setSearchParams((prvState)=>{
            if(value === null){
                prvState.delete(key)
            }
            else{
                prvState.set(key , value)
            }
            return prvState
        })
    }
    if (loading) {
        return <h1 aria-live="polite">Loading...</h1>
    }
    
    if (error) {
        return <h1  aria-live="assertive">There was an error: {error.message}</h1>
    }

    return (
        <div className="van-list-container">
            <h1 className="vans">Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button onClick={()=>  handleFilterChange("type" , "simple")} className={`van-type simple ${typeFilter==="simple"? "selected" : ""}`}>Simple</button>
                <button onClick={()=>  handleFilterChange("type" , "luxury")} className={`van-type luxury ${typeFilter==="luxury"? "selected" : ""}`}>Luxury</button>
                <button onClick={()=>  handleFilterChange("type" , "rugged")} className={`van-type rugged ${typeFilter==="rugged"? "selected" : ""}`}>Rugged</button>
                {typeFilter? (<button onClick={()=>  handleFilterChange("type" , null)} className={`van-type clear-filters`}>Clear_filter</button>): null}
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}