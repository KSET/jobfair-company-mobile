import React from 'react';
import { connectStyle } from '@shoutem/theme';
import { NavigationExperimental, Platform } from 'react-native';
import {
  NavigationBar,
  View,
  Screen,
  Row,
  Icon,
  Text,
  TouchableOpacity,
} from '@shoutem/ui';

const styles = {
  container: {
    marginTop: NavigationExperimental.Header.HEIGHT,
  },

  'shoutem.ui.Screen': {
    marginTop: (Platform.OS === 'android') ? 20 : 0,
  },
};


class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  onPress() {
    this.props.navigator.push('changePassword');
  }

  goBack() {
    this.props.navigator.pop();
  }

  render() {
    const styles = this.props.style;

    return (
      <Screen>
        <NavigationBar title="Settings" hasHistory navigateBack={this.goBack} />

        <View style={styles.container}>
          <TouchableOpacity onPress={this.onPress}>
            <Row styleName="small">
              <Text>Change Password</Text>
              <Icon styleName="disclosure" name="right-arrow" />
            </Row>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }
}

export default connectStyle('SettingsScreen', styles)(SettingsScreen);
