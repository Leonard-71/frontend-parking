import { LoginCredentials } from "../../interface/login/credentils.interface";


export interface LoginFormProps {
    onSubmit: (credentials: LoginCredentials) => void;
    isLoading: boolean;
    errors: Record<string, string>;
} 