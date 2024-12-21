import { apiClient } from '../api/apiClient';

export class ParkingSessionService {
    private readonly baseUrl = '/parking-sessions';

    async createSession(sessionData: {
        userId: string;
        carId: string;
        userSubscriptionId: string;
        parkingSpotId: string;
        entryTime: string;
    }) {
        const response = await apiClient.post(this.baseUrl, sessionData);
        return response.data;
    }
}

export default new ParkingSessionService();
