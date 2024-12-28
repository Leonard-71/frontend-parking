import { apiClient } from "../api/apiClient";

export const fetchSubscriptionHistory = async (userId: string) => {
    try {
        const response = await apiClient.get(`/user-subscriptions/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching subscription history:", error);
        throw new Error("Failed to fetch subscription history.");
    }
};
