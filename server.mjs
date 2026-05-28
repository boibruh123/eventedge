import http from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const PORT = Number(process.env.PORT || 3000);
const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "data");
const DB_FILE = path.join(DATA_DIR, "eventedge-db.json");
const PUBLIC_DIR = path.join(ROOT, "public");

const planLimits = {
  Starter: { miles: 5, yearAhead: false, ai: "basic" },
  Pro: { miles: 25, yearAhead: true, ai: "advanced" },
  "Business Plus": { miles: 75, yearAhead: true, ai: "advanced" }
};

function id(prefix) {
  return `${prefix}_${crypto.randomBytes(6).toString("hex")}`;
}

function todayIso() {
  return new Date().toISOString();
}

function seedDate(monthOffset, day, hour) {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + monthOffset, day, hour, 0, 0).toISOString();
}

const seedEvents = [
  {
    title: "Florida Gators Football Home Game",
    description: "UF football game day at Ben Hill Griffin Stadium with citywide tailgate and dining demand.",
    category: "College sports",
    venueName: "Ben Hill Griffin Stadium",
    venueAddress: "157 Gale Lemerand Dr",
    city: "Gainesville",
    state: "FL",
    latitude: 29.6499,
    longitude: -82.3486,
    startDate: seedDate(1, 12, 15),
    endTime: "19:00",
    sourceName: "UF Athletics Schedule",
    sourceUrl: "https://floridagators.com/calendar",
    ticketUrl: "https://floridagators.com/tickets",
    imageUrl: "",
    estimatedAttendance: 88000,
    confidenceScore: 91
  },
  {
    title: "Downtown Gainesville Concert Night",
    description: "Outdoor concert near Bo Diddley Plaza expected to increase dinner and late-night foot traffic.",
    category: "Concerts",
    venueName: "Bo Diddley Plaza",
    venueAddress: "111 E University Ave",
    city: "Gainesville",
    state: "FL",
    latitude: 29.6522,
    longitude: -82.3248,
    startDate: seedDate(0, new Date().getDate() + 2, 19),
    endTime: "22:30",
    sourceName: "City of Gainesville Events",
    sourceUrl: "https://www.gainesvillefl.gov/Events",
    ticketUrl: "",
    imageUrl: "",
    estimatedAttendance: 2500,
    confidenceScore: 86
  },
  {
    title: "UF Graduation Weekend",
    description: "University commencement weekend bringing families, hotel stays, restaurant bookings, flowers, and desserts demand.",
    category: "Graduation events",
    venueName: "Stephen C. O'Connell Center",
    venueAddress: "250 Gale Lemerand Dr",
    city: "Gainesville",
    state: "FL",
    latitude: 29.6494,
    longitude: -82.3511,
    startDate: seedDate(2, 3, 9),
    endTime: "18:00",
    sourceName: "University of Florida Calendar",
    sourceUrl: "https://calendar.ufl.edu/",
    ticketUrl: "",
    imageUrl: "",
    estimatedAttendance: 21000,
    confidenceScore: 88
  },
  {
    title: "Gainesville Farmers Market",
    description: "Weekly market creating morning demand for coffee, breakfast, fresh drinks, and grab-and-go snacks.",
    category: "Farmers markets",
    venueName: "Heartwood Soundstage",
    venueAddress: "619 S Main St",
    city: "Gainesville",
    state: "FL",
    latitude: 29.6456,
    longitude: -82.3247,
    startDate: seedDate(0, new Date().getDate() + 5, 8),
    endTime: "12:00",
    sourceName: "Gainesville Farmers Market",
    sourceUrl: "https://www.gnvmarket.com/",
    ticketUrl: "",
    imageUrl: "",
    estimatedAttendance: 900,
    confidenceScore: 84
  },
  {
    title: "Celebration Pointe Food & Art Festival",
    description: "Family-friendly retail and food event with afternoon shopping, drinks, desserts, and parking demand.",
    category: "Festivals",
    venueName: "Celebration Pointe",
    venueAddress: "4949 Celebration Pointe Ave",
    city: "Gainesville",
    state: "FL",
    latitude: 29.6251,
    longitude: -82.3936,
    startDate: seedDate(1, 20, 11),
    endTime: "18:00",
    sourceName: "Celebration Pointe Events",
    sourceUrl: "https://celebrationpointe.com/events/",
    ticketUrl: "",
    imageUrl: "",
    estimatedAttendance: 4500,
    confidenceScore: 82
  },
  {
    title: "Exactech Arena Basketball Matchup",
    description: "Evening college basketball game likely to drive pre-game meals, convenience trips, and post-game snacks.",
    category: "Sports",
    venueName: "Exactech Arena",
    venueAddress: "250 Gale Lemerand Dr",
    city: "Gainesville",
    state: "FL",
    latitude: 29.6492,
    longitude: -82.3514,
    startDate: seedDate(3, 8, 20),
    endTime: "22:00",
    sourceName: "UF Athletics Schedule",
    sourceUrl: "https://floridagators.com/calendar",
    ticketUrl: "https://floridagators.com/tickets",
    imageUrl: "",
    estimatedAttendance: 10500,
    confidenceScore: 89
  },
  {
    title: "Depot Park Family Movie Night",
    description: "Early evening family event supporting demand for picnic snacks, cold drinks, desserts, and quick dinners.",
    category: "Family events",
    venueName: "Depot Park",
    venueAddress: "874 SE 4 St",
    city: "Gainesville",
    state: "FL",
    latitude: 29.6458,
    longitude: -82.3212,
    startDate: seedDate(0, new Date().getDate() + 10, 18),
    endTime: "21:00",
    sourceName: "City of Gainesville Events",
    sourceUrl: "https://www.gainesvillefl.gov/Events",
    ticketUrl: "",
    imageUrl: "",
    estimatedAttendance: 1200,
    confidenceScore: 80
  }
];

