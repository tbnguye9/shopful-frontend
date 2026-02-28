import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // defined but not used
//import { Link } from "react-router-dom"; // defined but not used
import './Home.css';
import locationPinIcon from "../images/location_pin.png";

const Home = () => {
    const [postalCode, setPostalCode] = useState("");
    const [distance, setDistance] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN; //Use MapBox to get postal/zip codes

    const shops = [
        { id: 1, name: "Fashion Haven", category: "Clothing", rating: 4.5 },
        { id: 2, name: "Tech Galaxy", category: "Electronics", rating: 4.2 },
        { id: 3, name: "Home Essentials", category: "Home Goods", rating: 4.7 },
        { id: 4, name: "Sports Zone", category: "Sporting Goods", rating: 4.3 },
        { id: 5, name: "Beauty Spot", category: "Cosmetics", rating: 4.6 },
        { id: 6, name: "Book Nook", category: "Books", rating: 4.8 }
    ];

    const geocodePostalCode = async (postalCode) => {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(postalCode.trim())}` +
            `.json?access_token=${MAPBOX_TOKEN}` +
            `&types=postcode&limit=1`
        );

        if (!response.ok) {
            throw new Error ("Geocoding Failed");
        }

        const data = await response.json();

        if (!data.features || !data.features.length) {
            throw new Error("Invalid Postal Code");
        }

        const [longitude, latitude] = data.features[0].center;
        return { latitude, longitude };
    };

//const handleSearch = async (e) => { e.preventDefault();
const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        let lat = latitude;
        let lng = longitude;

        // ZIP code path
        if (!lat && !lng && postalCode) {
        const coords = await geocodePostalCode(postalCode);
        lat = coords.latitude;
        lng = coords.longitude;

        setLatitude(lat);
        setLongitude(lng);
        }

        if (!lat || !lng) {
            alert("Please enter a postal code or use My Location");
            return;
        }

        const payload = {
            latitude: lat,
            longitude: lng,
            distance,
            query: searchQuery,
        };

        /* console.log("Sending to backend:", payload); */
        /* temp change to help identify errors */

        const response = await fetch("http://localhost:8000/search", {
            method: "POST",
       headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
	    
    const backendResult  = await response.json();
    /* console.log("Backend response:", backendResult ); */
    /* temp change to help identify errors */
    
    navigate("/extra-search", {
      state: { searchedResult: backendResult }
    });

  } catch (err) {
        console.error("Search failed:", err);
        alert(err.message);
    }
};

    const handleMyLocation = () => {
        if (!navigator.geolocation) {
            alert("Location is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                /* console.log(latitude, longitude); */
                /* temp change to help identify errors */

                setLatitude(latitude);
                setLongitude(longitude);
                setPostalCode("");
            },
            null,
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    return (
        <div className="home-container">
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="nav-content">
                    <h1 className="logo">Shopful</h1>
                    <div className="nav-links">
                        <Link to="/" className="nav-link active">Home</Link>
                        <Link to="/favorites" className="nav-link">Favorites</Link>
                        <Link to="/profile" className="nav-link">Profile</Link>
                    </div>
                </div>
            </nav>

            {/* Search Section */}
            <section className="search-section">
                <div className="search-container">
                    <div className="location-filters">
                        <div className="input-group">
                            <label htmlFor="postal-code">Postal Code</label>
                            <input
                                id="postal-code"
                                type="text"
                                placeholder="Enter your postal code"
                                value={postalCode}
                                onChange={(e) => {
                                    setPostalCode(e.target.value);
                                    setLatitude(null);
                                    setLongitude(null);
                                }}
                                className="postal-input"
                            />
                        </div>

                        {/* My Location button */}
                        <div className = "input-group location-button">
                            <label>My Location</label>
                            <button
                            type = "button"
                            className = "my-location-btn"
                            onClick={() => {
                                console.log("My Location clicked");
                                handleMyLocation();
                            }}
                            >
                                <img
                                src = {locationPinIcon}
                                alt = ""
                                className = "location-icon"
                                aria-hidden = "true"
                                />
                            </button>
                        </div>

                        <div className="input-group">
                            <label htmlFor="distance">Distance</label>
                            <select
                                id="distance"
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                                className="distance-select"
                            >
                                <option value={5}>5 miles</option>
                                <option value={10}>10 miles</option>
                                <option value={15}>15 miles</option>
                                <option value={20}>20 miles</option>
                                <option value={30}>30 miles</option>
                            </select>
                        </div>
                    </div>

                    <form onSubmit={handleSearch} className="search-form">
                        <div className="search-input-group">
                            <input
                                type="text"
                                placeholder="What can we help you find today?"
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

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h2 className="hero-title">Get shopping at your fullest</h2>
                    <div className="hero-underline"></div>
                </div>
            </section>

            {/* Suggestions Section */}
            <section className="suggestions-section">
                <div className="suggestions-container">
                    <h3 className="suggestions-title">Suggestions</h3>
                    <div className="shops-grid">
                        {shops.map((shop) => (
                            <div key={shop.id} className="shop-card">
                                <div className="shop-image">
                                    <div className="shop-initial">{shop.name.charAt(0)}</div>
                                </div>
                                <div className="shop-info">
                                    <h4 className="shop-name">{shop.name}</h4>
                                    <p className="shop-category">{shop.category}</p>
                                    <div className="shop-rating">
                                        <span className="stars">{"⭐".repeat(Math.floor(shop.rating))}</span>
                                        <span className="rating-text">({shop.rating})</span>
                                    </div>
                                </div>
                                <button className="shop-visit-btn">Visit Shop</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Navigation */}
            <nav className="bottom-nav">
                <div className="bottom-nav-content">
                    <div className="nav-column">
                        <h4>Shopful</h4>
                        <p>Your local shopping companion</p>
                    </div>
                    <div className="nav-column">
                        <h4>Quick Links</h4>
                        <Link to="/">Home</Link>
                        <Link to="/favorites">Favorites</Link>
                        <Link to="/about">About</Link>
                    </div>
                    <div className="nav-column extra-nav-column">
                    <Link to="/extra-search" className="extra-nav-link"
                    style={{ color: "#16a34a", fontWeight: 600 }}>
                    Extra Search
                        </Link>
                    </div>
                    <div className="nav-column">
                        <h4>Support</h4>
                        <Link to="/help">Help Center</Link>
                        <Link to="/contact">Contact Us</Link>
                        <Link to="/privacy">Privacy Policy</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Home;
