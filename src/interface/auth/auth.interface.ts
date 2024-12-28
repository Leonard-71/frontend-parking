export interface AuthContextType {
    user: string | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export interface DecodedToken {
    userId: string;
    role: string;
    exp: number;
}