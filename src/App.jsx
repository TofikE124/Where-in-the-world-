import { createContext, useEffect, useState,useReducer } from 'react'
import {BrowserRouter,Routes,Route, useSearchParams} from 'react-router-dom'
import PageLayout from './components/PageLayout'
import HomePage from './pages/HomePage'
import CountryPage from './pages/CountryPage'



const AppContext = createContext()

export default function App() {

  const [darkMode,setDarkMode] = useState(false)
  const [selectedOption,setSelectedOption] = useState()
  const root  = document.documentElement;
  const [countries,setCountries] = useState([])

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

  useEffect(()=>{
    if(darkMode){
      root.style.setProperty('--clr-dark','#FFF')
      root.style.setProperty('--clr-pure-white','#2B3844')
      root.style.setProperty('--clr-pure-black','#FFF')
      root.style.setProperty('--clr-light','#202C36')
      root.style.setProperty('--clr-grey','#FFF')
    }
    else{
      root.style.setProperty('--clr-dark','#111517')
      root.style.setProperty('--clr-pure-white','#FFF')
      root.style.setProperty('--clr-pure-black','#000')
      root.style.setProperty('--clr-light','#FAFAFA')
      root.style.setProperty('--clr-grey','#848484')
    }
  },[darkMode])


  const {loading,sucess,error} = state

    useEffect(()=>{
      dispatch({type:"LOADING"})
      fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,fifa')
          .then(res=>res.json())
          .then(data=>{
              data.sort((a,b)=>b.population- a.population)
              setCountries(data)
              dispatch({type:"RESOLVED"})

          }).catch(error=>{
              dispatch({type:"ERROR"})
          })
    },[])


  
 
  return (

    <>
    <AppContext.Provider value={{countries,loading,sucess,error,darkMode,setDarkMode,selectedOption,setSelectedOption}}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<PageLayout />}>
              <Route index element={<HomePage />} />
              <Route path='country/:name' element={<CountryPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </AppContext.Provider>
    </>
  )
}

export {AppContext}
