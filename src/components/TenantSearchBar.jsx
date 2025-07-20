import React, { useState, useRef, useEffect } from 'react';
import { FaMapMarkerAlt, FaSearch, FaSoap, FaChevronDown } from 'react-icons/fa';
import './TenantSearchBar.css';

const tenantTypes = [
  { label: 'Girls', value: 'girls', emoji: '🚺', desc: 'Only for girls' },
  { label: 'Boys', value: 'boys', emoji: '🚹', desc: 'Only for boys' },
  { label: 'Unisex', value: 'unisex', emoji: '⚧️', desc: 'Open to all' },
];

const budgetOptions = [
  { label: 'Below ₹5,000', value: [1000, 5000] },
  { label: '₹5,000 - ₹10,000', value: [5000, 10000] },
  { label: '₹10,000 - ₹15,000', value: [10000, 15000] },
  { label: '₹15,000 - ₹20,000', value: [15000, 20000] },
  { label: '₹20,000 - ₹30,000', value: [20000, 30000] },
  { label: 'Above ₹30,000', value: [30000, 100000] },
];

const suggestedDestinations = [
  { icon: '🧭', label: 'Nearby', desc: "+ Find what's around you" },
  { icon: '🏙️', label: 'Pune City, Maharashtra', desc: 'Near you' },
  { icon: '🏢', label: 'Koregaon Park, Pune', desc: 'Popular area with cafes and restaurants' },
  { icon: '🏫', label: 'Kalyani Nagar, Pune', desc: 'Residential area near airport' },
  { icon: '🏪', label: 'Viman Nagar, Pune', desc: 'IT hub with shopping centers' },
  { icon: '🏬', label: 'Hinjewadi, Pune', desc: 'Major IT park and residential area' },
  { icon: '🏭', label: 'Pimpri-Chinchwad, Maharashtra', desc: 'Industrial and residential hub' },
  { icon: '🏗️', label: 'Chinchwad, PCMC', desc: 'Industrial area with good connectivity' },
  { icon: '🏘️', label: 'Pimple Saudagar, PCMC', desc: 'Residential area with amenities' },
  { icon: '🏡', label: 'Wakad, PCMC', desc: 'Growing residential and commercial area' },
  { icon: '🏢', label: 'Baner, Pune', desc: 'IT corridor with modern apartments' },
  { icon: '🏫', label: 'Aundh, Pune', desc: 'Educational hub with good connectivity' },
  { icon: '🏪', label: 'Kharadi, Pune', desc: 'IT park with residential complexes' },
  { icon: '🏬', label: 'Magarpatta City, Pune', desc: 'Planned township with amenities' },
  { icon: '🏭', label: 'Hadapsar, Pune', desc: 'Industrial and residential area' },
  { icon: '🏗️', label: 'Pimple Gurav, PCMC', desc: 'Residential area with good facilities' },
  { icon: '🏘️', label: 'Rahatani, PCMC', desc: 'Affordable residential area' },
  { icon: '🏡', label: 'Moshi, PCMC', desc: 'Industrial area with housing options' },
  { icon: '🏢', label: 'Bhosari, PCMC', desc: 'Industrial hub with residential areas' },
  { icon: '🏫', label: 'Nigdi, PCMC', desc: 'Educational and residential area' },
  { icon: '🏪', label: 'Akurdi, PCMC', desc: 'Industrial area with good connectivity' },
  { icon: '🏬', label: 'Dehu Road, PCMC', desc: 'Industrial and residential hub' },
  { icon: '🏭', label: 'Talegaon, Pune', desc: 'Industrial area with modern housing' },
  { icon: '🏗️', label: 'Chakan, Pune', desc: 'Industrial hub with residential options' },
  { icon: '🏘️', label: 'Lonavala, Maharashtra', desc: 'For sights like Karla Caves' },
  { icon: '🏙️', label: 'New Delhi, Delhi', desc: 'For its stunning architecture' },
  { icon: '🏖️', label: 'North Goa, Goa', desc: 'Popular beach destination' },
  { icon: '🏝️', label: 'South Goa, Goa', desc: 'Popular beach destination' },
  { icon: '🏯', label: 'Jaipur, Rajasthan', desc: 'For sights like Amber Fort' },
];

const TenantSearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [tenantType, setTenantType] = useState('');
  const [showTenantDropdown, setShowTenantDropdown] = useState(false);
  const [budget, setBudget] = useState([]);
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [showLocationPanel, setShowLocationPanel] = useState(false);
  const tenantPanelRef = useRef(null);
  const locationPanelRef = useRef(null);
  const budgetPanelRef = useRef(null);

  // Handle location input
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // Click outside logic for tenant panel
  useEffect(() => {
    if (!showTenantDropdown) return;
    const handleClickOutside = (event) => {
      if (tenantPanelRef.current && !tenantPanelRef.current.contains(event.target)) {
        setShowTenantDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showTenantDropdown]);

  // Click outside logic for location panel
  useEffect(() => {
    if (!showLocationPanel) return;
    const handleClickOutside = (event) => {
      if (locationPanelRef.current && !locationPanelRef.current.contains(event.target)) {
        setShowLocationPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLocationPanel]);

  // Click outside logic for budget panel
  useEffect(() => {
    if (!showBudgetDropdown) return;
    const handleClickOutside = (event) => {
      if (budgetPanelRef.current && !budgetPanelRef.current.contains(event.target)) {
        setShowBudgetDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showBudgetDropdown]);

  // Handle tenant type dropdown
  const handleTenantType = (type) => {
    setTenantType(type);
    setShowTenantDropdown(false);
  };

  // Handle budget dropdown
  const handleBudgetDropdown = (range) => {
    setBudget(range);
    setShowBudgetDropdown(false);
  };

  // Clear all filters
  const handleClear = () => {
    setLocation('');
    setTenantType('');
    setBudget([]);
  };

  // Search action
  const handleSearch = () => {
    if (location && !recentSearches.includes(location)) {
      setRecentSearches([location, ...recentSearches.slice(0, 2)]);
    }
    if (onSearch) {
      onSearch({ location, tenantType, budget });
    }
  };

  return (
    <div className="tenant-search-bar sectioned wide-bar">
      <div className="search-row sectioned-row">
        {/* Location Cell */}
        <div className="search-cell location-cell">
          <div className="cell-label">Where</div>
          <div className="cell-value location-value">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              placeholder="Search destinations"
              value={location}
              onChange={handleLocationChange}
              onFocus={() => setShowLocationPanel(true)}
              className="location-input"
              autoComplete="off"
            />
          </div>
          {showLocationPanel && (
            <>
              <div className="tenant-panel-backdrop" />
              <div className="location-panel-dropdown floating" ref={locationPanelRef}>
                <div className="location-panel-title">Suggested destinations</div>
                {suggestedDestinations.map((dest, i) => (
                  <div
                    key={dest.label}
                    className="location-panel-option"
                    onMouseDown={() => { setLocation(dest.label); setShowLocationPanel(false); }}
                  >
                    <span className="location-panel-icon">{dest.icon}</span>
                    <span className="location-panel-label">{dest.label}</span>
                    <span className="location-panel-desc">{dest.desc}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="vertical-divider" />
        {/* Tenant Type Panel Dropdown Cell */}
        <div className="search-cell tenant-type-cell">
          <div className="cell-label">Who</div>
          <div
            className={`cell-value tenant-type-panel${tenantType ? '' : ' empty'}`}
            onClick={() => setShowTenantDropdown(v => !v)}
            tabIndex={0}
          >
            <span>{tenantType ? tenantTypes.find(t => t.value === tenantType).emoji + ' ' + tenantTypes.find(t => t.value === tenantType).label : 'Select tenant type'}</span>
          </div>
          {showTenantDropdown && (
            <>
              <div className="tenant-panel-backdrop" />
              <div className="tenant-panel-dropdown floating" ref={tenantPanelRef}>
                {tenantTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`tenant-panel-option${tenantType === type.value ? ' selected' : ''}`}
                    onMouseDown={() => handleTenantType(type.value)}
                  >
                    <span className="tenant-panel-emoji">{type.emoji}</span>
                    <span className="tenant-panel-label">{type.label}</span>
                    <span className="tenant-panel-desc">{type.desc}</span>
                    {tenantType === type.value && <span className="tenant-panel-radio" />}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="vertical-divider" />
        {/* Budget Dropdown Cell */}
        <div className="search-cell budget-cell">
          <div className="cell-label">Budget</div>
          <div className="cell-value budget-dropdown" onClick={() => setShowBudgetDropdown(v => !v)} tabIndex={0} ref={budgetPanelRef}>
            <span className="budget-text">
              {budget.length === 2 ? budgetOptions.find(opt => opt.value[0] === budget[0] && opt.value[1] === budget[1])?.label : 'Select budget'}
            </span>
            <FaChevronDown className="dropdown-arrow" />
            {showBudgetDropdown && (
              <>
                <div className="budget-panel-backdrop" />
                <div className="budget-panel-dropdown floating">
                  {budgetOptions.map((opt) => (
                    <div key={opt.label} className="budget-panel-option" onMouseDown={() => handleBudgetDropdown(opt.value)}>
                      {opt.label}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        {/* Search Button Cell */}
        <div className="search-cell search-btn-cell">
          { !showTenantDropdown && (
            <>
              <button className="search-btn" onClick={handleSearch}>
                <FaSearch className="search-btn-icon" />
                Search
              </button>
              <button className="clear-filters-btn" onClick={handleClear} title="Clear all filters">
                <FaSoap />
                <span className="clear-btn-text">Clear</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantSearchBar; 