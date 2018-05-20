import { AsyncStorage } from 'react-native';
import JobFairApiClient from './JobFairApiClient';
import CompanyManagersQuery from './queries/companyManagerQuery';

const USER_KEY = '@jf-company:user';
const MANAGERS_KEY = '@jf-company:managers';

export default class JobFairService {

  static async storeUser(user) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    await this.storeManagers(await this.getUserCompany());
  }

  static async getUser() {
    return JSON.parse(await AsyncStorage.getItem(USER_KEY));
  }

  static async removeUser() {
    try {
      await AsyncStorage.removeItem(USER_KEY);
      await AsyncStorage.removeItem(MANAGERS_KEY);
    } catch (e) {
      console.log(e);
    }
  }

  static async storeManagers(company) {
    const id = company.id;
    console.log(`SToring managers for company: ${id}`);
    return await JobFairApiClient.query({
      query: CompanyManagersQuery,
      variables: {
        id,
      },
    }).then((result) => {
      const managers = result.data.company.managers;
      console.log('managers: ', managers);
      if (!managers) return;
      AsyncStorage.setItem(MANAGERS_KEY, JSON.stringify(managers));
    }).catch(err => console.log(err));
  }

  static async getManagers() {
    return await JSON.parse(AsyncStorage.getItem(MANAGERS_KEY));
  }

  static async getUserCompany() {
    const user = await this.getUser();
    if (!user) return null;
    return user.companies[0];
  }

}
