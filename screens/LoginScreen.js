import React from 'react';
import {StyleSheet} from 'react-native';
import {
  View,
  Divider,
  TextInput,
  Button,
  Text,
  TouchableOpacity
} from '@shoutem/ui';
import {NavigationBar} from "@shoutem/ui/navigation/NavigationBar";


const styles = StyleSheet.create({});

export class LoginScreen extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity>
          <Text>LOG IN</Text>
        </TouchableOpacity>
        {this.renderLoginComponent()}
        <Divider />
      </View>
    );
  }

  renderLoginComponent() {
    return (
      <View>
        <Divider />
        <Divider styleName="line"/>
        <TextInput
          placeholder="Username or Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          keyboardAppearance="dark"
          returnKeyType="done"
        />
        <Divider styleName="line"/>
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardAppearance="dark"
          secureTextEntry
          returnKeyType="done"
        />
        <Divider styleName="line"/>
        <Divider />
        <Button
          styleName="full-width inflexible"
          onPress={this.performLogin}
        >
          <Text>LOG IN</Text>
        </Button>
      </View>
    );
  }
}
