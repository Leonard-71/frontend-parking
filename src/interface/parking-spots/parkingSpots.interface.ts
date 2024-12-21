export interface ParkingSpot {
  id: string;
  spotNumber: string; 
  type: 'inside' | 'outside'; 
  isOccupied: boolean; 
  createdAt: string; 
  updatedAt: string;
}
