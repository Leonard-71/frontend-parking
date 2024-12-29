import { Vehicle } from "../vehicle/vehicle.interface";

export interface UserVehiclesContextProps {
    userVehicles: Vehicle[];
    isLoading: boolean;
    errorMessage: string | null;
    reloadVehicles: () => Promise<void>;
}