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
        
        if(this.props.side === 'buy')
          this.setState({orders: data.bids});
        if(this.props.side === 'sell')
          this.setState({orders: data.asks});
      })
      .catch(err => {
        console.log(err);
      });
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