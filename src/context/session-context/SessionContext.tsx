import { createContext, useContext, useState, ReactNode } from 'react';

interface SessionContextProps {
    token: string | null;
    setToken: (token: string | null) => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));

    const value = {
        token,
        setToken: (newToken: string | null) => {
            setToken(newToken);
            if (newToken) {
                localStorage.setItem('access_token', newToken);
            } else {
                localStorage.removeItem('access_token');
            }
        },
    };

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
};
