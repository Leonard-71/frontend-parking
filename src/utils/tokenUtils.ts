import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';
 
export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return Date.now() >= exp * 1000;
  } catch (error) {
    console.error('Invalid token:', error);
    return true;
  }
};
 
export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, { refresh_token: refreshToken });
    if (response.status === 200 && response.data.access_token) {
      return response.data.access_token;
    }
    throw new Error('Failed to refresh token');
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};
