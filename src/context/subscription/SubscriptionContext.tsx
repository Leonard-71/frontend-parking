import { createContext, useState, ReactNode, useEffect } from 'react';
import { SubscriptionService } from '../../services/subscription/SubscriptionService';

interface SubscriptionContextType {
    subscriptions: any[];
    loading: boolean;
    error: string | null;
    fetchSubscriptions: () => Promise<void>;
}

export const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const subscriptionService = new SubscriptionService();

    const fetchSubscriptions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await subscriptionService.getSubscriptions();
            setSubscriptions(data);
        } catch (err) {
            console.error('Error:', err);
            setError('Nu am putut prelua subscripțiile.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);



    return (
        <SubscriptionContext.Provider value={{ subscriptions, loading, error, fetchSubscriptions }}>
            {children}
        </SubscriptionContext.Provider>
    );
};