const seedSources = [
  ["UF Athletics Schedule", "https://floridagators.com/calendar", "public calendar", "Gainesville"],
  ["University of Florida Calendar", "https://calendar.ufl.edu/", "public calendar", "Gainesville"],
  ["City of Gainesville Events", "https://www.gainesvillefl.gov/Events", "public calendar", "Gainesville"],
  ["Celebration Pointe Events", "https://celebrationpointe.com/events/", "venue calendar", "Gainesville"],
  ["Gainesville Farmers Market", "https://www.gnvmarket.com/", "event website", "Gainesville"]
].map(([sourceName, sourceUrl, sourceType, city]) => ({
  id: id("src"),
  sourceName,
  sourceUrl,
  sourceType,
  city,
  active: true,
  lastScraped: null
}));

const demoBusiness = {
  id: id("biz"),
  userId: "usr_demo",
  businessName: "Swamp & Main Market",
  businessType: "restaurant",
  address: "201 SE 2nd Ave",
  city: "Gainesville",
  state: "FL",
  zipCode: "32601",
  latitude: 29.6506,
  longitude: -82.3233,
  website: "https://example.com",
  businessHours: "Mon-Sun 8 AM-10 PM",
  productsSold: "coffee, sandwiches, pizza, wings, soda, bottled water, snacks, desserts",
  averageCustomerType: "students, families, office workers, event visitors",
  createdAt: todayIso()
};

async function ensureDb() {
  await mkdir(DATA_DIR, { recursive: true });
  if (!existsSync(DB_FILE)) {
    const events = seedEvents.map((event) => ({
      id: id("evt"),
      ...event,
      startTime: event.startDate.slice(11, 16),
      lastUpdated: todayIso()
    }));
    const db = {
      users: [{
        id: "usr_demo",
        name: "Demo Owner",
        email: "demo@eventedge.local",
        passwordHash: hashPassword("demo123"),
        subscriptionPlan: "Pro",
        stripeCustomerId: "",
        createdAt: todayIso()
      }],
      businesses: [demoBusiness],
      events,
      eventSources: seedSources,
      recommendations: [],
      alerts: [],
      cities: [{ id: id("city"), name: "Gainesville", state: "FL", active: true }],
      collectionJobs: []
    };
    db.recommendations = db.events.map((event) => buildRecommendation(demoBusiness, event));
    db.alerts = db.recommendations
      .filter((rec) => rec.impactScore >= 70)
      .map((rec) => ({
        id: id("alt"),
        businessId: rec.businessId,
        eventId: rec.eventId,
        alertType: "app",
        message: `${rec.expectedDemandLevel} demand expected: prepare for ${eventById(db, rec.eventId)?.title || "upcoming event"}.`,
        sentStatus: "queued",
        createdAt: todayIso()
      }));
    await saveDb(db);
  }
}

async function loadDb() {
  await ensureDb();
  return JSON.parse(await readFile(DB_FILE, "utf8"));
}

async function saveDb(db) {
  await writeFile(DB_FILE, JSON.stringify(db, null, 2));
}

function hashPassword(password) {
  return crypto.createHash("sha256").update(`eventedge:${password}`).digest("hex");
}

function haversineMiles(a, b) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function eventById(db, eventId) {
  return db.events.find((event) => event.id === eventId);
}

