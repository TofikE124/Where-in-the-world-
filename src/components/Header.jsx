import { useContext } from "react"
import { AppContext } from "../App"
import { Link } from "react-router-dom"

export default function Header(){

    const {darkMode,setDarkMode} = useContext(AppContext)

    function toggleDarkMode(){
        setDarkMode(prevDarkMode=>!prevDarkMode)
    }

    const moonImg = `/images/moon-${darkMode?'dark':'light'}.png`

    return(
        <header className="primary-header bg-white bx-s">
            <div className="primary-header-container container flex">
                <Link className="primary-header__title-container" to='/'><h1 className="primary-header__title fs-800 fw-800 txt-dark">Where in the world?</h1></Link>
                <div className="change-mode-container flex" onClick={toggleDarkMode}>
                    <img className="moon-icon" 
                    src={moonImg}/>
                    <p className="fs-600 fw-600">Dark Mode</p>
                </div>
            </div>
        </header>
    )
}