export interface RegisterContextType {
    register: (formData: RegisterFormData) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

export interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
}