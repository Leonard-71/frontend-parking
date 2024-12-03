import React, { useState } from 'react';
import { Button } from '../components/common/Button/Button';
import { Input } from '../components/common/Input/Input';
import { authApi } from '../services/api/auth.api';
import { toast } from 'react-toastify';
import { REGISTER_TEXTS } from '../constants/auth/register.constants';
import CarAnimation from '../components/animations/car/CarAnimation';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authApi.register(formData);
            toast.success(REGISTER_TEXTS.successMessage);
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (error) {
            console.error('Eroare la crearea contului:', error);
            toast.error(REGISTER_TEXTS.errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: "url('https://image.ibb.co/c7Ce5F/beauty_of_an_open_road.jpg')" }}>
            <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800">{REGISTER_TEXTS.title}</h1>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">

                    <Input
                        type="text"
                        name="lastName"
                        placeholder={REGISTER_TEXTS.lastNamePlaceholder}
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Input
                        type="text"
                        name="firstName"
                        placeholder={REGISTER_TEXTS.firstNamePlaceholder}
                        value={formData.firstName}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder={REGISTER_TEXTS.emailPlaceholder}
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder={REGISTER_TEXTS.passwordPlaceholder}
                        value={formData.password}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Input
                        type="text"
                        name="phone"
                        placeholder={REGISTER_TEXTS.phonePlaceholder}
                        value={formData.phone}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button type="submit" className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition duration-200">
                        {REGISTER_TEXTS.submitButton}
                    </Button>
                </form>
            </div>
            <CarAnimation />
        </div>
    );
};

export default Register; 