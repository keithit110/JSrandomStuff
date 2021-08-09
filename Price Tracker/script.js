// const coinPair = 'slpusdt'; //must be lower case
const coin = prompt(
  'Input coin ticker you want to track (ex. btc):'
).toLowerCase();
console.log(coin);
let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}usdt@trade`);
let stockPriceElement = document.getElementById('stock-price');
let lastPrice = null;
let price = null;

ws.onmessage = function (event) {
  let stockObject = JSON.parse(event.data);
  // console.log(stockObject);
  price = parseFloat(stockObject.p).toFixed(5); //decimal precision
};

function setSymbol(s1, s2, s3) {
  return !lastPrice || lastPrice === price ? s1 : price > lastPrice ? s2 : s3;
}

const setPrice = function () {
  stockPriceElement.innerText = `${price}`;
  stockPriceElement.style.color = setSymbol('black', 'green', 'red');
  document.title = `${setSymbol(
    '\u2014',
    '\u2191',
    '\u2193'
  )} ${coin}: $${price}`;
  lastPrice = price;
};

setInterval(setPrice, 10000);
