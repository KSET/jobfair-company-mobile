import React from "react";
import {
  Image,
  View,
  Screen,
  Button,
  Text,
  Row
} from '@shoutem/ui';
import {Dimensions} from 'react-native';
import { connectStyle } from '@shoutem/theme';
import SlackService from "../services/SlackService";
import Toast from 'react-native-easy-toast'

const styles = {
  container: {
    paddingTop: (Dimensions.get('window').height / 2) - 220,
    backgroundColor: 'transparent',
  },

  stackedButton: {
    'shoutem.ui.Image': {
      width: 65,
      height: 65,
    }
  }
};

export class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.slack = new SlackService();
    this.scanQR = this.scanQR.bind(this);
    this.requestCoffee = this.requestCoffee.bind(this);
    this.requestWater = this.requestWater.bind(this);
    this.requestAssistance = this.requestAssistance.bind(this);
  }

  scanQR() {
    this.props.navigator.push('barCode');
  }

  requestCoffee() {
    this.slack.requestCoffee({"name": "Five", "location": "B41", "contact": "@mpetrunic"});
    this.refs.toast.show('Your coffee will be delivered as soon as possible!');
  }

  requestWater() {
    this.slack.requestWater({"name": "Five", "location": "B41", "contact": "@mpetrunic"});
    this.refs.toast.show('Your water will be delivered as soon as possible!');
  }

  requestAssistance() {
    this.slack.requestAssistance({"name": "Five", "location": "B41", "contact": "@mpetrunic"});
    this.refs.toast.show('Your contact person will attend you as soon as possible!');

  }

  render() {
    const screen = Dimensions.get('window');

    return (
      <Screen>
        <Image
          style={{width: screen.width, height: screen.height}}
          styleName="flexible fill-parent"
          source={require('../assets/background.png')}
        />
        <View styleName="flexible" style={styles.container}>
          {this.renderHomeButtons()}
          <Toast ref="toast" position="bottom"/>
        </View>
      </Screen>
    );
  }

  renderHomeButtons() {
    const styles = this.props.style;

    return (
      <View styleName="flexible md-gutter">
        <Row style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
          <Button onPress={this.scanQR} styleName="clear">
            <Image styleName="medium-square" source={require('../assets/icons/app-qr-icon.png')} />
          </Button>
        </Row>
        <Row>
          <Button styleName="clear stacked" style={styles.stackedButton} onPress={this.requestCoffee}>
            <Image styleName="small-avatar" style={{width: 65, height: 65 }} source={require('../assets/icons/app-coffee-icon.png')} />
            <Text>Coffee</Text>
          </Button>

          <Button styleName="clear stacked" style={styles.stackedButton} onPress={this.requestWater}>
            <Image styleName="small-avatar" style={{width: 65, height: 65 }} source={require('../assets/icons/app-water-icon.png')} />
            <Text>Water</Text>
          </Button>

          <Button styleName="clear stacked" style={styles.stackedButton} onPress={this.requestAssistance}>
            <Image styleName="small-avatar" style={{width: 65, height: 65 }} source={require('../assets/icons/app-assistance-icon.png')} />
            <Text>Assistance</Text>
          </Button>
        </Row>
      </View>
    );
  }
}

export default connectStyle('HomeScreen', styles)(HomeScreen);
