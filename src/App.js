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
import ForgotPassword from "./pages/ForgotPassword";
import TenantDashboard from "./pages/TenantDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import BookPG from "./pages/BookPG";
import MyReviews from "./pages/MyReviews";
import MyProfile from "./pages/MyProfile";
import NavbarDashboard from "./components/NavbarDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/global.css";

function AppContent() {
  const location = useLocation();

  // Paths where Navbar and Footer should be hidden (e.g., login only)
  const hideLayoutPaths = ["/login","/register","/forgot-password"];
  const hideLayout = hideLayoutPaths.includes(location.pathname);
const isDashboard = location.pathname.startsWith("/tenant/dashboard") || location.pathname.startsWith("/owner/dashboard") || location.pathname.startsWith("/owner/create-listing") || location.pathname.startsWith("/owner/edit-listing") || location.pathname.startsWith("/my-reviews") || location.pathname.startsWith("/my-profile");


  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && (isDashboard ? <NavbarDashboard /> : <Navbar />)}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/book-pg/:id" element={<BookPG />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/tenant/dashboard" element={<TenantDashboard />} />
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/create-listing" element={<CreateListing />} />
          <Route path="/owner/edit-listing/:listingId" element={<EditListing />} />
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
