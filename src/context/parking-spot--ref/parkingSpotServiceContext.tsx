import { createContext, useContext, useEffect, useState } from 'react';
import { ParkingSpot } from '../../interface/parking-spots/parkingSpots.interface';
import ParkingSpotService from '../../hooks/parking-spots--ref/parkingSpotService';
import { ParkingSpotContextProps } from '../../interface/parking-spots/parkingSpotContextProps.interface';

const ParkingSpotContext = createContext<ParkingSpotContextProps | undefined>(undefined);

export const ParkingSpotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const refreshParkingSpots = async () => {
        setLoading(true);
        setError(null);
        try {
            const spots = await ParkingSpotService.getParkingSpots();
            setParkingSpots(spots);
        } catch (err: any) {
            setError('Eroare la încărcarea locurilor de parcare.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshParkingSpots();
    }, []);

    return (
        <ParkingSpotContext.Provider value={{ parkingSpots, loading, error, refreshParkingSpots }}>
            {children}
        </ParkingSpotContext.Provider>
    );
};

export const useParkingSpotContext = () => {
    const context = useContext(ParkingSpotContext);
    if (!context) {
        throw new Error('useParkingSpotContext trebuie utilizat în interiorul unui ParkingSpotProvider.');
    }
    return context;
};
