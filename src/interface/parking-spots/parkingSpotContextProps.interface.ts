import { ParkingSpot } from "./parkingSpots.interface";

export interface ParkingSpotContextProps {
    parkingSpots: ParkingSpot[];
    loading: boolean;
    error: string | null;
    refreshParkingSpots: () => void;
}