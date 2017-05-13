import React from 'react';
import { Dimensions } from "react-native";
import {
  Screen,
  Image,
  NavigationBar,
  TouchableOpacity,
} from "@shoutem/ui";
import { Entypo } from '@expo/vector-icons';
import HomeScreen from "./HomeScreen";
import {SideMenu} from "../components/SideMenu";
import {connectStyle} from "@shoutem/theme";

class HomeContainer extends React.Component {
  constructor(props){
    super(props);

    this.onPress = this.onPress.bind(this);
    this.onSideMenuChange = this.onSideMenuChange.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  onPress() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onSideMenuChange (isOpen) {
    this.setState({ isOpen });
  }

  renderRightComponent() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Entypo name="menu" size={24} color="white" />
      </TouchableOpacity>
    )
  }

  render() {
    const screen = Dimensions.get('window');

    return (
      <SideMenu
        isOpen={this.state.isOpen}
        onSideMenuChange={this.onSideMenuChange}
        navigator={this.props.navigator}
      >
        <Screen>
          <Image
            style={{ width: screen.width, height: screen.height }}
            styleName="flexible fill-parent"
            source={require('../assets/background.png')}
          />

          <NavigationBar
            styleName="clear"
            style={{ zIndex: 999 }}
            rightComponent={this.renderRightComponent()}
          />

          <HomeScreen navigator={this.props.navigator} />
        </Screen>
      </SideMenu>
    );
  }
}

export default connectStyle('HomeContainer', {})(HomeContainer);
