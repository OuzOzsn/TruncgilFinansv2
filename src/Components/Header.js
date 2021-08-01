import React, { useContext } from 'react';
import logo from "../assests/pics/logo.svg"
import HeaderLinks from "./Links/HeaderLinks"
import { RiArrowDropDownLine } from "react-icons/ri";

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
                    <span className="headerDarkOption">
                        <span className="optionBall-left"></span>
                    </span>
                    </li>
                </ul>
                <RiArrowDropDownLine/>
            </button>
        </header>
            
    )
}

export default Header;