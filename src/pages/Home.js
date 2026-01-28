import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {
    const [postalCode, setPostalCode] = useState("");
    const [distance, setDistance] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const shops = [
        { id: 1, name: "Fashion Haven", category: "Clothing", rating: 4.5 },
        { id: 2, name: "Tech Galaxy", category: "Electronics", rating: 4.2 },
        { id: 3, name: "Home Essentials", category: "Home Goods", rating: 4.7 },
        { id: 4, name: "Sports Zone", category: "Sporting Goods", rating: 4.3 },
        { id: 5, name: "Beauty Spot", category: "Cosmetics", rating: 4.6 },
        { id: 6, name: "Book Nook", category: "Books", rating: 4.8 }
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        // Navigate to search results with the search parameters
        navigate('/search', {
            state: {
                postalCode,
                distance,
                searchQuery
            }
        });
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
                                onChange={(e) => setPostalCode(e.target.value)}
                                className="postal-input"
                            />
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