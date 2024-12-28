import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { REGISTER_TEXTS } from '../../translations/register/register';
import { apiClient } from '../../services/api/apiClient';
import { RegisterContextType, RegisterFormData } from '../../interface/register/register.interface';

export const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export const RegisterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (formData: RegisterFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await apiClient.post('/auth/register', formData);
            if (response.status === 201) {
                toast.success(REGISTER_TEXTS.successMessage);
            } else {
                throw new Error('Registrarea a eșuat.');
            }
        } catch (err: any) {
            console.error('Eroare la înregistrare:', err);
            setError('Eroare la crearea contului.');
            toast.error(REGISTER_TEXTS.errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <RegisterContext.Provider value={{ register, isLoading, error }}>
            {children}
        </RegisterContext.Provider>
    );
};

