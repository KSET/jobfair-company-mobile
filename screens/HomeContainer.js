import React from 'react';
import { Body, Container, Header, Right, Title, Grid, Col, Row, Thumbnail } from 'native-base'
import { PropTypes } from 'prop-types'

export default class HomeContainer extends React.Component {

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
            <Col style={{backgroundColor: '#b7000e'}}/>
            <Col style={{backgroundColor: '#b7000e'}}/>
            <Col style={{backgroundColor: '#b7000e'}}/>
          </Row>
        </Grid>
      </Container>
    );
  }
}

HomeContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      routeName: PropTypes.string,
    }),
  }).isRequired,
};
