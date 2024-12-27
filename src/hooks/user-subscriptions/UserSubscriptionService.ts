import { apiClient } from '../../context/api/apiClient';

export class UserSubscriptionService {
    private readonly baseUrl = '/user-subscriptions';

    async decrementEntries(subscriptionId: string) {
        const response = await apiClient.patch(`${this.baseUrl}/${subscriptionId}`, {
            remainingEntries: -1
        });
        return response.data;
    }
}

export default new UserSubscriptionService();
