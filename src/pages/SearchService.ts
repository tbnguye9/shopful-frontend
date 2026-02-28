/* src/pages/SearchService.ts */
import { SearchResponse } from '../pages/search';
import { ApiError } from '../pages/apiError.ts';

// IF place or insight is missing, consider AI model unavailable.
function validateSearchResponse(raw: unknown): SearchResponse {
  if (!raw || typeof raw !== 'object') {
    throw new ApiError('AI model unavailable. Try again later.', 'Response is not an object');
  }

const resp = raw as SearchResponse;
  
// Ensure Places and Insight array are in the json response.
  if (!Array.isArray(resp.places)) {
    throw new ApiError('AI model unavailable. Try again later.', 'Missing `places` array.');
  }
  if (!Array.isArray(resp.insight)) {
    throw new ApiError('AI model unavailable. Try again later.', 'Missing `insight` array.');
  }
  return resp; // If arrays look good.
 }

export class SearchService {
  private readonly baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

// Get data, handle HTTP error, run validation check for places and insight response, return the search response.
  public async fetchResponse(signal?: AbortSignal): Promise<SearchResponse> {
    try {
      const response = await fetch(`${this.baseURL}/search`, {
        signal, // handle abort signal
      });
      // Handle HTPP error: 500 or 404
      if (!response.ok) {
        // const txt = await response.text(); // not used
        const sysMsg = `HTTP ${response.status}: ${text}`; // handle http errors
        throw new ApiError('AI model unavailable. Try again later.', sysMsg);
      }
	// Handle JSON response:      
	const raw = await response.json();
	
      	// Validate response shape
      	const cleanShape = validateSearchResponse(raw);
      	return cleanShape;
      	}catch (err: any) {
	
      // Handles network problem, bad JSON, validation of json response format
      const sys = err instanceof Error ? err.message : err as string;
      throw new ApiError('AI model unavailable. Try again later.', sys);
    }
  }
}

// Hard coded for now! Fix, once change hosts
//export default new SearchService(process.env.REACT_APP_SEARCH_URL ?? 'http://localhost:8000');
const searchService = new SearchService(process.env.REACT_APP_SEARCH_URL ?? 'http://localhost:8000');
export default searchService;

