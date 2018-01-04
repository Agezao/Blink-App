import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon, Screen, Text } from '@shoutem/ui';

export default class DrawerContainer extends React.Component {

  render() {
    const { navigation } = this.props

    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.uglyDrawerItem}>
          <Icon name="products" style={{paddingRight: 5, color: '#ffffff'}} />
          <Text style={{color: '#ffffff', textAlign: 'center'}}>
            Market
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('OfferBook')} style={styles.uglyDrawerItem}>
          <Icon name="books" style={{paddingRight: 5, color: '#ffffff'}} />
          <Text style={{color: '#ffffff', textAlign: 'center'}}>
            Offer Book
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.uglyDrawerItem}>
          <Icon name="about" style={{paddingRight: 5, color: '#ffffff'}} />
          <Text style={{color: '#ffffff', textAlign: 'center'}}>
            About
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#50536f',
    paddingTop: 40,
    paddingHorizontal: 0
  },

  uglyDrawerItem: {
    fontSize: 18,
    width: '100%',
    fontWeight: 'bold',
    padding: 15,
    marginVertical: 3,
    backgroundColor: '#40425a',
    textAlign: 'center'
  }
})