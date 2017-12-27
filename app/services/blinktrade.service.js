const Blinktrade = require('../../node_modules/blinktrade/browser/blinktrade.js');

let blinktradeWs = null;
let blinktradeApi = null;
let tickerId = null;
let connected = false;

let orderbookId = null;
let orderbookSubscription = null;

class BlinktradeService {
  constructor() {
    if(!blinktradeApi)
      blinktradeApi = new Blinktrade.BlinkTradeRest({ prod: true, currency: "BRL", brokerId: 4 });

    if(!blinktradeWs) {
      blinktradeWs = new Blinktrade.BlinkTradeWS({ prod: true, currency: "BRL", brokerId: 4, url: 'ws://ws.moonhorn.co/', fingerPrint: 'bdd514d0-6fee-0d3a-7e2d-c2f938e8d770' });
      blinktradeWs.connect()
        .then(conn => {
          console.log('connected');
          connected = true;
        })
        .catch(err => {
          console.log('err');
          console.log(err);
        });
    }
  }

  isConnected() {
    return connected;
  }

  ticker(unsubscribe) {
    if(unsubscribe && tickerId)
      return blinktradeWs.unSubscribeTicker(tickerId);

    let ticker = blinktradeWs.subscribeTicker(["BLINK:BTCBRL"]);

    ticker.then(tickerData => {
      tickerId = tickerData.SecurityStatusReqID;
    }).catch(err => {console.log(err);});

    return ticker;
  }

  orderbook(unsubscribe) {
    if(unsubscribe && orderbookId) {
      orderbookSubscription = null;
      return blinktradeWs.unSubscribeOrderbook(orderbookId);
    }

    if(orderbookSubscription != null)
      return orderbookSubscription;

    let orderbook = blinktradeWs.subscribeOrderbook(["BTCBRL"]);
    orderbookSubscription = orderbook;

    orderbookSubscription.then(orderbookData => {
      console.log(orderbookData);
      orderbookId = orderbookData.MDReqID;
    }).catch(err => {console.log(err);});

    return orderbookSubscription;
  }

}

export default BlinktradeService;