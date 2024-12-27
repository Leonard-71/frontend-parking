import { useContext } from 'react';
import { SubscriptionHistoryContext } from '../../context/subscription-history/SubscriptionHistoryContext';

export const useSubscriptionHistoryContext = () => {
    const context = useContext(SubscriptionHistoryContext);
    if (!context) {
        throw new Error('useSubscriptionHistoryContext trebuie utilizat în interiorul unui SubscriptionHistoryProvider.');
    }
    return context;
};
