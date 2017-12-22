import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//
import PlaceOrder from '../place-order/place-order';
import OrderList from '../order-list/order-list';

export default class Buy extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.orderPlacer}>
          <PlaceOrder side="buy" />
        </View>
        <View style={styles.offerList}>
          <OrderList side="buy" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  orderPlacer: {
    flex: 2
  },
  offerList: {
    flex: 8
  }
});
