import React from 'react';
import {
  Body,
  Button,
  Container,
  Form,
  Header,
  Icon,
  Label,
  Left,
  Right,
  Text,
  Textarea,
  Title,
} from 'native-base';
import { PropTypes } from 'prop-types';
import StarRating from 'react-native-star-rating';

export default class ReviewScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: '',
      intelligent: 0,
      likeable: 0,
    };

    this.goBack = this.goBack.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  submitReview() {
    this.props.navigation.navigate('Home', { message: 'Successfully submitted review!' });
  }

  render() {
    const { data } = this.props.navigation.getParam('data');
    const { first_name: firstName, last_name: lastName } = JSON.parse(data);

    return (
      <Container>
        <Header>
          <Left>
            <Button
              style={{ paddingLeft: 10 }}
              transparent title="Back"
              onPress={() => this.goBack()}
            >
              <Icon
                type="FontAwesome" name="angle-left"
                style={{ color: 'white' }}
              />
            </Button>
          </Left>
          <Body>
            <Title>Review</Title>
          </Body>
          <Right />
        </Header>
        <Container style={{ justifyContent: 'space-between', padding: 20 }}>
          <Text>Student: {firstName} {lastName}</Text>
          <Label>Likeable:</Label>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.likeable}
            emptyStarColor="#191938"
            fullStarColor="#191938"
            selectedStar={likeable => this.setState({ likeable })}
          />
          <Label>Intelligent:</Label>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.intelligent}
            emptyStarColor="#191938"
            fullStarColor="#191938"
            selectedStar={intelligent => this.setState({ intelligent })}
          />
          <Form style={{ width: '100%' }}>
            <Textarea
              style={{ width: '100%' }} rowSpan={5} bordered
              placeholder="Note"
            />
          </Form>
          <Button
            title="Submit review"
            onPress={() => this.submitReview()} block
          >
            <Text>Submit review</Text>
          </Button>
        </Container>
      </Container>
    );
  }
}

ReviewScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      routeName: PropTypes.string,
    }),
    goBack: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
