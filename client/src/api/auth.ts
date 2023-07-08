import axios from 'axios';
import { SERVER_URL } from '../constants';

export const authApi = axios.create({
  baseURL: SERVER_URL + '/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postSignUp = async (data: {
  email: string;
  password: string;
  name: string;
}) => await authApi.post('/sign-up', data);

export const postSignIn = async (data: { email: string; password: string }) =>
  await authApi.post('/sign-in', data);

export const postVerifyId = async (data: { id: string }): Promise<boolean> =>
  await authApi.post('/verify-id', data);

// export const postCheckEmailExists = async (data: { email: string }) =>
//   await authApi.post('/check-email-exists', data);
