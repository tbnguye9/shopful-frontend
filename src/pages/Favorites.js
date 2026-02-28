import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Favorites.css';
import { createClient } from "@supabase/supabase-js";//supbase connection

const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
);


const Favorites = ({ basePath = "/" }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        async function ensureSignedIn() {
            //already logged in?
            const { data: existing } = await supabase.auth.getUser();
            if (existing?.user) {
                setUser(existing.user);
                return;
            }
            // sign in with your test user
            const { data, error } = await supabase.auth.signInWithPassword({
                email: "test@shopful.com",
                password: "Password123!",
            });
            if (error) {
                console.error("Supabase login failed:", error);
                alert("Login failed. Check console.");
                return;
            }
            setUser(data.user);
        }
        ensureSignedIn();
    }, []);
    useEffect(() => {
        //don't run until we have a logged-in user
        if (!user?.id) return;

        async function loadWishlist() {
            const { data, error } = await supabase
                .from("usersaveditem")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error loading wishlist:", error);
                return;
            }

            console.log("Loaded wishlist:", data);
        }

        loadWishlist();
    }, [user]);
    const [activeWishlist, setActiveWishlist] = useState("Work Outfits");
    const [wishlists, setWishlists] = useState({
        "Work Outfits": [
            { id: 1, name: "Professional Blazer", price: 89.99, store: "Zara" },
            { id: 2, name: "Office Dress", price: 59.99, store: "H&M" },
            { id: 3, name: "Business Slacks", price: 49.99, store: "Banana Republic" }
        ],
        "Going Out": [
            { id: 4, name: "Evening Gown", price: 129.99, store: "Nordstrom" },
            { id: 5, name: "Cocktail Dress", price: 79.99, store: "Macy's" },
            { id: 6, name: "Designer Heels", price: 99.99, store: "Dillard's" }
        ]
    });

    const wishlistCategories = Object.keys(wishlists);
    const featuredStores = [
        { id: 1, name: "Lewis 501", category: "Jeans", distance: "2.3 mi" },
        { id: 2, name: "Kohl's", category: "Department Store", distance: "1.8 mi" },
        { id: 3, name: "Zara Black Jeans", category: "Women's Jeans", distance: "3.1 mi" }
    ];

    const handleAddWishlist = () => {
        const newWishlist = prompt("Enter new wishlist name:");
        if (newWishlist && !wishlists[newWishlist]) {
            setWishlists(prev => ({ ...prev, [newWishlist]: [] }));
        }
    };

    const handleDeleteWishlist = () => {
        const categories = Object.keys(wishlists);
        if (categories.length > 1) {
            const confirmDelete = window.confirm(`Delete "${activeWishlist}" wishlist?`);
            if (confirmDelete) {
                setWishlists(prev => {
                    const updated = { ...prev };
                    delete updated[activeWishlist];
                    return updated;
                });
                const remaining = categories.filter(c => c !== activeWishlist);
                setActiveWishlist(remaining[0]);
            }
        }
    };

    const removeFromWishlist = (itemId) => {
        setWishlists(prev => ({
            ...prev,
            [activeWishlist]: prev[activeWishlist].filter(item => item.id !== itemId)
        }));
    };
    const addToWishlistDB = async (item) => {//add to wishlist button
        try {
            const { data: userData, error: userErr } = await supabase.auth.getUser();
            if (userErr) throw userErr;

            const realUserId = userData?.user?.id;//make sure logged in
            if (!realUserId) {
                alert("Not logged in. Refresh the page.");
                return;
            }
            const { data, error } = await supabase
                .from("usersaveditem")
                .insert([//save user id, item name
                    {
                        user_id: realUserId,
                        snap_title: item.name,
                        snap_price_cents: Math.round(item.price * 100),
                        snap_image_url: null,
                    },
                ])
                .select();
            console.log("INSERT DATA:", data);
            if (error) throw error;
            alert("Saved to wishlist!");
        } catch (err) {
            console.error("Supabase insert failed:", err);
            alert("Failed to save. Check browser console (F12).");
        }
    };

    return (
        <div className="favorites-container">
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="nav-content">
                    <Link to={basePath} className="logo">Shopful</Link>
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/favorites" className="nav-link active">Favorites</Link>
                        <Link to="/profile" className="nav-link">Profile</Link>
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
                        {wishlistCategories.map(category => (
                            <button
                                key={category}
                                className={`wishlist-category ${activeWishlist === category ? 'active' : ''}`}
                                onClick={() => setActiveWishlist(category)}
                            >
                                {category}
                                <span className="item-count">({wishlists[category]?.length || 0})</span>
                            </button>
                        ))}
                    </div>
                </aside>

                {/*Main Content*/}
                <main className="favorites-content">
                    {/* Wishlist Items */}
                    <section className="wishlist-items-section">
                        <h3 className="section-title">{activeWishlist}</h3>
                        <div className="wishlist-grid">
                            {wishlists[activeWishlist]?.map(item => (
                                <div key={item.id} className="wishlist-item">
                                    <div className="item-image">
                                        <div className="image-placeholder">
                                            {item.name.split(' ')[0]}
                                        </div>
                                    </div>
                                    <div className="item-details">
                                        <h4 className="item-name">{item.name}</h4>
                                        <p className="item-store">{item.store}</p>
                                        <p className="item-price">${item.price}</p>
                                        <div className="item-actions">
                                            <button className="buy-now-btn">Buy Now</button>
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeFromWishlist(item.id)}
                                            >
                                                Remove
                                            </button>
                                            <button//add button to save
                                                className="wishlist-save-btn"
                                                onClick={() => addToWishlistDB(item)}
                                            >
                                                Add to Wishlist
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {(!wishlists[activeWishlist] || wishlists[activeWishlist].length === 0) && (
                                <div className="empty-wishlist">
                                    <p>No items in this wishlist yet.</p>
                                    <Link to={basePath} className="browse-btn">Browse Items</Link>
                                </div>
                            )}
                        </div>
                    </section>

                    {/*Featured Stores*/}
                    <section className="featured-stores">
                        <h3 className="section-title">Featured Stores</h3>
                        <div className="stores-grid">
                            {featuredStores.map(store => (
                                <div key={store.id} className="store-card">
                                    <div className="store-image">
                                        <div className="store-placeholder">
                                            {store.name.split(' ')[0]}
                                        </div>
                                    </div>
                                    <div className="store-info">
                                        <h4 className="store-name">{store.name}</h4>
                                        <p className="store-category">{store.category}</p>
                                        <p className="store-distance">{store.distance}</p>
                                        <Link to={`${basePath}/search`} className="visit-store-btn">Visit Store</Link>
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

                    <div className="vertical-ad premium">
                        <div className="ad-badge">PREMIUM COLLECTION</div>
                        <h2 className="ad-title">DESIGNER BRANDS</h2>
                        <p className="ad-subtitle">LUXURY ITEMS UP TO 50% OFF</p>
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

                    <div className="vertical-ad special">
                        <div className="ad-badge">LIMITED TIME</div>
                        <h2 className="ad-title">FREE SHIPPING</h2>
                        <p className="ad-subtitle">ON ORDERS OVER $50</p>
                        <button className="ad-cta">SHOP NOW</button>
                        <div className="ad-image">
                            <div className="placeholder-ad">FREE</div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
export default Favorites;