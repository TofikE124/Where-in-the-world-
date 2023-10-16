import { useContext } from "react"
import {FilterContext} from './Filter'

export default function Option({children,defaultOption}){

    const {selectedOption,selectOption} = useContext(FilterContext)
    return(
        <div 
            className={`option ${selectedOption===children?'option-selected':''} ${(defaultOption&&!selectedOption)?'option-selected':''}`} 
            onClick={()=>selectOption(children)}>
            {children}
        </div>
    )
}