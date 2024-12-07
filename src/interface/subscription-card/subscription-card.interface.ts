export interface SubscriptionCardProps {
    subscription: {
        id: string;
        name: string;
        price: string;
        entries: number;
        exits: number;
        accessType: string;
        createdAt: string;
        updatedAt: string;
    };
    isPopupOpen: boolean;  
    onPopupOpen: () => void;
}