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
import { PropTypes } from 'prop-types';
import AuthService from '../../services/AuthService';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.logoutAction.bind(this);
  }

  logoutAction() {
    AuthService.logout().then(() => {
      this.props.navigation.navigate('Login');
    });
  }

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
              onPress={() => this.logoutAction()}
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

Sidebar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
