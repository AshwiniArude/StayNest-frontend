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
  { label: '₹10,000 - ₹20,000', value: [10000, 20000] },
  { label: 'Above ₹20,000', value: [20000, 50000] },
];

const suggestedDestinations = [
  { icon: '🧭', label: 'Nearby', desc: "+ Find what's around you" },
  { icon: '🏖️', label: 'North Goa, Goa', desc: 'Popular beach destination' },
  { icon: '🏞️', label: 'Lonavala, Maharashtra', desc: 'For sights like Karla Caves' },
  { icon: '🏙️', label: 'Pune City, Maharashtra', desc: 'Near you' },
  { icon: '🏛️', label: 'New Delhi, Delhi', desc: 'For its stunning architecture' },
  { icon: '🏝️', label: 'South Goa, Goa', desc: 'Popular beach destination' },
  { icon: '🏯', label: 'Jaipur, Rajasthan', desc: 'For sights like Amber Fort' },
];

const TenantSearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [tenantType, setTenantType] = useState('');
  const [showTenantDropdown, setShowTenantDropdown] = useState(false);
  const [budget, setBudget] = useState([3000, 20000]);
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [showLocationPanel, setShowLocationPanel] = useState(false);
  const tenantPanelRef = useRef(null);
  const locationPanelRef = useRef(null);

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
    setBudget([3000, 20000]);
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
            style={{ cursor: 'pointer', background: 'transparent', border: 'none', boxShadow: 'none' }}
          >
            <span>{tenantType ? tenantTypes.find(t => t.value === tenantType).emoji + ' ' + tenantTypes.find(t => t.value === tenantType).label : ''}</span>
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
          <div className="cell-value budget-dropdown" onClick={() => setShowBudgetDropdown(v => !v)} tabIndex={0} onBlur={() => setTimeout(() => setShowBudgetDropdown(false), 150)}>
            <span>{budgetOptions.find(opt => opt.value[0] === budget[0] && opt.value[1] === budget[1])?.label || 'Select budget'}</span>
            <FaChevronDown className="dropdown-arrow" />
            {showBudgetDropdown && (
              <div className="dropdown-list">
                {budgetOptions.map((opt) => (
                  <div key={opt.label} className="dropdown-item" onClick={() => handleBudgetDropdown(opt.value)}>
                    {opt.label}
                  </div>
                ))}
              </div>
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
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantSearchBar; 