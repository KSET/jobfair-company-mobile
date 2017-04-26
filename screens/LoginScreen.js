import React from 'react';
import {Dimensions, Alert} from 'react-native';
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

    this.performLogin = this.performLogin.bind(this);
    this.state = {
      email: '',
      password: '',
    }
  }

  performLogin() {
    const { username, password } = this.state;

    this.props.navigator.push('home');

    /*if (_.isEmpty(username) || _.isEmpty(password)) {
      Alert.alert('Error', errorMessages.EMPTY_FIELDS);
      return;
    }*/
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
      </Screen>
    );
  }
}

export default connectStyle('LoginScreen', styles)(LoginScreen);
