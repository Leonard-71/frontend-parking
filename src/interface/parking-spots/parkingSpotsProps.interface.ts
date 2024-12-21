import { ParkingSpot } from "./parkingSpots.interface";

export interface ParkingSpotsProps {
    onSpotSelect: (spot: ParkingSpot) => void;  
}
