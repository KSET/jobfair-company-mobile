import React from 'react';
import { BarCodeScanner, Permissions } from 'expo';
import { PropTypes } from 'prop-types'
import {
  Body, Button,
  Container,
  Content,
  Header, Icon, Left,
  Right,
  Title,
} from 'native-base'
import { View, StyleSheet } from 'react-native'

export default class BarCodeScreen extends React.Component {
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
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({hasCameraPermission: status === 'granted'})
  }

  onBarCodeRead(data) {
    if (this.hasScanned) {
      return;
    }
    this.hasScanned = true;
    console.log('scanned', data)
    // this.props.navigator.replace(Router.getRoute('review', data));
  }

  goBack() {
    this.props.navigation.goBack()
  }

  render() {
    const {hasCameraPermission} = this.state
    if (hasCameraPermission === null) {
      return <View/>
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <Container>
        <Header>
          <Left>
            <Button
              style={{paddingLeft: 10}}
              transparent title="Back"
              onPress={() => this.goBack()}
            >
              <Icon type="FontAwesome" name="angle-left"
                    style={{color: 'white'}}/>
            </Button>
          </Left>
          <Body>
          <Title>Scan QR code</Title>
          </Body>
          <Right/>
        </Header>
        <View style={{flex: 1}}>
          <BarCodeScanner
            onBarCodeRead={this.onBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      </Container>
    )
  }
}

BarCodeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      routeName: PropTypes.string,
    }),
  }).isRequired,
}
