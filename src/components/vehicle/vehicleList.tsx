import { useState, useEffect } from 'react';
import { VEHICLE_TEXTS } from '../../translations/vehicles/vehecles';
import { VehicleListProps } from '../../interface/vehicle/listProps.interface';

const VehicleList: React.FC<VehicleListProps> = ({ vehicles, onEdit, onDelete }) => {
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
        const handleClickOutside = () => setIsMenuOpen(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                    <li
                        key={vehicle.id}
                        className="bg-white border rounded-lg shadow-md p-4 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="font-bold text-lg">{vehicle.registrationNumber}</h3>
                        <p>{VEHICLE_TEXTS.labelBrand}: {vehicle.brand}</p>
                        <p>{VEHICLE_TEXTS.labelModel}: {vehicle.model}</p>

                        <button
                            className="absolute top-2 right-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleMenu(vehicle.id);
                            }}
                        >
                            •••
                        </button>

                        {isMenuOpen === vehicle.id && (
                            <div className="absolute top-8 right-2 bg-white shadow-lg border rounded">
                                <button onClick={() => onEdit(vehicle)} className="block px-4 py-2">
                                    {VEHICLE_TEXTS.titleEdit}
                                </button>
                                <button onClick={() => handleDeleteClick(vehicle.id, 'soft')} className="block px-4 py-2">
                                    {VEHICLE_TEXTS.softDelete}
                                </button>
                                <button onClick={() => handleDeleteClick(vehicle.id, 'hard')} className="block px-4 py-2">
                                    {VEHICLE_TEXTS.hardDelete}
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {showModal && deleteDetails && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <h2 className="font-bold">{VEHICLE_TEXTS.deleteConfirmationTitle}</h2>
                        <p>
                            {deleteDetails.type === 'soft'
                                ? VEHICLE_TEXTS.softDeleteDescription
                                : VEHICLE_TEXTS.hardDeleteDescription}
                        </p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setDeleteDetails(null);
                                }}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                {VEHICLE_TEXTS.cancel}
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(deleteDetails.id, deleteDetails.type);
                                    setShowModal(false);
                                    setDeleteDetails(null);
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                {VEHICLE_TEXTS.delete}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VehicleList;
