import Expo, { AppLoading, Asset } from 'expo';
import React from 'react';
import Image from 'react-native';
import { Drawer, Root, StyleProvider } from 'native-base';
import Sentry from '@mpetrunic/sentry-expo';
import { ApolloProvider } from 'react-apollo';
import Router from './navigation/Router';
import getTheme from './native-base-theme/components';
import Sidebar from './screens/Home/SideBar';
import JobFairApiClient from './services/JobFairApiClient';

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = false;

Sentry.config('https://290322b7e0554cce9b783cad053e633e@sentry.io/1207215').install();

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      initialRoute: null,
    };
  }

  async initApp() {
    this.setState({ isReady: true });
  }

  async loadAssets() {
    const imageAssets = cacheImages([
      require('./assets/jobfair.png'),
      require('./assets/jobfair-negative.png'),
      require('./assets/icons/app-water-icon.png'),
      require('./assets/icons/app-qr-icon.png'),
      require('./assets/icons/app-assistance-icon.png'),
      require('./assets/icons/app-coffee-icon.png'),
    ]);
    await Promise.all([...imageAssets]);
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
          <ApolloProvider client={JobFairApiClient}>
            <Router />
          </ApolloProvider>
        </StyleProvider>
      </Root>
    );
  }
}

Expo.registerRootComponent(App);
