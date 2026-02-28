import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import './SearchResults.css';

// Import images
import black_pants1 from '../images/black_pants3.jpeg';
import black_pants2 from '../images/black_pants7.jpeg';
import black_pants3 from '../images/black_pants4.jpeg';
import black_pants4 from '../images/images.jpeg';
import black_pants5 from '../images/black_pants6.jpeg';
import black_pants6 from '../images/blackpants_5.jpeg';
import black_pants7 from '../images/black_pants8.jpeg';
import black_pants8 from '../images/black_pants9.jpeg';

const levis501Jeans =  black_pants2;
const zaraJeans = black_pants3;
const levi511Jeans = black_pants4;
const wranglerJeans = black_pants1;
const oldNavyJeans = black_pants5;
const targetJeans = black_pants6;
const gapJeans = black_pants7;
const pacsunJean = black_pants8;

const MapPin = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

/* const Navigation = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
);
*/
// Never used
    // All search results with local images`
 
   const allSearchResults = [
        {
            id: 1,
            name: "Levi's 501 Original Fit Jeans",
            store: "Kohl's",
            category: "Men's Jeans",
            address: "123 Main St., Phoenix, AZ 85001",
            distance: "5 mi",
            price: "$89.99",
            originalPrice: "$129.99",
            rating: 4.5,
            reviews: 128,
            image: levis501Jeans,
            isNew: true,
            discount: "30% OFF",
            colors: ["Black", "Dark Blue", "Light Wash"],
            sizes: ["28x30", "30x30", "32x30", "34x30"]
        },
        {
            id: 2,
            name: "Zara High Waist Skinny Jeans",
            store: "Zara",
            category: "Women's Jeans",
            address: "12345 Mall Blvd., Phoenix, AZ 85001",
            distance: "6 mi",
            price: "$59.99",
            originalPrice: "$79.99",
            rating: 4.2,
            reviews: 89,
            image: zaraJeans,
            isNew: false,
            discount: "25% OFF",
            colors: ["Black", "Grey", "White"],
            sizes: ["XS", "S", "M", "L"]
        },
        {
            id: 3,
            name: "Levi's 511 Slim Fit Jeans",
            store: "Levi's Store",
            category: "Slim Fit Jeans",
            address: "2323 Store St., Phoenix, AZ 85001",
            distance: "4.5 mi",
            price: "$79.99",
            originalPrice: "$99.99",
            rating: 4.7,
            reviews: 256,
            image: levi511Jeans,
            isNew: true,
            discount: "20% OFF",
            colors: ["Black", "Indigo", "Light Blue"],
            sizes: ["30x30", "32x30", "34x30", "36x30"]
        },
        {
            id: 4,
            name: "Wrangler Cowboy Cut Jeans",
            store: "Wrangler Jeans",
            category: "Classic Fit",
            address: "4321 Street Ave., Phoenix, AZ 85001",
            distance: "4.75 mi",
            price: "$49.99",
            originalPrice: "$69.99",
            rating: 4.3,
            reviews: 67,
            image: wranglerJeans,
            isNew: false,
            discount: "29% OFF",
            colors: ["Dark Denim", "Light Denim", "Black"],
            sizes: ["30x32", "32x32", "34x32", "36x32"]
        },
        {
            id: 5,
            name: "Old Navy Rockstar Jeans",
            store: "Old Navy",
            category: "Everyday Wear",
            address: "12345 Mall Blvd., Phoenix, AZ 85001",
            distance: "6 mi",
            price: "$39.99",
            originalPrice: "$59.99",
            rating: 4.0,
            reviews: 312,
            image: oldNavyJeans,
            isNew: true,
            discount: "33% OFF",
            colors: ["Black", "Dark Wash", "Medium Wash"],
            sizes: ["0", "2", "4", "6", "8"]
        },
        {
            id: 6,
            name: "Target Universal Thread Jeans",
            store: "Target",
            category: "Basic Jeans",
            address: "12345 Mall Blvd., Phoenix, AZ 85001",
            distance: "6 mi",
            price: "$34.99",
            originalPrice: "$49.99",
            rating: 4.1,
            reviews: 98,
            image: targetJeans,
            isNew: false,
            discount: "30% OFF",
            colors: ["Black", "Grey", "Blue"],
            sizes: ["25", "27", "29", "31"]
        },
        {
            id: 7,
            name: "Gap Slim Fit Jeans",
            store: "Gap",
            category: "Casual Wear",
            address: "789 Fashion St., Phoenix, AZ 85001",
            distance: "5.5 mi",
            price: "$64.99",
            originalPrice: "$89.99",
            rating: 4.4,
            reviews: 145,
            image: gapJeans,
            isNew: true,
            discount: "28% OFF",
            colors: ["Black", "Dark Indigo", "Medium Wash"],
            sizes: ["30x30", "32x30", "34x30", "36x30"]
        },
        {
            id: 8,
            name: "PacSun Stacked Skinny Jeans",
            store: "PacSun",
            category: "Trendy Fit",
            address: "567 Youth Ave., Phoenix, AZ 85001",
            distance: "7 mi",
            price: "$54.99",
            originalPrice: "$74.99",
            rating: 4.0,
            reviews: 87,
            image: pacsunJean,
            isNew: true,
            discount: "27% OFF",
            colors: ["Black", "Grey", "Light Wash"],
            sizes: ["28x30", "30x30", "32x30", "34x30"]
        }
    ];

