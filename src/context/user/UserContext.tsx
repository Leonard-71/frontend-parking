import { createContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../../interface/navbar/user.interface';
import { UserService } from '../../services/user/UserService';
import { jwtDecode } from 'jwt-decode';

interface UserContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const userService = new UserService();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    setError('Tokenul nu există');
                    setLoading(false);
                    return;
                }

                const decodedToken = jwtDecode<{ userId: string }>(token);
                const userId = decodedToken.userId;

                const fetchedUser = await userService.fetchUser(userId);
                setUser(fetchedUser);
            } catch (err) {
                console.error('Error fetching user:', err);
                setError('Eroare la preluarea utilizatorului');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};

