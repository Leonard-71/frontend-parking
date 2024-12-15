import { useEffect, useState } from 'react';
import { Vehicle } from '../../interface/vehicle/vehicle.interface';
import { VEHICLE_TEXTS } from '../../translations/vehicles/vehecles';
import { getGlobalUserId } from '../../hooks/userIdStore';

interface VehicleFormProps {
    initialData?: Omit<Vehicle, 'id'>;
    onSave: (vehicle: Omit<Vehicle, 'id' | 'userId'> & { userId: string | null }) => void;
    onCancel: () => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ initialData, onSave, onCancel }) => {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');

    useEffect(() => {
        if (initialData) {
            setRegistrationNumber(initialData.registrationNumber || '');
            setBrand(initialData.brand);
            setModel(initialData.model);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userId = getGlobalUserId();
        const vehicleData = { registrationNumber, brand, model, userId };
        onSave(vehicleData);
        setRegistrationNumber('');
        setBrand('');
        setModel('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full">
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">{VEHICLE_TEXTS.licensePlate}</label>
                    <input
                        value={registrationNumber}
                        onChange={(e) => setRegistrationNumber(e.target.value)}
                        className="border rounded-lg w-full py-2 px-3"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">{VEHICLE_TEXTS.brand}</label>
                    <input
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="border rounded-lg w-full py-2 px-3"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">{VEHICLE_TEXTS.model}</label>
                    <input
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="border rounded-lg w-full py-2 px-3"
                        required
                    />
                </div>
            </div>
            <div className="flex justify-between mt-6">
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                    {VEHICLE_TEXTS.save}
                </button>
                <button type="button" onClick={onCancel} className="bg-red-600 text-white py-2 px-4 rounded">
                    {VEHICLE_TEXTS.cancel}
                </button>
            </div>
        </form>
    );
};

export default VehicleForm;
