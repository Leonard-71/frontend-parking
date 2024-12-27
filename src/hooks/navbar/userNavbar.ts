import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { apiClient } from '../../services/api/apiClient';
import { User } from '../../interface/navbar/user.interface';


export const userNavbar = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        
                const response = await apiClient.get(`/users/${userId}`); 
                setUser(response.data.user);  
            } catch (err) { 
                setError('Eroare la preluarea utilizatorului');
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
    }, []);
    return { user, loading, error };
};
