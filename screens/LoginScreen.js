import React from 'react';
import { Keyboard } from 'react-native';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import {
  Container,
  Header,
  Title,
  Content,
  Right,
  Body,
  Text,
  Form,
  Input,
  Item,
  Label, Button,
} from 'native-base';
import Toast from 'react-native-root-toast';

import AuthService from '../services/AuthService';


class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.performLogin = this.performLogin.bind(this);
    this.redirectHome = this.redirectHome.bind(this);
    this.auth = new AuthService();
    this.state = {
      email: '',
      password: '',
    };
  }


  componentWillUnmount() {
    // Toast.toastInstance = null;
  }


  performLogin() {
    const { email, password } = this.state;

    // hide keyboard so alerts are visible
    Keyboard.dismiss();

    if (_.isEmpty(email) || _.isEmpty(password)) {
      Toast.show('Username and password are required fields!', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
      return;
    }
    this.auth.login(email, password)
      .then(() => {
        this.redirectHome();
      })
      .catch(() => {
        Toast.show('Username or password is incorrect!', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      }).done();
  }

  redirectHome() {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>{this.props.navigation.state.routeName}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form style={{ padding: 10 }}>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={email => this.setState({ email })} />
            </Item>
            <Item floatingLabel style={{ marginBottom: 20 }}>
              <Label>Password</Label>
              <Input secureTextEntry onChangeText={password => this.setState({ password })} />
            </Item>
            <Button title="login" onPress={() => this.performLogin()} block>
              <Text>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      routeName: PropTypes.string,
    }),
  }).isRequired,
};

export default LoginScreen;
