import { createContext,useContext,useEffect, useRef, useState } from "react"
import {AppContext} from '../../App'
export const FilterContext = createContext()

export default function Filter({children}){

    
    const filterRef = useRef(null)
    const titleRef = useRef(null)
    const {selectedOption,setSelectedOption} = useContext(AppContext)
    


    useEffect(()=>{
        function handleClick(e){
            if(e.target ===titleRef.current || e.target.parentElement === titleRef.current){
                toggleFilterOpen()
            }
            else if(e.target!==filterRef.current){
                filterRef.current.classList.remove('options-open')
            }
        }
    
        document.body.addEventListener('click',handleClick)
        return ()=> document.body.removeEventListener('click',handleClick)
    },[])

    function toggleFilterOpen(){
        filterRef.current.classList.toggle('options-open')
    }

    function selectOption(value){
        if(value==='None'){
            setSelectedOption('')
        }
        else setSelectedOption(value)
        toggleFilterOpen()
    }




    return(
        <FilterContext.Provider value={{titleRef,selectedOption,setSelectedOption,toggleFilterOpen,selectOption}}>
            <div ref={filterRef} className="filter-container">
                {children}
            </div>
        </FilterContext.Provider>
    )
    
}