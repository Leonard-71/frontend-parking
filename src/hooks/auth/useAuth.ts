import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials, AuthError } from '../../types/auth.types';
import { authApi } from '../../services/api/auth.api';
import { LOGIN_TEXTS } from '../../constants/auth/login.constants';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<AuthError>({});

  const validateForm = (credentials: LoginCredentials): boolean => {
    const newErrors: AuthError = {};

    if (!credentials.email) {
      newErrors.email = LOGIN_TEXTS.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      newErrors.email = LOGIN_TEXTS.errors.emailInvalid;
    }

    if (!credentials.password) {
      newErrors.password = LOGIN_TEXTS.errors.passwordRequired;
    } else if (credentials.password.length < 6) {
      newErrors.password = LOGIN_TEXTS.errors.passwordMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async (credentials: LoginCredentials) => {
    if (!validateForm(credentials)) return;

    try {
      setIsLoading(true);
      const response = await authApi.login(credentials);
      navigate('/homepage');
      return response;
    } catch (error) {
      setErrors({ general: 'Autentificare eșuată' });
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, errors };
}; 