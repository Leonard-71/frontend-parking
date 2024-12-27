import { AuthProvider } from "../auth/AuthContext";
import { CarServiceProvider } from "../homepage/CarServiceContext";
import { ParkingSpotProvider } from "../parking-spot/parkingSpotServiceContext";
import { RegisterProvider } from "../register/registerContext";
import { UserProvider } from "../UserContext";
import { VehicleProvider } from "../vehicle/VehicleContext";
import { VehicleServiceProvider } from "../vehicle/vehicleServiceContext";


const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AuthProvider>
            <RegisterProvider>
                <UserProvider>
                    <VehicleProvider>
                        <ParkingSpotProvider>
                            <CarServiceProvider>
                                <VehicleServiceProvider>
                                    {children}
                                </VehicleServiceProvider>
                            </CarServiceProvider>
                        </ParkingSpotProvider>
                    </VehicleProvider>
                </UserProvider>
            </RegisterProvider>
        </AuthProvider>
    );
};

export default AppProviders;
