import { useState, useEffect } from 'react';
import { VEHICLE_TEXTS } from '../translations/vehicles/vehecles';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState<{ id: number; model: string; licensePlate: string; brand: string }[]>([]);
    const [vehicleModel, setVehicleModel] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [brand, setBrand] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState<number | null>(null);
    const [editingVehicle, setEditingVehicle] = useState<{ id: number; model: string; licensePlate: string; brand: string } | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

    useEffect(() => {
        if (editingVehicle) {
            setVehicleModel(editingVehicle.model);
            setLicensePlate(editingVehicle.licensePlate);
            setBrand(editingVehicle.brand);
        } else {
            setVehicleModel('');
            setLicensePlate('');
            setBrand('');
        }
    }, [editingVehicle]);

    const handleAddVehicle = (e: React.FormEvent) => {
        e.preventDefault();
        if (vehicleModel && licensePlate && brand) {
            if (editingVehicle) {
                setVehicles(vehicles.map(vehicle =>
                    vehicle.id === editingVehicle.id ? { ...vehicle, model: vehicleModel, licensePlate, brand } : vehicle
                ));
                setEditingVehicle(null);
            } else {
                const newVehicle = {
                    id: vehicles.length + 1,
                    model: vehicleModel,
                    licensePlate,
                    brand,
                };
                setVehicles([...vehicles, newVehicle]);
            }
            setVehicleModel('');
            setLicensePlate('');
            setBrand('');
        }
    };

    const toggleMenu = (id: number) => {
        setIsMenuOpen(prevState => prevState === id ? null : id);
    };

    const handleDeleteVehicle = (id: number) => {
        setConfirmDelete(id);
        setIsMenuOpen(null);
    };

    const confirmDeleteVehicle = () => {
        if (confirmDelete !== null) {
            setVehicles(vehicles.filter(vehicle => vehicle.id !== confirmDelete));
            setConfirmDelete(null);
        }
    };

    return (
        <div className="w-full flex flex-col bg-gradient-to-r from-gray-800 to-gray-900 ">
            <div className="flex-grow flex p-9 ">
                <div className="flex-1 pr-10">
                    <h2 className="text-3xl font-bold mb-8 text-white text-center drop-shadow-lg">{VEHICLE_TEXTS.vehicleList}</h2>
                    <div className="h-full overflow-y-auto">
                        <ul className="w-full">
                            {vehicles.map((vehicle) => (
                                <li key={vehicle.id} className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 relative">
                                    <h3 className="font-bold text-xl text-gray-800">{vehicle.licensePlate}</h3>
                                    <p className="text-gray-600">{VEHICLE_TEXTS.labelBrand} <span className="font-semibold">{vehicle.brand}</span></p>
                                    <p className="text-gray-600">{VEHICLE_TEXTS.labelModel} <span className="font-semibold">{vehicle.model}</span></p>
                                    <button className="absolute top-2 right-2 focus:outline-none text-gray-600 hover:text-gray-800" onClick={() => toggleMenu(vehicle.id)}>
                                        •••
                                    </button>
                                    {isMenuOpen === vehicle.id && (
                                        <div className="absolute right-2 top-10 bg-white border border-gray-300 rounded shadow-lg z-10">
                                            <button onClick={() => {
                                                setEditingVehicle(vehicle);
                                                setIsMenuOpen(null);
                                            }} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-200">{VEHICLE_TEXTS.titleEdit}</button>
                                            <button onClick={() => handleDeleteVehicle(vehicle.id)} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-200">{VEHICLE_TEXTS.delete}</button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex-1 pl-4">
                    <h1 className="text-3xl font-bold mb-8 text-white text-center drop-shadow-lg">{editingVehicle ? VEHICLE_TEXTS.titleEdit : VEHICLE_TEXTS.titleAdd}</h1>
                    <form onSubmit={handleAddVehicle} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full">
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="licensePlate">{VEHICLE_TEXTS.licensePlate}</label>
                                <input
                                    type="text"
                                    id="licensePlate"
                                    placeholder={VEHICLE_TEXTS.licensePlate}
                                    value={licensePlate}
                                    onChange={(e) => setLicensePlate(e.target.value)}
                                    className="border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">{VEHICLE_TEXTS.brand}</label>
                                <input
                                    type="text"
                                    id="brand"
                                    placeholder={VEHICLE_TEXTS.brand}
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">{VEHICLE_TEXTS.model}</label>
                                <input
                                    type="text"
                                    id="model"
                                    placeholder={VEHICLE_TEXTS.model}
                                    value={vehicleModel}
                                    onChange={(e) => setVehicleModel(e.target.value)}
                                    className="border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 w-full mr-2">
                                {editingVehicle ? VEHICLE_TEXTS.save : VEHICLE_TEXTS.add}
                            </button>
                            {editingVehicle && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingVehicle(null);
                                        setVehicleModel('');
                                        setLicensePlate('');
                                        setBrand('');
                                    }}
                                    className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200 w-full"
                                >
                                    {VEHICLE_TEXTS.cancel}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            {confirmDelete !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">{VEHICLE_TEXTS.deleteConfirmationTitle}</h2>
                        <p>{VEHICLE_TEXTS.messagedeleteConfirmation}</p>
                        <div className="flex justify-between mt-2">
                            <button onClick={() => setConfirmDelete(null)} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-400">{VEHICLE_TEXTS.cancel}</button>
                            <button onClick={confirmDeleteVehicle} className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700">{VEHICLE_TEXTS.delete}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Vehicles; 