import { Vehicle } from './vehicle.interface';

export interface VehicleFormProps {
    initialData?: Vehicle;
    onSave: (vehicle: Omit<Vehicle, 'id'>) => void;
    onCancel: () => void;
}
