import { createContext, useContext, ReactNode } from 'react';
import { VehicleService } from '../../hooks/vehicle/vehicleService';

const VehicleServiceContext = createContext<VehicleService | null>(null);

export const VehicleServiceProvider = ({ children }: { children: ReactNode }) => {
    const vehicleService = new VehicleService();

    return (
        <VehicleServiceContext.Provider value={vehicleService}>
            {children}
        </VehicleServiceContext.Provider>
    );
};

export const useVehicleService = (): VehicleService => {
    const context = useContext(VehicleServiceContext);
    if (!context) {
        throw new Error('useVehicleService must be used within VehicleServiceProvider');
    }
    return context;
};
