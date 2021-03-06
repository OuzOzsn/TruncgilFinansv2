import React,{useLayoutEffect, useState} from 'react'

export const theme = React.createContext(false);
const Control=({children})=> {
    let decodedCookie = decodeURIComponent(document.cookie);
    const [darkMode,setDarkMode] = useState(false);
    
    
    useLayoutEffect(() => {
        let splitCookie = decodedCookie.split("DarkModeEnabled=");
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 
    return (
        <theme.Provider value={[darkMode,setDarkMode]}>
            {children}
        </theme.Provider>
    )
}
export default Control
