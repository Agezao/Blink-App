import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Icon, Screen, Title } from '@shoutem/ui';
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
        <Title style={{textAlign: 'center', paddingVertical: 10}}>
          Thanks for using this app ♥
        </Title>
        <Text style={{paddingHorizontal: 10, paddingVertical: 5}}>
          This is a non-official, community based, and open-source app that makes it possible for you to interact with exchanges that are members of the BlinkTrade platform.
        </Text>
        <Text style={{paddingHorizontal: 10, paddingVertical: 5}}>
          If you want to make this app better by pushing updates, reporting bugs or giving feedback, please check out our Github and show us some love.
        </Text>
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
