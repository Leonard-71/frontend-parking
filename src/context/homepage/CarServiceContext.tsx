import { createContext, useContext } from "react";
import { CarService } from "../../hooks/homepage/carService";

const carServiceInstance = new CarService();

const CarServiceContext = createContext(carServiceInstance);

export const CarServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <CarServiceContext.Provider value={carServiceInstance}>
            {children}
        </CarServiceContext.Provider>
    );
};

export const useCarService = () => useContext(CarServiceContext);
