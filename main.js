import Expo, { AppLoading } from 'expo';
import React from 'react';
import { Root, StyleProvider } from 'native-base';
import Sentry from '@mpetrunic/sentry-expo';
import Router from './navigation/Router';
import AuthService from './services/AuthService';
import getTheme from './native-base-theme/components';

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = true;

Sentry.config('https://290322b7e0554cce9b783cad053e633e@sentry.io/1207215').install();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.auth = new AuthService();
    this.state = {
      isReady: false,
      initialRoute: null,
    };
  }

  async initApp() {
    const isAuthenticated = await this.auth.isAuthenticated();
    if (isAuthenticated) {
      this.setState({ initialRoute: 'home' });
    } else {
      this.setState({ initialRoute: 'login' });
    }
    this.setState({ isReady: true });
  }

  async loadAssets() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
  }

  render() {
    if (!this.state.isReady) {
      return (<AppLoading
        startAsync={this.loadAssets}
        onFinish={() => this.initApp()}
        onError={console.warn}
      />);
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
