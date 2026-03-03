# AI Movie Insight

> A production-ready full-stack Next.js application that accepts an IMDb ID and returns rich movie metadata powered by AI-driven audience sentiment analysis.

**Live Demo:** [https://ai-movie-insight-zeta.vercel.app](https://ai-movie-insight-zeta.vercel.app)  
**Assignment:** Full-Stack Developer Internship — Brew  
**Deadline:** 5th March 2026

---

## Features

- Movie title, poster, cast, release year, IMDb rating, and plot
- AI-generated audience sentiment summary via Groq + LLaMA 3
- Sentiment classification: **Positive / Mixed / Negative**
- Sentiment distribution bar chart
- Skeleton shimmer loading UI
- Dark / Light theme toggle
- Copy AI summary to clipboard
- In-memory caching with 30-minute TTL
- Rate limiting: 10 requests per minute per IP
- Fully responsive across mobile and desktop
- 23 passing unit and integration tests

---

## Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | Next.js 15 (App Router) | SSR, file-based routing, Vercel-native |
| Language | TypeScript | Type safety and maintainability |
| Styling | Tailwind CSS | Rapid, consistent, responsive UI |
| Backend | Next.js API Routes | No separate server required |
| Movie Data | OMDb API | Free, reliable IMDb metadata |
| AI | Groq API (LLaMA 3-70B) | Free tier, sub-second inference |
| Testing | Jest + React Testing Library | Unit and integration coverage |
| Deployment | Vercel | Zero-config Next.js hosting |

---

## Project Structure

```
ai-movie-insight/
├── app/
│   ├── api/movie/route.ts     # Backend: validation, OMDb fetch, AI, cache
│   ├── page.tsx               # Main UI page (client)
│   ├── layout.tsx             # Root layout + SEO metadata
│   └── globals.css            # Global styles + animations
├── components/
│   ├── SearchForm.tsx         # IMDb ID input with real-time validation
│   ├── MovieCard.tsx          # Full result card with all movie data
│   ├── SentimentBadge.tsx     # Color-coded AI sentiment display
│   ├── SentimentChart.tsx     # Sentiment distribution bar chart
│   ├── CastList.tsx           # Cast avatar pills
│   ├── SkeletonLoader.tsx     # Shimmer loading placeholder UI
│   └── ThemeToggle.tsx        # Dark/light mode toggle
├── lib/
│   ├── omdb.ts                # OMDb API fetch + response mapping
│   ├── sentiment.ts           # Groq AI prompt + sentiment parsing
│   ├── cache.ts               # In-memory TTL cache singleton
│   └── validators.ts          # IMDb ID regex validation + sanitization
├── types/
│   └── movie.ts               # Shared TypeScript interfaces
├── tests/
│   ├── validators.test.ts     # 9 unit tests for ID validation
│   ├── sentiment.test.ts      # 7 unit tests for sentiment logic
│   └── api.test.ts            # 7 cache + integration tests
└── .env.example
```

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/GURRALASAIHANEESH/ai-movie-insight.git
cd ai-movie-insight
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your API keys:

```env
OMDB_API_KEY=your_omdb_api_key_here
GROQ_API_KEY=your_groq_api_key_here
```

- **OMDb API Key** — Free at [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
- **Groq API Key** — Free at [console.groq.com](https://console.groq.com)

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run the test suite

```bash
npm test
```

Expected output: **23 tests passing**

---

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import repository.
3. Add the following environment variables in the Vercel dashboard:
   - `OMDB_API_KEY`
   - `GROQ_API_KEY`
4. Click **Deploy**.

Vercel automatically redeploys on every push to `main`.

---

## AI Integration

The application uses the **Groq API** with the **LLaMA 3-70B** model for sentiment analysis.

**Why Groq instead of OpenAI?**
- Generous free tier with no credit card required
- Sub-second inference latency
- LLaMA 3-70B provides strong capability for text classification tasks

**How sentiment analysis works:**

1. Movie title, plot, and cast are sent as context to the model.
2. A structured prompt requests JSON output containing `summary`, `sentiment`, and `confidence`.
3. The response is validated — invalid or missing fields fall back gracefully to a safe default.
4. Results are cached for 30 minutes to avoid redundant API calls.

**Prompt design decisions:**
- An explicit JSON schema in the prompt reduces hallucinations.
- Temperature is set to `0.4` for consistent, factual output.
- Regex-based JSON extraction handles edge cases in model output formatting.

---

## Architecture

```
Browser → Next.js page.tsx (Client)
              |
         /api/movie?id=tt... (Server API Route)
              |
    +-----------------------+
    |   Rate Limiter        |  10 req/min per IP
    |   ID Validator        |  tt + 7-8 digits
    |   Memory Cache        |  30 min TTL
    +-----------------------+
              |
    +----------------+    +--------------+
    |   OMDb API     |    |   Groq AI    |
    |  (Movie Data)  |    | (Sentiment)  |
    +----------------+    +--------------+
              |
    JSON Response → MovieCard UI
```

---

## Assumptions

- The OMDb free tier is used. Very recent releases (2025) may not yet be indexed.
- Sentiment analysis is derived from movie metadata (plot and cast), not live scraped reviews. This avoids Terms of Service violations while still producing meaningful AI insights.
- Rate limiting uses an in-memory store that resets on server restart, which is acceptable at this scale.
- Dark mode is the default theme on first visit.

---

## Edge Cases Handled

| Case | Handling |
|---|---|
| Invalid IMDb ID format | Client-side and server-side validation with a user-friendly message |
| Movie not found in OMDb | 404 response with a clear error message |
| Missing poster image | Graceful fallback placeholder |
| Groq API failure | Returns fallback sentiment; application remains functional |
| Rate limit exceeded | 429 response with a retry message |
| Network failure | Try/catch blocks with user-facing error state |
| Malformed AI response | Regex JSON extraction with field validation |

---

## Potential Improvements

- TMDB API integration for broader 2024/2025 movie coverage
- Search by movie title in addition to IMDb ID
- Persistent caching with Redis
- Review word cloud visualization
- Movie comparison feature
- PWA support for offline use

---

## Test Coverage

```
Tests:        23 passed, 23 total
Test Suites:  3 passed, 3 total
```

| File | Coverage |
|---|---|
| `validators.test.ts` | IMDb ID format validation — 9 tests |
| `sentiment.test.ts` | Sentiment shape and classification logic — 7 tests |
| `api.test.ts` | Cache behavior and integration validation — 7 tests |

---

Built with Next.js, TypeScript, Tailwind CSS, OMDb API, and Groq AI.
