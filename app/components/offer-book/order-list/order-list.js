import React from 'react';
import { StyleSheet, Image, Text, View, FlatList } from 'react-native';
import { ListView, Row, Card, Screen, Caption, Spinner } from '@shoutem/ui';
//
import BlinkTradeService from '../../../services/blinktrade.service';
import Loader from '../../utils/loader';

class OrderList extends React.Component {
  
  state = {
    orders: []
  };

  _blinktradeService = new BlinkTradeService();

  componentDidMount() {
    this._fetchOrderbook();
  }

  componentWillUnmount() {
    this._blinktradeService.orderbook(true);
  }

  _fetchOrderbook() {
    let that = this;

    let ob = this._blinktradeService.orderbook();
    ob.on("OB:NEW_ORDER", function(order){
        if(order.side != that.props.side)
          return false;

        let book = Object.assign([], that.state.orders);
        book.splice(order.index - 1, 0, [order.price, order.size]);
        that.setState({orders: book});
      })
      .then(function(book) { that._updateOrders(book); });
    //
    ob.on("OB:UPDATE_ORDER", function(order){ 
        if(order.side != that.props.side)
          return false;

        let book = Object.assign([], that.state.orders);
        book[order.index - 1] = [order.price, order.size];
        that.setState({orders: book});
      })
      .then(function(book) { that._updateOrders(book); });
    //
    ob.on("OB:DELETE_ORDER", function(order){
        if(order.side != that.props.side)
          return false;

        let book = Object.assign([], that.state.orders);
        book.splice(order.index - 1, 1);
        that.setState({orders: book});
      })
      .then(function(book) { that._updateOrders(book); });
    //
    ob.on("OB:DELETE_ORDERS_THRU", function(order) {
        if(order.side != that.props.side)
          return false;

        let book = Object.assign([], that.state.orders);
        book.splice(order.index - 1, 1);
        that.setState({orders: book});
      })
      .then(function(book) { that._updateOrders(book); });
  }

  _updateOrders(book) {
    if(this.props.side === 'buy')
      this.setState({orders: book.MDFullGrp.BTCBRL.bids});
    if(this.props.side === 'sell')
      this.setState({orders: book.MDFullGrp.BTCBRL.asks});
  }

  render() {
    let renderOrder = (item) => {
      
      return (
        <Row style={{height: 20}}>
          <Text>Price: {item[0].toFixed(2)}, Amount: {item[1]} </Text>
        </Row>
      );
    }

    return (
      <Screen>
        { this.state.orders.length > 0 ? 
          <ListView
            data={ this.state.orders }
            renderRow={ renderOrder }
          />
          :  <Loader />}
      </Screen>
    );
  }
}

export default OrderList;