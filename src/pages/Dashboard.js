import React, { useEffect, useState, useContext } from "react";
import { Package, Truck, Send, BarChart } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import Analytics from "../pages/Analytics";
import { ThemeContext } from "../context/ThemeContext"; // ✅ Step 1: Import theme context

const Dashboard = () => {
  const [shipments, setShipments] = useState([]);
  const { darkMode } = useContext(ThemeContext); // ✅ Step 2: Use theme context

  useEffect(() => {
    const fetchShipments = async () => {
      const q = query(collection(db, "shipments"), where("user", "==", auth.currentUser?.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setShipments(data);
    };

    fetchShipments();
  }, []);

  // ✅ Step 3: Define dynamic classes
  const containerClass = darkMode ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900";
  const cardClass = darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  const iconColor = darkMode ? "text-rose-400" : "text-rose-600";
  const headingColor = darkMode ? "text-rose-400" : "text-rose-600";

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${containerClass}`}>
      <h1 className={`text-3xl font-bold mb-6 ${headingColor}`}>Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className={`${cardClass} rounded-xl p-6 shadow hover:shadow-lg transition`}>
          <div className="flex items-center gap-4">
            <Package className={iconColor} />
            <div>
              <p className="text-lg font-semibold">Total Shipments</p>
              <p className="text-2xl">{shipments.length}</p>
            </div>
          </div>
        </div>

        <div className={`${cardClass} rounded-xl p-6 shadow hover:shadow-lg transition`}>
          <div className="flex items-center gap-4">
            <Send className={iconColor} />
            <div>
              <p className="text-lg font-semibold">New Requests</p>
              <p className="text-2xl">
                {shipments.filter((s) => s.status === "Pending").length}
              </p>
            </div>
          </div>
        </div>

        <div className={`${cardClass} rounded-xl p-6 shadow hover:shadow-lg transition`}>
          <div className="flex items-center gap-4">
            <Truck className={iconColor} />
            <div>
              <p className="text-lg font-semibold">In Transit</p>
              <p className="text-2xl">
                {shipments.filter((s) => s.status === "In Transit").length}
              </p>
            </div>
          </div>
        </div>

        <div className={`${cardClass} rounded-xl p-6 shadow hover:shadow-lg transition`}>
          <div className="flex items-center gap-4">
            <BarChart className={iconColor} />
            <div>
              <p className="text-lg font-semibold">Delivered</p>
              <p className="text-2xl">
                {shipments.filter((s) => s.status === "Delivered").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {shipments.length > 0 && (
        <div className="mt-12">
          <Analytics shipments={shipments} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
