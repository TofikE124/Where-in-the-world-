import { useContext } from "react"
import { FilterContext } from "./Filter"

export default function OptionsContainer({children}){



    return (
        <div className={`options-container bx-s bg-white br grid`}>
            {children}
        </div>
    )
}