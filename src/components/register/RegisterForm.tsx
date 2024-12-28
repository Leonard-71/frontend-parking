import { useState } from 'react';
import { Input } from '../[components]/input/Input';
import { Button } from '../[components]/button/Button';
import { REGISTER_TEXTS } from '../../translations/register/register';
import { useRegister } from '../../hooks/register/useRegister';

export const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
    });

    const { register, isLoading } = useRegister();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.phone) {
            alert('Toate câmpurile sunt obligatorii.');
            return;
        }

        try {
            await register(formData);
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (err) {
            console.error('Eroare la crearea contului:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <Input
                type="text"
                name="lastName"
                placeholder={REGISTER_TEXTS.lastNamePlaceholder}
                value={formData.lastName}
                onChange={handleChange}
            />
            <Input
                type="text"
                name="firstName"
                placeholder={REGISTER_TEXTS.firstNamePlaceholder}
                value={formData.firstName}
                onChange={handleChange}
            />
            <Input
                type="email"
                name="email"
                placeholder={REGISTER_TEXTS.emailPlaceholder}
                value={formData.email}
                onChange={handleChange}
            />
            <Input
                type="password"
                name="password"
                placeholder={REGISTER_TEXTS.passwordPlaceholder}
                value={formData.password}
                onChange={handleChange}
            />
            <Input
                type="text"
                name="phone"
                placeholder={REGISTER_TEXTS.phonePlaceholder}
                value={formData.phone}
                onChange={handleChange}
            />
            <div className="flex justify-between space-x-4">
                <Button type="submit" isLoading={isLoading}>
                    {REGISTER_TEXTS.submitButton}
                </Button>
                <Button
                    type="button"
                    onClick={() => (window.location.href = '/login')}
                    className="bg-gray-500 hover:bg-gray-600"
                >
                    {REGISTER_TEXTS.cancelButton}
                </Button>
            </div>
        </form>
    );
};
