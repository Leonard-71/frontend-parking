import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { isTokenExpired } from "../utils/tokenUtils";

function AuthenticatedLayout() {
  const token = localStorage.getItem("access_token");

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AuthenticatedLayout;
