export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      return new Response("Missing URL", { status: 400 });
    }

    try {
      // Fetch the image with a proper User-Agent
      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; ImageProxy; +https://github.com/cloudflare/workers-site)",
          "Accept": "image/*",
        },
      });

      // Check if the response is OK
      if (!response.ok) {
        return new Response("Failed to fetch image", { status: 500 });
      }

      // Get the content type from the response
      const contentType = response.headers.get("Content-Type") || "image/jpeg";

      // Get the image data as a blob
      const blob = await response.blob();

      // Create a new Response with the blob and proper headers
      return new Response(blob, {
        headers: {
          "Content-Type": contentType,
          "Access-Control-Allow-Origin": "*", // ✅ Critical for CORS
          "Cache-Control": "public, max-age=31536000", // ✅ Optional: cache for 1 year
        },
      });
    } catch (error) {
      console.error("Proxy failed:", error);
      return new Response("Proxy failed", { status: 500 });
    }
  },
};