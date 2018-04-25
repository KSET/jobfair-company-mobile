import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { connectStyle } from '@shoutem/theme';
import { NavigationBar, Screen } from '@shoutem/ui';

import Router from '../navigation/Router';

const styles = {
  barcodescanner: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

class BarCodeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
    };
    this.hasScanned = false;
    this.onBarCodeRead = this.onBarCodeRead.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  async componentWillMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  onBarCodeRead(data) {
    if (this.hasScanned) {
      return;
    }
    this.hasScanned = true;
    this.props.navigator.replace(Router.getRoute('review', data));
  }

  goBack() {
    this.props.navigator.pop();
  }

  render() {
    const {hasCameraPermission} = this.state;
    if (hasCameraPermission === null) {
      return <View/>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Screen>
          <NavigationBar styleName="flexible" title="Scan QR code" hasHistory navigateBack={this.goBack}/>
          <View style={{flex: 1, top: 60}}>
            <BarCodeScanner
              onBarCodeRead={this.onBarCodeRead}
              style={StyleSheet.absoluteFill}
            />
          </View>
        </Screen>
      );
    }
  }
}

export default connectStyle('BarCodeScreen', styles)(BarCodeScreen);
