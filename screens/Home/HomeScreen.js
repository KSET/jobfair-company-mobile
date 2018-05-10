import React from 'react'
import { StyleSheet } from 'react-native'
import {
  Body,
  Button,
  Col,
  Container,
  Grid,
  Header,
  Right,
  Row,
  Thumbnail,
  Title,
} from 'native-base';
import { PropTypes } from 'prop-types'
import WaterModal from './WaterModal'
import CoffeeModal from './CoffeeModal'

const styles = StyleSheet.create({
  verticalCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
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

  constructor (props) {
    super(props)
    this.state = {
      waterModalVisible: false,
      coffeeModalVisible: false,
    };
    this.requestWaterAction.bind(this)
    this.requestCoffeeAction.bind(this)
    this.closeModals.bind(this)
  }

  requestWaterAction () {
    this.setState({waterModalVisible: true})
  }

  requestCoffeeAction () {
    this.setState({coffeeModalVisible: true})
  }

  closeModals = () => {
    this.setState({coffeeModalVisible: false, waterModalVisible: false})
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
          <Title>{this.props.navigation.state.routeName}</Title>
          </Body>
          <Right/>
        </Header>
        <Grid>
          <Row size={3} style={styles.verticalCenter}>
            <Thumbnail
              style={{height: 200, width: 200}}
              source={require('../../assets/icons/app-qr-icon.png')}
            />
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
        <WaterModal isVisible={this.state.waterModalVisible}
                    onClose={this.closeModals}/>
        <CoffeeModal isVisible={this.state.coffeeModalVisible}
                     onClose={this.closeModals}/>
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
  }).isRequired,
};
