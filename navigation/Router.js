import {
  createRouter
} from '@expo/ex-navigation';

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import BarCodeScreen from "../screens/BarCodeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ChangePasswordScreen from "../screens/settings/ChangePasswordScreen";

const Router = createRouter(() => ({
  login: () => LoginScreen,
  home: () => HomeScreen,
  barCode: () => BarCodeScreen,
  settings: () => SettingsScreen,
  changePassword: () => ChangePasswordScreen,
}));

export default Router;
