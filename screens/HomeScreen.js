import React from 'react';
import { Body, Container, Header, Right, Title, Grid, Col, Row, Thumbnail } from 'native-base'
import { PropTypes } from 'prop-types'

export default class HomeScreen extends React.Component {

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
          <Row size={3} style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Thumbnail
              style={{height: 200, width: 200}}
              source={require('../assets/icons/app-qr-icon.png')}
            />
          </Row>
          <Row size={1}>
            <Col style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Thumbnail
                style={{height: 80, width: 80}}
                source={require('../assets/icons/app-water-icon.png')}
              />
            </Col>
            <Col style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Thumbnail
                style={{height: 80, width: 80}}
                source={require('../assets/icons/app-coffee-icon.png')}
              />
            </Col>
            <Col style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Thumbnail
                style={{height: 80, width: 80}}
                source={require('../assets/icons/app-assistance-icon.png')}
              />
            </Col>
          </Row>
        </Grid>
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
