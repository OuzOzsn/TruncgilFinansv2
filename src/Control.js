import React,{useLayoutEffect, useState} from 'react'

export const theme = React.createContext(false);
const Control=({children})=> {
    /*cookie yi oku içinde değer yoksa stateden al*/
    let decodedCookie = decodeURIComponent(document.cookie);
    let splitCookie = decodedCookie.split("DarkModeEnabled=");
    const [darkMode,setDarkMode] = useState();
    
    useLayoutEffect(() => {
        const light = ()=>{
            return setDarkMode(false);
        }
        const dark =()=>{
            return setDarkMode(true);
        }
        if(splitCookie[1]=== "true"){
            dark();
        }
        else if(splitCookie[1]=== "false"){
            light();
        }
        document.cookie="DarkModeEnabled="+darkMode;
    }, [])
    return (
        <theme.Provider value={[darkMode,setDarkMode]}>
            {children}
        </theme.Provider>
    )
}
export default Control
