import { apiClient } from "../../services/api/apiClient";
import { SubscriptionHistory } from "../../interface/subscription-history/subscriptionHistory.interface";

export class SubscriptionService {
    async getSubscriptionHistory(userId: string): Promise<SubscriptionHistory[]> {
        const response = await apiClient.get(`/user-subscriptions/user/${userId}`);
        return response.data;
    }
}
