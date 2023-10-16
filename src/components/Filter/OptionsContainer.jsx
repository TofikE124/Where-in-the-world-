import { useContext } from "react"
import { FilterContext } from "./Filter"

export default function OptionsContainer({children}){

    const {optionsRef} = useContext(FilterContext)


    return (
        <div ref={optionsRef} className={`options-container bx-s bg-white br grid`}>
            {children}
        </div>
    )
}