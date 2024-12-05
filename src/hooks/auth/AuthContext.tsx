import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

interface AuthContextProps {
    user: User | null;
    setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const setToken = (token: string) => {
        localStorage.setItem("access_token", token);
        const decoded: { userId: string } = jwtDecode(token);
        fetchUser(decoded.userId);
    };

    const fetchUser = async (userId: string) => {
        try {
            const response = await fetch(`/users/${userId}`);
            const data = await response.json();
            setUser(data.user);
        } catch (error) {
            console.error("Failed to fetch user", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            const decoded: { userId: string } = jwtDecode(token);
            fetchUser(decoded.userId);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
