/* src/pages/Product.ts */
export interface Product {
  id: number;	// generated number
  name: string; // product name
  store: string; // store name
  address: string; // store address 
  distance: string;          // string “5 mi”
  price: string;             // string "$19.99 CAD"
  rating: number;            // optional
  reviews: number;           // optional
  // other optional fields used in previous search file 
  // isNew?: boolean;
  // discount?: string;
  // colors?: string[];
  // sizes?: string[];
  // originalPrice?: string;
  image: string;             // URL to the image
};

