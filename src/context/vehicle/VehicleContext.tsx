import { createContext, useState, ReactNode } from 'react';
import { Vehicle } from '../../interface/vehicle/vehicle.interface';
import { toast } from 'react-toastify';
import { useVehicleService } from '../../hooks/vehicle/useVehicleService';

interface VehicleContextType {
    vehicles: Vehicle[];
    fetchVehicles: (userId: string) => Promise<void>;
    saveVehicle: (vehicle: Omit<Vehicle, 'id'>, userId: string) => Promise<void>;
    deleteVehicle: (id: string, type: 'soft' | 'hard') => Promise<void>;
    loading: boolean;
    error: string | null;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const vehicleService = useVehicleService();

    const fetchVehicles = async (userId: string) => {
        setLoading(true);
        setError(null);
        try {
            const fetchedVehicles = await vehicleService.getVehiclesForUser(userId);
            setVehicles(fetchedVehicles);
        } catch (err) {
            console.error('Error fetching vehicles:', err);
            setError('Eroare la încărcarea vehiculelor.');
            toast.error('Eroare la încărcarea vehiculelor.');
        } finally {
            setLoading(false);
        }
    };

    const saveVehicle = async (vehicle: Omit<Vehicle, 'id'>, userId: string) => {
        setLoading(true);
        setError(null);

        try {
            const vehicleWithUserId = { ...vehicle, userId };

            if (vehicleService) {
                await vehicleService.createVehicle(vehicleWithUserId);
                await fetchVehicles(userId);
                toast.success('Vehiculul a fost salvat cu succes.');
            }
        } catch (err) {
            console.error('Error saving vehicle:', err);
            setError('Eroare la salvarea vehiculului.');
            toast.error('Eroare la salvarea vehiculului.');
        } finally {
            setLoading(false);
        }
    };

    const deleteVehicle = async (id: string, type: 'soft' | 'hard') => {
        setLoading(true);
        setError(null);
        try {
            if (type === 'soft') {
                await vehicleService.softDeleteVehicle(id);
            } else {
                await vehicleService.hardDeleteVehicle(id);
            }
            toast.success(`Vehiculul a fost șters (${type}).`);
        } catch (err) {
            console.error('Error deleting vehicle:', err);
            setError(`Eroare la ștergerea vehiculului (${type}).`);
            toast.error(`Eroare la ștergerea vehiculului (${type}).`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <VehicleContext.Provider
            value={{
                vehicles,
                fetchVehicles,
                saveVehicle,
                deleteVehicle,
                loading,
                error,
            }}
        >
            {children}
        </VehicleContext.Provider>
    );
};

export default VehicleContext;
