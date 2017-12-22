const Blinktrade = require('../../node_modules/blinktrade/browser/blinktrade.js');

let blinktrade = null;

class BlinktradeService {
  constructor() {
    if(!blinktrade)
      blinktrade = new Blinktrade.BlinkTradeRest({ prod: true, currency: "BRL", brokerId: 4 });
  }

  ticker() {
    return blinktrade.ticker();
  }

  orderbook() {
    return blinktrade.orderbook();
  }

}

export default BlinktradeService;