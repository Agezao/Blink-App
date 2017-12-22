import React from 'react';
import { StyleSheet, Image, Button, Text, View } from 'react-native';
import { TabNavigator } from "react-navigation";
import { Icon, Screen } from '@shoutem/ui';
//
import Menu from '../menu/menu';
import MenuStyles from '../../assets/styles/menu';

///////////////
// Setting tabs
import Buy from './buy/buy';
import Sell from './sell/sell';

const OfferBookNavigator = TabNavigator({
  Buy: { screen: Buy },
  Sell: { screen: Sell },
});
///////////////

export default class OfferBook extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Offer Book',
    drawerIcon: ({ tintColor }) => (
      <Icon name="books" />
    ),
  };

  render() {

    return (
      <Screen style={styles.container}>
        <Menu navigation={this.props.navigation} title="Offer Book" />
        <OfferBookNavigator />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
