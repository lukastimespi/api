const http = require('https');
const express = require("express");
const fetch = require("whatwg-fetch");
const app = express();
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser
var s = require("@uniswap/sdk");
var axios = require("axios");
const { parse } = require('path');

app.get("/favicon.ico", (req, res) => {
  res.send("/favicon.ico");
});

app.get("/get/:id", (req, res) => {
  var sfa = "";
  axios.get('https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=' + req.params.id + '&page=1&offset=5&apikey=QR62GI9FPA5JQ38576IVBWP53P9MBYYK7V').then(function (responses) { 
    const DAI = new s.Token(s.ChainId.MAINNET, req.params.id, responses.data.result[0].tokenDecimal)
    s.Fetcher.fetchPairData(DAI, s.WETH[DAI.chainId]).then((ressu) => {
      axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
    .then(function (response) {
      const route = new s.Route([ressu], s.WETH[DAI.chainId])
      res.send("@"+route.midPrice.invert().toSignificant(6) + "Eth" + ",$" + String(parseFloat(String(response.data.USD)* parseFloat(String(route.midPrice.invert().toSignificant(6))))) + "," + responses.data.result[0].tokenName);
    })
    .catch(function (error) {
      res.send("error")
    })
    .then(function () {
    });
    }).catch((error) => {
      res.send("error");
    });
    }).catch(function (error) {
      res.send("error");
    });
});
//@0.001678Eth, $0.9979 ,TetherUSD
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}...`);
});
