import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";

const Favorites = ({ basePath = "/" }) => {
    const [activeWishlist, setActiveWishlist] = useState("Work Outfits");
    const [wishlists, setWishlists] = useState({
        "Work Outfits": [
            { id: 1, name: "Professional Blazer", price: 89.99, store: "Zara" },
            { id: 2, name: "Office Dress", price: 59.99, store: "H&M" },
            { id: 3, name: "Business Slacks", price: 49.99, store: "Banana Republic" },
        ],
        "Going Out": [
            { id: 4, name: "Evening Gown", price: 129.99, store: "Nordstrom" },
            { id: 5, name: "Cocktail Dress", price: 79.99, store: "Macy's" },
            { id: 6, name: "Designer Heels", price: 99.99, store: "Dillard's" },
        ],
    });

    // ✅ Make categories stateful (no push/splice on a const array)
    const [wishlistCategories, setWishlistCategories] = useState([
        "Work Outfits",
        "Going Out",
    ]);

    const featuredStores = [
        { id: 1, name: "Lewis 501", category: "Jeans", distance: "2.3 mi" },
        { id: 2, name: "Kohl's", category: "Department Store", distance: "1.8 mi" },
        { id: 3, name: "Zara Black Jeans", category: "Women's Jeans", distance: "3.1 mi" },
    ];

    const handleAddWishlist = () => {
        const newWishlist = prompt("Enter new wishlist name:");
        if (newWishlist && !wishlistCategories.includes(newWishlist)) {
            setWishlists((prev) => ({ ...prev, [newWishlist]: [] }));
            setWishlistCategories((prev) => [...prev, newWishlist]);
            setActiveWishlist(newWishlist);
        }
    };

    const handleDeleteWishlist = () => {
        if (wishlistCategories.length > 1) {
            const confirmDelete = window.confirm(`Delete "${activeWishlist}" wishlist?`);
            if (!confirmDelete) return;

            setWishlists((prev) => {
                const updated = { ...prev };
                delete updated[activeWishlist];
                return updated;
            });

            setWishlistCategories((prev) => {
                const updatedCats = prev.filter((c) => c !== activeWishlist);
                setActiveWishlist(updatedCats[0]);
                return updatedCats;
            });
        }
    };

    const removeFromWishlist = (itemId) => {
        setWishlists((prev) => ({
            ...prev,
            [activeWishlist]: (prev[activeWishlist] || []).filter((item) => item.id !== itemId),
        }));
    };

    return (
        <div className="favorites-container">
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="nav-content">
                    <Link to={basePath} className="logo">
                        Shopful
                    </Link>
                    <div className="nav-links">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                        <Link to="/favorites" className="nav-link active">
                            Favorites
                        </Link>
                        <Link to="/profile" className="nav-link">
                            Profile
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="favorites-main-content">
                {/* Wishlists Sidebar */}
                <aside className="wishlists-sidebar">
                    <div className="wishlists-header">
                        <h2 className="wishlists-title">Wishlists</h2>
                        <div className="wishlist-actions">
                            <button className="action-btn add-btn" onClick={handleAddWishlist}>
                                Add
                            </button>
                            <button className="action-btn delete-btn" onClick={handleDeleteWishlist}>
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className="wishlist-categories">
                        {wishlistCategories.map((category) => {
                            const count = wishlists[category] ? wishlists[category].length : 0; // ✅ no optional chaining
                            return (
                                <button
                                    key={category}
                                    className={`wishlist-category ${activeWishlist === category ? "active" : ""}`}
                                    onClick={() => setActiveWishlist(category)}
                                >
                                    {category}
                                    <span className="item-count">({count})</span>
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="favorites-content">
                    {/* Wishlist Items */}
                    <section className="wishlist-items-section">
                        <h3 className="section-title">{activeWishlist}</h3>
                        <div className="wishlist-grid">
                            {(wishlists[activeWishlist] || []).map((item) => (
                                <div key={item.id} className="wishlist-item">
                                    <div className="item-image">
                                        <div className="image-placeholder">{item.name.split(" ")[0]}</div>
                                    </div>
                                    <div className="item-details">
                                        <h4 className="item-name">{item.name}</h4>
                                        <p className="item-store">{item.store}</p>
                                        <p className="item-price">${item.price}</p>
                                        <div className="item-actions">
                                            <button className="buy-now-btn">Buy Now</button>
                                            <button className="remove-btn" onClick={() => removeFromWishlist(item.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {(!wishlists[activeWishlist] || wishlists[activeWishlist].length === 0) && (
                                <div className="empty-wishlist">
                                    <p>No items in this wishlist yet.</p>
                                    <Link to={basePath} className="browse-btn">
                                        Browse Items
                                    </Link>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Featured Stores */}
                    <section className="featured-stores">
                        <h3 className="section-title">Featured Stores</h3>
                        <div className="stores-grid">
                            {featuredStores.map((store) => (
                                <div key={store.id} className="store-card">
                                    <div className="store-image">
                                        <div className="store-placeholder">{store.name.split(" ")[0]}</div>
                                    </div>
                                    <div className="store-info">
                                        <h4 className="store-name">{store.name}</h4>
                                        <p className="store-category">{store.category}</p>
                                        <p className="store-distance">{store.distance}</p>
                                        <Link to={`${basePath}/search`} className="visit-store-btn">
                                            Visit Store
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* Sidebar Ads */}
                <aside className="ad-sidebar">
                    <div className="vertical-ad">
                        <div className="ad-badge">EXCLUSIVE OFFER</div>
                        <h2 className="ad-title">WISHLIST SPECIAL</h2>
                        <p className="ad-subtitle">20% OFF SAVED ITEMS</p>
                        <button className="ad-cta">CLAIM OFFER</button>
                        <div className="ad-image">
                            <div className="placeholder-ad">SPECIAL</div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Favorites;
