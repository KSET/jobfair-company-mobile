import React from 'react';
import { Dimensions } from 'react-native';
import Toast from 'react-native-easy-toast';

import {
  Image,
  View,
  Screen,
  Button,
  Text,
} from '@shoutem/ui';
import { connectStyle } from '@shoutem/theme';

import SlackService from '../services/SlackService';
import JobFairService from '../services/JobFairService';

const styles = {
  container: {
    paddingTop: (Dimensions.get('window').height / 2) - 220,
    backgroundColor: 'transparent',
  },

  stackedButton: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  icon: {
    width: 65,
    height: 65,
  },
};

export class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.slack = new SlackService();
    this.scanQR = this.scanQR.bind(this);
    this.requestCoffee = this.requestCoffee.bind(this);
    this.requestWater = this.requestWater.bind(this);
    this.requestAssistance = this.requestAssistance.bind(this);
    const jfService = new JobFairService();
    const self = this;
    jfService.getCompanyDetails().then(
      (response) => {
        response.json();
      },
    ).then(
      (response) => {
        self.company = response;
      });
  }

  scanQR() {
    this.props.navigator.push('barCode');
  }

  requestCoffee() {
    this.slack.requestCoffee({ name: this.company.name, location: this.company.location, contact: this.company.contact });
    this.refs.toast.show('Your coffee will be delivered as soon as possible!');
  }

  requestWater() {
    this.slack.requestWater({ name: this.company.name, location: this.company.location, contact: this.company.contact });
    this.refs.toast.show('Your water will be delivered as soon as possible!');
  }

  requestAssistance() {
    this.slack.requestAssistance({ name: this.company.name, location: this.company.location, contact: this.company.contact });
    this.refs.toast.show('Your contact person will attend you as soon as possible!');
  }

  render() {
    const screen = Dimensions.get('window');

    return (
      <Screen>
        <Image
          style={{ width: screen.width, height: screen.height }}
          styleName="flexible fill-parent"
          source={require('../assets/background.png')}
        />
        <View styleName="flexible" style={styles.container}>
          {this.renderHomeButtons()}
          <Toast ref="toast" position="bottom" />
        </View>
      </Screen>
    );
  }

  renderHomeButtons() {
    const styles = this.props.style;

    return (
      <View styleName="flexible md-gutter space-between">
        <View styleName="horizontal h-center xl-gutter-top">
          <Button style={styles.stackedButton} onPress={this.scanQR} styleName="clear">
            <Image styleName="medium-square" source={require('../assets/icons/app-qr-icon.png')} />
            <Text>Scan QR</Text>
          </Button>
        </View>

        <View styleName="horizontal h-center">
          <Button styleName="clear" style={styles.stackedButton} onPress={this.requestCoffee}>
            <Image style={styles.icon} source={require('../assets/icons/app-coffee-icon.png')} />
            <Text>Coffee</Text>
          </Button>

          <Button styleName="clear" style={styles.stackedButton} onPress={this.requestWater}>
            <Image style={styles.icon} source={require('../assets/icons/app-water-icon.png')} />
            <Text>Water</Text>
          </Button>

          <Button styleName="clear" style={styles.stackedButton} onPress={this.requestAssistance}>
            <Image style={styles.icon} source={require('../assets/icons/app-assistance-icon.png')} />
            <Text>Assistance</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default connectStyle('HomeScreen', styles)(HomeScreen);
