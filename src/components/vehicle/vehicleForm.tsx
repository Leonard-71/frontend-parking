import { useState, useEffect } from 'react';
import { VEHICLE_TEXTS } from '../../translations/vehicles/vehecles';
import { VehicleFormProps } from '../../interface/vehicle/formProps.interface';

const VehicleForm: React.FC<VehicleFormProps> = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        registrationNumber: '',
        brand: '',
        model: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                registrationNumber: initialData.registrationNumber || '',
                brand: initialData.brand || '',
                model: initialData.model || '',
            });
        } else {
            setFormData({
                registrationNumber: '',
                brand: '',
                model: '',
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        setFormData({
            registrationNumber: '',
            brand: '',
            model: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block font-bold mb-2">{VEHICLE_TEXTS.licensePlate}</label>
                    <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        className="border rounded-lg w-full py-2 px-3"
                        required
                    />
                </div>
                <div>
                    <label className="block font-bold mb-2">{VEHICLE_TEXTS.brand}</label>
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="border rounded-lg w-full py-2 px-3"
                        required
                    />
                </div>
                <div>
                    <label className="block font-bold mb-2">{VEHICLE_TEXTS.model}</label>
                    <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="border rounded-lg w-full py-2 px-3"
                        required
                    />
                </div>
            </div>
            <div className="flex justify-between mt-6">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    {VEHICLE_TEXTS.save}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    {VEHICLE_TEXTS.cancel}
                </button>
            </div>
        </form>
    );
};

export default VehicleForm;
