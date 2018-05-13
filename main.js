import Expo from 'expo';
import React from 'react';
import { Root, StyleProvider } from 'native-base';
import Router from './navigation/Router';
import AuthService from './services/AuthService';
import getTheme from './native-base-theme/components';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.auth = new AuthService();
    this.state = {
      fontsAreLoaded: false,
      initialRoute: null,
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });

    const isAuthenticated = await this.auth.isAuthenticated();
    if (isAuthenticated) {
      this.setState({ initialRoute: 'home' });
    } else {
      this.setState({ initialRoute: 'login' });
    }

    this.setState({ fontsAreLoaded: true });
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return <Expo.AppLoading />;
    }

    return (
      <Root>
        <StyleProvider style={getTheme()}>
          <Router />
        </StyleProvider>
      </Root>
    );
  }
}

Expo.registerRootComponent(App);
