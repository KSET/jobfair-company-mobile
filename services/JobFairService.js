import { AsyncStorage } from 'react-native';
import JobFairApiClient from './JobFairApiClient';
import CompanyManagersQuery from './queries/companyManagerQuery';
import CompanyStudentReviewMutation
  from './mutations/companyStudentReviewMutation';
import Expo from 'expo';

const USER_KEY = '@jf-company:user';
const MANAGERS_KEY = '@jf-company:managers';
const AUTH_DETAILS_KEY = '@jf-company:auth_details';

export default class JobFairService {

  static async storeAuthDetails(email, password) {
    try {
      await Expo.SecureStore.setItemAsync(AUTH_DETAILS_KEY, JSON.stringify({
        email,
        password,
      }));
    } catch (e) {

    }
  }

  static async getAuthDetails() {
    try {
      return JSON.parse(await Expo.SecureStore.getItemAsync(AUTH_DETAILS_KEY));
    } catch (e) {
      return null;
    }
  }

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
    } catch (e) {
      console.log(e);
    }
    try {
      await AsyncStorage.removeItem(MANAGERS_KEY);
    } catch (e) {
      console.log(e);
    }
  }

  static async storeManagers(company) {
    const id = company.id;
    return await JobFairApiClient.query({
      query: CompanyManagersQuery,
      variables: {
        id,
      },
    }).then((result) => {
      const managers = result.data.company.managers;
      console.log('Managers:', managers);
      if (!managers) return;
      if (Array.isArray(managers)) {
        const managerList = managers.map(manager => `${manager.slack_mention}`).join(', ');
        AsyncStorage.setItem(MANAGERS_KEY, managerList);
      }
    }).catch(err => console.log(err));
  }

  static async getManagers() {
    return await AsyncStorage.getItem(MANAGERS_KEY);
  }

  static async getUserCompany() {
    const user = await this.getUser();
    if (!user) return null;
    return user.companies[0];
  }

  static async submitReview(resume, social, ambition, notes) {
    console.log({
      resume,
      social,
      ambition,
      notes,
    });
    return await JobFairApiClient.mutate({
      mutation: CompanyStudentReviewMutation,
      variables: {
        resume,
        social,
        ambition,
        notes,
      },
    }).then((result) => {
      console.log('Review:', result);
      return result;
    }).catch((err) => {
      console.log('Review error', err);
      return null;
    });
  }

}
