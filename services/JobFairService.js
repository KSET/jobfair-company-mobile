import { JOBFAIR_URL } from '../env';
import AuthService from '../services/AuthService';

const API_URL = `${JOBFAIR_URL}/api/v1`;
export const LOGIN_URL = `${API_URL}/sessions`;
const REVIEW_URL = `${API_URL}/users/resume/favorites`;
const COMPANY_URL = `${API_URL}/user/orders/details`;

export default class JobFairService {

  constructor() {
    this.authService = new AuthService();
    this.sendReview = this.sendReview.bind(this);
  }

  sendReview(uid, note) {
    return fetch(REVIEW_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.authService.getAuthHeader(),
      },
      body: JSON.stringify({
        resume_id: uid,
        note,
      }),
    });
  }

  async getCompanyDetails() {
    return fetch(COMPANY_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.authService.getAuthHeader(),
      },
    });
  }
}
