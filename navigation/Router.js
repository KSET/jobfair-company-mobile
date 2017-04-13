import {
  createRouter
} from '@expo/ex-navigation';

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import BarCodeScreen from "../screens/BarCodeScreen";

const Router = createRouter(() => ({
  login: () => LoginScreen,
  home: () => HomeScreen,
  barCode: () => BarCodeScreen
}));

export default Router;