function demandLevel(score) {
  if (score >= 85) return "Very High";
  if (score >= 65) return "High";
  if (score >= 40) return "Medium";
  return "Low";
}

function categoryBoost(category, businessType) {
  const text = `${category} ${businessType}`.toLowerCase();
  if (text.includes("college sports") || text.includes("graduation")) return 22;
  if (text.includes("concert") || text.includes("nightlife")) return 16;
  if (text.includes("farmers") && /(coffee|restaurant|food|grocery)/.test(text)) return 14;
  if (text.includes("festival") || text.includes("family")) return 12;
  return 7;
}

function computeImpactScore(business, event) {
  const distance = haversineMiles(business, event);
  const distanceScore = Math.max(0, 35 - distance * 5);
  const attendanceScore = Math.min(28, Math.log10(Math.max(10, event.estimatedAttendance || 100)) * 8);
  const hour = Number((event.startTime || event.startDate.slice(11, 16)).slice(0, 2));
  const timeScore = hour >= 16 && hour <= 22 ? 14 : hour >= 7 && hour <= 12 ? 10 : 6;
  const day = new Date(event.startDate).getDay();
  const weekendScore = day === 0 || day === 5 || day === 6 ? 8 : 4;
  const relevance = categoryBoost(event.category, business.businessType);
  const confidence = Math.max(0, Math.min(8, (event.confidenceScore || 70) / 12));
  return Math.max(1, Math.min(100, Math.round(distanceScore + attendanceScore + timeScore + weekendScore + relevance + confidence)));
}

function productsFor(event, business) {
  const category = event.category.toLowerCase();
  const type = business.businessType.toLowerCase();
  if (category.includes("sports") || category.includes("college")) return ["wings", "pizza", "soda", "ice", "water bottles", "chips", "grab-and-go snacks"];
  if (category.includes("concert") || category.includes("nightlife")) return ["late-night food", "cold drinks", "phone chargers", "quick meals", "parking-friendly bundles"];
  if (category.includes("graduation")) return ["desserts", "family meal deals", "coffee", "gift cards", "reservation slots", "flowers partner offer"];
  if (category.includes("farmers")) return ["coffee", "breakfast sandwiches", "fresh drinks", "grab-and-go snacks"];
  if (type.includes("gas")) return ["gas", "ice", "energy drinks", "water bottles", "chips"];
  return ["quick meals", "drinks", "snacks", "bundle offers", "extra checkout supplies"];
}

function buildRecommendation(business, event) {
  const impactScore = computeImpactScore(business, event);
  const level = demandLevel(impactScore);
  const products = productsFor(event, business);
  const start = new Date(event.startDate);
  const prep = new Date(start.getTime() - 36 * 60 * 60 * 1000);
  const staffing = impactScore >= 85 ? "Add 2-3 extra staff during the 3 hours before and after the event." :
    impactScore >= 65 ? "Add 1-2 extra staff around peak event travel windows." :
      impactScore >= 40 ? "Keep one flexible backup staff member available." :
        "Normal staffing should be enough; monitor same-day traffic.";
  const promotion = impactScore >= 70 ? `${event.category.split(" ")[0]} Day Combo` : "Local Event Bundle";
  return {
    id: id("rec"),
    businessId: business.id,
    eventId: event.id,
    impactScore,
    expectedDemandLevel: level,
    recommendedProducts: products,
    recommendedStaffing: staffing,
    marketingIdea: `Post a ${promotion} reminder the morning of ${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })}.`,
    promotionIdea: `Run a ${promotion} with ${products.slice(0, 3).join(", ")}.`,
    aiExplanation: `${event.title} is ${haversineMiles(business, event).toFixed(1)} miles from ${business.businessName}. ${level} demand is likely because of the event type, estimated attendance, timing, and fit for ${business.businessType} customers.`,
    suggestedSocialPost: `${event.title} is coming up near Gainesville. Stop by for fast ${products.slice(0, 2).join(" and ")} before or after the event.`,
    bestTimeToPrepare: prep.toISOString(),
    createdAt: todayIso()
  };
}

function dedupeEvents(events) {
  const seen = new Map();
  for (const event of events) {
    const key = `${event.title.toLowerCase().replace(/[^a-z0-9]/g, "")}:${event.venueName.toLowerCase()}:${event.startDate.slice(0, 10)}`;
    const existing = seen.get(key);
    if (!existing || (event.confidenceScore || 0) > (existing.confidenceScore || 0)) seen.set(key, event);
  }
  return [...seen.values()];
}

