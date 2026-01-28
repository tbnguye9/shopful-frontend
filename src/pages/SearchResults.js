import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './SearchResults.css';
import levis501Jeans from "../images/levi-s-men-s-505-regular-fit-jeans-black-7__93323.jpg";
import zaraJeans from "../images/black_pants.jpeg";
import levi511Jeans from "../images/black_pants5.webp";
import wranglerJeans from "../images/black_pants3.jpeg";
import oldNavyJeans from "../images/images.jpeg";
import targetJeans from "../images/black_pants4.jpeg";


const SearchResults = ({ basePath = "/" }) => {
    const location = useLocation();
    const searchParams = location.state || {};

   // const [postalCode, setPostalCode] = useState(searchParams.postalCode || "85323");
    const [postalCode] = useState(searchParams.postalCode || "85323");
    const [distance, setDistance] = useState(searchParams.distance || 7);
    const [distanceUnit, setDistanceUnit] = useState("mi"); // "mi" or "km"
    const [searchQuery, setSearchQuery] = useState(searchParams.searchQuery || "black jeans");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const distanceOptions = [
        { value: 1, label: "1" },
        { value: 5, label: "5" },
        { value: 10, label: "10" },
        { value: 20, label: "20" },
        { value: 50, label: ">20" }
    ];

    const handleDistanceChange = (newDistance) => {
        setDistance(newDistance);
        setIsDropdownOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // In a real app, this would trigger a new search
        alert(`Searching for "${searchQuery}" within ${distance} ${distanceUnit} of ${postalCode}`);
    };

    const searchResults = [
        {
            id: 1,
            name: "Lewis 501",
            store: "Kohl's",
            category: "Men's Jeans",
            address: "123 Main St.",
            distance: "5 mi",
            price: "$89.99",
            image: levis501Jeans
        },
        {
            id: 2,
            name: "Zara Black Jeans",
            store: "Zara",
            category: "Women's Jeans",
            address: "12345 Mall Blvd.",
            distance: "6 mi",
            price: "$59.99",
            image: zaraJeans
        },
        {
            id: 3,
            name: "Levi's 511",
            store: "Levi's Store",
            category: "Slim Fit Jeans",
            address: "2323 Store St.",
            distance: "4.5 mi",
            price: "$79.99",
            image: levi511Jeans
        },
        {
            id: 4,
            name: "Wrangler Jeans",
            store: "Wrangler Jeans",
            category: "Classic Fit",
            address: "4321 Street Ave.",
            distance: "4.75 mi",
            price: "$49.99",
            image: wranglerJeans
        },
        {
            id: 5,
            name: "Old Navy Jeans",
            store: "Old Navy",
            category: "Everyday Wear",
            address: "12345 Mall Blvd.",
            distance: "6 mi",
            price: "$39.99",
            image: oldNavyJeans
        },
        {
            id: 6,
            name: "Target Denim",
            store: "Target",
            category: "Basic Jeans",
            address: "12345 Mall Blvd.",
            distance: "6 mi",
            price: "$34.99",
            image: targetJeans
        }
    ];

    return (
        <div className="search-results-container">
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="nav-content">
                    <Link to={basePath} className="logo">Shopful</Link>
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/favorites" className="nav-link">Favorites</Link>
                        <Link to="/profile" className="nav-link">Profile</Link>
                    </div>
                </div>
            </nav>

            {/* Search Header */}
            <section className="search-header">
                <div className="search-header-content">
                    <div className="location-display">
                        <div className="postal-code-box">{postalCode}</div>
                        <div className="distance-dropdown-container">
                            <button
                                className="distance-dropdown-trigger"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                {distance} {distanceUnit}
                                <span className="dropdown-arrow">▼</span>
                            </button>
                            {isDropdownOpen && (
                                <div className="distance-dropdown">
                                    <div className="distance-options">
                                        {distanceOptions.map(option => (
                                            <button
                                                key={option.value}
                                                className={`distance-option ${distance === option.value ? 'active' : ''}`}
                                                onClick={() => handleDistanceChange(option.value)}
                                            >
                                                {option.label} {distanceUnit}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="unit-toggle">
                                        <button
                                            className={`unit-option ${distanceUnit === 'mi' ? 'active' : ''}`}
                                            onClick={() => setDistanceUnit('mi')}
                                        >
                                            mi
                                        </button>
                                        <button
                                            className={`unit-option ${distanceUnit === 'km' ? 'active' : ''}`}
                                            onClick={() => setDistanceUnit('km')}
                                        >
                                            km
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSearch} className="search-form">
                        <div className="search-input-group">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <button type="submit" className="search-btn">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <div className="search-results-main">
                {/* Main Content */}
                <main className="results-content">
                    {/* Search Results */}
                    <section className="results-section">
                        <h2 className="results-title">Search Results for "{searchQuery}"</h2>
                        <div className="results-grid">
                            {searchResults.map(item => (
                                <div key={item.id} className="result-card">
                                    <div className="result-image">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="product-image"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                            }}
                                        />
                                        <div className="image-placeholder">
                                            {item.name.split(' ')[0]}
                                        </div>
                                    </div>
                                    <div className="result-details">
                                        <h3 className="item-name">{item.name}</h3>
                                        <p className="store-name">{item.store}</p>
                                        <p className="item-category">{item.category}</p>
                                        <p className="item-address">{item.address}</p>
                                        <div className="item-meta">
                                            <span className="distance-badge">{item.distance}</span>
                                            <span className="item-price">{item.price}</span>
                                        </div>
                                        <div className="item-actions">
                                            <button className="view-details-btn">View Details</button>
                                            <button className="save-btn">❤️ Save</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="show-more-container">
                            <button className="show-more-btn">Show More</button>
                        </div>
                    </section>
                </main>

                {/* Sidebar Ads */}
                <aside className="search-ad-sidebar">
                    <div className="vertical-ad">
                        <div className="ad-badge">BEST OFFER OF THE YEAR</div>
                        <h2 className="ad-title">BLACK FRIDAY</h2>
                        <p className="ad-subtitle">UP TO 70% OFF ALL DENIM</p>
                        <button className="ad-cta">SHOP NOW</button>
                        <div className="ad-image">
                            <div className="placeholder-ad">JEANS SALE</div>
                        </div>
                    </div>

                    <div className="vertical-ad premium">
                        <div className="ad-badge">PREMIUM COLLECTION</div>
                        <h2 className="ad-title">DESIGNER BRANDS</h2>
                        <p className="ad-subtitle">LUXURY FASHION UP TO 50% OFF</p>
                        <button className="ad-cta">EXPLORE</button>
                        <div className="ad-image">
                            <div className="placeholder-ad">PREMIUM</div>
                        </div>
                    </div>

                    <div className="vertical-ad sale">
                        <div className="ad-badge">FLASH SALE</div>
                        <h2 className="ad-title">SUMMER CLEARANCE</h2>
                        <p className="ad-subtitle">ENDS IN 24 HOURS</p>
                        <button className="ad-cta">SHOP SALE</button>
                        <div className="ad-image">
                            <div className="placeholder-ad">SALE</div>
                        </div>
                    </div>

                    <div className="vertical-ad featured">
                        <div className="ad-badge">TRENDING NOW</div>
                        <h2 className="ad-title">NEW ARRIVALS</h2>
                        <p className="ad-subtitle">FRESH STYLES JUST IN</p>
                        <button className="ad-cta">DISCOVER</button>
                        <div className="ad-image">
                            <div className="placeholder-ad">NEW</div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default SearchResults;