import { Vehicle } from "./vehicle.interface";

export interface VehicleListProps {
    vehicles: Vehicle[];
    onEdit: (vehicle: Vehicle) => void;
    onDelete: (id: string, type: 'soft' | 'hard') => void;
}
