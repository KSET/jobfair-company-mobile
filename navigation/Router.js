import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import HomeContainer from '../screens/HomeContainer'

const Router = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Home: {
      screen: HomeContainer,
    },
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
