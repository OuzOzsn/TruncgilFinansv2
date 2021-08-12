import React, {useContext} from "react";

import{theme} from "../../Control"

const ResponsiveHeaderLinks = () => {
    const [darkMode, setDarkMode] = useContext(theme);
  return (
    <div className="responsiveHeaderLinksDiv">
      <ul className="responsiveHeaderLinksUl">
        <li><a href="/">Ana Sayfa</a></li>
        <li><a href="/">Finans Haberleri</a></li>
        <li><a href="https://truncgil.com.tr/">Trunçgil</a></li>
        <li><a href="https://truncgil.com.tr/blog">Blog</a></li>
        <li className="responsiveDarkButton" onClick={()=>{setDarkMode(!darkMode)}}>{darkMode?"Gündüz Modu":"Gece Modu"}</li>
      </ul>
    </div>
  );
};

export default ResponsiveHeaderLinks;
