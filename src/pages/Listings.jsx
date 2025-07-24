// src/pages/Listings.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TenantSearchBar from "../components/TenantSearchBar";
import TenantDashboardNavbar from '../components/TenantDashboardNavbar';
import "../styles/Listings.css"; // keep using the BrowsePGs styling
import listingService from "../services/ListingService"; // Adjust the import path as needed
import { useEffect } from "react";


function buildTags(pg) {
  const tags = [];
  if (pg.isWifiAvilable) tags.push("Wi-Fi");
  if (pg.isAcAvilable) tags.push("A/C");
  if (pg.isMealsAvilable) tags.push("Meals");
  if (pg.isLaudryAvilable) tags.push("Laundry");
  if (pg.isCctvAvilable) tags.push("CCTV");
  if (pg.isParkingAvilable) tags.push("Parking");
  if (pg.isCommonAreasAvilable) tags.push("Common Area");
  if (pg.isStudyDeskAvilable) tags.push("Study Desk");
  return tags;
}

function mapBackendToUI(pg) {
  return {
    id: pg.id,
    name: pg.title,
    location: pg.address,
    price: pg.rent, // Ensure this 'rent' property from backend is a number or can be parsed
    tags: buildTags(pg),
    sharing: pg.roomType,
    // rating, availability, occupancy: backend has no info, so set demo/static
    rating: 4.5,
    availability: "Available",
    occupancy: "N/A",
    gender:pg.gender,
    imageUrl: pg.url || 'https://via.placeholder.com/300x200?text=No+Image', // Provide a fallback image
  };
}

const Listings = () => {
  const navigate = useNavigate();

  const [pgData, setPgData] = useState([]);
  const [filteredPgData, setFilteredPgData] = useState([]);

  useEffect(() => {
    listingService.getAllListings().then(data => {
      console.log("Raw Listings Data:", data);
      const mapped = data.map(mapBackendToUI);
      console.log("Mapped Listings:", mapped);
      mapped.reverse();
            setPgData(mapped);
      setFilteredPgData(mapped); // Initialize filtered data with all listings
    });
  }, []);

const handleSearch = (searchParams) => {
  let filtered = [...pgData];

  console.log('Search params received in Listings:', searchParams); // ✅ NEW: Check what is received here
  console.log('Original PG data for filtering:', pgData);

  // Location filter
  if (searchParams.location) {
    filtered = filtered.filter(pg =>
      pg.location?.toLowerCase().includes(searchParams.location.toLowerCase())
    );
    console.log('After location filter:', filtered);
  }

  // Gender filter
  if (searchParams.tenantType) {
    const genderInput = searchParams.tenantType.toLowerCase();

    // Mapping tenantType from SearchBar to what your PG backend might store (e.g., 'male', 'female', 'coed')
    // Make sure these match your actual backend gender values
    const acceptableGenders = [];
    if (genderInput === 'male') {
      acceptableGenders.push('male');
    } else if (genderInput === 'female') {
      acceptableGenders.push('female');
    } else if (genderInput === 'unisex') { // 'unisex' from TenantSearchBar maps to 'coed' or similar
      acceptableGenders.push('coed', 'co-ed', 'unisex', 'others'); // Add all relevant co-ed terms
    }

    console.log("Gender filter input:", genderInput);
    console.log("Acceptable genders for filtering:", acceptableGenders);

    if (acceptableGenders.length > 0) { // Only filter if there are acceptable genders
      filtered = filtered.filter(pg => {
        const pgGender = pg.gender?.toLowerCase(); // Make sure pg.gender exists and is lowercased
        const isMatch = pgGender && acceptableGenders.includes(pgGender);
        console.log(`Checking PG ID ${pg.id} - PG Gender: ${pgGender} - Match: ${isMatch}`);
        return isMatch;
      });
      console.log('After gender filter:', filtered);
    }
  }

  // Budget filter
  // ✅ FIX: Access budget from searchParams.budget array
  if (searchParams.budget && searchParams.budget.length === 2) {
    const [minBudget, maxBudget] = searchParams.budget; // Destructure the array here!

    console.log('Filtering budget from', minBudget, 'to', maxBudget);

    filtered = filtered.filter(pg => {
      // Ensure pg.price is a number. If it's a string, convert it.
      const pgPrice = typeof pg.price === 'string' ? parseFloat(pg.price) : pg.price;

      console.log(`Checking PG Price: ${pgPrice}. Min: ${minBudget}, Max: ${maxBudget}`);
      return (
        (!minBudget || pgPrice >= minBudget) && // If minBudget is 0 or undefined, it won't filter by min
        (!maxBudget || pgPrice <= maxBudget)
      );
    });

    console.log('After budget filter:', filtered);
  }


  console.log('Final filtered PGs:', filtered);
  setFilteredPgData(filtered);
};


  const handleViewDetails = (pgId) => {
    navigate(`/book-pg/${pgId}`);
  };

  return (
    <>
      <div className="browsepgs-container">
        <div className="search-section">
          <h2 className="search-title">Find Your Perfect PG</h2>
          <TenantSearchBar onSearch={handleSearch} />
        </div>
        <h1>Available PGs</h1>
        <p>{filteredPgData.length} properties found</p>
        <div className="pg-grid">
          {filteredPgData.length === 0 && pgData.length > 0 ? (
            <p>No properties found matching your criteria. Try adjusting your filters.</p>
          ) : filteredPgData.length === 0 && pgData.length === 0 ? (
            <p>Loading properties...</p> // Or "No properties available." if initial fetch returns empty
          ) : (
            filteredPgData.map((pg, index) => (
              <div className="pg-card" key={index}>
                <div className="pg-card-image-container">
                <img src={pg.imageUrl} alt={pg.name} className="pg-card-image" />
              </div>

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
                {/* <p>Occupancy: {pg.occupancy}</p> */}
                <p className="availability">Availability: {pg.availability}</p>
                <button
                  className="details-btn"
                  onClick={() => handleViewDetails(pg.id)}
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Listings;