import { useState } from 'react';
import useLogin from '../../hooks/login/useLogin';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import { LOGIN_TEXTS } from '../../translations/login/login';

export const LoginForm = ({ onSubmit }: { onSubmit: (token: string) => void }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(credentials.email, credentials.password);
      onSubmit(data.access_token);
    } catch (err) {
      console.error(err);
    }
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
      />
      <Input
        type="password"
        placeholder={LOGIN_TEXTS.passwordPlaceholder}
        value={credentials.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" isLoading={isLoading} className="w-full">
        {LOGIN_TEXTS.submitButton}
      </Button>
      <p className="mt-4 text-center">
        {LOGIN_TEXTS.noAccount}{' '}
        <Link to="/register" className="text-blue-500">
          {LOGIN_TEXTS.createAccount}
        </Link>
      </p>
    </form>
  );
};
