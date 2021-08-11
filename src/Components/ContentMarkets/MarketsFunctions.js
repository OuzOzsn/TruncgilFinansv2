
export const converterRequest = () => {
    let myExchangeResult = [];
    fetch("https://finans.truncgil.com/v3/today.json")
      .then((response) => response.json())
      .then((response) => {
        delete response.Update_Date;
        Object.keys(response).forEach((g) => {
          if (response[g].Type === "Currency") {
            response[g].Name = g;
            myExchangeResult.push(response[g]);
          }
        });
      });
      return myExchangeResult;
  }