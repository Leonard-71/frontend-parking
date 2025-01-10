import { createContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../../interface/navbar/user.interface';
import { UserService } from '../../services/user/UserService';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { UserContextType } from '../../interface/user/user.interface';

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const userService = new UserService();
    const navigate = useNavigate();

    const deleteUser = async () => {
        try {
            if (!user) throw new Error('Utilizatorul nu este autentificat');
            await userService.deleteUserProfile(user.id);
            setUser(null);
            localStorage.removeItem('access_token');
            navigate('/login');
        } catch (err) {
            console.error('Eroare la ștergerea utilizatorului:', err);
            setError('Eroare la ștergerea contului');
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    setError('Tokenul lipsește');
                    setLoading(false);
                    return;
                }
                const decodedToken = jwtDecode<{ userId: string }>(token);
                const fetchedUser = await userService.fetchUser(decodedToken.userId);
                setUser(fetchedUser);
            } catch (err) {
                console.error('Eroare la preluarea utilizatorului:', err);
                setError('Eroare la preluarea utilizatorului');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, error, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};
