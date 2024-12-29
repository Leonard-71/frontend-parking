import { useContext } from "react";
import { UserVehiclesContext } from "../../context/user-vehicles/UserVehiclesContext";
import { UserVehiclesContextProps } from "../../interface/user-vehicles/UserVehiclesContextProps.interface";

export const useUserVehiclesContext = (): UserVehiclesContextProps => {
    const context = useContext(UserVehiclesContext);
    if (!context) {
        throw new Error("useUserVehiclesContext must be used within a UserVehiclesProvider");
    }
    return context;
};
