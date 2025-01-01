import { apiClient } from "../api/apiClient";
import { getGlobalUserId } from "../../utils/userIdStore";

export const getSubscriptions = async () => {
  try {
    const response = await apiClient.get("/subscriptions");
    return response.data.subscriptions;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);  
    return []; 
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
     
    if (Array.isArray(response.data)) {
      return response.data.some(
        (subscription: any) => subscription.subscription?.name === "FREE"
      );
    }
 
    return false;
  } catch (error) {
    console.error("Error checking free plan:", error);
    return false;  
  }
};

export const hasActiveSubscription = async (): Promise<boolean> => {
  const userId = getGlobalUserId();
  try {
      const response = await apiClient.get(`/user-subscriptions/active/${userId}`); 
      return response.data?.isActive === true;
  } catch (error) {
      console.error("Error checking active subscription:", error);
      return false;
  }
};

export const decrementRemainingEntries = async (): Promise<void> => {
  const userId = getGlobalUserId();
  try {
    await apiClient.patch(`/user-subscriptions/decrement/${userId}?field=remainingEntries`);
  } catch (error) {
    console.error("Error decrementing remaining entries:", error);
    throw new Error("Failed to decrement remaining entries.");
  }
};

export const decrementRemainingExits = async (): Promise<void> => {
  const userId = getGlobalUserId();
  try {
    await apiClient.patch(`/user-subscriptions/decrement/${userId}?field=remainingExits`);
  } catch (error) {
    console.error("Error decrementing remaining exits:", error);
    throw new Error("Failed to decrement remaining exits.");
  }
};









