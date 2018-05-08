import React from 'react';
import { Body, Container, Content, Header, Right, Title, Text } from 'native-base'
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
        <Content>
          <Text>Home</Text>
        </Content>
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
}
