interface CacheEntry<T> {
    data: T;
    expiresAt: number;
}

class InMemoryCache {
    private store = new Map<string, CacheEntry<unknown>>();
    private readonly TTL_MS: number;

    constructor(ttlMinutes = 30) {
        this.TTL_MS = ttlMinutes * 60 * 1000;
    }

    get<T>(key: string): T | null {
        const entry = this.store.get(key);
        if (!entry) return null;
        if (Date.now() > entry.expiresAt) {
            this.store.delete(key);
            return null;
        }
        return entry.data as T;
    }

    set<T>(key: string, data: T): void {
        this.store.set(key, {
            data,
            expiresAt: Date.now() + this.TTL_MS,
        });
    }

    has(key: string): boolean {
        return this.get(key) !== null;
    }

    clear(): void {
        this.store.clear();
    }
}

// Singleton instance shared across API calls
export const movieCache = new InMemoryCache(30);
