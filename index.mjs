import { readFile } from "node:fs/promises";
import path from "node:path";

const planLimits = {
  Starter: { miles: 5, yearAhead: false, ai: "basic" },
  Pro: { miles: 25, yearAhead: true, ai: "advanced" },
  "Business Plus": { miles: 75, yearAhead: true, ai: "advanced" }
};

function id(prefix) {
  return `${prefix}_${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
}

function todayIso() {
  return new Date().toISOString();
}

function seedDate(monthOffset, day, hour) {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + monthOffset, day, hour, 0, 0).toISOString();
}

const demoBusiness = {
  id: "biz_demo",
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

const sources = [
  ["UF Athletics Schedule", "https://floridagators.com/calendar", "public calendar", "Gainesville"],
  ["University of Florida Calendar", "https://calendar.ufl.edu/", "public calendar", "Gainesville"],
  ["City of Gainesville Events", "https://www.gainesvillefl.gov/Events", "public calendar", "Gainesville"],
  ["Celebration Pointe Events", "https://celebrationpointe.com/events/", "venue calendar", "Gainesville"],
  ["Gainesville Farmers Market", "https://www.gnvmarket.com/", "event website", "Gainesville"]
].map(([sourceName, sourceUrl, sourceType, city], index) => ({
  id: `src_${index + 1}`,
  sourceName,
  sourceUrl,
  sourceType,
  city,
  active: true,
  lastScraped: null
}));

function seedEvents() {
  return [
    {
      id: "evt_football",
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
      startTime: "15:00",
      endTime: "19:00",
      sourceName: "UF Athletics Schedule",
      sourceUrl: "https://floridagators.com/calendar",
      ticketUrl: "https://floridagators.com/tickets",
      imageUrl: "",
      estimatedAttendance: 88000,
      confidenceScore: 91,
      lastUpdated: todayIso()
    },
    {
      id: "evt_concert",
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
      startTime: "19:00",
      endTime: "22:30",
      sourceName: "City of Gainesville Events",
      sourceUrl: "https://www.gainesvillefl.gov/Events",
      ticketUrl: "",
      imageUrl: "",
      estimatedAttendance: 2500,
      confidenceScore: 86,
      lastUpdated: todayIso()
    },
    {
      id: "evt_graduation",
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
      startTime: "09:00",
      endTime: "18:00",
      sourceName: "University of Florida Calendar",
      sourceUrl: "https://calendar.ufl.edu/",
      ticketUrl: "",
      imageUrl: "",
      estimatedAttendance: 21000,
      confidenceScore: 88,
      lastUpdated: todayIso()
    },
    {
      id: "evt_market",
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
      startTime: "08:00",
      endTime: "12:00",
      sourceName: "Gainesville Farmers Market",
      sourceUrl: "https://www.gnvmarket.com/",
      ticketUrl: "",
      imageUrl: "",
      estimatedAttendance: 900,
      confidenceScore: 84,
      lastUpdated: todayIso()
    },
    {
      id: "evt_festival",
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
      startTime: "11:00",
      endTime: "18:00",
      sourceName: "Celebration Pointe Events",
      sourceUrl: "https://celebrationpointe.com/events/",
      ticketUrl: "",
      imageUrl: "",
      estimatedAttendance: 4500,
      confidenceScore: 82,
      lastUpdated: todayIso()
    },
    {
      id: "evt_basketball",
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
      startTime: "20:00",
      endTime: "22:00",
      sourceName: "UF Athletics Schedule",
      sourceUrl: "https://floridagators.com/calendar",
      ticketUrl: "https://floridagators.com/tickets",
      imageUrl: "",
      estimatedAttendance: 10500,
      confidenceScore: 89,
      lastUpdated: todayIso()
    },
    {
      id: "evt_movie",
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
      startTime: "18:00",
      endTime: "21:00",
      sourceName: "City of Gainesville Events",
      sourceUrl: "https://www.gainesvillefl.gov/Events",
      ticketUrl: "",
      imageUrl: "",
      estimatedAttendance: 1200,
      confidenceScore: 80,
      lastUpdated: todayIso()
    }
  ];
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
  const hour = Number((event.startTime || "12:00").slice(0, 2));
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

function buildDashboard() {
  const user = {
    id: "usr_demo",
    name: "Demo Owner",
    email: "demo@eventedge.local",
    subscriptionPlan: "Pro",
    stripeCustomerId: "",
    createdAt: todayIso()
  };
  const business = { ...demoBusiness, subscriptionPlan: "Pro" };
  const plan = planLimits.Pro;
  const events = seedEvents().map((event) => {
    const recommendation = buildRecommendation(business, event);
    return {
      ...event,
      distance: Number(haversineMiles(business, event).toFixed(1)),
      recommendation,
      inPlan: true
    };
  }).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  const alerts = events.filter((event) => event.recommendation.impactScore >= 70).map((event) => ({
    id: id("alt"),
    businessId: business.id,
    eventId: event.id,
    alertType: "app",
    message: `${event.recommendation.expectedDemandLevel} demand expected: prepare for ${event.title}.`,
    sentStatus: "queued",
    createdAt: todayIso()
  }));
  return { user, business, plan, events, alerts, sources };
}

function csvReport(events) {
  const headers = ["Event", "Date", "Category", "Venue", "Distance", "Impact", "Demand", "Products", "Promotion", "Source"];
  const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [headers, ...events.map((event) => [
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

function getRoute(req) {
  const url = new URL(req.url, `https://${req.headers.host || "eventedge.app"}`);
  return url.pathname.replace(/^\/api\/?/, "");
}

