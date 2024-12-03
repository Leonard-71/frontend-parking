export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
    };
}

export interface AuthError {
    email?: string;
    password?: string;
    general?: string;
} 