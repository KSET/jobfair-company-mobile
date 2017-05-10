import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { connectStyle } from '@shoutem/theme';

import Router from '../navigation/Router';

const styles = {

};

export class BarCodeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
    };

    this.onBarCodeRead = this.onBarCodeRead.bind(this);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  onBarCodeRead(data) {
    this.props.navigator.push(Router.getRoute('review', data));
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{flex: 1}}>
          <BarCodeScanner
            onBarCodeRead={this.onBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }
}

export default connectStyle('BarCodeScreen', styles)(BarCodeScreen);
