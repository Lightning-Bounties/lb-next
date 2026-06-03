/**
 * Fetch with retry logic for resilient client-side requests.
 * @param url The URL to fetch.
 * @param options Fetch options.
 * @param retries Number of retry attempts (default: 3).
 * @param delayMs Delay between retries in milliseconds (default: 1000).
 * @returns Promise resolving to the response.
 */
export async function retryFetch(
  url: string | URL | Request,
  options: RequestInit = {},
  retries: number = 3,
  delayMs: number = 1000
): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return response;
      }
      // If not ok, treat as error to potentially retry
      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error;
    }
    // If we have retries left, wait before next attempt
    if (attempt < retries) {
      await new Promise(resolve => setTimeout(resolve, delayMs * Math.pow(2, attempt)));
    }
  }
  throw lastError;
}
