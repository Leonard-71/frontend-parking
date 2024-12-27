import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
 
export const loginService  = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};
 
export const logoutService  = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');  
};
 
export const refreshToken = async (refreshToken: string) => {
  const response = await apiClient.post('/auth/refresh', { refresh_token: refreshToken });
  return response.data;
};
