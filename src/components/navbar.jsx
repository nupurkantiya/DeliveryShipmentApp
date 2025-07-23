// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/">Login</Link>{" | "}
      <Link to="/register">Register</Link>{" | "}
      {user && (
        <>
          <Link to="/dashboard">Dashboard</Link>{" | "}
          <Link to="/create-shipment">Create Shipment</Link>{" | "}
          <Link to="/track-shipment">Track Shipment</Link>{" | "}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
