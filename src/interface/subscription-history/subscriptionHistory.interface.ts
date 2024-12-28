export interface Subscription {
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

export interface SubscriptionHistoryContextProps {
    subscriptionsHistory: Subscription[];
    loading: boolean;
    error: string | null;
    fetchHistory: (userId: string) => Promise<void>;
}