import { useEffect, useState } from 'react';
import { VEHICLE_TEXTS } from '../translations/vehicles/vehecles';
import { getGlobalUserId } from '../hooks/userIdStore';
import { Vehicle } from '../interface/vehicle/vehicle.interface';
import { useVehicleService } from '../hooks/vehicle/useVehicleService';
import VehicleList from '../components/vehicle/VehicleList';
import VehicleForm from '../components/vehicle/VehicleForm';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const userId = getGlobalUserId();
    const vehicleService = useVehicleService();

    const fetchVehicles = async () => {
        if (!userId) {
            setError('User ID is not available.');
            setLoading(false);
            return;
        }
        try {
            const data = await vehicleService.getVehiclesForUser(userId);
            setVehicles(data);
        } catch {
            setError('Failed to fetch vehicles.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleSaveVehicle = async (vehicle: Omit<Vehicle, 'id' | 'userId'>) => {
        const vehicleWithUserId = { ...vehicle, userId };
        try {
            if (editingVehicle) {
                await vehicleService.updateVehicle(editingVehicle.id, vehicleWithUserId);
            } else {
                await vehicleService.createVehicle(vehicleWithUserId);
            }
            setEditingVehicle(null);
            await fetchVehicles();
        } catch (error) {
            console.error('Failed to save vehicle:', error);
        }
    };

    const handleDeleteVehicle = async (id: string, type: 'soft' | 'hard') => {
        try {
            if (type === 'soft') {
                await vehicleService.softDeleteVehicle(id);
            } else {
                await vehicleService.hardDeleteVehicle(id);
            }
            await fetchVehicles();
        } catch (error) {
            console.error(`Failed to ${type} delete vehicle:`, error);
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <div className="w-full flex bg-gradient-to-r from-gray-800 to-gray-900 p-9">
            <div className="flex-[2] pr-4">
                <h2 className="text-3xl font-bold mb-4 text-white text-center drop-shadow-lg">
                    {VEHICLE_TEXTS.vehicleList}
                </h2>
                <div className="h-full overflow-auto">
                    <VehicleList
                        vehicles={vehicles}
                        onEdit={setEditingVehicle}
                        onDelete={handleDeleteVehicle}
                    />

                </div>
            </div>

            <div className="flex-[1] pl-4 flex flex-col justify-start">
                <h1 className="text-3xl font-bold mb-8 text-white text-center drop-shadow-lg">
                    {editingVehicle ? VEHICLE_TEXTS.titleEdit : VEHICLE_TEXTS.titleAdd}
                </h1>
                <VehicleForm
                    initialData={editingVehicle || undefined}
                    onSave={handleSaveVehicle}
                    onCancel={() => setEditingVehicle(null)}
                />
            </div>
        </div>
    );
};

export default Vehicles;
