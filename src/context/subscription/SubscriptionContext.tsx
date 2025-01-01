import React, { createContext, useEffect, useState, useCallback } from "react";
import {
    getSubscriptions,
    purchaseSubscription,
    calculatePriceDifference,
    hasPurchasedFreePlan,
    decrementRemainingEntries,
    decrementRemainingExits,
} from "../../services/subscription/SubscriptionService";
import { fetchSubscriptionHistory } from "../../services/subscription-history/SubscriptionHistoryService";
import { Subscription, SubscriptionContextProps } from "../../interface/subscription/subscription.interface";
import { getGlobalUserId } from "../../utils/userIdStore";

export const SubscriptionContext = createContext<SubscriptionContextProps | undefined>(undefined);
export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [userSubscriptions, setUserSubscriptions] = useState<Subscription[]>([]);
    const [activeSubscription, setActiveSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAvailableSubscriptions = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getSubscriptions();
            setSubscriptions(data);
        } catch (err) {
            console.error("Failed to load subscriptions:", err);
            setError("Failed to load subscriptions.");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchUserSubscriptions = useCallback(async () => {
        setLoading(true);
        try {
            const userId = getGlobalUserId();
            if (!userId) {
                throw new Error("User ID is null or undefined.");
            }
            const userSubs: Subscription[] = await fetchSubscriptionHistory(userId);
            setUserSubscriptions(Array.isArray(userSubs) ? userSubs : []);
            const activeSub = Array.isArray(userSubs)
                ? userSubs.find((sub: Subscription) => sub.isActive)
                : null;
            setActiveSubscription(activeSub || null);
        } catch (err) {
            console.error("Failed to fetch user subscriptions:", err);
            setError("Failed to fetch user subscriptions.");
            setUserSubscriptions([]);
        } finally {
            setLoading(false);
        }
    }, []);



    const hasActiveSubscription = useCallback(() => {
        return !!activeSubscription;
    }, [activeSubscription]);

    useEffect(() => {
        fetchAvailableSubscriptions();
        fetchUserSubscriptions();
    }, [fetchAvailableSubscriptions, fetchUserSubscriptions]);

    const handlePurchaseSubscription = useCallback(async (subscriptionId: string) => {
        setLoading(true);
        try {
            await purchaseSubscription(subscriptionId);
            await fetchUserSubscriptions();
        } catch (err: any) {
            setError(err.message || "Failed to purchase subscription.");
        } finally {
            setLoading(false);
        }
    }, [fetchUserSubscriptions]);

    const handleCalculatePriceDifference = useCallback(async (subscriptionId: string) => {
        try {
            return await calculatePriceDifference(subscriptionId);
        } catch (err: any) {
            setError(err.message || "Failed to calculate price difference.");
            return 0;
        }
    }, []);

    const handleDecrementRemainingEntries = useCallback(async () => {
        setLoading(true);
        try {
            await decrementRemainingEntries();
            await fetchUserSubscriptions();
        } catch (err) {
            setError("Failed to decrement remaining entries.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [fetchUserSubscriptions]);

    const handleDecrementRemainingExits = useCallback(async () => {
        setLoading(true);
        try {
            await decrementRemainingExits();
            await fetchUserSubscriptions();
        } catch (err) {
            setError("Failed to decrement remaining exits.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [fetchUserSubscriptions]);


    return (
        <SubscriptionContext.Provider
            value={{
                subscriptions,
                userSubscriptions,
                loading,
                error,
                purchaseSubscription: handlePurchaseSubscription,
                calculatePriceDifference: handleCalculatePriceDifference,
                hasPurchasedFreePlan,
                decrementRemainingEntries: handleDecrementRemainingEntries,
                decrementRemainingExits: handleDecrementRemainingExits,
                hasActiveSubscription,
                activeSubscription,
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
};
