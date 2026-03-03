import { SentimentResult } from "@/types/movie";

// Pure unit test — validates sentiment shape & classification logic
function isValidSentiment(data: unknown): data is SentimentResult {
    if (typeof data !== "object" || data === null) return false;
    const d = data as Record<string, unknown>;
    return (
        typeof d.summary === "string" &&
        ["positive", "mixed", "negative"].includes(d.sentiment as string) &&
        typeof d.confidence === "number" &&
        (d.confidence as number) >= 0 &&
        (d.confidence as number) <= 1
    );
}

describe("Sentiment validation logic", () => {
    it("accepts a valid positive sentiment object", () => {
        const result = { summary: "Great film.", sentiment: "positive", confidence: 0.9 };
        expect(isValidSentiment(result)).toBe(true);
    });

    it("accepts a valid mixed sentiment object", () => {
        const result = { summary: "Decent film.", sentiment: "mixed", confidence: 0.5 };
        expect(isValidSentiment(result)).toBe(true);
    });

    it("accepts a valid negative sentiment object", () => {
        const result = { summary: "Poor film.", sentiment: "negative", confidence: 0.8 };
        expect(isValidSentiment(result)).toBe(true);
    });

    it("rejects unknown sentiment classification", () => {
        const result = { summary: "OK film.", sentiment: "neutral", confidence: 0.5 };
        expect(isValidSentiment(result)).toBe(false);
    });

    it("rejects confidence greater than 1", () => {
        const result = { summary: "OK film.", sentiment: "positive", confidence: 1.5 };
        expect(isValidSentiment(result)).toBe(false);
    });

    it("rejects missing summary field", () => {
        const result = { sentiment: "positive", confidence: 0.9 };
        expect(isValidSentiment(result)).toBe(false);
    });

    it("rejects null input", () => {
        expect(isValidSentiment(null)).toBe(false);
    });
});
