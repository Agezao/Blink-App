import React from 'react';
import { StyleSheet, Image, Button, Text, View } from 'react-native';
import { Icon, Screen } from '@shoutem/ui';
//
import Menu from '../menu/menu';
import MenuStyles from '../../assets/styles/menu';
import MarketSummary from '../market/summary';

export default class Home extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Market',
    drawerIcon: ({ tintColor }) => (
      <Icon name="products" />
    ),
  };


  render() {
    const { navigate } = this.props.navigation;

    return (
      <Screen style={styles.container}>
        <Menu navigation={this.props.navigation} title="Market" />

        <MarketSummary />

        <Button
          onPress={() => navigate('About')}
          title="About"/>
        <Button
          onPress={() => navigate('OfferBook')}
          title="Offer Book"/>
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
