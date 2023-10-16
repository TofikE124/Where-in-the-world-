import { createContext, useEffect, useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import PageLayout from './components/PageLayout'
import HomePage from './pages/HomePage'
import Country from './components/Country'



const AppContext = createContext()

export default function App() {


  const [darkMode,setDarkMode] = useState(false)
  const [selectedOption,setSelectedOption] = useState('')
  const root  = document.documentElement;

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


  
 
  return (

    <>
    <AppContext.Provider value={{darkMode,setDarkMode,selectedOption,setSelectedOption}}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<PageLayout />}>
              <Route index element={<HomePage />} />
              <Route path='country/:name' element={<Country />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </AppContext.Provider>
    </>
  )
}

export {AppContext}
