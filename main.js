import Expo from 'expo';
import React from 'react';
import {Dimensions, StatusBar, Platform} from 'react-native';

import { Screen, Image, View } from '@shoutem/ui';
import { HomeScreen } from './screens/home';
import LoginScreen from "./screens/LoginScreen";

class App extends React.Component {
  state = {
    fontsAreLoaded: false,
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
        'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
        'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
        'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
        'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
        'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
        'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
        'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
        'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
        'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
        'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
        'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
    });

    this.setState({ fontsAreLoaded: true });
  }

  render() {
    if (!this.state.fontsAreLoaded) {
        return <Expo.AppLoading />;
    }

    const screen = Dimensions.get('window');
    StatusBar.setHidden(false);
    const imageMargin = Platform.OS == 'android' ? StatusBar.currentHeight : 0;

    return (
      <Screen>
        <Image
          style={{ width: screen.width, height: screen.height, marginTop: imageMargin }}
          styleName="flexible fill-parent"
          source={require('./assets/background.png')}
        />
        <LoginScreen />
      </Screen>
    );
  }
}
Expo.registerRootComponent(App);
