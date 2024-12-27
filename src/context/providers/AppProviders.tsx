import { AuthProvider } from '../auth/AuthContext';
import { RegisterProvider } from '../register/registerContext';
import { UserProvider } from '../user/UserContext';
import { VehicleProvider } from '../vehicle/VehicleContext';
import { CarServiceProvider } from '../homepage/CarServiceContext';
import { VehicleServiceProvider } from '../vehicle/vehicleServiceContext';
import { ParkingSpotProvider } from '../parking-spot/parkingSpotServiceContext';
import { SubscriptionProvider } from '../subscription/SubscriptionContext';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <RegisterProvider>
                <UserProvider>
                    <SubscriptionProvider>
                        <VehicleServiceProvider>
                            <VehicleProvider>
                                <CarServiceProvider>
                                    <ParkingSpotProvider>
                                        {children}
                                    </ParkingSpotProvider>
                                </CarServiceProvider>
                            </VehicleProvider>
                        </VehicleServiceProvider>
                    </SubscriptionProvider>
                </UserProvider>
            </RegisterProvider>
        </AuthProvider>
    );
};
export default AppProviders;
