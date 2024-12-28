import { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { isTokenExpired, refreshAccessToken } from '../../utils/tokenUtils';
import { loginService, logoutService } from '../../services/auth/authService';
import { AuthContextType, DecodedToken } from '../../interface/auth/auth.interface';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));

    const validateToken = useCallback(async () => {
        if (token) {
            try {
                if (isTokenExpired(token)) {
                    const newToken = await refreshAccessToken(token);
                    const decodedToken: DecodedToken = jwtDecode(newToken);
                    setToken(newToken);
                    setUser(decodedToken.userId);
                    localStorage.setItem('access_token', newToken);
                } else {
                    const decodedToken: DecodedToken = jwtDecode(token);
                    setUser(decodedToken.userId);
                }
            } catch (error) {
                console.error('Token validation failed:', error);
                logout();
            }
        }
    }, [token]);

    const login = async (email: string, password: string) => {
        const data = await loginService(email, password);

        if (!data.access_token) {
            throw new Error('Invalid login response: missing access token');
        }

        try {
            const decodedToken: DecodedToken = jwtDecode(data.access_token);
            setToken(data.access_token);
            setUser(decodedToken.userId);
            localStorage.setItem('access_token', data.access_token);
        } catch (error) {
            console.error('Failed to decode token:', error);
            throw new Error('Login failed');
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        logoutService();
    };

    useEffect(() => {
        if (token) {
            try {
                const decodedToken: DecodedToken = jwtDecode(token);
                setUser(decodedToken.userId);
            } catch (error) {
                console.error('Invalid token:', error);
                logout();
            }

            validateToken();
        }
    }, [token, validateToken]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
