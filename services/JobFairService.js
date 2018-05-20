import { AsyncStorage } from 'react-native';

const USER_KEY = '@jf-company:user';

export default class JobFairService {

  static async storeUser(user) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  static async getUser() {
    return await AsyncStorage.getItem(USER_KEY);
  }

  static async removeUser() {
    await AsyncStorage.removeItem(USER_KEY);
  }

  static async getUserCompany() {
    const user = await this.getUser();
    if (!user) return null;
    return user.companies[0];
  }

}
