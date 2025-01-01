import { API_BASE_URL, apiClient } from "../api/apiClient";


export const loginService = async (email: string, password: string) => {
  const response = await apiClient.post(`${API_BASE_URL}/auth/login`, { email, password });
  return response.data;
};

export const logoutService = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const refreshToken = async (refreshToken: string) => {
  const response = await apiClient.post(`${API_BASE_URL}/auth/refresh`, { refresh_token: refreshToken });
  return response.data;
};
