import { Vehicle } from "./vehicle.interface";

export interface VehicleFormProps {
    initialData?: Partial<Vehicle>;
    onSave: (data: Omit<Vehicle, 'id'>) => void;
    onCancel: () => void;
}