import React from "react";
import {Image} from "@shoutem/ui/components/Image";
import {View} from "@shoutem/ui/components/View";
import {Screen} from "@shoutem/ui/components/Screen";
import {Button} from "@shoutem/ui/components/Button";
import {Dimensions} from 'react-native';
import {Text} from "@shoutem/ui/components/Text";
import { connectStyle } from '@shoutem/theme';
import {Row} from "@shoutem/ui/components/Row";
import SlackService from "../services/SlackService";
import Toast, {DURATION} from 'react-native-easy-toast'

const styles = {

  fillParent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  container: {
    paddingTop: (Dimensions.get('window').height / 2) - 220,
    backgroundColor: 'transparent',
  },

  input: {
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

    return (
      <View styleName="flexible md-gutter">
        <Row style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
          <Button onPress={this.scanQR} styleName="clear">
            <Image styleName="medium-square" source={require('../assets/icons/app-qr-icon.png')} />
          </Button>
        </Row>
        <Row>
          <Button styleName="clear stacked" onPress={this.requestCoffee}>
            <Image styleName="small-avatar" style={{height: 65, width:65}} source={require('../assets/icons/app-coffee-icon.png')} />
            <Text>Coffee</Text>
          </Button>
          <Button styleName="clear stacked" onPress={this.requestWater}>
            <Image styleName="small-avatar" style={{height: 65, width:65}} source={require('../assets/icons/app-water-icon.png')} />
            <Text>Water</Text>
          </Button>
          <Button styleName="clear stacked" onPress={this.requestAssistance}>
            <Image styleName="small-avatar" style={{height: 65, width:65}} source={require('../assets/icons/app-assistance-icon.png')} />
            <Text>Assistance</Text>
          </Button>
        </Row>
      </View>
    );
  }
}

export default connectStyle('HomeScreen', styles)(HomeScreen);
