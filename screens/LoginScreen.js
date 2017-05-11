import React from 'react';
import {Dimensions, Keyboard} from 'react-native';
import {
  View,
  Divider,
  TextInput,
  Button,
  Text,
  Screen,
  Image,
} from '@shoutem/ui';
import { connectStyle } from '@shoutem/theme';
import Toast from 'react-native-easy-toast'
import AuthService from "../services/AuthService";
import * as _ from "lodash";

const styles = {
  container: {
    paddingTop: (Dimensions.get('window').height / 2) - 220,
    backgroundColor: 'transparent',
  },

  button: {
    backgroundColor: '#000022',
    'shoutem.ui.Text': {
      color: "#FFFFFF",
    }
  },
};

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.auth = new AuthService();
    this.performLogin = this.performLogin.bind(this);
    this.state = {
      email: '',
      password: '',
    }
  }

  performLogin() {
    const { email, password } = this.state;

    // hide keyboard so alerts are visible
    Keyboard.dismiss();

    if (_.isEmpty(email) || _.isEmpty(password)) {
      this.refs.toast.show('Username and password are required fields!');
      return;
    }

    this.auth.login(email, password)
      .then((response) => {
        this.props.navigator.push('home');
      })
      .catch((error) => {
        this.refs.toast.show('Username or password is incorrect!');
      }).done();
  }

  renderLoginComponent() {
    const styles = this.props.style;

    return (
      <View styleName="flexible md-gutter">
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          keyboardAppearance="dark"
          returnKeyType="done"
          onChangeText={email => this.setState({ email })}
        />

        <Divider styleName="line"/>

        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardAppearance="dark"
          secureTextEntry
          returnKeyType="done"
          onChangeText={password => this.setState({ password })}
        />

        <Divider styleName="line"/>
        <Divider />

        <Button
          title="Log in"
          styleName="full-width inflexible"
          onPress={this.performLogin}
          style={styles.button}
        >
          <Text>LOG IN</Text>
        </Button>
      </View>
    );
  }

  render() {
    const styles = this.props.style;
    const screen = Dimensions.get('window');

    return (
      <Screen>
        <Image
          style={{width: screen.width, height: screen.height}}
          styleName="flexible fill-parent"
          source={require('../assets/background.png')}
        />

        <View styleName="flexible" style={styles.container}>
          {this.renderLoginComponent()}
        </View>
        <Toast ref="toast" position="bottom"/>
      </Screen>
    );
  }
}

export default connectStyle('LoginScreen', styles)(LoginScreen);
