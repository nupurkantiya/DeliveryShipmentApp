import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { Package, Ruler } from "lucide-react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const COLORS_STATUS = ["#4ade80", "#3b82f6", "#facc15"]; // Delivered, In Transit, Pending
const COLORS_SIZE = ["#f472b6", "#fb923c", "#a78bfa"];   // Small, Medium, Large

const Analytics = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "shipments"), (snapshot) => {
      const shipmentData = snapshot.docs.map((doc) => doc.data());
      setShipments(shipmentData);
    });

    return () => unsubscribe();
  }, []);

  const statusData = [
    { name: "Delivered", value: shipments.filter(s => s.status === "Delivered").length },
    { name: "In Transit", value: shipments.filter(s => s.status === "In Transit").length },
    { name: "Pending", value: shipments.filter(s => s.status === "Pending").length },
  ];

  const sizeData = [
    { name: "Small", value: shipments.filter(s => s.size <= 2).length },
    { name: "Medium", value: shipments.filter(s => s.size > 2 && s.size <= 4).length },
    { name: "Large", value: shipments.filter(s => s.size > 4).length },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-10">
      {/* Shipment Status Chart */}
      <div className="bg-gray-900 rounded-2xl p-6 shadow hover:shadow-lg transition">
        <div className="flex items-center gap-2 mb-4 text-rose-400 text-xl font-semibold">
          <Package className="w-5 h-5" />
          Shipment Status
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-status-${index}`} fill={COLORS_STATUS[index % COLORS_STATUS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Package Size Chart */}
      <div className="bg-gray-900 rounded-2xl p-6 shadow hover:shadow-lg transition">
        <div className="flex items-center gap-2 mb-4 text-rose-400 text-xl font-semibold">
          <Ruler className="w-5 h-5" />
          Package Size
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={sizeData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
              dataKey="value"
            >
              {sizeData.map((entry, index) => (
                <Cell key={`cell-size-${index}`} fill={COLORS_SIZE[index % COLORS_SIZE.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
