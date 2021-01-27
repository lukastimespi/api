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
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
app.get("/test", (req, res) => {
  res.send(httpGet("https://www.instagram.com/graphql/query/?query_hash=298b92c8d7cad703f7565aa892ede943&variables={\"tag_name\":\"random\",\"first\":12,\"after\":\"\"}"));
});
//@0.001678Eth, $0.9979 ,TetherUSD
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}...`);
});
