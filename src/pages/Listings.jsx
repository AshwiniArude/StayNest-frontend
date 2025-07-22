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
    price: pg.rent,
    tags: buildTags(pg),
    sharing: pg.roomType,
    // rating, availability, occupancy: backend has no info, so set demo/static
    rating: 4.5,
    availability: "Available",
    occupancy: "N/A",
    gender:pg.gender,
  };
}

const Listings = () => {
  const navigate = useNavigate();

  const [pgData, setPgData] = useState([]);
  const [filteredPgData, setFilteredPgData] = useState([]);

  useEffect(() => {
    listingService.getAllListings().then(data => {
      console.log("Raw Listings Data:", data); // ✅ Check if data is being fetched correctly
      const mapped = data.map(mapBackendToUI);
      console.log("Mapped Listings:", mapped); // ✅ Check if gender is showing here
  
      setPgData(mapped);
      setFilteredPgData(mapped);
    });
  }, []);

const handleSearch = (searchParams) => {
  let filtered = [...pgData];

  console.log('Search params:', searchParams);
  console.log('Original PG data:', pgData);

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

    const mappedGenders = {
      male: ['male'],
      female: ['female'],
      coed: ['coed', 'co-ed', 'others', 'unisex']
    };

    const acceptableGenders = mappedGenders[genderInput];
    console.log("Gender filter input:", genderInput);
    console.log("Acceptable genders:", acceptableGenders);

    if (acceptableGenders) {
      filtered = filtered.filter(pg => {
        const pgGender = pg.gender?.toLowerCase();
        const isMatch = pgGender && acceptableGenders.includes(pgGender);
        console.log(`Checking PG ID ${pg.id} - PG Gender: ${pgGender} - Match: ${isMatch}`);
        return isMatch;
      });
      console.log('After gender filter:', filtered);
    }
  }

  if (searchParams.minBudget || searchParams.maxBudget) {
  // Log values
  console.log('Filtering budget from', searchParams.minBudget, 'to', searchParams.maxBudget);

  filtered = filtered.filter(pg => {
    console.log(`Checking ${pg.price}`);
    return (
      (!searchParams.minBudget || pg.price >= parseInt(searchParams.minBudget)) &&
      (!searchParams.maxBudget || pg.price <= parseInt(searchParams.maxBudget))
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
    </>
  );
};

export default Listings;

