import React,{useState} from 'react'

export const theme = React.createContext(true);
const Control=({children})=> {
    const [darkMode,setDarkMode] = useState(false);
    return (
        <theme.Provider value={[darkMode,setDarkMode]}>
            {children}
        </theme.Provider>
    )
}
export default Control
