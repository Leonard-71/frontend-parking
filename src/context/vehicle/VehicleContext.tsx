import { createContext, useContext, useState, ReactNode } from 'react';
import { VehicleService } from '../../hooks/vehicle/vehicleService';
import { Vehicle } from '../../interface/vehicle/vehicle.interface';

interface VehicleContextProps {
    vehicles: Vehicle[];
    loading: boolean;
    error: string | null;
    fetchVehicles: (userId: string) => Promise<void>;
}

const VehicleContext = createContext<VehicleContextProps | undefined>(undefined);

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const vehicleService = new VehicleService();

    const fetchVehicles = async (userId: string) => {
        setLoading(true);
        setError(null);
        try {
            const userVehicles = await vehicleService.getVehiclesForUser(userId);
            setVehicles(userVehicles);
        } catch (err: any) {
            setError('Eroare la încărcarea vehiculelor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <VehicleContext.Provider value={{ vehicles, loading, error, fetchVehicles }}>
            {children}
        </VehicleContext.Provider>
    );
};

export const useVehicleContext = (): VehicleContextProps => {
    const context = useContext(VehicleContext);
    if (!context) {
        throw new Error('useVehicleContext trebuie utilizat în interiorul unui VehicleProvider.');
    }
    return context;
};
