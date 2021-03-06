import React, { useLayoutEffect, useState } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";

const ContentAllCurrency = () => {
  const [exchange, setExchange] = useState([]);

  const currencyRequest = () => {
    fetch("https://finans.truncgil.com/v3/today.json")
      .then((response) => response.json())
      .then((response) => {
        delete response.Update_Date;
        let myExchangeResult = [];
        Object.keys(response).forEach((g) => {
          if (response[g].Type === "Gold") {
            response[g].Name = g;
            myExchangeResult.push(response[g]);
          }
        });
        setExchange(myExchangeResult);
      });
  };
  useLayoutEffect(() => {
    currencyRequest();
  }, []);

  return (
    <Container lg="12" className="containerMarkets mb-5">
      <Row className="tablesRow mt-5">
        <Col>
          <h3 className="tableHead">Altın Fiyatları </h3>

          <Table striped bordered hover>
            <thead variant="dark">
              <tr>
                <th>Sembol</th>
                <th>Alış</th>
                <th>Satış</th>
                <th>Değişim</th>
              </tr>
            </thead>
            <tbody className="allGold">
              {exchange.map((data) => {
                  if(data.Buying===undefined){
                    return undefined;
                  }
                  else{
                      return (
                  <tr key={data.Name}>
                    <td className="tableMarketName">{data.Name}</td>
                    <td className="tableTexts">{data.Buying}</td>
                    <td className="tableTexts">{data.Selling}</td>
                    <td
                      className={
                        data.Change === "%0,00" || data.Change === "%-0,00"
                          ? "text-warning"
                          : data.Change.includes("-")
                          ? "text-danger"
                          : "text-success"
                      }
                    >{data.Change}</td>
                  </tr>
                );
                  }
                
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ContentAllCurrency;
