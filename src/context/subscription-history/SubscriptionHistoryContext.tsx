import { createContext, useState, ReactNode, useCallback } from 'react';
import { SubscriptionHistoryService } from '../../services/subscription-history/SubscriptionHistoryService';

interface SubscriptionHistoryContextType {
    subscriptionsHistory: any[];
    fetchSubscriptionHistory: (userId: string) => Promise<void>;
}

export const SubscriptionHistoryContext = createContext<SubscriptionHistoryContextType | undefined>(undefined);

export const SubscriptionHistoryProvider = ({ children }: { children: ReactNode }) => {
    const [subscriptionsHistory, setSubscriptionsHistory] = useState<any[]>([]);
    const subscriptionHistoryService = new SubscriptionHistoryService();

    const fetchSubscriptionHistory = useCallback(async (userId: string) => {
        try {
            const data = await subscriptionHistoryService.getSubscriptionHistory(userId);
            setSubscriptionsHistory(data);
        } catch (err) {
            console.error('Error fetching subscription history:', err);
        }
    }, []);

    return (
        <SubscriptionHistoryContext.Provider value={{ subscriptionsHistory, fetchSubscriptionHistory }}>
            {children}
        </SubscriptionHistoryContext.Provider>
    );
};
