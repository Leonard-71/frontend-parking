import { apiClient } from "../api/apiClient";
import { getGlobalUserId } from "../../hooks/userIdStore";

export const getSubscriptions = async () => {
  try {
    const response = await apiClient.get("/subscriptions");
    return response.data.subscriptions;
  } catch (error) {
    throw new Error("Failed to fetch subscriptions.");
  }
};

export const purchaseSubscription = async (subscriptionId: string) => {
  const userId = getGlobalUserId();
  try {
    const response = await apiClient.post("/user-subscriptions", {
      userId,
      subscriptionTypeId: subscriptionId,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to purchase subscription."
    );
  }
};

export const calculatePriceDifference = async (subscriptionId: string) => {
  const userId = getGlobalUserId();
  try {
    const response = await apiClient.post("/user-subscriptions/calculate-price", {
      userId,
      subscriptionTypeId: subscriptionId,
    });
    return response.data.adjustedPrice;  
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to calculate price difference."
    );
  }
};


export const hasPurchasedFreePlan = async (): Promise<boolean> => {
  const userId = getGlobalUserId();
  try {
    const response = await apiClient.get(`/user-subscriptions/user/${userId}`);
    return response.data.some((subscription: any) => subscription.subscription.name === "FREE");
  } catch (error) {
    throw new Error("Failed to check if free plan was purchased.");
  }
};

