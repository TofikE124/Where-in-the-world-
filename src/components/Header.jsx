import { useContext } from "react"
import { ThemeContext } from "../App"

export default function Header(){

    const {darkMode,setDarkMode} = useContext(ThemeContext)

    function toggleDarkMode(){
        setDarkMode(prevDarkMode=>!prevDarkMode)
    }

    const moonImg = `/public/images/moon-${darkMode?'dark':'light'}.png`

    return(
        <header className="primary-header bg-white">
            <div className="primary-header-container container flex">
                <h1 className="fs-800 fw-800 ">Where in the world?</h1>
                <div className="change-mode-container flex" onClick={toggleDarkMode}>
                    <img className="moon-icon" 
                    src={moonImg}/>
                    <p className="fs-600 fw-600">Dark Mode</p>
                </div>
            </div>
        </header>
    )
}