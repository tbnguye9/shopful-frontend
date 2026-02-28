// src/pages/search.ts

// from response API
export interface Insight {
  /** Store name */
  "Store name": string;
  /** Store address */
  "Store address": string;
  /** Result name */
  "Result name": string;
  /** Result price */
  "Result price": string;
  /** Image URL */
  Image: string;
}

// from PLACE API
export interface Place {
  /** Name of the store  */
  name: string;
  /** Address string */
  address: string;
  /** Distance in meters or a formatted string like "5 mi" */
  distance: number | string;
  /** Rating out of 5 */
  rating: number;
  /** Number of reviews */
  reviews: number;
  /** category of the store */
  store_type: string;
}

// Combine both interfaces
export interface SearchResponse {
  /** Array of place details */
  places: Place[];
  /** Array of insight details */
  insight: Insight[];
  /** Handle extra json the back end has added and is producing errors */
  [key: string]: any; 
}

