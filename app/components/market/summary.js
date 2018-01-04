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

  _blinktradeService = new BlinkTradeService();

  componentDidMount() { 
    this._fetchMarket();
  }

  componentWillUnmount() {
    this._blinktradeService.ticker(true);
  }

  _fetchMarket() {
    let that = this;

    if(!this._blinktradeService.isConnected())
      return setTimeout(function() { that._fetchMarket(); }, 50);

    this._blinktradeService.ticker()
      .on("BLINK:BTCBRL", function(symbol) {
        let mState = {};
        mState.high = symbol.HighPx.toFixed(2);
        mState.low = symbol.LowPx.toFixed(2);
        mState.last = symbol.LastPx.toFixed(2);

        that.setState(mState);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.last ? 
          <View style={styles.valuesHolder}>
            <Text>🕐 { this.state.last }</Text>
            <Text>🔺 { this.state.high }</Text>
            <Text>🔻 { this.state.low }</Text>
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
  valuesHolder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
  }
});
