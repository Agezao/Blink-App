import React from 'react';
import { StyleSheet, Button, Image, Text, View } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import { Examples } from '@shoutem/ui';
//
//
import Home from './app/components/home/home';
import About from './app/components/about/about';
import OfferBook from './app/components/offer-book/offer-book';


const App = DrawerNavigator({
  Home: { screen: Home },
  OfferBook: { screen: OfferBook },
  About: { screen: About },
});

/*class App extends React.Component {
  render() {
    return(
      <Examples />
    );
  }
}*/

export default App;