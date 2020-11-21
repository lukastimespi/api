const http = require('http');
const express = require("express");
const fetch = require("whatwg-fetch");
const app = express();
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser
  const CloudflareBypasser = require('cloudflare-bypasser');
  var cloudscraper = require('cloudscraper');
  let cf = new CloudflareBypasser();
  app.get("/favicon.ico", (req, res) => {
    res.send("/favicon.ico");
  });

  app.get("/test", (req, res) => {
    cloudscraper.get('https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7').then((value) => {
      res.send(value);
    });
  });
app.get("/get/:id", (req, res) => {
  
  cf.request({
    url: 'https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7',
    headers: {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    }
  })
  .then(ress => {
    var doc = new dom().parseFromString(ress.body);
    var node1 = xpath.select('//*[@id="ContentPlaceHolder1_tr_valuepertoken"]/div/div[1]/span/span[1]/text()', doc);
    var node2 = xpath.select('//*[@id="ContentPlaceHolder1_tr_valuepertoken"]/div/div[1]/span/text()', doc);
    var node3 = xpath.select('//*[@id="content"]/div[1]/div/div[1]/h1/div/span/text()', doc);
  node1.toString() == "" ? res.send(data) : res.send(node1.toString().replace(/,/g, "").replace(/ /g, "") + "," +
     node2.toString().replace(/,/g, "").replace(/ /g, "") + "," + node3.toString().replace(/,/g, "").replace(/ /g, ""));
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}...`);
});
