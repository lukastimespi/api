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
  var options = {
    host: 'etherscan.io',
    path: '/token/0xdac17f958d2ee523a2206206994597c13d831ec7'
  }
  var request = http.request(options, function (rest) {
      var data = '';
      rest.on('data', function (chunk) {
          data += chunk;
      });
      rest.on('end', function () {
        var doc = new dom().parseFromString(data);
        var node1 = xpath.select('//*[@id="ContentPlaceHolder1_tr_valuepertoken"]/div/div[1]/span/span[1]/text()', doc);
        var node2 = xpath.select('//*[@id="ContentPlaceHolder1_tr_valuepertoken"]/div/div[1]/span/text()', doc);
        var node3 = xpath.select('//*[@id="content"]/div[1]/div/div[1]/h1/div/span/text()', doc);
      node1.toString() == "" ? res.send(data) : res.send(node1.toString().replace(/,/g, "").replace(/ /g, "") + "," +
         node2.toString().replace(/,/g, "").replace(/ /g, "") + "," + node3.toString().replace(/,/g, "").replace(/ /g, ""));
      });
  });
  request.on('error', function (e) {
      res.send(e.message);
  });
  request.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}...`);
});
