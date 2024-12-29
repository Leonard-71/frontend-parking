import React, { createContext, useEffect, useState } from "react";
import { VehicleService } from "../../services/vehicle/VehicleService";
import { Vehicle } from "../../interface/vehicle/vehicle.interface";
import { getGlobalUserId } from "../../utils/userIdStore";
import { UserVehiclesContextProps } from "../../interface/user-vehicles/UserVehiclesContextProps.interface";


export const UserVehiclesContext = createContext<UserVehiclesContextProps | undefined>(undefined);
const vehicleService = new VehicleService();

export const UserVehiclesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userVehicles, setUserVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchUserVehicles = async () => {
        setIsLoading(true);
        try {
            const userId = getGlobalUserId();
            if (!userId) {
                throw new Error("User ID is not available.");
            }

            const data = await vehicleService.getVehiclesForUser(userId);
            setUserVehicles(data);
            setErrorMessage(null);
        } catch (err) {
            console.error("Error fetching user vehicles:", err);
            setErrorMessage("Failed to fetch user vehicles.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserVehicles();
    }, []);

    return (
        <UserVehiclesContext.Provider
            value={{
                userVehicles,
                isLoading,
                errorMessage,
                reloadVehicles: fetchUserVehicles,
            }}
        >
            {children}
        </UserVehiclesContext.Provider>
    );
};

