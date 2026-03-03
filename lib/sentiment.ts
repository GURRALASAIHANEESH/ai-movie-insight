import { SentimentResult } from "@/types/movie";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const FALLBACK_SENTIMENT: SentimentResult = {
    summary:
        "Sentiment analysis is currently unavailable. Please try again later.",
    sentiment: "mixed",
    confidence: 0,
};

function buildPrompt(title: string, plot: string, cast: string[]): string {
    return `You are a film critic AI. Based on the movie details below, provide an audience sentiment analysis.

Movie: "${title}"
Plot: "${plot}"
Cast: ${cast.slice(0, 5).join(", ")}

Instructions:
- Write a 2-3 sentence audience sentiment summary based on the movie's themes, genre, and general public reception.
- Classify overall sentiment as exactly one of: positive, mixed, negative.
- Provide a confidence score between 0 and 1.
- Do NOT hallucinate reviews. Base analysis only on the provided details.
- Respond ONLY with valid JSON, no extra text.

Required JSON format:
{
  "summary": "string",
  "sentiment": "positive" | "mixed" | "negative",
  "confidence": number
}`;
}

export async function analyzeSentiment(
    title: string,
    plot: string,
    cast: string[]
): Promise<SentimentResult> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        console.warn("GROQ_API_KEY not set, returning fallback sentiment");
        return FALLBACK_SENTIMENT;
    }

    try {
        const res = await fetch(GROQ_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: buildPrompt(title, plot, cast) }],
                temperature: 0.4,
                max_tokens: 300,
            }),
        });

        if (!res.ok) {
            const errBody = await res.text();
            console.error(`Groq API error: ${res.status}`, errBody);
            return FALLBACK_SENTIMENT;
        }

        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content ?? "";

        // Safely parse JSON from response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) return FALLBACK_SENTIMENT;

        const parsed = JSON.parse(jsonMatch[0]) as SentimentResult;

        // Validate fields
        if (
            typeof parsed.summary !== "string" ||
            !["positive", "mixed", "negative"].includes(parsed.sentiment) ||
            typeof parsed.confidence !== "number"
        ) {
            return FALLBACK_SENTIMENT;
        }

        return parsed;
    } catch (err) {
        console.error("Sentiment analysis failed:", err);
        return FALLBACK_SENTIMENT;
    }
}
