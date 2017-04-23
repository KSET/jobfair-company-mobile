import Environment from "../env";


export default class SlackService {

  constructor() {
    this.webhook_url = Environment.getSlackWebserviceHook();
  }

  requestWater(company) {
    if (this.checkSpam('water')) return false;
    this.sendRequest(company.name, company.contact + ', '+company.name+' želi vodu na štandu ' + company.location + '!');
    return true;
  }

  requestCoffee(company) {
    if (this.checkSpam('coffee')) return false;
    this.sendRequest(company.name, company.contact + ', '+company.name+' želi kavu na štandu ' + company.location + '!');
    return true;
  }

  requestAssistance(company) {
    if (this.checkSpam('assistance')) return false;
    this.sendRequest(company.name, company.contact + ', '+company.name+' želi pomoć na štandu ' + company.location + '!');
    return true;
  }

  sendRequest(companyName, text) {
    return fetch(this.webhook_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: companyName,
        text: text,
        link_names: 1
      })
    })
      .then((slackResponse) => {
        //TODO: write to db
      })
      .catch((error) => {
        console.error(error);
      });
  }

  checkSpam(type) {
    //TODO: check last request timestamp, if now-last_request_time < 5 min return true
    return false;
  }

}
