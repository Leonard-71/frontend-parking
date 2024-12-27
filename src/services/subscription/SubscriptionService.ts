import { apiClient } from '../../services/api/apiClient';

export class SubscriptionService {
    private readonly baseUrl = '/subscriptions';

    async getSubscriptions() {
        const response = await apiClient.get(`${this.baseUrl}`); 
        return response.data.subscriptions;  
    }
 
    async getSubscriptionHistory(userId: string) {
        const response = await apiClient.get(`/user-subscriptions/user/${userId}`);
        return response.data;
    }

    async confirmSubscription(userId: string, subscriptionTypeId: string) {
        const response = await apiClient.post('/user-subscriptions', { userId, subscriptionTypeId });
        return response.data;
    }

    async checkActiveSubscription(userId: string, subscriptionTypeId: string): Promise<boolean> {
        const response = await apiClient.post('/user-subscriptions/check-active', { userId, subscriptionTypeId });
        return response.data;
    }
         
}
