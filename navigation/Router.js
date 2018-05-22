import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import BarCodeScreen from '../screens/BarCodeScreen';
import ReviewScreen from '../screens/ReviewScreen';

const Router = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    BarCode: {
      screen: BarCodeScreen,
    },
    Review: {
      screen: ReviewScreen,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

export default Router;
