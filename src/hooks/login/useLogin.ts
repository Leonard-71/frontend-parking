import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000';  

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      return response.data; 
    } catch (err: any) {
      setError('Autentificarea a eșuat. Verifică datele și încearcă din nou.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
