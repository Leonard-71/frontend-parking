export interface SubscriptionCardProps {
    subscription: {
        id: string;
        name: string;
        price: number;
        entries: number;
        exits: number;
        accessType: string;
    };
}