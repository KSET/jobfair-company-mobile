import React from 'react';
import { NavigationExperimental, Keyboard } from 'react-native';
import Toast from 'react-native-easy-toast'
import { connectStyle } from '@shoutem/theme';
import {
  NavigationBar,
  View,
  Screen,
  TextInput,
  Divider,
  Button,
  Text,
  Row,
  Icon,
} from '@shoutem/ui';

import JobFairService  from '../services/JobFairService';

const styles = {
  container: {
    marginTop: NavigationExperimental.Header.HEIGHT,
  },

  button: {
    backgroundColor: '#000022',
    'shoutem.ui.Text': {
      color: "#FFFFFF",
    },
  },
};

class ReviewScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: '',
    };

    this.onPress = this.onPress.bind(this);
    this.goBack = this.goBack.bind(this);
    this.jobFairService = new JobFairService();
  }

  onPress() {
    const { uid } = this.props.data;
    const { note } = this.state;

    Keyboard.dismiss();

    this.jobFairService.sendReview(uid, note)
      .then((response) => {
        this.refs.toast.show('Note successfully saved.');
        this.props.navigator.push('home');
      })
      .catch((error) => {
        this.refs.toast.show('Error occurred.');
      }).done();
  }

  goBack() {
    this.props.navigator.pop();
  }

  render() {
    const { style, data } = this.props;
    const { 'first_name': firstName, 'last_name': lastName, uid } = JSON.parse(data);

    return (
      <Screen>
        <NavigationBar styleName="flexible" title="Review" hasHistory navigateBack={this.goBack} />

        <View style={style.container}>
          <View>
            <Row styleName="small">
              <Icon name="user-profile" />
              <Text>{firstName} {lastName}</Text>
            </Row>
          </View>

          <View>
            <TextInput
              placeholder="Write a note..."
              keyboardAppearance="dark"
              returnKeyType="done"
              multiline={true}
              numberOfLines={4}
              onChangeText={note => this.setState({ note })}
            />

            <Divider styleName="line"/>
            <Divider />

            <Button
              title="Leave note"
              styleName="full-width inflexible"
              onPress={this.onPress}
              style={style.button}
            >
              <Text>LEAVE NOTE</Text>
            </Button>
          </View>
        </View>
        <Toast ref="toast" position="bottom"/>
      </Screen>
    )
  }
}

export default connectStyle('ReviewScreen', styles)(ReviewScreen);
