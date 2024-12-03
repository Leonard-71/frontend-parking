import { useState } from 'react';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { LoginFormProps } from './loginForm.types';
import { LOGIN_TEXTS } from '../../../constants/auth/login.constants';
import { Link } from 'react-router-dom';

export const LoginForm = ({ onSubmit, isLoading, errors }: LoginFormProps) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="email"
        placeholder={LOGIN_TEXTS.emailPlaceholder}
        value={credentials.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        error={errors?.email}
      />

      <Input
        type="password"
        placeholder={LOGIN_TEXTS.passwordPlaceholder}
        value={credentials.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
        error={errors?.password}
      />

      {errors?.general && (
        <p className="text-red-500 text-sm">{errors.general}</p>
      )}

      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full"
      >
        {LOGIN_TEXTS.submitButton}
      </Button>

      <p className="mt-4 text-center">
        Nu ai un cont?{' '}
        <Link to="/register" className="text-blue-500">
          Creează unul aici
        </Link>
      </p>
    </form>
  );
};
