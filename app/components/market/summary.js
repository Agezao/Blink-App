import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
//
import BlinkTradeService from '../../services/blinktrade.service';
import Loader from '../utils/loader';

export default class MarketSummary extends React.Component {
  
  state = {
    high: 0,
    low: 0,
    latest: 0
  };

  _tickerUpdater = null;
  _blinktradeService = new BlinkTradeService();
  //  blinktrade = new Blinktrade.BlinkTradeWS({ url: 'wss://ws.blinktrade.com/trade/', prod: true, currency: "BRL", brokerId: 4, fingerPrint: '1828918279' });
  //  blinktrade = new Blinktrade.BlinkTradeRest({ prod: true, currency: "BRL", brokerId: 4 });

  componentDidMount() {
    let that = this;
    this._tickerUpdater = setInterval(function() { that._fetchMarket(); }, 2500);
  }

  componentWillUnmount() {
    clearInterval(this._tickerUpdater);
    this._tickerUpdater = null;
  }

  _fetchMarket() {
    let that = this;

    this._blinktradeService.ticker()
      .then(data => {
        let mState = {};
        mState.high = data.high.toFixed(2);
        mState.low = data.low.toFixed(2);
        mState.last = data.last.toFixed(2);

        that.setState(mState);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.last ? 
          <View>
            <Text>Latest: { this.state.last }</Text>
            <Text>High: { this.state.high }</Text>
            <Text>Low: { this.state.low }</Text>
          </View>
          : <Loader />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff'
  },
});
