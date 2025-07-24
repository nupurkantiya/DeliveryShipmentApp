import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {
  LayoutDashboard,
  PackagePlus,
  Truck,
  Moon,
  LogOut,
  ArrowLeftCircle,
  Menu
} from "lucide-react";

const Sidebar = ({ user }) => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirect to Home after logout
  };

  const isActive = (path) =>
    location.pathname === path ? "text-rose-400 font-semibold" : "text-gray-300";

  return (
    <div
      className={`bg-gray-900 text-white h-screen p-4 transition-all duration-300 
      ${open ? "w-64" : "w-20"} flex flex-col fixed sm:relative z-50 shadow-lg`}
    >
      <div className="flex justify-start mb-6">
        <button
          onClick={() => setOpen(!open)}
          className="focus:outline-none text-white"
          title="Toggle Sidebar"
        >
          {open ? <ArrowLeftCircle size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="mb-6">
        {open && <p className="text-sm text-gray-400">Welcome,</p>}
        <p
          className={`font-semibold text-rose-400 text-sm truncate ${
            !open && "text-center"
          }`}
        >
          {user?.email}
        </p>
      </div>

      <nav className="flex-1 space-y-3 text-sm">
        <Link to="/" className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition ${isActive("/")}`}>
          <LayoutDashboard size={18} /> {open && "Dashboard"}
        </Link>
        <Link
          to="/new-shipment"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition ${isActive("/new-shipment")}`}
        >
          <PackagePlus size={18} /> {open && "New Shipment"}
        </Link>
        <Link
          to="/track"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition ${isActive("/track")}`}
        >
          <Truck size={18} /> {open && "Track Shipments"}
        </Link>
      </nav>

      <button
        onClick={() => document.documentElement.classList.toggle("dark")}
        className={`mt-6 text-sm bg-gray-800 text-white rounded-lg px-3 py-2 hover:bg-gray-700 transition w-full flex items-center justify-center gap-2 ${
          !open && "text-xs px-2 py-1"
        }`}
      >
        <Moon size={16} /> {open && "Toggle Dark Mode"}
      </button>

      <button
        onClick={handleLogout}
        className={`mt-4 bg-rose-600 text-white px-3 py-2 rounded-lg hover:bg-rose-500 transition w-full flex items-center justify-center gap-2 ${
          !open && "text-xs px-2 py-1"
        }`}
      >
        <LogOut size={16} /> {open && "Logout"}
      </button>
    </div>
  );
};

export default Sidebar;
