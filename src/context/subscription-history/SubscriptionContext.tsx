import { createContext, useContext, useState, ReactNode } from 'react';
import { SubscriptionHistory } from '../../interface/subscription-history/subscriptionHistory.interface';
import { SubscriptionService } from './SubscriptionService';

interface SubscriptionContextValue {
    subscriptionsHistory: SubscriptionHistory[];
    loading: boolean;
    error: string | null;
    fetchSubscriptionHistory: (userId: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
    const subscriptionService = new SubscriptionService();
    const [subscriptionsHistory, setSubscriptionsHistory] = useState<SubscriptionHistory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSubscriptionHistory = async (userId: string) => {
        setLoading(true);
        try {
            const data = await subscriptionService.getSubscriptionHistory(userId);
            setSubscriptionsHistory(data);
        } catch (err: any) {
            console.error('Eroare la încărcarea abonamentelor:', err);
            setError('Eroare la încărcarea abonamentelor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SubscriptionContext.Provider
            value={{ subscriptionsHistory, loading, error, fetchSubscriptionHistory }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
};

export const useSubscriptionContext = () => {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error('useSubscriptionContext trebuie utilizat în interiorul unui SubscriptionProvider.');
    }
    return context;
};
