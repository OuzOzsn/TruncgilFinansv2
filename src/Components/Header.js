import React, { useContext, useState } from 'react';
import logo from "../assests/pics/logo.svg"
import HeaderLinks from "./Links/HeaderLinks"
import ResponsiveHeaderLinks from './Links/ResponsiveHeaderLinks';
import { RiArrowDropDownLine } from "react-icons/ri";
import {FaMoon, FaSun} from "react-icons/fa"
import {GiHamburgerMenu} from "react-icons/gi"

import{theme} from "../Control"

const Header= ()=> {
    const [darkMode, setDarkMode] = useContext(theme);
    document.cookie="DarkModeEnabled="+darkMode;
    const [mobileNav, setMobileNav] = useState(false);
    return (
        <header className="Header">
            <img className="headerLogo" src={logo} alt="Trunçgil Logo"></img>
            <HeaderLinks/>
            <button className="darkModeBtn">
                <ul>Gece Modu
                    <li>
                    <span className="headerDarkOption" onClick={()=>{setDarkMode(!darkMode);}}>
                        <span className={!darkMode?"optionBall-left":"optionBall-right"}/>
                        <FaSun className="toggleSun"/>
                        <FaMoon className="toggleMoon"/>
                    </span>
                    </li>
                </ul>
                <RiArrowDropDownLine/>
            </button>
            <GiHamburgerMenu className="hamburgerIcon" onClick={()=>{setMobileNav(!mobileNav)}} />
            {mobileNav===false?"":<ResponsiveHeaderLinks/>}
        </header>
            
    )
}

export default Header;