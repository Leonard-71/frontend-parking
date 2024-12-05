import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Subscription from './pages/Subscription';
import Vehicles from './pages/Vehicles';
import SubscriptionHistory from './pages/SubscriptionHistory';
import UserProfile from './pages/UserProfile';

import AuthenticatedLayout from './components/Layouts/AuthenticatedLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthenticatedLayout />}>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/subscription-history" element={<SubscriptionHistory />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
