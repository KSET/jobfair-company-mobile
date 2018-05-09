import React from 'react';
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
  Text,
  Thumbnail,
  Title,
} from 'native-base'
import { PropTypes } from 'prop-types'
import Modal from 'react-native-modal'

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
  modal: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 100,
    padding: 25,
    backgroundColor: 'white',
    borderRadius: 10,
  },
})

export default class HomeScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      waterModalVisible: false,
    }
    this.requestWaterAction.bind(this)
  }

  requestWaterAction () {
    this.setState({waterModalVisible: true})
  }

  _toggleWaterModal = () =>
    this.setState({waterModalVisible: !this.state.waterModalVisible},
    )

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
              source={require('../assets/icons/app-qr-icon.png')}
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
                  source={require('../assets/icons/app-water-icon.png')}
                />
              </Button>
            </Col>
            <Col style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Button
                style={styles.horizontalCenter, styles.smallIcons}
                transparent
                onPress={() => this.requestWaterAction()} title="Request water"
              >
                <Thumbnail
                  style={styles.smallIcons}
                  source={require('../assets/icons/app-coffee-icon.png')}
                />
              </Button>
            </Col>
            <Col style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Button
                style={styles.horizontalCenter, styles.smallIcons}
                transparent
                onPress={() => this.requestWaterAction()} title="Request water"
              >
                <Thumbnail
                  style={styles.smallIcons}
                  source={require('../assets/icons/app-assistance-icon.png')}
                />
              </Button>
            </Col>
          </Row>
        </Grid>
        <Modal
          isVisible={this.state.waterModalVisible}
          onSwipe={this._toggleWaterModal}
          onBackdropPress={this._toggleWaterModal}
          onBackButtonPress={this._toggleWaterModal}
          swipeDirection="up"
        >
          <Container style={styles.modal}>
            <Text>How much bottles do you need?</Text>
          </Container>
        </Modal>
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
