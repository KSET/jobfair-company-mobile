import React from 'react';
import { Keyboard } from 'react-native';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Input,
  Item,
  Label,
  Right,
  Text,
  Thumbnail,
  Title,
} from 'native-base';
import Toast from 'react-native-root-toast';

import AuthService from '../services/AuthService';
import Spinner from 'react-native-loading-spinner-overlay';
import JobFairService from '../services/JobFairService';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.performLogin = this.performLogin.bind(this);
    this.redirectHome = this.redirectHome.bind(this);
    this.state = {
      email: '',
      password: '',
      visible: false,
    };
  }


  async componentWillMount() {
    const user = JobFairService.getAuthDetails();
    if (!user && !user.email && !user.password) {
      this.setState({
        email: user.email,
        password: user.password,
      });
    }
    // const isAuthenticated = await AuthService.isAuthenticated();
    // if (isAuthenticated) {
    //   this.props.navigation.navigate('Home');
    // }
  }


  async performLogin() {
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
    this.setState({ visible: true });
    AuthService.login(email, password)
      .then(
        (result) => {
          this.setState({ visible: false });
          if (!result) {
            Toast.show('Username or password is incorrect!', {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
            });
          } else {
            this.redirectHome();
          }
        },
    ).catch(
      (error) => {
        this.setState({ visible: false });
        console.log(error);
        Toast.show('Internal error!', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      },
    );
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
          <Thumbnail style={{ width: 200, marginTop: 40, alignSelf: 'center' }} source={require('../assets/jobfair.png')} />
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
        <Spinner visible={this.state.visible} overlayColor={'rgba(0, 0, 0, 0.5)'} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
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
