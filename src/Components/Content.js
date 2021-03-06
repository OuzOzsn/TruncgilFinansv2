import React, { useState, useLayoutEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Card, Col, Row, Carousel, Button, Modal, Form,InputGroup } from "react-bootstrap";
import {
  RiMoneyDollarCircleFill,
  RiMoneyEuroCircleFill,
  RiMoneyPoundCircleFill
} from "react-icons/ri";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { AiFillGolden, AiOutlineLine } from "react-icons/ai";

import logo from "../assests/pics/bitcoin.jpg";
import logo1 from "../assests/pics/merkez-bankasi.jpg";
import logo2 from "../assests/pics/altin.jpg";

import ContentMarkets from "./ContentMarkets/ContentMarkets";
import ContentAllCurrency from "./ContentMarkets/ContentAllCurrency";
import ContentAllGold from "./ContentMarkets/ContentAllGold";

import { converterRequest } from "./ContentMarkets/MarketsFunctions";

const Content = () => {
  
  const [exchange, setExchange] = useState([]);
  const [converter, setConverter] = useState([]);  /* Sayfadaki döviz dönüştürücünün datası */
  const [show, setShow] = useState(false);
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
    setConverter(converterRequest);
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
                sm={6}
                xs={6}
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
                      <span className="popularIcon">
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
                          {data.Change === "%0,00" ||
                          data.Change === "%-0,00" ? (
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
          <Col className="carouselCol" xl={12} md={12} sm={12} xs={12}>
            <Carousel className="mb-5">
              <Carousel.Item>
                <img
                  className="contentNews d-block w-100"
                  src={logo}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Bitcoin Yeniden Yükselişe Geçti</h3>
                  <p>Haberin tam hali için tıklayın...</p>
                </Carousel.Caption>
                <div className="shadow" />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="contentNews d-block w-100"
                  src={logo1}
                  alt="Second slide"
                />

                <Carousel.Caption>
                  <h3>Merkez Bankası Faizi</h3>
                  <p>Merkez bankası faizi düşürecek mi...</p>
                </Carousel.Caption>
                <div className="shadow" />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="contentNews d-block w-100"
                  src={logo2}
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Altın</h3>
                  <p>Altın yükselmeye devam ediyor...</p>
                </Carousel.Caption>
                <div className="shadow" />
              </Carousel.Item>
            </Carousel>
          </Col>
        </div>
        <Col xl={12} md={12} sm={12} xs={12} className="marketsHeader mt-5">
          <h3>Piyasa Durumu</h3>
          <h5 className="dataTime" >{timeMN === 0 ? "Az Önce" : `${timeMN} Dakika Önceki Veri`}</h5>
          <Button
            className="contentConverter"
            variant="primary"
            onClick={() => {setShow(true);}}
          >
            Döviz Dönüştür
          </Button>
        </Col>
        <Switch>
          <Route path="/altin" component={ContentAllGold} />
          <Route path="/doviz" component={ContentAllCurrency} />
          <Route path="/" exact component={ContentMarkets} />
        </Switch>


        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Döviz TL Dönüştürücü
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {/* dönüştürücünün üstteki textBox ı */}
              <Col xl={8} md={8} sm={8} xs={8}>
                <Form.Control id="convertText" type="text" placeholder="Miktar Döviz..." onKeyUp={()=>{
                  let selector = document.getElementById("convertSelect").selectedIndex;
                  let currencyName = document.getElementById("convertSelect").value;
                  let currency = document.getElementById("convertText").value;
                  let a ;
                  if(currency.length <=22){
                  if(!isNaN(currency)){
                  if(selector !== 0){
                    converter.forEach((data)=>{
                      if(data.Name===currencyName)
                      {
                        a = data.Selling;
                        a=a.replace(",",".");
                        currency =  parseFloat(currency) * parseFloat(a) ;
                        currency=currency.toFixed(4);
                        
                        if(currency.search("e")===-1){
                          if(!isNaN(currency)){
                            document.getElementById("convertResult").value=currency;
                            
                          }
                          else{
                            document.getElementById("convertResult").placeholder="Lütfen geçerli değer giriniz...";
                          }
                        }
                        
                        else{
                          document.getElementById("convertResult").placeholder="Çok Yüksek Değer Girdiniz...";
                        }
                        
                      }
                    })
                  }
                  else{
                    document.getElementById("convertText").value= "";
                    document.getElementById("convertResult").value= "";
                    document.getElementById("convertResult").placeholder="Lütfen bir döviz seçiniz...";
                  }
                }
                else{
                  document.getElementById("convertText").value= "";
                    document.getElementById("convertResult").value= "";
                }
              }
              else{
                document.getElementById("convertResult").value= "Çok Yüksek Değer Girdiniz...";
              }
                  
                    
                  
                }} />
              </Col>
              {/* dönüştürücünün comboBox ı */}
              <Col xl={4} md={4} sm={4} xs={4}>
                <Form.Select id="convertSelect" onChange={()=>{
                  let selector = document.getElementById("convertSelect").selectedIndex;
                  let currency = document.getElementById("convertText").value;
                  let currencyName = document.getElementById("convertSelect").value;
                  let a;
                  if(!isNaN(currency)){
                    
                  if(selector ===0){
                    document.getElementById("convertText").value= "";
                    document.getElementById("convertResult").value= "";
                    document.getElementById("convertResult").placeholder="Lütfen bir döviz seçiniz...";
                  }
                  else{
                    converter.forEach((data)=>{
                      if(data.Name===currencyName)
                      {
                        a = data.Selling;
                        a=a.replace(",",".");
                        if(typeof currency!=='string'){
                          document.getElementById("convertText").value=parseFloat(currency);
                        }
                        currency =  parseFloat(currency) * parseFloat(a) ;
                        currency=currency.toFixed(4);
                        if(currency.search("e")===-1){
                          if(!isNaN(currency)){
                            document.getElementById("convertResult").value=currency;
                            
                          }
                          else{
                            document.getElementById("convertResult").placeholder="Lütfen geçerli değer giriniz...";
                          }
                        }
                        else{
                          document.getElementById("convertResult").value="";
                          document.getElementById("convertResult").placeholder="Çok Yüksek Değer Girdiniz...";
                        }
                        
                      }
                    })
                  }
                }
                else{
                  document.getElementById("convertText").value= "";
                    document.getElementById("convertResult").value= "";
                }
                }}>
                  <option>Bir Döviz Seçin...</option>
                  {converter.map(
                      (data)=>{
                        return(
                          <option key={data.Name}>{data.Name}</option>
                        )
                      }
                    )
                  }
                </Form.Select>
              </Col>
              <Col xl={12} md={12} sm={12} xs={12} className="mt-3">
              <InputGroup hasValidation>
                {/* dönüştürücünün alttaki textBox ı */}
              <Form.Control id="convertResult" type="text" placeholder="Türk Lirası" onKeyUp={()=>{
                let selector = document.getElementById("convertSelect").selectedIndex;
                let currencyName = document.getElementById("convertSelect").value;
                let text2 = document.getElementById("convertResult").value;
                let textConvert = document.getElementById("convertText").value;
                let a;
                if(selector !== 0){
                if(!isNaN(text2)){
                if(text2.length <=22){
                converter.forEach((data)=>{
                  if(data.Name===currencyName){
                    a=data.Selling;
                    a=a.replace(",",".");
                    text2= parseFloat(text2)/parseFloat(a);
                    text2=text2.toFixed(4);
                    
                    if(textConvert.search("e")===-1){
                      if(!isNaN(text2)){
                        document.getElementById("convertText").value=text2+" "+currencyName;
                      }
                      else{
                        document.getElementById("convertText").placeholder="Lütfen Geçerli Bir Değer Giriniz...";
                      }
                    }
                    else{
                      document.getElementById("convertText").value="";
                      document.getElementById("convertText").placeholder="Çok Büyük Değer Girdiniz...";
                    }
                  }
                });
              }
              else{
                document.getElementById("convertText").value="";
                document.getElementById("convertText").placeholder="Çok Büyük Değer Girdiniz...";
              }
            }
            else{
              document.getElementById("convertText").value= "";
                    document.getElementById("convertResult").value= "";
            }
          }
          else{
                    document.getElementById("convertText").value= "";
                    document.getElementById("convertResult").value= "";
                    document.getElementById("convertResult").placeholder="Lütfen bir döviz seçiniz...";
          }
              }}/>
              <InputGroup.Text id="inputGroupPrepend">₺</InputGroup.Text>
              </InputGroup>
              
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
        

      </section>
    </Router>
  );

};

export default Content;
