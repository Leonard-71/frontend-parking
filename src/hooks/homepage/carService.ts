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
 
    checkActiveSubscription = async (userId: string): Promise<boolean> => {
        try {
            const url = `${this.subscriptionUrl}/${userId}`; 

            const response = await apiClient.get<
                Array<{
                    isActive: boolean;
                    remainingEntries: number;
                    remainingExits: number;
                }>
            >(url); 
 
            if (response.data.length > 0) {
                const subscription = response.data[0];
                return (
                    subscription.isActive &&
                    subscription.remainingEntries > 0 &&
                    subscription.remainingExits > 0
                );
            }
 
            return false;
        } catch (error) {
            console.error('Error checking user subscription:', error);
            throw new Error('User subscription verification failed.');
        }
    };

     
    


}