async function sendPublicFile(res, pathname) {
  const fileMap = {
    "/": "index.html",
    "": "index.html",
    "/index.html": "index.html",
    "/styles.css": "styles.css",
    "/eventedge-client.js": "eventedge-client.js"
  };
  const fileName = fileMap[pathname];
  if (!fileName) return false;

  const filePath = path.join(process.cwd(), "public", fileName);
  const file = await readFile(filePath);
  const contentTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8"
  };
  res.statusCode = 200;
  res.setHeader("content-type", contentTypes[path.extname(fileName)] || "application/octet-stream");
  res.end(file);
  return true;
}

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(body));
}

function sendText(res, status, contentType, body, extraHeaders = {}) {
  res.statusCode = status;
  res.setHeader("content-type", contentType);
  for (const [key, value] of Object.entries(extraHeaders)) {
    res.setHeader(key, value);
  }
  res.end(body);
}

export default async function handler(req, res) {
  const url = new URL(req.url, `https://${req.headers.host || "eventedge.app"}`);
  if (!url.pathname.startsWith("/api/") && await sendPublicFile(res, url.pathname)) return;

  const route = getRoute(req);
  const dashboard = buildDashboard();

  if (route === "health") return sendJson(res, 200, { ok: true, app: "EventEdge" });
  if (route === "session") return sendJson(res, 200, { user: dashboard.user, business: dashboard.business });
  if (route === "dashboard") return sendJson(res, 200, dashboard);
  if (route === "admin") {
    return sendJson(res, 200, {
      users: [dashboard.user],
      businesses: [dashboard.business],
      events: dashboard.events,
      eventSources: sources,
      recommendations: dashboard.events.map((event) => event.recommendation),
      alerts: dashboard.alerts,
      cities: [{ id: "city_gainesville", name: "Gainesville", state: "FL", active: true }],
      collectionJobs: []
    });
  }
  if (route === "signup" && req.method === "POST") {
    return sendJson(res, 201, { user: { id: id("usr"), ...(req.body || {}), subscriptionPlan: req.body?.subscriptionPlan || "Starter", createdAt: todayIso() } });
  }
  if (route === "businesses" && req.method === "POST") {
    return sendJson(res, 201, { business: { id: id("biz"), state: "FL", latitude: 29.6506, longitude: -82.3233, createdAt: todayIso(), ...(req.body || {}) } });
  }
  if (route === "events" && req.method === "POST") {
    return sendJson(res, 201, { event: { id: id("evt"), state: "FL", confidenceScore: 76, lastUpdated: todayIso(), ...(req.body || {}) } });
  }
  if (route === "sources" && req.method === "POST") {
    return sendJson(res, 201, { source: { id: id("src"), active: true, lastScraped: null, ...(req.body || {}) } });
  }
  if (route === "import/run" && req.method === "POST") {
    return sendJson(res, 200, {
      imported: sources.length,
      job: {
        id: id("job"),
        startedAt: todayIso(),
        completedAt: todayIso(),
        status: "completed",
        eventsImported: sources.length,
        notes: "Used only configured public source URLs. No login, paywall, CAPTCHA, or private pages were accessed."
      }
    });
  }
  if (route === "checkout" && req.method === "POST") {
    const plan = req.body?.plan || "Pro";
    return sendJson(res, 200, {
      checkoutUrl: process.env.STRIPE_PRICE_ID ? "https://checkout.stripe.com/" : `/pricing.html?selected=${encodeURIComponent(plan)}`,
      mode: process.env.STRIPE_PRICE_ID ? "stripe" : "demo",
      message: process.env.STRIPE_PRICE_ID ? "Stripe checkout would start here." : "Demo checkout: add Stripe keys to enable live subscriptions."
    });
  }
  if (route === "report.csv") {
    return sendText(res, 200, "text/csv", csvReport(dashboard.events), {
      "content-disposition": "attachment; filename=gainesville-event-demand-report.csv"
    });
  }
  if (route === "report.pdf") {
    const lines = dashboard.events.slice(0, 18).map((event) => `${event.startDate.slice(0, 10)} - ${event.title} - impact ${event.recommendation.impactScore} - ${event.recommendation.promotionIdea}`);
    return sendText(res, 200, "application/pdf", simplePdf("Gainesville Event Demand Report", lines), {
      "content-disposition": "attachment; filename=gainesville-event-demand-report.pdf"
    });
  }

  return sendJson(res, 404, { error: "Not found", route });
}
