import React from 'react';
import { StyleSheet, Image, Button, View, TouchableOpacity } from 'react-native';
import { Icon, Screen, Text } from '@shoutem/ui';
//
import Menu from '../menu/menu';
import MenuStyles from '../../assets/styles/menu';
import MarketSummary from '../market/summary';

export default class Home extends React.Component {
  static navigationOptions = {
    lockMode: 'locked-closed',
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

        <TouchableOpacity style={[styles.homeButton, {flex: 4}]} onPress={() => navigate('OfferBook')}>
          <Icon name="books" style={{paddingRight: 5, color: '#ffffff'}} />
          <Text style={{color: '#ffffff'}}>
            Offer Book
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.homeButton, {flex: 1, backgroundColor: '#f8f8fb'}]} onPress={() => navigate('About')}>
          <Icon name="about" style={{paddingRight: 5}} />
          <Text>
            About
          </Text>
        </TouchableOpacity>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  homeButton: {
    backgroundColor: '#4a429b',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
  }
});
