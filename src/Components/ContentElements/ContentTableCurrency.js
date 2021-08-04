import React, { useState,useLayoutEffect } from "react";
import { Table } from "react-bootstrap";

const ContentTableCurrency = () => {
  const [exchange, setExchange] = useState([]);

  const currencyTableRequest = () => {
    fetch("https://finans.truncgil.com/v3/today.json")
      .then((response) => response.json())
      .then((response) => {
        delete response.Update_Date;
        let myExchangeResult = [];
        Object.keys(response).forEach((r) => {
          response[r].Name = r;
          if (
            response[r].Name === "USD" ||
            response[r].Name === "EUR" ||
            response[r].Name === "GBP" ||
            response[r].Name === "CHF" ||
            response[r].Name === "CAD"
          ) {
            myExchangeResult.push(response[r]);
          }
        });
        setExchange(myExchangeResult);
      });
  };

  useLayoutEffect(() => {
    currencyTableRequest();
  }, []);

  return (
    <Table striped bordered hover>
    <thead variant="dark">
      <tr>
        <th>Sembol</th>
        <th>Satış</th>
        <th>Değişim</th>
      </tr>
    </thead>
    <tbody>
    {exchange.map((data) => {
          return (
            <tr key={data.Name}>
              <td className="tableMarketName">{data.Name}</td>
              <td>{data.Selling}</td>
              <td className={
                          data.Change === "%0,00" || data.Change === "%-0,00"
                            ? "text-warning"
                            : data.Change.includes("-")
                            ? "text-danger"
                            : "text-success"
                        }>{data.Change}</td>
            </tr>
          );
        })}
    </tbody>
  </Table>
  );
};
export default ContentTableCurrency;
