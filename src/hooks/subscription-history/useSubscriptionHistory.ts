import { useState, useEffect } from 'react';
import { apiClient } from '../../services/api/apiClient';
import { SubscriptionHistory } from '../../interface/subscription-history/subscriptionHistory.interface';

const useSubscriptionHistory = (userId: string) => {
    const [subscriptionsHistory, setSubscriptionsHistory] = useState<SubscriptionHistory[]>([]);  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubscriptionHistory = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get(`/user-subscriptions/user/${userId}`);
                setSubscriptionsHistory(response.data);
            } catch (err: any) {
                console.error('Eroare la încărcarea abonamentelor:', err);
                setError('Eroare la încărcarea abonamentelor.');
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptionHistory();
    }, [userId]);

    return { subscriptionsHistory, loading, error };
};

export default useSubscriptionHistory;
