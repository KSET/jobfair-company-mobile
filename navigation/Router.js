import {
  createRouter
} from '@expo/ex-navigation';

import LoginScreen from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";

const Router = createRouter(() => ({
  login: () => LoginScreen,
  home: () => HomeScreen,
}));

export default Router;
