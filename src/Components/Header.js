import React, { useContext } from 'react';
import logo from "../assests/pics/logo.svg"
import HeaderLinks from "./Links/HeaderLinks"
import { RiArrowDropDownLine } from "react-icons/ri";
import {FaMoon, FaSun} from "react-icons/fa"

import{theme} from "../Control"

const Header= ()=> {
    const [darkMode, setDarkMode] = useContext(theme);
    return (
        <header className="Header">
            <img className="headerLogo" src={logo} alt="Trunçgil Logo"></img>
            <HeaderLinks/>
            <button className="darkModeBtn">
                <ul>Gece Modu
                    <li>
                    <span className="headerDarkOption" onClick={()=>{setDarkMode(!darkMode)}}>
                        <span className={!darkMode?"optionBall-left":"optionBall-right"}/>
                        <FaSun className="toggleSun"/>
                        <FaMoon className="toggleMoon"/>
                    </span>
                    </li>
                </ul>
                <RiArrowDropDownLine/>
            </button>
        </header>
            
    )
}

export default Header;