import BlinkTradeService from '../services/blinktrade.service';

class OfferbookStore {

  _blinktradeService = null;

  offers = {
    buy: [],
    sell: []
  };

  updatedStore = false;
  
  //

  constructor() { 
    this._blinktradeService = new BlinkTradeService();
    this.watch();
  }

  watch() {
    let that = this;
    let ob = this._blinktradeService.orderbook();

    ob.on("OB:NEW_ORDER", function(order){
        let book = that.offers[order.side];
        book.splice(order.index - 1, 0, [order.price, order.size]);
        that.offers[order.side] = book;
        that.updatedStore = true;
      })
      .then(function(book) { that.setBook(book); });
    //
    ob.on("OB:UPDATE_ORDER", function(order){ 
        let book = that.offers[order.side];
        book[order.index - 1] = [order.price, order.size];
        that.offers[order.side] = book;
        that.updatedStore = true;
      })
      .then(function(book) { that.setBook(book); });
    //
    ob.on("OB:DELETE_ORDER", function(order){
        let book = that.offers[order.side];
        book.splice(order.index - 1, 1);
        that.offers[order.side] = book;
        that.updatedStore = true;
      })
      .then(function(book) { that.setBook(book); });
    //
    ob.on("OB:DELETE_ORDERS_THRU", function(order) {
        let book = that.offers[order.side];
        book.splice(order.index - 1, 1);
        that.offers[order.side] = book;
        that.updatedStore = true;
      })
      .then(function(book) { that.setBook(book); });
  }

  get(side) {
    this.updatedStore = false;

    if(!side)
      return this.offers;

    return this.offers[side];
  }

  hasUpdates() {
    return this.updatedStore;
  }

  setBook(book) {
    this.offers.buy = book.MDFullGrp.BTCBRL.bids;
    this.offers.sell = book.MDFullGrp.BTCBRL.asks;
    this.updatedStore = true;
  }

  reboot() {
    this.offers = {
      buy: [],
      sell: []
    };
  
    this.updatedStore = false;

    this.dispose();
  }

  dispose() {
    this._blinktradeService.orderbook(true);
  }

}

export default OfferbookStore;