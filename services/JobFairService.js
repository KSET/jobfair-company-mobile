import AuthService from '../services/AuthService';
import { COMPANY_URL, REVIEW_URL } from './routes';


export default class JobFairService {

  constructor() {
    this.authService = new AuthService();
    this.sendReview = this.sendReview.bind(this);
  }

  async sendReview(uid, note) {
    const headers = await this.authService.getAuthHeader();
    return fetch(REVIEW_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({
        resume_uid: uid,
        note,
      }),
    });
  }

  async getCompanyDetails() {
    const headers = await this.authService.getAuthHeader();
    return fetch(COMPANY_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  }
}
