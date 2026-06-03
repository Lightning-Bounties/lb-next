/**
 * Resilient relay client for handling API requests with retry, exponential backoff, and fallback.
 */
export class RelayClient {
    private maxRetries: number;
    private baseDelay: number;
    private fallbackUrls: string[];

    constructor(maxRetries = 3, baseDelay = 1000, fallbackUrls: string[] = []) {
        this.maxRetries = maxRetries;
        this.baseDelay = baseDelay;
        this.fallbackUrls = fallbackUrls;
    }

    /**
     * Fetch with retry and fallback logic.
     * @param url The primary URL to fetch from.
     * @param options Fetch options.
     * @returns Promise resolving to the response.
     */
    async fetchWithFallback(url: string, options: RequestInit = {}): Promise<Response> {
        const urls = [url, ...this.fallbackUrls];
        let lastError: unknown;

        for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
            for (const baseUrl of urls) {
                try {
                    const response = await fetch(baseUrl, options);
                    if (response.ok) {
                        return response;
                    }
                    // If not ok, we might want to retry based on status
                    lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
                } catch (error) {
                    lastError = error;
                }
            }
            // If we haven't returned yet, wait before next attempt
            if (attempt < this.maxRetries) {
                await this.delay(this.baseDelay * Math.pow(2, attempt));
            }
        }
        throw lastError;
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/**
 * Default relay client instance with predefined fallback relays (example).
 * In a real application, these would come from configuration.
 */
export const defaultRelayClient = new RelayClient(
    3, // maxRetries
    1000, // baseDelay in ms
    [/* fallback relay URLs */]
);
