import React from "react";
import {Image} from "@shoutem/ui/components/Image";
import {View} from "@shoutem/ui/components/View";
import {Screen} from "@shoutem/ui/components/Screen";
import {Button} from "@shoutem/ui/components/Button";
import {Dimensions} from 'react-native';
import {Text} from "@shoutem/ui/components/Text";
import { connectStyle } from '@shoutem/theme';
import {Row} from "@shoutem/ui/components/Row";

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
    this.scanQR = this.scanQR.bind(this);
  }

  scanQR() {
    this.props.navigator.push('barCode');
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
        </View>
      </Screen>
    );
  }

  renderHomeButtons() {

    return (
      <View styleName="flexible md-gutter">
        <Row style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
          <Button styleName="clear">
            <Image styleName="medium-square" source={require('../assets/icons/app-qr-icon.png')} />
          </Button>
        </Row>
        <Row>
          <Button styleName="clear stacked">
            <Image styleName="small-avatar" style={{height: 65, width:65}} source={require('../assets/icons/app-coffee-icon.png')} />
            <Text>Coffee</Text>
          </Button>
          <Button styleName="clear stacked">
            <Image styleName="small-avatar" style={{height: 65, width:65}} source={require('../assets/icons/app-water-icon.png')} />
            <Text>Water</Text>
          </Button>
          <Button styleName="clear stacked">
            <Image styleName="small-avatar" style={{height: 65, width:65}} source={require('../assets/icons/app-assistance-icon.png')} />
            <Text>Assistance</Text>
          </Button>
        </Row>
      </View>
    );
  }
}

export default connectStyle('HomeScreen', styles)(HomeScreen);
