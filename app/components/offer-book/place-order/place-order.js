import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class PlaceOrder extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Place { this.props.side } order</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
