import React from 'react';
import Toast from 'react-native-easy-toast';
import { NavigationExperimental, Platform, Keyboard } from 'react-native';
import { connectStyle } from '@shoutem/theme';
import {
  NavigationBar,
  View,
  Divider,
  TextInput,
  Button,
  Text,
} from '@shoutem/ui';

import AuthService from "../../services/AuthService";

const styles = {
  button: {
    backgroundColor: '#000022',
    'shoutem.ui.Text': {
      color: "#FFFFFF",
    }
  },

  container: {
    marginTop: (Platform.OS === 'android') ? 20 : 0,
  },

  formContainer: {
    marginTop: NavigationExperimental.Header.HEIGHT,
  },
};

class ChangePasswordScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      password: '',
      repeatPassword: '',
    };

    this.authService = new AuthService();
    this.onPress = this.onPress.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  onPress() {
    const { oldPassword, password, repeatPassword } = this.state;
    Keyboard.dismiss();

    if (!!oldPassword || !!password) {
      this.refs.toast.show('Enter password.');
      return false;
    } else if (password !== repeatPassword) {
      this.refs.toast.show('Fields are not equal.');
      return false;
    }

    this.authService.changePassword(oldPassword, password)
      .then((response) => {
        console.log(response);
        this.refs.toast.show('Password successfully updated.');
        this.props.navigator.push('home');
      })
      .catch((error) => {
      console.log(error);
        this.refs.toast.show('Error occurred.');
      }).done();
  }

  goBack() {
    this.props.navigator.pop();
  }

  render() {
    const styles = this.props.style;

    return (
      <View style={styles.container}>
        <NavigationBar styleName="flexible" title="Set password" hasHistory navigateBack={this.goBack} />

        <View style={styles.formContainer}>
          <TextInput
            placeholder="Old Password"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardAppearance="dark"
            secureTextEntry
            returnKeyType="done"
            onChangeText={oldPassword => this.setState({ oldPassword })}
          />

          <Divider styleName="line" />

          <TextInput
            placeholder="New Password"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardAppearance="dark"
            secureTextEntry
            returnKeyType="done"
            onChangeText={password => this.setState({ password })}
          />

          <Divider styleName="line" />

          <TextInput
            placeholder="Repeat Password"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardAppearance="dark"
            secureTextEntry
            returnKeyType="done"
            onChangeText={repeatPassword => this.setState({ repeatPassword })}
          />

          <Divider styleName="line" />
          <Divider />

          <Button
            title="Change"
            styleName="full-width inflexible"
            onPress={this.onPress}
            style={styles.button}
          >
            <Text>SUBMIT</Text>
          </Button>

          <Toast ref="toast" position="bottom"/>
        </View>
      </View>
    )
  }
}

export default connectStyle('ChangePasswordScreen', styles)(ChangePasswordScreen);
