import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
    getSubscriptions,
    purchaseSubscription,
    calculatePriceDifference,
    hasPurchasedFreePlan,
} from "../../services/subscription/SubscriptionService";

interface Subscription {
    id: string;
    name: string;
    price: number;
    entries: number;
    exits: number;
    accessType: string;
}

interface SubscriptionContextProps {
    subscriptions: Subscription[];
    loading: boolean;
    error: string | null;
    purchaseSubscription: (subscriptionId: string) => Promise<void>;
    calculatePriceDifference: (subscriptionId: string) => Promise<number>;
    hasPurchasedFreePlan: () => Promise<boolean>;
}

const SubscriptionContext = createContext<SubscriptionContextProps | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            setLoading(true);
            try {
                const data = await getSubscriptions();
                setSubscriptions(data);
            } catch (err) {
                setError("Failed to load subscriptions.");
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptions();
    }, []);

    const handleHasPurchasedFreePlan = useCallback(async () => {
        try {
            return await hasPurchasedFreePlan();
        } catch (err: any) {
            setError(err.message || "Failed to check if free plan was purchased.");
            return false;
        }
    }, []);

    const handlePurchaseSubscription = useCallback(async (subscriptionId: string) => {
        setLoading(true);
        try {
            await purchaseSubscription(subscriptionId);
        } catch (err: any) {
            setError(err.message || "Failed to purchase subscription.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCalculatePriceDifference = useCallback(async (subscriptionId: string) => {
        try {
            return await calculatePriceDifference(subscriptionId);
        } catch (err: any) {
            setError(err.message || "Failed to calculate price difference.");
            return 0;
        }
    }, []);

    return (
        <SubscriptionContext.Provider
            value={{
                subscriptions,
                loading,
                error,
                purchaseSubscription: handlePurchaseSubscription,
                calculatePriceDifference: handleCalculatePriceDifference,
                hasPurchasedFreePlan: handleHasPurchasedFreePlan,
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
};

export const useSubscriptionContext = () => {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error("useSubscriptionContext must be used within a SubscriptionProvider");
    }
    return context;
};
