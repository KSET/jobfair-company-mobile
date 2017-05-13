import Expo from 'expo';
import React from 'react';
import { NavigationProvider, StackNavigation } from '@expo/ex-navigation/src/ExNavigation';

import Store from './state/Store';
import Router from './navigation/Router';
import NavigationContext from '@expo/ex-navigation/src/ExNavigationContext';
import AuthService from './services/AuthService'

const navigationContext = new NavigationContext({
  router: Router,
  store: Store,
});

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
    this.auth = new AuthService();
    const isAuthenticated = await this.auth.isAuthenticated();
    if (isAuthenticated) {
      this.initialRoute = 'home';
    } else {
      this.initialRoute = 'login';
    }
    this.setState({ fontsAreLoaded: true });
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return <Expo.AppLoading />;
    }

    return (
      <NavigationProvider router={Router} context={navigationContext}>
        <StackNavigation initialRoute={Router.getRoute(this.initialRoute)} />
      </NavigationProvider>
    );
  }
}
Expo.registerRootComponent(App);
