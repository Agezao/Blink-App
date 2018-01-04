import React from 'react';
import { StyleSheet, Button, Image, Text, View } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
//
//
import Home from './app/components/home/home';
import About from './app/components/about/about';
import OfferBook from './app/components/offer-book/offer-book';
import DrawerContainer from './app/components/menu/drawerContainer';

const App = DrawerNavigator({
  Home: { screen: Home },
  OfferBook: { screen: OfferBook },
  About: { screen: About },
},{
  gesturesEnabled: false,
  drawerWidth: 300,
  contentComponent: DrawerContainer,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});

export default App;