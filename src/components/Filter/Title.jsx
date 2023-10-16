import { useContext } from "react"
import { FilterContext } from "./Filter"

export default function Title({children}){

    const {titleRef,selectedOption} = useContext(FilterContext)

    return(
        <div ref={titleRef} className="filter-title-container bx-s bg-white flex br" >
            <p className="filter-title fs-500 fw-400">
                {selectedOption||children}
            </p>
            <img src="public/images/arrow.svg" />
        </div>
    )
   
}