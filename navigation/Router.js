import {
  createRouter
} from '@expo/ex-navigation';

import LoginScreen from "../screens/LoginScreen";
import HomeContainer from "../screens/HomeContainer";
import BarCodeScreen from "../screens/BarCodeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ChangePasswordScreen from "../screens/settings/ChangePasswordScreen";
import ReviewScreen from "../screens/ReviewScreen";

const Router = createRouter(() => ({
  login: () => LoginScreen,
  home: () => HomeContainer,
  barCode: () => BarCodeScreen,
  settings: () => SettingsScreen,
  changePassword: () => ChangePasswordScreen,
  review: () => ReviewScreen,
}));

export default Router;
