export interface MovieData {
    imdbID: string;
    title: string;
    year: string;
    poster: string;
    rating: string;
    plot: string;
    cast: string[];
    genre: string;
    director: string;
    runtime: string;
}

export interface SentimentResult {
    summary: string;
    sentiment: "positive" | "mixed" | "negative";
    confidence: number;
}

export interface MovieInsight {
    movie: MovieData;
    sentiment: SentimentResult;
}

export interface ApiErrorResponse {
    error: string;
    code: "INVALID_ID" | "NOT_FOUND" | "API_FAILURE" | "AI_FAILURE" | "RATE_LIMIT";
}
