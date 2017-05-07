import Environment from "../env";


export default class JobFairService {

  constructor() {
    this.url = Environment.getJobFairWebUrl();
  }

  login(email, password) {
    return fetch(this.url+'/api/v1/sessions', {
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

}
