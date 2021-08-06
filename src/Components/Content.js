import React, { useState, useLayoutEffect } from "react";

import { BrowserRouter as Router, Route,Switch } from "react-router-dom";

import { Card, Col, Row, Carousel, Container } from "react-bootstrap";
import {
  RiMoneyDollarCircleFill,
  RiMoneyEuroCircleFill,
  RiMoneyPoundCircleFill
} from "react-icons/ri";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { AiFillGolden, AiOutlineLine } from "react-icons/ai";
import logo from "../assests/pics/sat.jpg";

import ContentMarkets from "./ContentMarkets/ContentMarkets";
import ContentAllCurrency from "./ContentMarkets/ContentAllCurrency";
import ContentAllGold from "./ContentMarkets/ContentAllGold";

const Content = () => {
  const [exchange, setExchange] = useState([]);
  const [jsonDate, setJsonDate] = useState(Date.now());

  const date = new Date(jsonDate);
  const date2 = new Date();
  const timeMS = Math.floor(date2 - date);
  const timeMN = Math.floor(timeMS / 1000 / 60);

  const popularRequest = () => {
    fetch("https://finans.truncgil.com/v3/today.json")
      .then((response) => response.json())
      .then((response) => {
        setJsonDate(response.Update_Date);
        delete response.Update_Date;
        let myExchangeResult = [];
        Object.keys(response).forEach((r) => {
          response[r].Name = r;
          if (
            response[r].Name === "USD" ||
            response[r].Name === "EUR" ||
            response[r].Name === "GBP" ||
            response[r].Name === "gram-altin"
          ) {
            myExchangeResult.push(response[r]);
          }
        });
        setExchange(myExchangeResult);
      });
  };
  useLayoutEffect(() => {
    popularRequest();
    
  }, []);
  

  return (
    <Router>
    <section className="Content">
      <div className="popularContent">
        {exchange.map((data) => {
          return (
            <Col
              xl={3}
              md={3}
              sm={3}
              xs={3}
              className="colContent"
              key={data.Name}
            >
              <Card className="cardPopular" style={{ width: "20rem" }}>
                <Row className="cardPopularTitleRow">
                  <Col xl={8} md={8} sm={8} xs={8}>
                    <Card.Title className="cardPopularTitle">
                      {data.Name}
                    </Card.Title>
                    <span className="cardPopularSpan">{data.Selling}</span>
                  </Col>
                  <Col xl={4} md={4} sm={4} xs={4} className="cardPopularCol">
                    <span>
                      {data.Name === "USD" ? (
                        <RiMoneyDollarCircleFill className="cardTitleIcon" />
                      ) : data.Name === "EUR" ? (
                        <RiMoneyEuroCircleFill className="cardTitleIcon" />
                      ) : data.Name === "GBP" ? (
                        <RiMoneyPoundCircleFill className="cardTitleIcon" />
                      ) : (
                        <AiFillGolden className="cardTitleIcon" />
                      )}
                    </span>
                  </Col>
                </Row>
                <Col>
                  <Card.Body>
                    <Card.Text>
                      <span
                        className={
                          data.Change === "%0,00" || data.Change === "%-0,00"
                            ? "text-warning"
                            : data.Change.includes("-")
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {data.Change === "%0,00" || data.Change === "%-0,00" ? (
                          <AiOutlineLine />
                        ) : data.Change.includes("-") ? (
                          <FaArrowDown />
                        ) : (
                          <FaArrowUp />
                        )}
                        {data.Change}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Card>
            </Col>
          );
        })}
        <Carousel className="mb-5">
          <Carousel.Item>
            <img className="d-block w-100" src={logo} alt="First slide" />
            <Carousel.Caption>
              <h3>SAT Komandoları</h3>
              <p>Haberin tam hali için tıklayın.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={logo} alt="Second slide" />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={logo} alt="Third slide" />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <Switch>
        <Route path="/altin" component={ContentAllGold}/>
        <Route path="/doviz" component={ContentAllCurrency}/>
        <Route path="/" exact component={ContentMarkets} />
      </Switch>
        
    </section>
    </Router>
  );
};

export default Content;
