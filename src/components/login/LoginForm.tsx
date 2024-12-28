import { useState } from 'react';
import { useAuth } from '../../hooks/auth/useAuth';
import { Input } from '../[components]/input/Input';
import { Button } from '../[components]/button/Button';
import { LOGIN_TEXTS } from '../../translations/login/login';

export const LoginForm = ({ onSubmit }: { onSubmit: (token: string) => void }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      alert(LOGIN_TEXTS.errors.general);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await login(credentials.email, credentials.password);
      onSubmit(localStorage.getItem('access_token')!);
    } catch (err) {
      setError(LOGIN_TEXTS.errors.general);
      console.error('Error during login:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof credentials, value: string) => {
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

      <p className="mt-4 text-center text-sm text-gray-600">
        {LOGIN_TEXTS.noAccount}{' '}
        <a href="/register" className="text-blue-500 hover:underline">
          {LOGIN_TEXTS.createAccount}
        </a>
      </p>
    </form>
  );
};
