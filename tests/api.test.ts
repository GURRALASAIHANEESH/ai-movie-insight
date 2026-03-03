import { isValidImdbId } from "@/lib/validators";
import { movieCache } from "@/lib/cache";
import { MovieInsight } from "@/types/movie";

describe("InMemoryCache", () => {
    beforeEach(() => movieCache.clear());

    it("returns null for missing key", () => {
        expect(movieCache.get("tt9999999")).toBeNull();
    });

    it("stores and retrieves a value", () => {
        const mock: Partial<MovieInsight> = {
            movie: {
                imdbID: "tt0133093",
                title: "The Matrix",
                year: "1999",
                poster: "",
                rating: "8.7",
                plot: "A hacker discovers reality.",
                cast: ["Keanu Reeves"],
                genre: "Sci-Fi",
                director: "The Wachowskis",
                runtime: "136 min",
            },
        };
        movieCache.set("tt0133093", mock);
        expect(movieCache.get("tt0133093")).toEqual(mock);
    });

    it("returns false for has() on missing key", () => {
        expect(movieCache.has("tt0000000")).toBe(false);
    });

    it("returns true for has() on existing key", () => {
        movieCache.set("tt0000001", { data: "test" });
        expect(movieCache.has("tt0000001")).toBe(true);
    });

    it("clears all entries", () => {
        movieCache.set("tt0000002", { data: "test" });
        movieCache.clear();
        expect(movieCache.get("tt0000002")).toBeNull();
    });
});

describe("API input validation integration", () => {
    it("rejects invalid ID before hitting API", () => {
        expect(isValidImdbId("not-an-id")).toBe(false);
    });

    it("accepts correct IMDb ID format", () => {
        expect(isValidImdbId("tt0468569")).toBe(true);
    });
});
