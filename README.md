# GuessThePrice

GuessThePrice is a production-ready MVP web game built with Next.js 15, TypeScript, Tailwind CSS, Supabase, and Vercel.

Players see a real-world item, guess its current market price, reveal the actual price, earn points by accuracy, and complete a 10-round daily challenge shared by all players.

## Tech Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, Row Level Security, and Realtime-ready tables
- Vercel deployment

## Product Features

- Daily Challenge with the same 10 items for all players
- Guest mode
- Google login hook through Supabase Auth
- Email login-ready Supabase configuration
- Global, weekly, and monthly leaderboard surfaces
- Private room screen with live-score data model
- Admin dashboard for item operations and AI content workflow
- Rewarded video, sponsored item, and featured challenge placeholders
- Verified-price item model with source URLs
- Fallback item database so the app runs before Supabase is configured

## Scoring

- Perfect guess: 1000 points
- Within 5%: 750 points
- Within 10%: 500 points
- Within 20%: 250 points
- Otherwise: 100 points

## Folder Structure

```text
src/
  app/
    api/
      daily/route.ts
      items/route.ts
      leaderboard/route.ts
      rooms/route.ts
    globals.css
    layout.tsx
    page.tsx
  components/
    guess-the-price-app.tsx
  lib/
    items.ts
    scoring.ts
    supabase.ts
    types.ts
supabase/
  schema.sql
.env.example
next.config.ts
tailwind.config.ts
vercel.json
```

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

The app works without these values by using local fallback data. Add the Supabase values to enable persistent items, leaderboards, auth, and room state.

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL editor.
3. Run `supabase/schema.sql`.
4. Enable Google auth in Supabase if you want Google login.
5. Add your site URL and Vercel preview URLs to Supabase Auth redirect URLs.
6. Optional: enable Realtime on `multiplayer_rooms` and `game_sessions`.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Vercel Deployment

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Set the environment variables from `.env.example`.
4. Deploy.

`vercel.json` is intentionally minimal and declares the framework as Next.js. Vercel will run `npm run build` automatically.

## Price Data Guidance

The MVP is designed around categories where pricing can be verified: houses, cars, sneakers, watches, trading cards, electronics, luxury handbags, sports memorabilia, furniture, boats, and collectibles.

For production item generation, prefer legitimate APIs and public datasets with price provenance. Examples include official manufacturer pages, public housing data, government datasets, auction APIs, price index providers, and marketplaces with permitted API or linking terms. Do not scrape websites that prohibit scraping, require login, block automated access, or hide price data behind paywalls.

Each item should store:

```json
{
  "id": "uuid",
  "image": "https://...",
  "title": "Item name",
  "category": "Watches",
  "price": 29250,
  "source": "https://price-reference.example",
  "difficulty": "Hard"
}
```

## Production Notes

- Use `SUPABASE_SERVICE_ROLE_KEY` only on the server.
- Keep admin item mutations behind role checks before opening the dashboard publicly.
- The current ad and sponsorship areas are placeholders; no real ad SDK is integrated.
- Fallback images use public image URLs. For high traffic, copy licensed assets to your own storage or use an image API with explicit terms.
