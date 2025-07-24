import { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  User,
  Phone,
  Mail,
  Package,
  MapPin,
  Home
} from "lucide-react";

const NewShipment = () => {
  const [form, setForm] = useState({
    sender: "",
    receiver: "",
    phone: "",
    email: "",
    size: "",
    city: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("You must be logged in to create a shipment.");
      return;
    }

    try {
      await addDoc(collection(db, "shipments"), {
        ...form,
        user: auth.currentUser.uid,
        status: "Pending",
        createdAt: serverTimestamp()
      });

      alert("Shipment Created!");
      setForm({
        sender: "",
        receiver: "",
        phone: "",
        email: "",
        size: "",
        city: "",
        address: "",
      });
    } catch (error) {
      console.error("Firestore Error:", error);
      alert("Failed to create shipment. Please try again.");
    }
  };

  const fields = [
    { name: "sender", label: "Sender Name", icon: <User size={18} /> },
    { name: "receiver", label: "Receiver Name", icon: <User size={18} /> },
    { name: "phone", label: "Phone Number", icon: <Phone size={18} /> },
    { name: "email", label: "Email", icon: <Mail size={18} /> },
    { name: "size", label: "Package Size", icon: <Package size={18} /> },
    { name: "city", label: "City", icon: <MapPin size={18} /> },
    { name: "address", label: "Delivery Address", icon: <Home size={18} /> },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-950 border border-gray-800 p-8 rounded-2xl shadow-xl max-w-xl w-full space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-rose-400">📦 New Shipment</h2>

        {fields.map(({ name, label, icon }) => (
          <div key={name} className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
            <input
              type="text"
              placeholder={label}
              value={form[name]}
              onChange={(e) => setForm({ ...form, [name]: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-rose-600 hover:bg-rose-500 text-white font-medium py-2.5 px-4 rounded-md shadow-md transition"
        >
          🚀 Submit Shipment
        </button>
      </form>
    </div>
  );
};

export default NewShipment;
