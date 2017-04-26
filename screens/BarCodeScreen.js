import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Expo, { BarCodeScanner, Permissions } from 'expo';
import { connectStyle } from '@shoutem/theme';

const styles = {
  
};

export class BarCodeScreen extends React.Component {
  state = {
    hasCameraPermission: null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
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
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }

  _handleBarCodeRead = (data) => {
    alert(JSON.stringify(data));
  }
}

export default connectStyle('BarCodeScreen', styles)(BarCodeScreen);
