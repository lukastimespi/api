const http = require('https');
const express = require("express");
const fetch = require("whatwg-fetch");
const app = express();
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser

app.get("/favicon.ico", (req, res) => {
  res.send("/favicon.ico");
});

app.get("/get/:id", (req, res) => {
  http.get('https://api.coingecko.com/api/v3/coins/ethereum/contract/' + req.params.id, (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
    if(JSON.parse(data)["error"] != null) {
      res.send("error");
    } else {
      res.send("@" + JSON.parse(data)["market_data"]["current_price"]["eth"] + "Eth" + "," + "$" + JSON.parse(data)["market_data"]["current_price"]["usd"] + "," + JSON.parse(data)["name"]);
    }
  });

}).on("error", (err) => {
  res.send("error");
});
});
//@0.001678Eth, $0.9979 ,TetherUSD
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}...`);
});
