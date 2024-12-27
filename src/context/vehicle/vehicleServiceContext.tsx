import { createContext, ReactNode } from 'react';
import { VehicleService } from '../../services/vehicle/VehicleService';

const VehicleServiceContext = createContext<VehicleService | null>(null);

export const VehicleServiceProvider = ({ children }: { children: ReactNode }) => {
    const vehicleService = new VehicleService();
    return (
        <VehicleServiceContext.Provider value={vehicleService}>
            {children}
        </VehicleServiceContext.Provider>
    );
};

export default VehicleServiceContext;
