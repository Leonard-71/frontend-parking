import { useContext } from 'react'; 
import { VehicleService } from '../../services/vehicle/VehicleService';
import VehicleServiceContext from '../../context/vehicle/vehicleServiceContext';

export const useVehicleService = (): VehicleService => {
    const context = useContext(VehicleServiceContext);
    if (!context) {
        throw new Error('useVehicleService must be used within VehicleServiceProvider');
    }
    return context;
};
