import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { NavigationBar, Title, Button, Icon } from '@shoutem/ui';


class Menu extends React.Component {

  render(){
    return(
      <View style={{ height: 70 }}>
        <NavigationBar
          leftComponent={(
            <Button>
              <Icon name="sidebar" onPress={() => this.props.navigation.navigate('DrawerToggle')} />
            </Button>
          )}
          centerComponent={<Title>{ this.props.title.toUpperCase() }</Title>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: '#473928',
    paddingTop: '8%',
    paddingLeft: '3%',
    paddingBottom: '3%'
  },
  title: {
    paddingTop: '0%',
    paddingLeft: '0%',
    paddingBottom: '0%',
    fontSize: 16,
  },
  hamburguer: {
    paddingTop: '0%',
    paddingLeft: '0%',
    paddingBottom: '0%',
    width: 25,
    height: 17
  }
});

export default Menu;