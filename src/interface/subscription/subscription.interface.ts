export interface Subscription {
    id: string;
    name: string;
    price: number;
    entries: number;
    exits: number;
    accessType: string;
}

export interface SubscriptionContextProps {
    subscriptions: Subscription[];
    loading: boolean;
    error: string | null;
    purchaseSubscription: (subscriptionId: string) => Promise<void>;
    calculatePriceDifference: (subscriptionId: string) => Promise<number>;
    hasPurchasedFreePlan: () => Promise<boolean>;
}
