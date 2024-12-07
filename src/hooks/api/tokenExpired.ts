import {jwtDecode} from "jwt-decode";

export const isTokenExpired = (token: string) => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;  
  }
};