const StarIcon = ({ filled }) => (
    <span className={`star ${filled ? 'filled' : ''}`}>★</span>
);

const SearchResults = ({ basePath = "/" }) => {
    const location = useLocation();
    const searchParams = location.state || {};

    const [distance, setDistance] = useState(searchParams.distance || 7);
    const [distanceUnit, setDistanceUnit] = useState("mi");
    const [searchQuery, setSearchQuery] = useState(searchParams.searchQuery || "black jeans");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    //const [isLoading, setIsLoading] = useState(false); // never used
    //const [setIsLoading] = useState(false); // never used
    
    const [allProductsLoaded, setAllProductsLoaded] = useState(false);
    const [stallIndex, setStallIndex] = useState(0); // Index of currently shown product in stall
    const [isStallMode, setIsStallMode] = useState(true); // Whether we're in stall mode

    const distanceOptions = [
        { value: 1, label: "1" },
        { value: 5, label: "5" },
        { value: 10, label: "10" },
        { value: 20, label: "20" },
        { value: 50, label: ">20" }
    ];



    // Initialize with first product only for stall mode
    useEffect(() => {
        if (isStallMode) {
            // Start with just the first product
            setDisplayedProducts([allSearchResults[0]]);
        } else {
            // Normal mode: show all 4 initially
            setDisplayedProducts(allSearchResults.slice(0, 4));
        }
      }, [isStallMode]);
		
    // Stall mode: cycle through products one by one
    useEffect(() => {
        if (!isStallMode) return;

        const stallTimer = setInterval(() => {
            setStallIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % 4; // Cycle through first 4 products
                setDisplayedProducts([allSearchResults[nextIndex]]);
                return nextIndex;
            });
        }, 3000); // Change product every 3 seconds

        // End stall mode after 12 seconds (4 products × 3 seconds each)
        const endStallTimer = setTimeout(() => {
            setIsStallMode(false);
            // Load all 4 initial products
            setDisplayedProducts(allSearchResults.slice(0, 4));
        }, 12000);

        return () => {
            clearInterval(stallTimer);
            clearTimeout(endStallTimer);
        };
    }, [isStallMode]); // fix for warnings

    // Load more products after 7 seconds (when not in stall mode)
    useEffect(() => {
        if (isStallMode) return;

        const timer = setTimeout(() => {
 	if (!allProductsLoaded) {
		//setIsLoading(true);
		const loadTimer = setTimeout(() => {
		 const nextProducts = allSearchResults.slice(4, 8);
  	         setDisplayedProducts(prev => [...prev, ...nextProducts]);
                 //setIsLoading(false);
                 setAllProductsLoaded(true);
                }, 7000);
		return () => clearTimeout(loadTimer);
            }
        }, 7000);

        return () => clearTimeout(timer);
    }, [allProductsLoaded, isStallMode]); // warning fix

    const handleDistanceChange = (newDistance) => {
        setDistance(newDistance);
        setIsDropdownOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Searching for "${searchQuery}" within ${distance} ${distanceUnit}`);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <StarIcon key={i} filled={i <= rating} />
            );
        }
        return stars;
    };

    return (
        <div className="search-results-container">
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

            <section className="search-header">
                <div className="search-header-content">
                    <div className="location-display">
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
                                placeholder="Search for products..."
                            />
                            <button type="submit" className="search-btn">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <div className="search-results-main">
                <main className="results-content">
                    <section className="results-section">
                        <div className="results-header">
                            <h2 className="results-title">Search Results for "{searchQuery}"</h2>
                            <div className="results-info">
                                <span className="results-count">
                                    {displayedProducts.length} of {allSearchResults.length} products shown
                                    {isStallMode && " (Showing products one by one...)"}
                                </span>
                                <div className="sort-filter">
                                    <select className="sort-select">
                                        <option>Sort by: Relevance</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Distance: Nearest</option>
                                        <option>Rating: Highest</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="horizontal-products-container">
                            {displayedProducts.map((item) => (
                                <div
                                    key={item.id}
                                    id={`product-${item.id}`}
                                    className="horizontal-product-card"
                                >
                                    <div className="product-image-container">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="product-main-image"
                                        />
                                        {item.isNew && <div className="new-badge">NEW</div>}
                                        {item.discount && <div className="discount-badge">{item.discount}</div>}
                                        {isStallMode && (
                                            <div className="stall-indicator">
                                                <div className="stall-spinner"></div>
                                                <span className="stall-text">Loading more products...</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="product-info-container">
                                        <div className="product-header">
                                            <h3 className="product-name">{item.name}</h3>
                                            <div className="product-rating">
                                                <div className="stars">
                                                    {renderStars(item.rating)}
                                                </div>
                                                <span className="review-count">({item.reviews} reviews)</span>
                                            </div>
                                        </div>

                                        <div className="store-info">
                                            <div className="store-with-distance">
                                                <span className="store-name">
                                                    <span className="store-icon">
                                                        <MapPin /> {item.store}
                                                    </span>
                                                </span>
                                                <span className="distance-badge">{item.distance}</span>
                                            </div>
                                            <p className="product-category">{item.category}</p>
                                            <p className="product-address">{item.address}</p>
                                        </div>

                                        <div className="price-info">
                                            <div className="price-container">
                                                <span className="current-price">{item.price}</span>
                                                {item.originalPrice && (
                                                    <span className="original-price">{item.originalPrice}</span>
                                                )}
                                            </div>
                                            <div className="stock-status in-stock">In Stock</div>
                                        </div>

                                        <div className="product-variants">
                                            <div className="variant-item">
                                                <strong>Colors:</strong> {item.colors.slice(0, 2).join(", ")} {item.colors.length > 2 && `+${item.colors.length - 2} more`}
                                            </div>
                                            <div className="variant-item">
                                                <strong>Sizes:</strong> {item.sizes.slice(0, 3).join(", ")} {item.sizes.length > 3 && `+${item.sizes.length - 3} more`}
                                            </div>
                                        </div>

                                        <div className="product-actions">
                                            <button className="add-to-cart-btn">Add to Cart</button>
                                            <div className="action-buttons">
                                                <button className="save-btn">
                                                    <span className="heart-icon">❤️</span> Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stall mode loading message */}
                        {isStallMode && (
                            <div className="stall-mode-section">
                                <div className="stall-loading">
                                    <div className="stall-progress">
                                        <div className="stall-progress-bar" style={{
                                            width: `${((stallIndex + 1) / 4) * 100}%`
                                        }}></div>
                                    </div>
                                    <p className="stall-message">
                                        Showing product {stallIndex + 1} of 4. Next product in 3 seconds...
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Loading section (when not in stall mode) */}
                        {!isStallMode && !allProductsLoaded && (
                            <div className="loading-section">
                                <div className="loading-spinner"></div>
                                <p className="loading-text">Loading more products...</p>
                                <p className="loading-subtext">4 more products will appear in 7 seconds</p>
                            </div>
                        )}

                        {/* All products loaded message */}
                        {allProductsLoaded && (
                            <div className="all-loaded-section">
                                <p className="all-loaded-text">All {allSearchResults.length} products loaded</p>
                            </div>
                        )}

                        <div className="pagination-container">
                            <button className="pagination-btn prev">← Previous</button>
                            <div className="pagination-numbers">
                                <button className="page-number active">1</button>
                                <button className="page-number">2</button>
                                <button className="page-number">3</button>
                                <span className="page-dots">...</span>
                                <button className="page-number">5</button>
                            </div>
                            <button className="pagination-btn next">Next →</button>
                        </div>
                    </section>
                </main>

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

                    <div className="quick-filters">
                        <h3>Quick Filters</h3>
                        <div className="filter-buttons">
                            <button className="filter-btn active">All Products</button>
                            <button className="filter-btn">In Stock</button>
                            <button className="filter-btn">On Sale</button>
                            <button className="filter-btn">New Arrivals</button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default SearchResults;
