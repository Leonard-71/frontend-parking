import { useState, useEffect } from 'react';
import { Vehicle } from '../../interface/vehicle/vehicle.interface';
import { VEHICLE_TEXTS } from '../../translations/vehicles/vehecles';
declare var document: any;

const VehicleList: React.FC<{
    vehicles: Vehicle[];
    onEdit: (vehicle: Vehicle) => void;
    onDelete: (id: string, type: 'soft' | 'hard') => void;
}> = ({ vehicles, onEdit, onDelete }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteDetails, setDeleteDetails] = useState<{ id: string; type: 'soft' | 'hard' } | null>(null);

    const toggleMenu = (id: string) => {
        setIsMenuOpen((prev) => (prev === id ? null : id));
    };

    const handleDeleteClick = (id: string, type: 'soft' | 'hard') => {
        setDeleteDetails({ id, type });
        setShowModal(true);
    };

    useEffect(() => {
        if (typeof document !== "undefined") {
            const handleClickOutside = () => setIsMenuOpen(null);
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, []);

    return (
        <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                    <li
                        key={vehicle.id}
                        className="w-full max-w-[350px] mx-auto bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 relative"
                        onClick={(e) => e.stopPropagation()}
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
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleMenu(vehicle.id);
                            }}
                        >
                            •••
                        </button>
                        {isMenuOpen === vehicle.id && (
                            <div
                                className="absolute right-2 top-10 bg-white border border-gray-300 rounded shadow-lg z-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => onEdit(vehicle)}
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-200"
                                >
                                    {VEHICLE_TEXTS.titleEdit}
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(vehicle.id, 'soft')}
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-200"
                                >
                                    {VEHICLE_TEXTS.softDelete}
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(vehicle.id, 'hard')}
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-200"
                                >
                                    {VEHICLE_TEXTS.hardDelete}
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-lg font-bold mb-4">{VEHICLE_TEXTS.deleteConfirmationTitle}</h2>
                        <p className="text-gray-600 mb-6">
                            {deleteDetails?.type === 'soft'
                                ? VEHICLE_TEXTS.softDeleteDescription
                                : VEHICLE_TEXTS.hardDeleteDescription}
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setDeleteDetails(null);
                                }}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                {VEHICLE_TEXTS.cancel}
                            </button>
                            <button
                                onClick={() => {
                                    if (deleteDetails) {
                                        onDelete(deleteDetails.id, deleteDetails.type);
                                    }
                                    setShowModal(false);
                                    setDeleteDetails(null);
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                {VEHICLE_TEXTS.delete}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VehicleList;
