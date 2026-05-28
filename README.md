# EventEdge

EventEdge is a full-stack SaaS MVP for Gainesville, Florida businesses that turns local events into inventory, staffing, and promotion recommendations.

## Run Locally

```bash
node server.mjs
```

Open `http://localhost:3000`.

The app uses only built-in Node APIs, so it does not require installing packages for this MVP.

## Included

- Business account/profile setup
- Gainesville event dashboard
- Today, week, month, and year-ahead event views
- Event details with source links, confidence, distance, attendance, and impact score
- AI-style recommendation cards for stocking, staffing, promotions, social posts, and preparation timing
- High-impact alerts
- Event map view
- Admin panel for users, businesses, sources, manual event creation, and collection jobs
- Responsible public-source event import placeholder
- Duplicate event detection
- CSV and PDF report downloads
- Subscription pricing and Stripe checkout handoff route

## Data

Local data is stored in:

```text
data/eventedge-db.json
```

The seed data starts with Gainesville-focused venues and categories including University of Florida, Ben Hill Griffin Stadium, Exactech Arena, Downtown Gainesville, Celebration Pointe, Depot Park, Bo Diddley Plaza, concerts, farmers markets, graduation, sports, and family events.

## Production Integration Points

- Replace the local auth demo with Clerk, NextAuth, or another auth provider.
- Replace JSON storage with PostgreSQL and Prisma using the models in the original product brief.
- Connect `/api/checkout` to Stripe Checkout with plan-specific price IDs.
- Connect recommendations to the OpenAI API if you want generated copy beyond the deterministic MVP engine.
- Replace `refreshEvents` in `server.mjs` with legal public APIs, RSS feeds, iCal feeds, venue calendars, university calendars, ticket APIs, and city calendars.
- Add Google Maps or Mapbox for production maps.
- Add an email/SMS provider for alert delivery.

## Responsible Collection Rules

The MVP intentionally does not bypass logins, paywalls, CAPTCHAs, or private websites. Every event stores its source name and original source URL, and uncertain imported events should keep a lower confidence score.
