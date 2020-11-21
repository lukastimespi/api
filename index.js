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
    host: 'info.uniswap.org',
    path: '/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
  }
  var request = http.request(options, function (rest) {
      var data = '';
      rest.on('data', function (chunk) {
          data += chunk;
      });
      rest.on('end', function () {
        var doc = new dom().parseFromString(data);
        var node1 = xpath.select('//*[@id="center"]/div/div[3]/div[2]/div/div[1]/div/div/div[3]', doc);
        res.send(node1);
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
