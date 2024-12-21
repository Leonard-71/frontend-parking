import { apiClient } from "../api/apiClient";

export class CarService {
    private readonly baseUrl = '/cars';
    private readonly subscriptionUrl = '/user-subscriptions/user';
 
    verifyOwnership = async (userId: string, registrationNumber: string): Promise<boolean> => {
        try {
            const response = await apiClient.get<{ ownershipVerified: boolean }>(
                `${this.baseUrl}/verify-ownership`,
                {
                    params: { userId, registrationNumber },
                }
            );
            return response.data.ownershipVerified; 
        } catch (error) {
            console.error('Error verifying car ownership:', error);
            throw new Error('Car ownership verification failed.');
        }
    };
 
    checkActiveSubscription = async (userId: string): Promise<{
        isActive: boolean;
        subscriptionId: string | null;
        remainingEntries: number;
        remainingExits: number;
    }> => {
        try {
            const url = `${this.subscriptionUrl}/${userId}`;
    
            const response = await apiClient.get<
                Array<{
                    id: string; 
                    isActive: boolean;
                    remainingEntries: number;
                    remainingExits: number;
                }>
            >(url);
    
            if (response.data.length > 0) {
                const subscription = response.data[0];
                if (subscription) {
                    return {
                        isActive: subscription.isActive,
                        subscriptionId: subscription.id, 
                        remainingEntries: subscription.remainingEntries,
                        remainingExits: subscription.remainingExits,
                    };
                }
            }
    
            return {
                isActive: false,
                subscriptionId: null,
                remainingEntries: 0,
                remainingExits: 0,
            };
        } catch (error) {
            console.error('Error checking user subscription:', error);
            throw new Error('User subscription verification failed.');
        }
    };
    

     
    


}
