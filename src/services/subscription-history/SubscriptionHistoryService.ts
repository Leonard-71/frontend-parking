import { apiClient } from "../api/apiClient";
import { SubscriptionHistory } from "../../interface/subscription-history/subscriptionHistory.interface";

export class SubscriptionHistoryService {
    async getSubscriptionHistory(userId: string): Promise<SubscriptionHistory[]> {
        try {
            const response = await apiClient.get(`/user-subscriptions/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching subscription history:", error);
            throw error;
        }
    }
}