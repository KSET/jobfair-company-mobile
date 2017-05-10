import {AsyncStorage} from 'react-native'
import {NavigationActions} from '@expo/ex-navigation'

import Router from '../navigation/Router';
import Store from '../state/Store';
import { LOGIN_URL } from "./JobFairService";

const AUTH = "@jfCardSharing:auth";

export default class AuthService {
  async login(email, password) {
    return fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
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

  redirectToLogin() {
    let navigatorUID = Store.getState().navigation.currentNavigatorUID;
    Store.dispatch(NavigationActions.push(navigatorUID, Router.getRoute('login')))
  }

  async getAuthDetails() {
    let auth = await AsyncStorage.getItem(AUTH);
    if (auth === null) {
      this.redirectToLogin();
    }
    return auth;
  }

  getAuthHeader() {
    const auth = this.getAuthDetails();
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
    this.redirectToLogin();
  }
}
