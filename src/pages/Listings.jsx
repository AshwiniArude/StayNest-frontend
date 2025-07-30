// src/pages/Listings.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TenantSearchBar from "../components/TenantSearchBar";
import TenantDashboardNavbar from '../components/TenantDashboardNavbar'; // Assuming this is needed
import "../styles/Listings.css";
import listingService from "../services/ListingService"; // Adjust the import path as needed

// Function to extract clean URLs from the messy backend string
function extractUrls(urlString) {
    if (!urlString || typeof urlString !== 'string') {
        return [];
    }
    // This regex looks for patterns starting with 'http' or 'https' and captures the URL
    // It's a bit of a hack for the malformed string, but should work for the provided example.
    const urlRegex = /(https?:\/\/[^\s"]+)/g;
    const matches = urlString.match(urlRegex);
    return matches || [];
}


function buildTags(pg) {
    const tags = [];
    // Corrected property names to match backend exactly
    if (pg.wifiAvilable) tags.push("Wi-Fi");
    if (pg.acAvilable) tags.push("A/C");
    if (pg.mealsAvilable) tags.push("Meals");
    if (pg.laudryAvilable) tags.push("Laundry");
    if (pg.cctvAvilable) tags.push("CCTV");
    if (pg.parkingAvilable) tags.push("Parking");
    if (pg.commonAreasAvilable) tags.push("Common Area");
    if (pg.studyDeskAvilable) tags.push("Study Desk");
    return tags;
}

function mapBackendToUI(pg) {
    const imageUrls = extractUrls(pg.urls[0]); // Pass the problematic URL string
    const firstImageUrl = imageUrls.length > 0 ? imageUrls[0] : 'https://via.placeholder.com/300x200?text=No+Image';

    // Determine sharing type
    let sharingType = "N/A";
    if (pg.roomDetails && pg.roomDetails.length > 0) {
        // You might want more sophisticated logic here if a PG has both private and shared rooms
        // For now, we'll just take the type of the first room detail, or prioritize "shared" if available.
        const privateRoom = pg.roomDetails.find(room => room.roomType === "private");
        const sharedRoom = pg.roomDetails.find(room => room.roomType === "shared");

        if (privateRoom && sharedRoom) {
            sharingType = "Private & Shared";
        } else if (privateRoom) {
            sharingType = "Private";
        } else if (sharedRoom) {
            sharingType = "Shared";
        }
    }


    return {
        id: pg.id,
        name: pg.title,
        location: pg.address,
        price: pg.rent,
        tags: buildTags(pg),
        sharing: sharingType, // Correctly derived from roomDetails
        rating: 4.5, // Static
        availability: "Available", // Static
        occupancy: "N/A", // Static
        gender: pg.gender,
        imageUrl: firstImageUrl, // Correctly parsed image URL
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
            mapped.reverse(); // If you want to show newest first
            setPgData(mapped);
            setFilteredPgData(mapped); // Initialize filtered data with all listings
        }).catch(error => {
            console.error("Error fetching listings:", error);
            // Handle error, e.g., show a message to the user
        });
    }, []);

    const handleSearch = (searchParams) => {
        let filtered = [...pgData];

        console.log('Search params received in Listings:', searchParams);
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

            const acceptableGenders = [];
            if (genderInput === 'male') {
                acceptableGenders.push('male', 'boys'); // Add 'boys' if that's what backend uses
            } else if (genderInput === 'female') {
                acceptableGenders.push('female', 'girls'); // Add 'girls' if that's what backend uses
            } else if (genderInput === 'unisex') {
                acceptableGenders.push('coed', 'co-ed', 'unisex', 'others'); // Backend can have different values for coed
            }

            console.log("Gender filter input:", genderInput);
            console.log("Acceptable genders for filtering:", acceptableGenders);

            if (acceptableGenders.length > 0) {
                filtered = filtered.filter(pg => {
                    const pgGender = pg.gender?.toLowerCase();
                    const isMatch = pgGender && acceptableGenders.includes(pgGender);
                    console.log(`Checking PG ID ${pg.id} - PG Gender: ${pgGender} - Match: ${isMatch}`);
                    return isMatch;
                });
                console.log('After gender filter:', filtered);
            }
        }

        // Budget filter
        if (searchParams.budget && searchParams.budget.length === 2) {
            const [minBudget, maxBudget] = searchParams.budget;

            console.log('Filtering budget from', minBudget, 'to', maxBudget);

            filtered = filtered.filter(pg => {
                const pgPrice = typeof pg.price === 'string' ? parseFloat(pg.price) : pg.price;

                console.log(`Checking PG Price: ${pgPrice}. Min: ${minBudget}, Max: ${maxBudget}`);
                return (
                    (!minBudget || pgPrice >= minBudget) &&
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
            {/* Assuming TenantDashboardNavbar is meant to be here */}
            {/* <TenantDashboardNavbar /> */}
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
                        <p>Loading properties or no properties available...</p>
                    ) : (
                        filteredPgData.map((pg, index) => (
                            <div className="pg-card" key={pg.id || index}> {/* Use pg.id as key if available, fallback to index */}
                                <div className="pg-card-image-container">
                                    <img src={pg.imageUrl} alt={pg.name} className="pg-card-image" onError={(e) => {
                                        e.target.onerror = null; // Prevent infinite loop if fallback also fails
                                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                                    }} />
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
                                <p className="price">₹{pg.price?.toLocaleString() || 'N/A'}/month</p> {/* Add nullish coalescing for safety */}
                                <p>Sharing: {pg.sharing}</p> {/* Display the sharing type */}
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