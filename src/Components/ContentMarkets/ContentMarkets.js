import React from 'react';
import { Link } from 'react-router-dom';

import {Container, Col, Row} from "react-bootstrap";
import {RiArrowDropRightLine} from "react-icons/ri"

import ContentTableCurrency from "../ContentTables/ContentTableCurrency";
import ContentTableGold from "../ContentTables/ContentTableGold";
import  ContentTop5Loser  from "../ContentTables/ContentTop5Loser";
import ContentTop5Win from "../ContentTables/ContentTop5Win";

const ContentMarkets = () => {
    return (
        <Container lg="12" className="containerMarkets mt-5 mb-5">
        <Col xl={12} md={12} sm={12} xs={12} className="marketsHeader">
          <h3>Piyasa Durumu</h3>
        </Col>
        <Row className="tablesRow mt-5">
          <Col>

            <Link to="/doviz" className="linkTables">
            <h3 className="tableHead" >
              Döviz Kurları{" "}
              <RiArrowDropRightLine style={{ fontSize: "17px" }} />
            </h3>
            </Link>
            <ContentTableCurrency />

            
            <h3 className="tableHead mt-5">
              En Çok Değer Kaybedenler
            </h3>
            <ContentTop5Loser/>
          </Col>

          <Col>
          <Link to="/altin" className="linkTables">
          <h3 className="tableHead" >
              Altın Kurları{" "}
              <RiArrowDropRightLine style={{ fontSize: "17px" }} />
            </h3>
            </Link>
            <ContentTableGold />
            
            <h3 className="tableHead mt-5">
              En Çok Değer Kazananlar
            </h3>
            <ContentTop5Win/>
          </Col>
          
        </Row>
      </Container>
    )
}

export default ContentMarkets;