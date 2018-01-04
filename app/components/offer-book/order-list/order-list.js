import React from 'react';
import { StyleSheet, Image, Text, View, FlatList } from 'react-native';
import { ListView, Row, Card, Screen, Caption, Spinner } from '@shoutem/ui';
//
//import BlinkTradeService from '../../../services/blinktrade.service';
import OfferbookStore from '../../../stores/offerbook.store';
import Loader from '../../utils/loader';

class OrderList extends React.Component {
  
  state = {
    orders: []
  };

  watcher = null;

  reboot = 0;

  //_blinktradeService = new BlinkTradeService();
  _offerbookStore = new OfferbookStore();

  componentDidMount() {
    let that = this;
    this.watcher = setInterval(function(){ that._fetchOrderbook(that); }, 1000);
  }

  componentWillUnmount() {
    this._offerbookStore.dispose();
    clearInterval(this.watcher);
    this.watcher = null;
  }

  _fetchOrderbook() {
    if(!this._offerbookStore.hasUpdates())
      return false;

    let book = Object.assign([], this._offerbookStore.get(this.props.side));
    this.setState({orders: book.splice(0,150)});
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