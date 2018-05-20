import { AsyncStorage } from 'react-native';
import { SLACK_HOOK_URL } from 'react-native-dotenv';

const WATER_REQUESTED_TIMESTAMP = '@jf-company:water-requested-timestamp';
const COFFEE_REQUESTED_TIMESTAMP = '@jf-company:water-requested-timestamp';
const HELP_REQUESTED_TIMESTAMP = '@jf-company:water-requested-timestamp';

const timeouts = {
  WATER_REQUESTED_TIMESTAMP: 1000 * 30 * 60,
  COFFEE_REQUESTED_TIMESTAMP: 1000 * 30 * 60,
  HELP_REQUESTED_TIMESTAMP: 1000 * 10 * 60,
};

export default class SlackService {

  async requestWater(company, amount) {
    if (await SlackService.checkSpam(WATER_REQUESTED_TIMESTAMP)) return false;
    let message = `${company.contact}, ${company.name} želi ${amount} bočica vode na štandu ${company.location}!`;
    if (amount < 2) {
      message = `${company.contact}, ${company.name} želi ${amount} bočicu vode na štandu ${company.location}!`;
    }
    await SlackService.sendRequest(
      company.name,
      message,
    );
    AsyncStorage.setItem(WATER_REQUESTED_TIMESTAMP, Date.now().toString());
    return true;
  }

  requestCoffee(company, amounts) {
    if (SlackService.checkSpam(COFFEE_REQUESTED_TIMESTAMP)) return false;
    const requestedCoffeeMessage = Object.keys(amounts).map(key => `${amounts[key]} ${key}`).join(',');
    SlackService.sendRequest(
      company.name,
      `${company.contact}, ${company.name} želi ${requestedCoffeeMessage} kave na štandu ${company.location}!`,
    );
    return true;
  }

  requestAssistance(company) {
    if (SlackService.checkSpam(HELP_REQUESTED_TIMESTAMP)) return false;
    SlackService.sendRequest(
      company.name, `${company.contact}, ${company.name} želi pomoć?! na štandu ${company.location}!`,
    );
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

  static async checkSpam(type) {
    return parseInt(await AsyncStorage.getItem(type), 10) + timeouts[type] < Date.now();
  }

}
