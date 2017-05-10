import {AsyncStorage} from 'react-native'
import JobFairService from "./JobFairService";
import Store from '../state/Store';
import {NavigationActions} from '@expo/ex-navigation'
import {Router} from '../navigation/Router'

const AUTH = "@jfCardSharing:auth";

export default class AuthService {

  constructor() {
    this.jfService = new JobFairService();
  }

  async login(email, password) {
    return this.jfService.login(email, password)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if ('user' in response) {
          try {
            AsyncStorage.setItem(AUTH, JSON.stringify(response.user));
          } catch (error) {
          }
        } else {
          return Promise.reject("Incorrect username or password");
        }
          return response;
      });
  }

  async getAuthDetails() {
    let auth = await AsyncStorage.getItem(AUTH);
    if (auth === null) {
      AuthService.redirectToLogin();
    }
    return auth;
  }

  async getAuthHeader() {
    let auth = this.getAuthDetails();
    return {
      "X-Auth-Token": auth["auth_token"],
      "X-User-Email": auth.email
    };
  }

  async getToken() {
    let auth = await this.getAuthDetails();
    return auth.auth_token;
  }

  async getUser() {
    let auth = await this.getAuthDetails();
    return auth.email;
  }

  async getCompany() {
    let auth = await this.getAuthDetails();
    return auth.company;
  }

  static logout() {
    AsyncStorage.removeItem(AUTH);
    AuthService.redirectToLogin();
  }

  static redirectToLogin() {
    let navigatorUID = Store.getState().navigation.currentNavigatorUID;
    Store.dispatch(NavigationActions.push(navigatorUID, Router.getRoute('login')))
  }
}
