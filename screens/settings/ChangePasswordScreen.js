import React from 'react';
import Toast from 'react-native-easy-toast';
import { NavigationExperimental, Platform } from 'react-native';
import { connectStyle } from '@shoutem/theme';
import {
  NavigationBar,
  View,
  Divider,
  TextInput,
  Button,
  Text,
} from '@shoutem/ui';

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
      password: '',
      repeatPassword: '',
    };

    this.onPress = this.onPress.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  onPress() {
    const { password, repeatPassword } = this.state;

    if (password === "") {
      this.refs.toast.show('Enter password.');
      return false;
    } else if (password !== repeatPassword) {
      this.refs.toast.show('Fields are not equal.');
      return false;
    }
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
