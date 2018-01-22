require('dotenv').config()

var express = require('express');
var CronJob = require('cron').CronJob;

var request = require('request');
var printf = require('printf');
var chalk = require('chalk');

var app = express();

console.clear();
new CronJob('*/3 * * * * *', function() {

    const URL = process.env.API_URL;

    request(URL, function(error, response, body) {
        var data = JSON.parse(body);
        var BTC_USD = data.RAW.BTC.USD;
        var ETH_BTC = data.RAW.ETH.BTC;
        var ETH_USD = data.RAW.ETH.USD;
        var LTC_BTC = data.RAW.LTC.BTC;
        var LTC_USD = data.RAW.LTC.USD;
        var XRP_BTC = data.RAW.XRP.BTC;
        var XRP_USD = data.RAW.XRP.USD;
        var DASH_BTC = data.RAW.DASH.BTC;
        var DASH_USD = data.RAW.DASH.USD;

        console.clear();
        console.log(
            `Coin      | BTC        | USD       | USD LAST 24HR |
--------------------------------------------------------------------------------
BTC                     $ ${printf('%8.2f', BTC_USD.PRICE)}  ${BTC_USD.CHANGE24HOUR < 0 ? chalk.red(printf('-$ %8.2f', Math.abs(BTC_USD.CHANGE24HOUR))) : chalk.green(printf('+$ %8.2f', BTC_USD.CHANGE24HOUR))}

ETH        ${printf('%6.5f BTC', ETH_BTC.PRICE)}  $ ${printf('%8.2f', ETH_USD.PRICE)}  ${ETH_USD.CHANGE24HOUR < 0 ? chalk.red(printf('-$ %8.2f', Math.abs(ETH_USD.CHANGE24HOUR))) : chalk.green(printf('+$ %8.2f', ETH_USD.CHANGE24HOUR))}

LTC        ${printf('%6.5f BTC', LTC_BTC.PRICE)}  $ ${printf('%8.2f', LTC_USD.PRICE)}  ${LTC_USD.CHANGE24HOUR < 0 ? chalk.red(printf('-$ %8.2f', Math.abs(LTC_USD.CHANGE24HOUR))) : chalk.green(printf('+$ %8.2f', LTC_USD.CHANGE24HOUR))}

XRP        ${printf('%6.5f BTC', XRP_BTC.PRICE)}  $ ${printf('%8.2f', XRP_USD.PRICE)}  ${XRP_USD.CHANGE24HOUR < 0 ? chalk.red(printf('-$ %8.2f', Math.abs(XRP_USD.CHANGE24HOUR))) : chalk.green(printf('+$ %8.2f', XRP_USD.CHANGE24HOUR))}

DASH       ${printf('%6.5f BTC', DASH_BTC.PRICE)}  $ ${printf('%8.2f', DASH_USD.PRICE)}  ${DASH_USD.CHANGE24HOUR < 0 ? chalk.red(printf('-$ %8.2f', Math.abs(DASH_USD.CHANGE24HOUR))) : chalk.green(printf('+$ %8.2f', DASH_USD.CHANGE24HOUR))}







________________________________________________________________________________
${printf('%80s', 'Last Updated: ' + new Date().toLocaleTimeString("en-US", {timeZone: "America/New_York"}))}`
        );
    })

}, null, true, 'America/New_York');

module.exports = app;
