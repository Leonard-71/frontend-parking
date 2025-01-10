import { apiClient } from '../api/apiClient';
import { User } from '../../interface/navbar/user.interface';

export class UserService {
    async fetchUser(userId: string): Promise<User> {
        const response = await apiClient.get(`/users/${userId}`);
        return response.data.user;
    }

    async deleteUserProfile(userId: string): Promise<void> {
        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error('Tokenul lipsește');
        }

        const response = await apiClient.delete(`/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            localStorage.removeItem('access_token');
        } else {
            throw new Error('Eroare la ștergerea utilizatorului');
        }
    }
    
    
}
