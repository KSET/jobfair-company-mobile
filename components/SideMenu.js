import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import { SideMenu as RNESideMenu, ListItem, List } from 'react-native-elements';

export class SideMenu extends React.Component {
  render() {
    const list = [
      {
        name: 'Settings',
        onPress: () => this.props.navigator.push('settings'),
      },
      {
        name: 'Logout',
        onPress: () => (alert("Press")),
      },
    ];

    const MenuComponent = (
      <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
        <List containerStyle={{marginBottom: 20}}>
          {
            list.map((item, i) => (
              <ListItem
                roundAvatar
                onPress={item.onPress}
                key={i}
                title={item.name}
              />
            ))
          }
        </List>
      </View>
    );

    return (
      <RNESideMenu
        isOpen={this.props.isOpen}
        onChange={this.props.onSideMenuChange}
        menu={MenuComponent}
      >
        {this.props.children}
      </RNESideMenu>
    )
  }
}
