import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { VehicleServiceProvider } from './context/vehicle/vehicleServiceContext.tsx';
import { CarServiceProvider } from './context/homepage/CarServiceContext.tsx';
import { ParkingSpotProvider } from './context/parking-spot/parkingSpotServiceContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ParkingSpotProvider>
      <CarServiceProvider>
        <VehicleServiceProvider>
          <App />
        </VehicleServiceProvider>
      </CarServiceProvider>
    </ParkingSpotProvider >
  </StrictMode >
);
