import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchSubscriptionHistory } from "../../services/subscription-history/SubscriptionHistoryService";

interface Subscription {
    id: string;
    subscription: {
        name: string;
        price: number;
    } | null;
    pricePaid: number;
    startDate: string | null;
    endDate: string | null;
    isActive: boolean;
}

interface SubscriptionHistoryContextProps {
    subscriptionsHistory: Subscription[];
    loading: boolean;
    error: string | null;
    fetchHistory: (userId: string) => Promise<void>;
}

const SubscriptionHistoryContext = createContext<SubscriptionHistoryContextProps | undefined>(undefined);

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

export const useSubscriptionHistoryContext = () => {
    const context = useContext(SubscriptionHistoryContext);
    if (!context) {
        throw new Error("useSubscriptionHistoryContext must be used within a SubscriptionHistoryProvider");
    }
    return context;
};
