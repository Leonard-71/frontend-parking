// services/parkingSpotService.ts
import { ParkingSpot } from '../../interface/parking-spots/parkingSpots.interface';
import { apiClient } from '../api/apiClient';

export class ParkingSpotService {
    private readonly baseUrl = '/parking-spots';

    async getParkingSpots(): Promise<ParkingSpot[]> {
        const response = await apiClient.get<{ parkingSpots: ParkingSpot[] }>(this.baseUrl);
        return response.data.parkingSpots;
    }

    async getParkingSpotById(id: string): Promise<ParkingSpot> {
        const response = await apiClient.get<{ parkingSpot: ParkingSpot }>(`${this.baseUrl}/${id}`);
        return response.data.parkingSpot;
    }

    async createParkingSpot(parkingSpot: Omit<ParkingSpot, 'id'>): Promise<ParkingSpot> {
        const response = await apiClient.post<{ parkingSpot: ParkingSpot }>(this.baseUrl, parkingSpot);
        return response.data.parkingSpot;
    }

    async updateParkingSpot(id: string, parkingSpot: Partial<ParkingSpot>): Promise<ParkingSpot> {
        const response = await apiClient.patch<{ updatedParkingSpot: ParkingSpot }>(
            `${this.baseUrl}/${id}`,
            parkingSpot
        );
        return response.data.updatedParkingSpot;
    }

    async deleteParkingSpot(id: string): Promise<void> {
        await apiClient.delete(`${this.baseUrl}/${id}`);
    }
}

export default new ParkingSpotService(); 
