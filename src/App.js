import {useContext} from "react"
import Header from "./Components/Header"
import Content from "./Components/Content"
import Footer from "./Components/Footer"


import "./assests/styleContent.css"
import "./assests/styleHeader.css"
import "./assests/styleFooter.css"
import "./assests/styleTheme.css"
import 'bootstrap/dist/css/bootstrap.min.css';


import {theme} from "./Control"

function App() {
  const [darkMode]= useContext(theme);
  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <Header/>
      <Content/>
      <Footer/>
    </div>
  );
}

export default App;
