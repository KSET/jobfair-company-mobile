import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Body,
  Button,
  Col,
  Container,
  Grid,
  Header, Left,
  Right,
  Row,
  Thumbnail,
} from 'native-base';
import { PropTypes } from 'prop-types';
import Toast from 'react-native-root-toast';

import WaterModal from './WaterModal';
import CoffeeModal from './CoffeeModal';

const styles = StyleSheet.create({
  horizontalCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallIcons: {
    height: 80,
    width: 80,
  },
});

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      waterModalVisible: false,
      coffeeModalVisible: false,
    };
    this.requestWaterAction.bind(this);
    this.requestCoffeeAction.bind(this);
    this.scanQRCodeAction.bind(this);
    this.closeModals.bind(this);
  }

  componentDidMount() {
    const message = this.props.navigation.getParam('message');
    if (message) {
      this.props.navigation.setParams({ message: '' });
      Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    }
  }

  requestWaterAction() {
    this.setState({ waterModalVisible: true });
  }

  requestCoffeeAction() {
    this.setState({ coffeeModalVisible: true });
  }

  scanQRCodeAction() {
    this.props.navigation.navigate('BarCode');
  }

  closeModals = () => {
    this.setState({ coffeeModalVisible: false, waterModalVisible: false });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left style={{ flex: 1 }} />
          <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 200 }}>
            <Thumbnail style={{ width: 100, alignSelf: 'center' }} source={require('../../assets/jobfair-negative.png')} />
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Grid>
          <Row
            size={3}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Button
              style={{ height: 200, width: 200, alignSelf: 'center' }}
              transparent
              onPress={() => this.scanQRCodeAction()} title="Scan QR code"
            >
              <Thumbnail
                style={{ height: 200, width: 200 }}
                source={require('../../assets/icons/app-qr-icon.png')}
              />
            </Button>
          </Row>
          <Row size={1}>
            <Col style={styles.horizontalCenter}>
              <Button
                style={styles.horizontalCenter, styles.smallIcons}
                transparent
                onPress={() => this.requestWaterAction()} title="Request water"
              >
                <Thumbnail
                  style={styles.smallIcons}
                  source={require('../../assets/icons/app-water-icon.png')}
                />
              </Button>
            </Col>
            <Col
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                style={styles.horizontalCenter, styles.smallIcons}
                transparent
                onPress={() => this.requestCoffeeAction()}
                title="Request coffee"
              >
                <Thumbnail
                  style={styles.smallIcons}
                  source={require('../../assets/icons/app-coffee-icon.png')}
                />
              </Button>
            </Col>
            <Col
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                style={styles.horizontalCenter, styles.smallIcons}
                transparent
                onPress={() => this.requestWaterAction()}
                title="Request assistance"
              >
                <Thumbnail
                  style={styles.smallIcons}
                  source={require('../../assets/icons/app-assistance-icon.png')}
                />
              </Button>
            </Col>
          </Row>
        </Grid>
        <WaterModal
          isVisible={this.state.waterModalVisible}
          onClose={this.closeModals}
        />
        <CoffeeModal
          isVisible={this.state.coffeeModalVisible}
          onClose={this.closeModals}
        />
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      routeName: PropTypes.string,
    }),
    getParam: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
};