import React from 'react';
import Toast from 'react-native-easy-toast';
import {NavigationExperimental} from 'react-native';
import { connectStyle } from '@shoutem/theme';
import {
  Screen,
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
    marginTop: NavigationExperimental.Header.HEIGHT,
  }
};

class ChangePasswordScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      repeatPassword: '',
    }
    
    this.onPress = this.onPress.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  onPress() {
    const { password, repeatPassword } = this.state;

    if (password !== repeatPassword) {
      this.refs.toast.show('Fields are not equal.');
      return;
    }
  }

  goBack() {
    this.props.navigator.pop();
  }

  render() {
    const styles = this.props.style;

    return (
      <Screen>
        <NavigationBar styleName="flexible" title="Settings" hasHistory navigateBack={this.goBack} />

        <View style={styles.container}>
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
            <Text>CHANGE</Text>
          </Button>

          <Toast ref="toast" position="bottom"/>
        </View>
      </Screen>
    )
  }
}

export default connectStyle('ChangePasswordScreen', styles)(ChangePasswordScreen);