async function refreshEvents(db) {
  const startedAt = todayIso();
  const imported = [];
  for (const source of db.eventSources.filter((src) => src.active)) {
    source.lastScraped = todayIso();
    imported.push({
      id: id("evt"),
      title: `${source.sourceName.replace(/ Events| Calendar| Schedule/g, "")} Featured Update`,
      description: `Responsible public-source placeholder imported from ${source.sourceName}. Replace this collector with the source API, RSS, iCal feed, or permitted public calendar parser.`,
      category: source.sourceName.includes("UF") ? "University of Florida events" : "Community events",
      venueName: source.sourceName.includes("UF") ? "University of Florida" : "Downtown Gainesville",
      venueAddress: source.sourceName.includes("UF") ? "Gainesville, FL 32611" : "111 E University Ave",
      city: "Gainesville",
      state: "FL",
      latitude: source.sourceName.includes("UF") ? 29.6436 : 29.6522,
      longitude: source.sourceName.includes("UF") ? -82.3549 : -82.3248,
      startDate: seedDate(4, Math.max(1, new Date().getDate() - 2), 17),
      startTime: "17:00",
      endTime: "20:00",
      sourceName: source.sourceName,
      sourceUrl: source.sourceUrl,
      ticketUrl: "",
      imageUrl: "",
      estimatedAttendance: 750,
      confidenceScore: 62,
      lastUpdated: todayIso()
    });
  }
  db.events = dedupeEvents([...db.events, ...imported]);
  db.collectionJobs.unshift({
    id: id("job"),
    startedAt,
    completedAt: todayIso(),
    status: "completed",
    eventsImported: imported.length,
    notes: "Used only configured public source URLs. No login, paywall, CAPTCHA, or private pages were accessed."
  });
  rebuildRecommendations(db);
  return imported.length;
}

function rebuildRecommendations(db) {
  db.recommendations = [];
  db.alerts = db.alerts || [];
  for (const business of db.businesses) {
    for (const event of db.events) {
      const rec = buildRecommendation(business, event);
      db.recommendations.push(rec);
      if (rec.impactScore >= 75 && !db.alerts.some((alert) => alert.businessId === business.id && alert.eventId === event.id)) {
        db.alerts.push({
          id: id("alt"),
          businessId: business.id,
          eventId: event.id,
          alertType: "app",
          message: `${rec.expectedDemandLevel} demand event added near your location: ${event.title}.`,
          sentStatus: "queued",
          createdAt: todayIso()
        });
      }
    }
  }
}

function json(res, status, body) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
}

async function body(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function enrich(db, businessId = db.businesses[0]?.id) {
  const business = db.businesses.find((item) => item.id === businessId) || db.businesses[0];
  const plan = planLimits[business?.subscriptionPlan || db.users[0]?.subscriptionPlan || "Pro"] || planLimits.Pro;
  const events = db.events
    .map((event) => {
      const rec = db.recommendations.find((item) => item.businessId === business.id && item.eventId === event.id) || buildRecommendation(business, event);
      const distance = haversineMiles(business, event);
      return { ...event, distance: Number(distance.toFixed(1)), recommendation: rec, inPlan: distance <= plan.miles };
    })
    .filter((event) => event.inPlan)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  return { business, plan, events };
}

function csvReport(rows) {
  const headers = ["Event", "Date", "Category", "Venue", "Distance", "Impact", "Demand", "Products", "Promotion", "Source"];
  const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [headers, ...rows.map((event) => [
    event.title,
    event.startDate.slice(0, 10),
    event.category,
    event.venueName,
    event.distance,
    event.recommendation.impactScore,
    event.recommendation.expectedDemandLevel,
    event.recommendation.recommendedProducts.join("; "),
    event.recommendation.promotionIdea,
    event.sourceUrl
  ])].map((row) => row.map(escape).join(",")).join("\n");
}

function simplePdf(title, lines) {
  const safeLines = [title, "", ...lines].map((line) => String(line).replace(/[()\\]/g, ""));
  const content = `BT /F1 14 Tf 50 760 Td (${safeLines.join(") Tj T* (")}) Tj ET`;
  const objects = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
    "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj",
    "4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
    `5 0 obj << /Length ${content.length} >> stream\n${content}\nendstream endobj`
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const object of objects) {
    offsets.push(pdf.length);
    pdf += `${object}\n`;
  }
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => { pdf += `${String(offset).padStart(10, "0")} 00000 n \n`; });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf);
}

