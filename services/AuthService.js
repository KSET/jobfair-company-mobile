/* eslint-disable no-undef */
import { AsyncStorage } from 'react-native';
import Expo from 'expo';
import { DEBUG } from 'react-native-dotenv';

import { USERS_URL } from './routes';
import JobFairApiClient from './JobFairApiClient';
import LoginMutation from './auth/queries/loginMutation';

const AUTH_KEY = 'jfCardSharing-token';
const USER_KEY = 'jfCardSharing-user';

export default class AuthService {

  static async login(email, password) {
    if (DEBUG === 'true') {
      console.log('fake authentication!');
      AsyncStorage.setItem(AUTH, JSON.stringify('debug'));
      return new Promise((resolve) => {
        resolve({
          debug: true,
        });
      });
    }
    return await JobFairApiClient.mutate({
      mutation: LoginMutation,
      variables: {
        email,
        password,
      },
    }).then((result) => {
      const login = result.data.login;
      console.log('login: ', login);
      if (!login) return false;
      Expo.SecureStore.setItemAsync(AUTH_KEY, login.token);
      AsyncStorage.setItem(USER_KEY, JSON.stringify(login.user));
      return true;
    });
  }

  static async isAuthenticated() {
    const auth = await this.getAuthToken();
    return auth !== null;
  }

  static async getAuthToken() {
    return await Expo.SecureStore.getItemAsync(AUTH_KEY);
  }

  static async getAuthHeader() {
    const token = await this.getAuthToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  static redirectToLogin() {
    this.props.navigation.navigate('Login');
  }

  static logout() {
    AsyncStorage.removeItem(AUTH_KEY);
    AuthService.redirectToLogin();
  }

  static async changePassword(oldPassword, newPassword) {
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
