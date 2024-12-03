import { LoginCredentials } from '../../../types/auth.types';

export interface LoginFormProps {
    onSubmit: (credentials: LoginCredentials) => void;
    isLoading: boolean;
    errors: Record<string, string>;
} 