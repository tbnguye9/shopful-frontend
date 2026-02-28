/* src/pages/ExtraSearch.tsx */
import React, { useState, useEffect } from "react";
import SearchService from "./SearchService.ts";
import { SearchResponse } from "./search";
import { Product } from "./Product";      
import "./ExtraSearch.css";
import { useLocation } from "react-router-dom";

const ExtraSearch = () => {
  /* ---------- API Setup ---------- */
  const [rawResponse, setRawResponse] = useState<SearchResponse | null>(null);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const location = useLocation();
  const forwardedResult =
    location.state?.searchedResult as SearchResponse | undefined;

  
  /* ---------- Load the JSON  ---------- */
  useEffect(() => {
  if (forwardedResult) {
      setRawResponse(forwardedResult);
      setErrorMessage(null);
      return;
    }
    
    const controller = new AbortController();
    const signal = controller.signal;
    
  async function load() {
    try {
      const data = await SearchService.fetchResponse(signal);   // handle ApiError
      setRawResponse(data);
      setErrorMessage(null);                               // clear errors
    } catch (e: any) {
      console.error('Search failed:', e); // Handle user error message
      setErrorMessage(e.userMessage);                     // Store user error message
    }
  }
  load();
  return () => {
    controller.abort();  // handle aborted fetch                   
  };
}, [forwardedResult]);  

  /* map it to a Product */
useEffect(() => {
  if (!rawResponse) {
  return;
}
  const displayedProducts = rawResponse.insight
    .slice(0, rawResponse.insight.length)
    .map((insight, idx) => {
      const place = rawResponse.places[idx] ?? {};
      const imageUrl = insight.Image && insight.Image !== "UNKNOWN"
    ? `https://worker1.tclark16.workers.dev?url=${encodeURIComponent(insight.Image)}`
    : "";
      return {
        id: idx + 1,
        name: insight["Result name"],
        store: place.name ?? "Unknown Store",
        address: place.address ?? "",
        distance: (place.distance ?? "0 mi") as string,
        price: insight["Result price"] ?? "",
        rating: place.rating ?? 0,
        reviews: place.reviews ?? 0,
        //image: insight.Image ?? '', // deploy cloudflare CDN worker
        // 100,000 requests/month free
        image: imageUrl,
        // replace to handle unknown images and not send to cloudflare CDN.
      };
    });
  setDisplayedProducts(displayedProducts);
}, [rawResponse]);

  if (rawResponse === null && !forwardedResult) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        Loading products…
      </div>
    );
  }
	
 
  return (
    <div className="search-results-container">
      {/* Error banner */}
      {errorMessage && <div className="error">❗ {errorMessage}</div>}

      {/* Fallback UI while data is loading */}
      {displayedProducts.length === 0 && (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          Loading products…
        </div>
      )}

      <div className="horizontal-products-container">
        {displayedProducts.map((p) => (
          <div key={p.id} className="horizontal-product-card">
            <div className="product-image-container">
              <img
  		//src={p.image || undefined }  // Default to SVG if no image
  		src={p.image ? p.image : "/images/400x400.svg"}
  		// alt={p.name}
  		//src={p.image}
  		alt={p.name} // || "Product image"}
  		className="product-main-image"
  		loading="lazy"
		/>

            </div>

            {/* Textual info block */}
            <div className="product-info-container">
              <div className="product-header">
                <h3 className="product-name">{p.name}</h3>
                <div className="store-info">
                  <div className="store-with-distance">
                    <span className="store-name">
                      <span className="store-icon">
                        {p.store}
                      </span>
                    </span>
                    
                <div>
    		<strong>Distance: </strong>{p.distance}
    		<div>
    		<strong>Address: </strong>{p.address}
    		</div>
  		</div>
  		
                  <> 
                    {/*<p className="product-address">{p.address}</p>*/}
                    <div className="price-info">
                      <div className="price-container">
                        <h3 className="current-price">{p.price}</h3>    
                	</div>
                    </div>
                    </>
                    
                </div>
              </div>
            </div>

            
          </div>
          </div>
        ))}
       </div>
    </div>
  );
};

export default ExtraSearch;

