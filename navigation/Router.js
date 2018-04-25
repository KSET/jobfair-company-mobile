import { StackNavigator } from 'react-navigation';
import { Body, Header, Text } from 'native-base';
import { React } from 'react-native';
import LoginScreen from '../screens/LoginScreen';

const Router = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    // Home: {
    //   screen: HomeContainer,
    // },
    // BarCode: {
    //   screen: BarCodeScreen,
    // },
    // ChangePassword: {
    //   screen: ChangePasswordScreen,
    // },
    // Review: {
    //   screen: ReviewScreen,
    // },
    // Settngs: {
    //   screen: SettingsScreen,
    // },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

export default Router;
