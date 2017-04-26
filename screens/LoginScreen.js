import React from 'react';
import {Dimensions, Alert} from 'react-native';

import {
  View,
  Divider,
  TextInput,
  Button,
  Text,
} from '@shoutem/ui';
import { connectStyle } from '@shoutem/theme';

const styles = {
  container: {
    paddingTop: (Dimensions.get('window').height / 2) - 220,
    backgroundColor: 'transparent',
  },

  button: {
    backgroundColor: '#000022',
    /*'shoutem.ui.Text': {
      color: "#FFFFFF",
    }*/
  },

  buttonText: {
    color: "#FFFFFF",
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

    /*if (_.isEmpty(username) || _.isEmpty(password)) {
      Alert.alert('Error', errorMessages.EMPTY_FIELDS);
      return;
    }*/
  }

  renderLoginComponent() {
    const styles = this.props.style;
    const { handleSubmit, submitting } = this.props;

    return (
      <View styleName="flexible md-gutter">
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="done"
          onChangeText={email => this.setState({ email })}
        />

        <Divider styleName="line"/>

        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          returnKeyType="done"
          onChangeText={password => this.setState({ password })}
        />

        <Divider styleName="line"/>
        <Divider />

        <Button
          title="Log in"
          styleName="full-width inflexible"
          style={styles.button}
          onPress={this.performLogin}
        >
          <Text style={styles.buttonText}>LOG IN</Text>
        </Button>
      </View>
    );
  }

  render() {
    const styles = this.props.style;

    return (
      <View styleName="flexible" style={styles.container}>
        {this.renderLoginComponent()}
      </View>
    );
  }
}

export default connectStyle('LoginScreen', styles)(LoginScreen);
