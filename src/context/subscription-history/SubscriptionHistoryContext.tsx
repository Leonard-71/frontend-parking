import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchSubscriptionHistory } from "../../services/subscription-history/SubscriptionHistoryService";
import { Subscription, SubscriptionHistoryContextProps } from "../../interface/subscription-history/subscriptionHistory.interface";

export const SubscriptionHistoryContext = createContext<SubscriptionHistoryContextProps | undefined>(undefined);

export const SubscriptionHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [subscriptionsHistory, setSubscriptionsHistory] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchHistory = useCallback(async (userId: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchSubscriptionHistory(userId);
            setSubscriptionsHistory(data);
        } catch (err) {
            setError("Failed to load subscription history.");
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <SubscriptionHistoryContext.Provider value={{ subscriptionsHistory, loading, error, fetchHistory }}>
            {children}
        </SubscriptionHistoryContext.Provider>
    );
};


