import { AsyncStorage } from 'react-native';
import { SLACK_HOOK_URL } from 'react-native-dotenv';
import JobFairService from './JobFairService';

const WATER_REQUESTED_TIMESTAMP = '@jf-company:water-requested-timestamp';
const COFFEE_REQUESTED_TIMESTAMP = '@jf-company:coffee-requested-timestamp';
const HELP_REQUESTED_TIMESTAMP = '@jf-company:help-requested-timestamp';

export default class SlackService {

  async requestWater(amount) {
    const company = await JobFairService.getUserCompany();
    if (await SlackService.checkSpam(WATER_REQUESTED_TIMESTAMP)) {
      return Promise.reject('You can only request water once every 30 minutes!');
    }
    if (!company) {
      return Promise.reject('You don\'t have attached company');
    }
    const managerList = await JobFairService.getManagers();
    let message = ` ${managerList} , ${company.name} želi ${amount} bočice vode na štandu ${company.booth.location}!`;
    if (amount < 2) {
      message = ` ${managerList} , ${company.name} želi ${amount} bočicu vode na štandu ${company.booth.location}!`;
    }
    await SlackService.sendRequest(
      company.name,
      message,
    );
    AsyncStorage.setItem(WATER_REQUESTED_TIMESTAMP, Date.now().toString());
    return true;
  }

  async requestCoffee(amounts) {
    const company = await JobFairService.getUserCompany();
    if (await SlackService.checkSpam(COFFEE_REQUESTED_TIMESTAMP)) {
      return Promise.reject('You can only request coffee once every 30 minutes!');
    }
    if (!company) {
      return Promise.reject('You don\'t have attached company');
    }
    const managerList = await JobFairService.getManagers();
    const requestedCoffeeMessage = Object.keys(amounts)
      .filter(key => amounts[key] > 0)
      .map(key => `${amounts[key]} ${key}`)
      .join(', ');
    const message = ` ${managerList} , ${company.name} želi ${requestedCoffeeMessage} kave na štandu ${company.booth.location}!`;
    SlackService.sendRequest(
      company.name,
      message,
    ).catch(err => console.log(err));
    AsyncStorage.setItem(COFFEE_REQUESTED_TIMESTAMP, Date.now().toString());
    return true;
  }

  async requestAssistance() {
    const company = await JobFairService.getUserCompany();
    if (await SlackService.checkSpam(HELP_REQUESTED_TIMESTAMP)) {
      return Promise.reject('You can only request assistance once every 10 minutes!');
    }
    if (!company) {
      return Promise.reject('You don\'t have attached company');
    }
    const managerList = await JobFairService.getManagers();
    SlackService.sendRequest(
      company.name, ` ${managerList} , ${company.name} želi pomoć?! na štandu ${company.booth.location}!`,
    );
    AsyncStorage.setItem(HELP_REQUESTED_TIMESTAMP, Date.now().toString());
    return true;
  }

  static async sendRequest(companyName, text) {
    return fetch(SLACK_HOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: companyName,
        text,
        link_names: 1,
      }),
    });
  }

  static getTimeout(type) {
    switch (type) {
      case WATER_REQUESTED_TIMESTAMP: return 30 * 60 * 1000;
      case COFFEE_REQUESTED_TIMESTAMP: return 30 * 60 * 1000;
      case HELP_REQUESTED_TIMESTAMP: return 10 * 60 * 1000;
      default: return 0;
    }
  }

  static async checkSpam(type) {
    const lastCall = await AsyncStorage.getItem(type);
    if (!lastCall) return false;
    return parseInt(lastCall, 10) + this.getTimeout(type) > Date.now();
  }

}
