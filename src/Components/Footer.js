import React from "react";
import { Dropdown } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="Footer pt-5 pb-5">
      <ul className="footerTruncgil">
        <li>
          <a href="https://truncgil.com.tr/">Trunçgil Teknoloji </a>
        </li>
        <li className="footerCopyright">
          Copyright © 2021 Her Hakkı Saklıdır.
        </li>
      </ul>
      <ul className="footerContact">
          <li className="mb-2"><span className="footerHelpSpan">Destek</span></li>
          <li><a href="https://truncgil.com.tr/#neler-yapariz">Hakkımızda</a></li>
          <li><a href="https://truncgil.com.tr/#iletisim">İletişim</a></li>
          <Dropdown drop="up">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            API
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="https://finans.truncgil.com/today.json">API</Dropdown.Item>
            <Dropdown.Item href="https://finans.truncgil.com/v2/today.json">API v2</Dropdown.Item>
            <Dropdown.Item href="https://finans.truncgil.com/v3/today.json">API v3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ul>
    </footer>
  );
};

export default Footer;
