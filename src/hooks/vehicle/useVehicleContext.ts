import { useContext } from 'react';
import VehicleContext from '../../context/vehicle/VehicleContext';

export const useVehicleContext = () => {
    const context = useContext(VehicleContext);
    if (!context) {
        throw new Error('useVehicleContext trebuie utilizat în interiorul unui VehicleProvider.');
    }
    return context;
};
