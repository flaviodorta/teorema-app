import axios from 'axios';
import { SERVER_URL } from '../constants';

export const authApi = axios.create({
  baseURL: SERVER_URL + '/administrator',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postRegister = async (data: {
  email: string;
  password: string;
  name: string;
}) => await authApi.post('/register', data);

export const postLogin = async (data: { email: string; password: string }) =>
  await authApi.post('/login', data);

export const postCheckEmailExists = async (data: { email: string }) =>
  await authApi.post('/check-email-exists', data);
