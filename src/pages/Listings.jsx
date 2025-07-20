// src/pages/Listings.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TenantSearchBar from "../components/TenantSearchBar";
import "../styles/Listings.css"; // keep using the BrowsePGs styling

const pgData = [
  {
    id: "skyline-pg",
    name: "Skyline PG for Girls, Koramangala",
    location: "Koramangala, Bangalore",
    rating: 4.8,
    price: 12500,
    tags: ["Verified", "Top Rated"],
    availability: "3 beds available",
    sharing: "Double Sharing",
    occupancy: "12/15 occupied"
  },
  {
    id: "urban-nest",
    name: "Urban Nest Co-living, Gachibowli",
    location: "Gachibowli, Hyderabad",
    rating: 4.6,
    price: 9800,
    tags: ["Verified", "New"],
    availability: "7 beds available",
    sharing: "Single Sharing",
    occupancy: "13/20 occupied"
  },
  {
    id: "comfort-zone",
    name: "Comfort Zone PG, Andheri West",
    location: "Andheri West, Mumbai",
    rating: 4.9,
    price: 15000,
    tags: ["Premium", "Verified"],
    availability: "2 beds available",
    sharing: "Triple Sharing",
    occupancy: "10/12 occupied"
  },
  {
    id: "student-haven",
    name: "Student Haven, Sector 18",
    location: "Sector 18, Noida",
    rating: 4.5,
    price: 8500,
    tags: ["Budget Friendly"],
    availability: "5 beds available",
    sharing: "Double Sharing",
    occupancy: "13/18 occupied"
  },
  {
    id: "elite-girls",
    name: "Elite Girls Hostel, HSR Layout",
    location: "HSR Layout, Bangalore",
    rating: 4.7,
    price: 13500,
    tags: ["Top Rated", "Verified"],
    availability: "1 bed available",
    sharing: "Single Sharing",
    occupancy: "9/10 occupied"
  },
  {
    id: "tech-hub",
    name: "Tech Hub PG, Whitefield",
    location: "Whitefield, Bangalore",
    rating: 4.4,
    price: 11000,
    tags: ["New", "Verified"],
    availability: "8 beds available",
    sharing: "Double Sharing",
    occupancy: "17/25 occupied"
  },
  {
    id: "pearl-pg",
    name: "Pearl PG for Girls, Kothrud",
    location: "Kothrud, Pune",
    rating: 4.3,
    price: 10000,
    tags: ["Verified", "Budget Friendly"],
    availability: "4 beds available",
    sharing: "Double Sharing",
    occupancy: "8/12 occupied"
  },
  {
    id: "sunshine-pg",
    name: "Sunshine PG, Salt Lake",
    location: "Salt Lake, Kolkata",
    rating: 4.2,
    price: 9000,
    tags: ["New"],
    availability: "6 beds available",
    sharing: "Triple Sharing",
    occupancy: "9/15 occupied"
  },
  {
    id: "green-nest",
    name: "Green Nest Hostel, Anna Nagar",
    location: "Anna Nagar, Chennai",
    rating: 4.6,
    price: 11200,
    tags: ["Verified", "Top Rated"],
    availability: "2 beds available",
    sharing: "Double Sharing",
    occupancy: "14/16 occupied"
  },
  {
    id: "bliss-coliving",
    name: "Bliss Co-Living, Hinjewadi",
    location: "Hinjewadi, Pune",
    rating: 4.5,
    price: 10500,
    tags: ["Verified", "Premium"],
    availability: "5 beds available",
    sharing: "Single Sharing",
    occupancy: "10/14 occupied"
  }
];

const Listings = () => {
  const navigate = useNavigate();
  const [filteredPgData, setFilteredPgData] = useState(pgData);

  const handleSearch = (searchParams) => {
    let filtered = [...pgData];
    
    // Filter by location
    if (searchParams.location) {
      filtered = filtered.filter(pg => 
        pg.location.toLowerCase().includes(searchParams.location.toLowerCase())
      );
    }
    
    // Filter by tenant type (if implemented in pgData)
    if (searchParams.tenantType) {
      // You can add tenant type filtering logic here
      // For now, we'll just pass through
    }
    
    // Filter by budget
    if (searchParams.budget && searchParams.budget.length === 2) {
      const [minBudget, maxBudget] = searchParams.budget;
      filtered = filtered.filter(pg => 
        pg.price >= minBudget && pg.price <= maxBudget
      );
    }
    
    setFilteredPgData(filtered);
  };

  const handleViewDetails = (pgId) => {
    navigate(`/book-pg/${pgId}`);
  };

  return (
    <div className="browsepgs-container">
      <div className="search-section">
        <h2 className="search-title">Find Your Perfect PG</h2>
        <TenantSearchBar onSearch={handleSearch} />
      </div>
      <h1>Available PGs</h1>
      <p>{filteredPgData.length} properties found</p>
      <div className="pg-grid">
        {filteredPgData.map((pg, index) => (
          <div className="pg-card" key={index}>
            <div className="pg-tags">
              {pg.tags.map((tag, i) => (
                <span
                  className={`tag ${tag.toLowerCase().replace(/ /g, "-")}`}
                  key={i}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2>{pg.name}</h2>
            <p className="location">{pg.location}</p>
            <p className="rating">⭐ {pg.rating}</p>
            <p className="price">₹{pg.price.toLocaleString()}/month</p>
            <p>{pg.sharing}</p>
            <p>Occupancy: {pg.occupancy}</p>
            <p className="availability">Availability: {pg.availability}</p>
            <button 
              className="details-btn"
              onClick={() => handleViewDetails(pg.id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;

