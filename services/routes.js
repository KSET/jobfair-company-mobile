import { JOBFAIR_URL } from '../env';

const API_URL = `${JOBFAIR_URL}/api/v1`;
export const LOGIN_URL = `${API_URL}/sessions`;
export const USERS_URL = `${API_URL}/users`;
export const REVIEW_URL = `${USERS_URL}/resume/favorites`;
export const COMPANY_URL = `${API_URL}/user/orders/details`;
