export interface Subscription {
    id: string;
    name: string;
    price: number;
    entries: number;
    exits: number;
    accessType: string;
    isActive: boolean;  
    remainingEntries: number;  
}


export interface SubscriptionContextProps {
    subscriptions: Subscription[];
    userSubscriptions: Subscription[];
    loading: boolean;
    error: string | null;
    purchaseSubscription: (subscriptionId: string) => Promise<void>;
    calculatePriceDifference: (subscriptionId: string) => Promise<number>;
    hasPurchasedFreePlan: () => Promise<boolean>;
    decrementRemainingEntries: () => Promise<void>;
    hasActiveSubscription: () => boolean; 
    activeSubscription: Subscription | null; 
}


