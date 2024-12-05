import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function AuthenticatedLayout() {
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

