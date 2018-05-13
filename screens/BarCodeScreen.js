import React from 'react';
import { BarCodeScanner, Permissions } from 'expo';
import { PropTypes } from 'prop-types'
import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Left,
  Right, Text,
  Title,
} from 'native-base';
import { StyleSheet, View } from 'react-native'

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
    this.props.navigation.navigate('Review', {data})
  }

  goBack() {
    this.props.navigation.goBack()
  }

  render() {
    const {hasCameraPermission} = this.state
    return (
      <Container>
        <Header>
          <Left>
            <Button
              style={{paddingLeft: 10}}
              transparent title="Back"
              onPress={() => this.goBack()}
            >
              <Icon
                type="FontAwesome" name="angle-left"
                style={{color: 'white'}}
              />
            </Button>
          </Left>
          <Body>
          <Title>Scan QR code</Title>
          </Body>
          <Right/>
        </Header>
        <View style={{flex: 1}}>
          {
            hasCameraPermission === null ? (
              <Text>No access to camera</Text>
            ) : (
              <BarCodeScanner
                onBarCodeRead={this.onBarCodeRead}
                style={StyleSheet.absoluteFill}
              >
                <Container style={{
                  width: 200,
                  marginVertical: 150,
                  alignSelf: 'center'
                }}>
                  <Container style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 20,
                    height: 20,
                    borderTopWidth: 5,
                    borderTopColor: 'white',
                    borderLeftColor: 'white',
                    borderLeftWidth: 5
                  }}/>
                  <Container style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 20,
                    height: 20,
                    borderBottomWidth: 5,
                    borderBottomColor: 'white',
                    borderLeftColor: 'white',
                    borderLeftWidth: 5
                  }}/>
                  <Container style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 20,
                    height: 20,
                    borderTopWidth: 5,
                    borderTopColor: 'white',
                    borderRightColor: 'white',
                    borderRightWidth: 5
                  }}/>
                  <Container style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 20,
                    height: 20,
                    borderBottomWidth: 5,
                    borderBottomColor: 'white',
                    borderRightColor: 'white',
                    borderRightWidth: 5
                  }}/>
                </Container>
              </BarCodeScanner>
            )
          }
        </View>
      </Container>
    );
  }
}

BarCodeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      routeName: PropTypes.string,
    }),
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
