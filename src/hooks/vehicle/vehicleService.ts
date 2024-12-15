import { Vehicle } from '../../interface/vehicle/vehicle.interface';
import { apiClient } from '../api/apiClient';

export class VehicleService {
    
    private readonly baseUrl = '/cars';

    async createVehicle(vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> {
        const response = await apiClient.post<Vehicle>(this.baseUrl, vehicle);
        return response.data;
    }

    async getVehicles(): Promise<Vehicle[]> {
        const response = await apiClient.get<Vehicle[]>(this.baseUrl);
        return Array.isArray(response.data) ? response.data : [];
    }

    async updateVehicle(id: string, vehicle: Partial<Vehicle>): Promise<Vehicle> {
        const response = await apiClient.patch<Vehicle>(`${this.baseUrl}/${id}`, vehicle);
        return response.data;
    }

    async getVehiclesForUser(userId: string): Promise<Vehicle[]> {
        const response = await apiClient.get<Vehicle[]>(`${this.baseUrl}/user/${userId}`);
        return Array.isArray(response.data) ? response.data : [];
    }
    
    async deleteVehicle(id: string): Promise<void> {
        await apiClient.delete(`${this.baseUrl}/${id}`);
    }
}
