import Environment from "../env";
import AuthService from "./AuthService";


export default class JobFairService {

  constructor() {
    this.url = Environment.getJobFairWebUrl();
    this.auth = new AuthService();
  }

  login(email, password) {
    return fetch(this.url + '/api/v1/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
  }

  async getCompanyDetails() {
    let headers = this.auth.getAuthHeader();
    headers["Content-Type"] = 'application/json';
    return fetch(this.url + '/api/v1/user/order/details', {
      method: 'GET',
      headers: headers
    });
  }
}
