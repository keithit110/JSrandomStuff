const coinPair = 'slpusdt'; //must be lower case
const coin = 'SLP';
let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coinPair}@trade`);
let stockPriceElement = document.getElementById('stock-price');
let lastPrice = null;

ws.onmessage = (event) => {
  let stockObject = JSON.parse(event.data);
  //   console.log(stockObject);
  let price = parseFloat(stockObject.p).toFixed(6); //decimal precision
  stockPriceElement.innerText = price;
  stockPriceElement.style.color =
    !lastPrice || lastPrice === price
      ? 'black'
      : price > lastPrice
      ? 'green'
      : 'red';
  lastPrice = price;
  document.title = `${coin}: $${price}`;
};
