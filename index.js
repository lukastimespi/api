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
    var options = {
      url: 'https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7',
      headers: {
        // User agent, Cache Control and Accept headers are required
        // User agent is populated by a random UA.
        'User-Agent': 'Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36',
        'Cache-Control': 'private',
        'Accept': 'application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5'
      },
      // Cloudscraper automatically parses out timeout required by Cloudflare.
      // Override cloudflareTimeout to adjust it.
      cloudflareTimeout: 5000,
      // Reduce Cloudflare's timeout to cloudflareMaxTimeout if it is excessive
      cloudflareMaxTimeout: 30000,
      // followAllRedirects - follow non-GET HTTP 3xx responses as redirects
      followAllRedirects: true,
      // Support only this max challenges in row. If CF returns more, throw an error
      challengesToSolve: 3,
      // Remove Cloudflare's email protection, replace encoded email with decoded versions
      decodeEmails: false,
      // Support gzip encoded responses (Should be enabled unless using custom headers)
      gzip: true,
      // Removes a few problematic TLSv1.0 ciphers to avoid CAPTCHA
    };
    
    cloudscraper(options).then((val) => {
      res.send(val);
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
