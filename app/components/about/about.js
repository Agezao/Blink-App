import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Icon, Screen } from '@shoutem/ui';
//
import Menu from '../menu/menu';
import MenuStyles from '../../assets/styles/menu';

export default class About extends React.Component {
  static navigationOptions = {
    lockMode: 'locked-closed',
    drawerLabel: 'About',
    drawerIcon: ({ tintColor }) => (
      <Icon name="about" />
    ),
  };

  render() {
    return (
      <Screen style={styles.container}>
        <Menu navigation={this.props.navigation} title="About" />
        <Text>About</Text>
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
