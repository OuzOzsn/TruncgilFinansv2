import React from 'react';

const Footer= ()=> {
    return (
        <footer className="Footer">
            <ul className="footerAPILinks">
                <li>
                    <a href="https://truncgil.com.tr/">Trunçgil Teknoloji </a> Copyright © 2021
                </li>
                <li>
                    API: <a href="https://finans.truncgil.com/today.json">https://finans.truncgil.com/today.json</a>
                </li>
                <li>
                    API v2: <a href="https://finans.truncgil.com/v2/today.json">https://finans.truncgil.com/v2/today.json</a>
                </li>
                <li>
                    API v3: <a href="https://finans.truncgil.com/v3/today.json">https://finans.truncgil.com/v3/today.json</a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer;