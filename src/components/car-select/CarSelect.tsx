import React, { useState } from "react";
import { useUserVehiclesContext } from "../../hooks/user-vehicles/useUserVehicles";
import { CAR_SELECT_TEXTS } from "../../translations/car-select/carSelect";

const CarSelect: React.FC = () => {
    const { userVehicles, isLoading, errorMessage } = useUserVehiclesContext();
    const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

    return (
        <div className="w-full max-w-md mx-auto mt-6">

            <div className="relative">
                <select
                    id="car-select"
                    className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-gray-800 text-sm transition-all"
                    value={selectedVehicleId || ""}
                    onChange={(e) => setSelectedVehicleId(e.target.value)}
                >
                    {isLoading ? (
                        <option value="" disabled>
                            {CAR_SELECT_TEXTS.loading}
                        </option>
                    ) : errorMessage ? (
                        <option value="" disabled>
                            {CAR_SELECT_TEXTS.error}
                        </option>
                    ) : userVehicles.length > 0 ? (
                        <>
                            <option value="" disabled>
                                {CAR_SELECT_TEXTS.selectCar}
                            </option>
                            {userVehicles.map((vehicle) => (
                                <option key={vehicle.id} value={vehicle.id}>
                                    {vehicle.registrationNumber}
                                </option>
                            ))}
                        </>
                    ) : (
                        <option value="" disabled>
                            {CAR_SELECT_TEXTS.noCars}
                        </option>
                    )}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">

                </div>
            </div>
        </div>
    );
};

export default CarSelect;
