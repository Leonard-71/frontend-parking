import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { isTokenExpired } from "../../hooks/api/tokenExpired";

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