async function api(req, res, route) {
  const db = await loadDb();
  if (route === "/api/health") return json(res, 200, { ok: true, app: "EventEdge" });
  if (route === "/api/session") return json(res, 200, { user: db.users[0], business: db.businesses[0] });
  if (route === "/api/signup" && req.method === "POST") {
    const input = await body(req);
    const user = { id: id("usr"), name: input.name, email: input.email, passwordHash: hashPassword(input.password || "eventedge"), subscriptionPlan: input.subscriptionPlan || "Starter", stripeCustomerId: "", createdAt: todayIso() };
    db.users.unshift(user);
    await saveDb(db);
    return json(res, 201, { user });
  }
  if (route === "/api/businesses" && req.method === "POST") {
    const input = await body(req);
    const business = { id: id("biz"), userId: input.userId || db.users[0].id, state: "FL", latitude: 29.6506, longitude: -82.3233, createdAt: todayIso(), ...input };
    db.businesses.unshift(business);
    rebuildRecommendations(db);
    await saveDb(db);
    return json(res, 201, { business });
  }
  if (route === "/api/dashboard") {
    const { business, plan, events } = enrich(db);
    return json(res, 200, { business, plan, events, alerts: db.alerts, sources: db.eventSources });
  }
  if (route === "/api/events" && req.method === "POST") {
    const input = await body(req);
    const event = { id: id("evt"), state: "FL", confidenceScore: 70, estimatedAttendance: 100, lastUpdated: todayIso(), ...input };
    event.startTime = event.startTime || event.startDate?.slice(11, 16) || "12:00";
    db.events = dedupeEvents([event, ...db.events]);
    rebuildRecommendations(db);
    await saveDb(db);
    return json(res, 201, { event });
  }
  if (route === "/api/import/run" && req.method === "POST") {
    const imported = await refreshEvents(db);
    await saveDb(db);
    return json(res, 200, { imported, job: db.collectionJobs[0] });
  }
  if (route === "/api/sources" && req.method === "POST") {
    const input = await body(req);
    const source = { id: id("src"), active: true, lastScraped: null, ...input };
    db.eventSources.unshift(source);
    await saveDb(db);
    return json(res, 201, { source });
  }
  if (route === "/api/admin") return json(res, 200, db);
  if (route === "/api/checkout" && req.method === "POST") {
    const input = await body(req);
    const plan = input.plan || "Pro";
    return json(res, 200, {
      checkoutUrl: process.env.STRIPE_PRICE_ID ? "https://checkout.stripe.com/" : `/pricing.html?selected=${encodeURIComponent(plan)}`,
      mode: process.env.STRIPE_PRICE_ID ? "stripe" : "demo",
      message: process.env.STRIPE_PRICE_ID ? "Stripe checkout would start here." : "Demo checkout: add Stripe keys to enable live subscriptions."
    });
  }
  if (route === "/api/report.csv") {
    const { events } = enrich(db);
    res.writeHead(200, { "content-type": "text/csv", "content-disposition": "attachment; filename=gainesville-event-demand-report.csv" });
    return res.end(csvReport(events));
  }
  if (route === "/api/report.pdf") {
    const { events } = enrich(db);
    const lines = events.slice(0, 18).map((event) => `${event.startDate.slice(0, 10)} - ${event.title} - impact ${event.recommendation.impactScore} - ${event.recommendation.promotionIdea}`);
    const pdf = simplePdf("Gainesville Event Demand Report", lines);
    res.writeHead(200, { "content-type": "application/pdf", "content-disposition": "attachment; filename=gainesville-event-demand-report.pdf" });
    return res.end(pdf);
  }
  return json(res, 404, { error: "Not found" });
}

async function staticFile(res, pathname) {
  const filePath = path.join(PUBLIC_DIR, pathname === "/" ? "index.html" : pathname);
  if (!filePath.startsWith(PUBLIC_DIR)) return json(res, 403, { error: "Forbidden" });
  try {
    const file = await readFile(filePath);
    const ext = path.extname(filePath);
    const types = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".svg": "image/svg+xml" };
    res.writeHead(200, { "content-type": types[ext] || "application/octet-stream" });
    res.end(file);
  } catch {
    res.writeHead(302, { location: "/" });
    res.end();
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname.startsWith("/api/")) return await api(req, res, url.pathname);
    return await staticFile(res, url.pathname);
  } catch (error) {
    json(res, 500, { error: error.message });
  }
});

await ensureDb();
setInterval(async () => {
  const db = await loadDb();
  await refreshEvents(db);
  await saveDb(db);
}, 24 * 60 * 60 * 1000).unref();

server.listen(PORT, "127.0.0.1", () => {
  console.log(`EventEdge running at http://localhost:${PORT}`);
});
