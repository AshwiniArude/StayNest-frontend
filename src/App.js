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
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import BookPG from "./pages/BookPG";
import MyReviews from "./pages/MyReviews";
import MyProfile from "./pages/MyProfile";
import MyProfileOwner from "./pages/MyProfileOwner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OwnerNavbarDashboard from "./components/OwnerNavbarDashboard";
import "./styles/global.css";

function AppContent() {
  const location = useLocation();

  // Paths where Navbar and Footer should be hidden (e.g., login only)
  const hideLayoutPaths = ["/login","/register"];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  // Show owner navbar for owner dashboard routes
  const isOwnerDashboard = location.pathname.startsWith("/owner/dashboard") || location.pathname.startsWith("/owner/create-listing") || location.pathname.startsWith("/owner/edit-listing");

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && (isOwnerDashboard ? <OwnerNavbarDashboard /> : <Navbar />)}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/book-pg/:id" element={<BookPG />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-profile-owner" element={<MyProfileOwner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
