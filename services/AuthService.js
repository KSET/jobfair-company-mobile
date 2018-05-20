/* eslint-disable no-undef */
import Expo from 'expo';
import { DEBUG } from 'react-native-dotenv';
import JobFairApiClient from './JobFairApiClient';
import LoginMutation from './auth/queries/loginMutation';
import JobFairService from './JobFairService';

const AUTH_KEY = 'jfCardSharing-token';

export default class AuthService {

  static async login(email, password) {
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
      JobFairService.storeUser(login.user);
      return true;
    });
  }

  static async isAuthenticated() {
    const auth = await this.getAuthToken();
    console.log('Auth token: ', auth);
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

  static async logout() {
    await Expo.SecureStore.deleteItemAsync(AUTH_KEY);
    await JobFairService.removeUser();
  }

}
