import { useContext, useEffect, useReducer, useState } from "react"
import ClipLoader from "react-spinners/ClipLoader";

import Filter from "../components/Filter/Filter"
import Option from "../components/Filter/Option"
import OptionsContainer from "../components/Filter/OptionsContainer"
import Title from "../components/Filter/Title"
import Country from "../components/Country"

import{AppContext} from '../App'

export default function HomePage(){

    const {darkMode,selectedOption} = useContext(AppContext)
    const searchIcon = `/public/images/search-${darkMode?'dark':'light'}.svg`  
    const [countriesElements,setCountriesElements]= useState([])
    const [countries,setCountries] = useState([])
    const [search,setSearch] = useState('')
    const [region,setRegion] = useState('')


    function handleChange(e){
        setSearch(e.target.value)
    }

    const [state,dispatch] = useReducer((state,action)=>{

        switch(action.type){
            case "LOADING":{
                return {...state,loading:true}
            }
            case "RESOLVED":{
                return{...state,sucess:true,loading:false,error:null}
            }
            case "ERROR":{
                return {...state,error:action.error,sucess:false,loading:false}
            }
            default:{
                return state
            }
        }

    },{
        loading:false,
        sucess:false,
        error:null
    })
    

    const {loading,sucess,error} = state

    useEffect(()=>{
        dispatch({type:"LOADING"})
        fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region')
            .then(res=>res.json())
            .then(data=>{
                data.sort((a,b)=>b.population- a.population)
                setCountries(data)
                dispatch({type:"RESOLVED"})

            }).catch(error=>{
                dispatch({type:"ERROR"})
            })

    },[])




    useEffect(()=>{
        if(countries){
            setCountriesElements(
                [...countries].filter(country=>{
                    return (search? country.name.common.toLowerCase().startsWith(search):true)
                    &&(selectedOption? country.region===selectedOption:true)
                }).map((country,index)=><Country key={index} data={country} />)
            )
        }
        
    },[search,selectedOption,countries])

    return(
        <div className="home-container container">
            <div className="home-search-section flex">

                <div className="home-search-bar-container bx-s flex bg-white br">
                    <img className="home-search-icon" src={searchIcon} />
                    <input onChange={handleChange} className="home-search-bar fs-500 fw-400 bg-white txt-pure-black" placeholder="Search for a country..."/>
                </div>

                <Filter>
                    <Title>Filter by Region</Title>
                    <OptionsContainer>
                        <Option defaultOption>None</Option>
                        <Option>Africa</Option>
                        <Option>Americas</Option>
                        <Option>Asia</Option>
                        <Option>Europe</Option>
                        <Option>Oceania</Option>
                    </OptionsContainer>
                </Filter>
            </div>

            <div className="countries-section grid">
                {
                    loading?
                    <ClipLoader
                        color={darkMode?"#00FFFF":"#000"}
                        size={120}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    :sucess?
                    countriesElements.length?
                    countriesElements
                    :(
                        <h2 className="txt-dark">No results were found for `{search}` {selectedOption?`in ${selectedOption}`:''}!</h2>
                    )
                    :error?
                    <h1 style={{color:"Red"}}>{error.message}</h1>
                    :''
                }
             </div>
        </div>
    )
}