import React, { useState } from 'react';
import { Vehicle } from '../../interface/vehicle/vehicle.interface';
import { VEHICLE_TEXTS } from '../../translations/vehicles/vehecles';

const VehicleList: React.FC<{
    vehicles: Vehicle[];
    onEdit: (vehicle: Vehicle) => void;
    onDelete: (id: string) => void;
}> = ({ vehicles, onEdit, onDelete }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<string | null>(null);

    const toggleMenu = (id: string) => {
        setIsMenuOpen((prev) => (prev === id ? null : id));
    };

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
                <li
                    key={vehicle.id}
                    className="w-full max-w-[350px] mx-auto bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 relative"
                >
                    <h3 className="font-bold text-2xl text-gray-800">{vehicle.registrationNumber}</h3>
                    <p className="text-gray-600 text-lg mt-2">
                        {VEHICLE_TEXTS.labelBrand}:{' '}
                        <span className="font-semibold">{vehicle.brand}</span>
                    </p>
                    <p className="text-gray-600 text-lg">
                        {VEHICLE_TEXTS.labelModel}:{' '}
                        <span className="font-semibold">{vehicle.model}</span>
                    </p>
                    <button
                        className="absolute top-2 right-2 focus:outline-none text-gray-600 hover:text-gray-800"
                        onClick={() => toggleMenu(vehicle.id)}
                    >
                    </button>
                    {isMenuOpen === vehicle.id && (
                        <div className="absolute right-2 top-10 bg-white border border-gray-300 rounded shadow-lg z-10">
                            <button
                                onClick={() => onEdit(vehicle)}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-200"
                            >
                                {VEHICLE_TEXTS.titleEdit}
                            </button>
                            <button
                                onClick={() => onDelete(vehicle.id)}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-200"
                            >
                                {VEHICLE_TEXTS.delete}
                            </button>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default VehicleList;
