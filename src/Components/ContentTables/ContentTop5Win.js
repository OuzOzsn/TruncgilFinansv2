import React,{useState,useLayoutEffect } from 'react'
import {Table} from "react-bootstrap"

export const ContentTop5Win = () => {
    const [exchange, setExchange] = useState([]);
    let top5 = [];
    let top5read=[];
    const allRequest = () => {
        fetch("https://finans.truncgil.com/v3/today.json")
      .then((response) => response.json())
      .then((response) => {
        delete response.Update_Date;
        let myExchangeResult = [];
        Object.keys(response).forEach((r) => {
          response[r].Name = r;
          myExchangeResult.push(response[r]);
        });
        myExchangeResult.forEach((a)=>{
            if(a.Change !== undefined){
                let yuzde1 = a.Change;
                a.Change = yuzde1.replace("%","");
                a.Change = a.Change.replace(",",".");
                top5.push(a);
            }
        })
        top5.sort((a,b)=>{return parseFloat(a.Change) - parseFloat(b.Change)})
        top5.slice(-5).forEach((data)=>{
          top5read.push(data);
        }
        );
        setExchange(top5read);
        
      }
      );
    }
        
    useLayoutEffect(() => {
        
        allRequest();
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
                    {exchange.slice(0).reverse().map((data) => {
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
                                    }>%{data.Change}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
    )
}
export default ContentTop5Win;
