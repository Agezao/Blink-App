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

  _orderbookUpdater = null;
  _blinktradeService = new BlinkTradeService();
  //  blinktrade = new Blinktrade.BlinkTradeWS({ url: 'wss://ws.blinktrade.com/trade/', prod: true, currency: "BRL", brokerId: 4, fingerPrint: '1828918279' });
  //  blinktrade = new Blinktrade.BlinkTradeRest({ prod: true, currency: "BRL", brokerId: 4 });

  componentDidMount() {
    let that = this;
    this._orderbookUpdater = setInterval(function() { that._fetchOrderbook(); }, 2500);
  }

  componentWillUnmount() {
    clearInterval(this._orderbookUpdater);
    this._orderbookUpdater = null;
  }

  _fetchOrderbook() {
    let that = this;

    this._blinktradeService.orderbook()
      .then(data => {
        
        let ordersMap = [];

        //list.slice(0, size)
        if(this.props.side === 'buy')
          ordersMap =  this._orderedMarketList(data.bids, true);
        if(this.props.side === 'sell')
          ordersMap = this._orderedMarketList(data.asks);

        this.setState({orders: ordersMap.slice(0, 100)});
      })
      .catch(err => {
        console.log(err);
      });
  }

  _orderedMarketList(orders, reverse) {
    var sortRule = function(a, b) {
      if(reverse)
        return b[0] - a[0];
      
      return  a[0] - b[0];
    }

    return orders.sort(sortRule);
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