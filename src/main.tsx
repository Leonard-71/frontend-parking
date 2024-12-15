import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { VehicleServiceProvider } from './context/vehicle/vehicleServiceContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VehicleServiceProvider>
      <App />
    </VehicleServiceProvider>
  </StrictMode>,
);
