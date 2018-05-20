import React, { Component } from 'react';
import {
  Container,
  Content,
  Icon,
  List,
  ListItem,
  Thumbnail,
} from 'native-base';
import { Text } from 'react-native';

export default class Sidebar extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <Content>
          <Thumbnail
            style={{ width: 200, marginTop: 40, marginBottom: 20, alignSelf: 'center' }}
            source={require('../../assets/jobfair.png')}
          />
          <List>
            <ListItem
              button
              onPress={() => console.log('logout')}
            >
              <Icon
                type="FontAwesome" name="sign-out"
              />
              <Text style={{ marginLeft: 10 }}>Logout</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
