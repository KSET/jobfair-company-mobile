import React from 'react';
import {Dimensions} from 'react-native';
import {
  View,
  Divider,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  Title,
  Screen,
  ScrollView
} from '@shoutem/ui';
import { connectStyle } from '@shoutem/theme';
import {NavigationExperimental} from "react-native";
import {Image} from "@shoutem/ui/components/Image";

const styles = {
  navigationBarOffset: {
    paddingTop: NavigationExperimental.Header.HEIGHT,
  },

  fillParent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  container: {
    paddingTop: (Dimensions.get('window').height / 2) - 220,
    backgroundColor: 'transparent',
  },

  input: {
  }
};

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.performLogin = this.performLogin.bind(this);
  }

  performLogin() {

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
          style={styles.input}
        />

        <Divider styleName="line"/>

        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardAppearance="dark"
          secureTextEntry
          returnKeyType="done"
          style={styles.input}
        />

        <Divider styleName="line"/>
        <Divider />

        <Button
          title="Log in"
          styleName="full-width inflexible"
          onPress={this.performLogin}
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
          style={{ width: screen.width, height: screen.height }}
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
