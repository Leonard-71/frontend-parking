import { useState, useEffect } from 'react';
import { apiClient } from '../../services/api/apiClient';
import { User } from '../../interface/user-profile/userProfile.interface';

const useUserProfile = (userId: string) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserProfile = async () => {
        setLoading(true); 
        try { 
            const response = await apiClient.get<{ user: User }>(`/users/${userId}`);
            setUser(response.data.user); 
            setError(null);  
        } catch (err: any) {
            console.error('Error in fetchUserProfile:', err);
            setError('Eroare la încărcarea datelor utilizatorului.');
        } finally {
            setLoading(false); 
        }
    };

    const updateUserProfile = async (updatedData: any) => {
        setLoading(true);
        try {
            const response = await apiClient.patch<{ user: User }>(`/users/${userId}`, updatedData);
            setUser(response.data.user); 
            return true;
        } catch (err: any) {
            console.error('Error updating user profile:', err);
            setError('Eroare la actualizarea datelor utilizatorului.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteUserProfile = async () => {
        try {
            setLoading(true);
            await apiClient.delete(`/users/${userId}`);
            setUser(null);
        } catch (err) {
            console.error('Error deleting user profile:', err);
            setError('Eroare la ștergerea contului.');
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        if (userId && !user) {
            fetchUserProfile(); 
        }
    }, [userId, user]);

    return { user, loading, error, fetchUserProfile, updateUserProfile, deleteUserProfile };
};

export default useUserProfile;
