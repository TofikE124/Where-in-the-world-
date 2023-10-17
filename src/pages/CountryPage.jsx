import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader";

import { AppContext } from "../App"

export default function Country()
{

    const params = useParams()
    const {name} = params
    const location = useLocation()
    const [country,setCountry] = useState(null)

    const search = location.state?.search
    const link = search? `/?search=${search}` : '/'

    const nativeName= country? country.name.nativeName[Object.keys(country.name.nativeName)[0]].common : ''
    const currencies= country? country.currencies[Object.keys(country.currencies)[0]].name : ''
    const languages = country? Object.values(country.languages).join(', '):''
    const [bordersElements,setBordersElements] = useState([])

    const {countries,darkMode} = useContext(AppContext)
    const arrowURL = `/images/BackArrow-${darkMode?'Dark':'Light'}.png`


    useEffect(()=>{
        if(countries)
        {
            async function getCountry(){
                const res = await fetch(`https://restcountries.com/v3.1/name/${name.toLowerCase()}?fields=name,flags,population,capital,region,subregion,tld,currencies,languages,borders`)
                const data = await res.json()
                const tempCountry = data.filter(country=>country.name.common===name)[0]
                const tempBorders = []
                Object.values(tempCountry.borders).map((key,index)=>{

                    let i =0
                    for(i=0;i<250;i++){
                        if(countries[i]){
                            if(countries[i].fifa===key){
                                break;
                            }
                        }
                    }
                    if(countries[i]){
                        const country = countries[i].name.common
                        tempBorders.push(
                            <Link key={index} to={`/country/${country}`} className="country-page-info__border-item bx-s-2 br bg-pure-white txt-dark">
                                {country}
                            </Link>
                        )
                            
                    }

                })
                setBordersElements(tempBorders)
                setCountry(tempCountry)
            }
            getCountry()
        }
    },[countries,name])




    return(
        <div className="country-page-container container">
            <Link to={link} className="country-page-top flex bx-s-2 br txt-dark">
                <img src={arrowURL} />
                <p>Back</p>
            </Link>
            {
            country?
            <div className="country-page-info-container grid">
                <img  className="country-page-info__image br bx-s" src={country.flags.png} />
                <div className="country-page-info grid">
                    <h1 className="country-page-info__title txt-dark fs-900 fw-800">{country.name.common}</h1>
                    <div className="country-page-info__main fs-800 fw-600 txt-dark">
                        <p>Native Name: <span className="fw-300">{nativeName}</span></p>
                        <p>Population: <span className="fw-300">{country.population.toLocaleString()}</span></p>
                        <p>Region: <span className="fw-300">{country.region}</span></p>
                        <p>Sub Region: <span className="fw-300">{country.subregion}</span></p>
                        <p>Capital: <span className="fw-300">{country.capital}</span></p>
                    </div>
                    <div className="country-page-info__secondary fs-800 fw-600 txt-dark">
                        <p>Top Level Domain: <span className="fw-300">{country.tld[0]}</span></p>
                        <p>Currencies: <span className="fw-300">{currencies}</span></p>
                        <p>Languages: <span className="fw-300">{languages}</span></p>
                    </div>
                    <div className="country-page-info__border-container grid">
                        {
                        bordersElements.length!==0?
                        <>
                            <p className="country-page-info__border-container__title fs-600 fw-600 txt-dark">Border Countries:</p>
                            <div className="country-page-info__borders flex">
                                {bordersElements}
                            </div>
                        </>
                        :''
                        }
                        
                    </div>

                </div>
            </div>
            :<div className="country-page-loader-container grid">
                <ClipLoader
                color={darkMode?"#00FFFF":"#000"}
                size={120}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            </div>
            }
        </div>
    )
}