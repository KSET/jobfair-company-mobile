/* eslint-disable no-undef */
import { AsyncStorage } from 'react-native';
import { DEBUG } from 'react-native-dotenv';

import { LOGIN_URL, USERS_URL } from './routes';

const AUTH = '@jfCardSharing:auth';

export default class AuthService {

  async login(email, password) {
    if (DEBUG) {
      AsyncStorage.setItem(AUTH, JSON.stringify('debug'));
      return new Promise((resolve) => {
        resolve({
          debug: true,
        });
      });
    }
    return fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => response.json())
      .then((response) => {
        if ('user' in response) {
          try {
            AsyncStorage.setItem(AUTH, JSON.stringify(response.user));
          } catch (error) {
            console.log(error);
          }
        } else {
          return Promise.reject('Incorrect username or password');
        }
        return response;
      });
  }

  async isAuthenticated() {
    const auth = await this.getAuthDetails();
    return auth !== null;
  }

  async getAuthDetails() {
    const auth = await AsyncStorage.getItem(AUTH);
    return JSON.parse(auth);
  }

  async getAuthHeader() {
    const auth = await this.getAuthDetails();
    return {
      'X-User-Token': auth.auth_token,
      'X-User-Email': auth.email,
    };
  }

  static redirectToLogin() {
    this.props.navigation.navigate('Login');
  }

  static logout() {
    AsyncStorage.removeItem(AUTH);
    AuthService.redirectToLogin();
  }

  async changePassword(oldPassword, newPassword) {
    const headers = await this.getAuthHeader();

    return fetch(USERS_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({
        old_password: oldPassword,
        password: newPassword,
      }),
    });
  }
}
