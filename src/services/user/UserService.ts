import { apiClient } from '../api/apiClient';
import { User } from '../../interface/navbar/user.interface';

export class UserService {
    async fetchUser(userId: string): Promise<User> {
        const response = await apiClient.get(`/users/${userId}`);
        return response.data.user;
    }
}
