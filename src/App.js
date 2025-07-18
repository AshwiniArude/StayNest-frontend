import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TenantDashboard from "./pages/TenantDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import NavbarDashboard from "./components/NavbarDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/global.css";

function AppContent() {
  const location = useLocation();

  // Paths where Navbar and Footer should be hidden (e.g., login only)
  const hideLayoutPaths = ["/login","/register"];
  const hideLayout = hideLayoutPaths.includes(location.pathname);
const isDashboard = location.pathname.startsWith("/tenant/dashboard") || location.pathname.startsWith("/owner/dashboard");


  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && (isDashboard ? <NavbarDashboard /> : <Navbar />)}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tenant/dashboard" element={<TenantDashboard />} />
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
