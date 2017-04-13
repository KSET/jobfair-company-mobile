import React from "react";
import {Image} from "@shoutem/ui/components/Image";
import {View} from "@shoutem/ui/components/View";
import {Screen} from "@shoutem/ui/components/Screen";
import {Button} from "@shoutem/ui/components/Button";
import {Dimensions} from 'react-native';
import {Text} from "@shoutem/ui/components/Text";
import { connectStyle } from '@shoutem/theme';

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
        <Button
          title="Scan QR code"
          styleName="full-width inflexible"
        >
          <Text>Scan QR code</Text>
        </Button>
        <Button
          title="Coffee"
          styleName="full-width inflexible"
        >
          <Text>Coffee</Text>
        </Button>
        <Button
          title="Call help"
          styleName="full-width inflexible"
        >
          <Text>Call help</Text>
        </Button>
      </View>
    );
  }
}

export default connectStyle('HomeScreen', styles)(HomeScreen);
