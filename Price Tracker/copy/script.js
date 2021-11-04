// const coinPair = 'slpusdt'; //must be lower case
// const coin = prompt(
// 'Input coin ticker you want to track (ex. btc):'
// ).toLowerCase();

const coin = 'eth';
// console.log(coin);
let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}usdt@kline_2h`);
let stockPriceElement = document.getElementById('stock-price');
let lastPrice = null;
let price = null;
let phprate = null;
const modal = document.querySelector('.fa')

//PHP conversion START
var requestURL = 'https://api.exchangerate.host/latest?base=USD&symbols=PHP';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function () {
  var response = request.response;
  phprate = response.rates.PHP.toFixed(2);
  console.log(phprate);
};
//PHP conversion END

ws.onmessage = function (event) {
  let stockObject = JSON.parse(event.data);
  console.log(stockObject.k.c);
  price = parseFloat(stockObject.k.c).toFixed(2); //decimal precision
};

function setSymbol(s1, s2, s3) {
  return !lastPrice || lastPrice === price ? s1 : price > lastPrice ? s2 : s3;
}

const setPrice = function () {
  modal.classList.remove('hidden')
  intnumfmt = new Intl.NumberFormat('en-US');
  const amt = (((parseFloat(price)*.06) + parseFloat(price)) * parseFloat(phprate).toFixed(2))
  stockPriceElement.innerText = `\u20B1${intnumfmt.format(amt)}`;
  stockPriceElement.style.color = setSymbol('black', 'green', 'red');
  document.title = `${setSymbol(
    '\u2014',
    '\u2191',
    '\u2193'
  )} ${coin}: $${price}`.toUpperCase();
  lastPrice = price;
};

// setInterval(setPrice, 10000); //interval in miliseconds
