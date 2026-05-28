const state = { dashboard: null, admin: null };

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const fmtDate = (value, opts = {}) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", ...opts });
const fmtTime = (value) => new Date(value).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
const levelClass = (level) => level === "Very High" || level === "High" ? "high" : level === "Medium" ? "medium" : "low";

document.addEventListener("DOMContentLoaded", async () => {
  $("#heroDate").textContent = new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  $$("[data-scroll]").forEach((button) => button.addEventListener("click", () => document.getElementById(button.dataset.scroll).scrollIntoView()));
  $("#closeDialog").addEventListener("click", () => $("#eventDialog").close());
  $("#businessForm").addEventListener("submit", saveBusiness);
  $("#eventForm").addEventListener("submit", addEvent);
  $("#sourceForm").addEventListener("submit", addSource);
  $("#runImport").addEventListener("click", runImport);
  $$(".checkout").forEach((button) => button.addEventListener("click", checkout));
  await refreshAll();
});

async function request(path, options = {}) {
  const res = await fetch(path, {
    headers: { "content-type": "application/json" },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  if (!res.ok) throw new Error((await res.json()).error || "Request failed");
  return res.json();
}

async function refreshAll() {
  state.dashboard = await request("/api/dashboard");
  state.admin = await request("/api/admin");
  renderDashboard();
  renderAdmin();
}

function renderDashboard() {
  const { business, plan, events, alerts, sources } = state.dashboard;
  $("#businessTitle").textContent = `${business.businessName} Event Dashboard`;
  $("#businessMeta").textContent = `${business.businessType} in ${business.city}, ${business.state} · ${plan.miles}-mile event coverage · ${business.productsSold}`;
  $("#metricEvents").textContent = events.length;
  $("#metricHigh").textContent = events.filter((event) => event.recommendation.impactScore >= 65).length;
  $("#metricAvg").textContent = Math.round(events.reduce((sum, event) => sum + event.recommendation.impactScore, 0) / Math.max(1, events.length));
  $("#metricMiles").textContent = `${plan.miles} mi`;

  const today = new Date().toISOString().slice(0, 10);
  const now = new Date();
  const weekEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const todayEvents = events.filter((event) => event.startDate.slice(0, 10) === today);
  const weekEvents = events.filter((event) => new Date(event.startDate) >= now && new Date(event.startDate) <= weekEnd);
  $("#todayCount").textContent = `${todayEvents.length} events`;
  $("#todayEvents").innerHTML = todayEvents.length ? todayEvents.map(eventRow).join("") : empty("No events today. Use the week and year-ahead views to prepare early.");
  $("#weekEvents").innerHTML = weekEvents.length ? weekEvents.map(eventRow).join("") : empty("No events this week in your plan radius.");
  $("#yearEvents").innerHTML = events.map(yearRow).join("");
  $("#alertsList").innerHTML = alerts.length ? alerts.slice(0, 8).map((alert) => `<div class="alert">${alert.message}</div>`).join("") : empty("No high-impact alerts yet.");
  $("#recommendationGrid").innerHTML = events.slice(0, 6).map(recCard).join("");
  renderCalendar(events);
  renderMap(events);
  attachEventClicks(events);
  $("#mapLegend").innerHTML = sources.slice(0, 8).map((source) => `<div class="legend-item"><strong>${source.sourceName}</strong><br><span class="muted">${source.sourceType} · ${source.active ? "active" : "paused"}</span></div>`).join("");
}

function empty(text) {
  return `<div class="muted">${text}</div>`;
}

function eventRow(event) {
  const rec = event.recommendation;
  const cls = levelClass(rec.expectedDemandLevel);
  return `
    <button class="event-row" data-event="${event.id}">
      <div class="date-pill">${fmtDate(event.startDate)}<br><small>${fmtTime(event.startDate)}</small></div>
      <div class="event-title">
        <strong>${event.title}</strong>
        <span>${event.category} · ${event.venueName} · ${event.distance} miles</span>
        <small>${event.description}</small>
      </div>
      <div class="score ${cls}">${rec.impactScore}</div>
      <div class="level">${rec.expectedDemandLevel}</div>
    </button>
  `;
}

function yearRow(event) {
  return `
    <button class="table-row" data-event="${event.id}">
      <strong>${fmtDate(event.startDate, { year: "numeric" })}</strong>
      <span>${event.title} · ${event.venueName}</span>
      <span>${event.category}</span>
      <strong>${event.recommendation.impactScore}</strong>
    </button>
  `;
}

function recCard(event) {
  const rec = event.recommendation;
  return `
    <article class="rec-card">
      <h4>${event.title}</h4>
      <div class="tag-row">
        <span class="tag">${rec.expectedDemandLevel}</span>
        <span class="tag">Impact ${rec.impactScore}</span>
        <span class="tag">${event.distance} mi</span>
      </div>
      <p>${rec.aiExplanation}</p>
      <div><strong>Stock:</strong> ${rec.recommendedProducts.join(", ")}</div>
      <div><strong>Staffing:</strong> ${rec.recommendedStaffing}</div>
      <div><strong>Promotion:</strong> ${rec.promotionIdea}</div>
      <div><strong>Social:</strong> ${rec.suggestedSocialPost}</div>
    </article>
  `;
}

function renderCalendar(events) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const first = new Date(year, month, 1);
  const startOffset = first.getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(`<div class="day-cell"></div>`);
  for (let day = 1; day <= days; day++) {
    const dateKey = new Date(year, month, day).toISOString().slice(0, 10);
    const dayEvents = events.filter((event) => event.startDate.slice(0, 10) === dateKey).slice(0, 3);
    cells.push(`
      <div class="day-cell">
        <strong>${day}</strong>
        ${dayEvents.map((event) => `<button class="cal-event ${levelClass(event.recommendation.expectedDemandLevel)}" data-event="${event.id}">${event.title}</button>`).join("")}
      </div>
    `);
  }
  $("#calendarGrid").innerHTML = cells.join("");
}

function renderMap(events) {
  const pins = events.slice(0, 10).map((event, index) => {
    const angle = (index / Math.max(1, events.length)) * Math.PI * 2;
    const radius = Math.min(38, 12 + event.distance * 4);
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;
    const cls = levelClass(event.recommendation.expectedDemandLevel);
    return `<button class="pin ${cls}" style="left:${x}%;top:${y}%;" data-event="${event.id}">${event.recommendation.impactScore}</button>`;
  }).join("");
  $("#mapPins").innerHTML = pins;
}

function attachEventClicks(events) {
  $$("[data-event]").forEach((node) => {
    node.addEventListener("click", () => {
      const event = events.find((item) => item.id === node.dataset.event);
      if (event) openEvent(event);
    });
  });
}

function openEvent(event) {
  const rec = event.recommendation;
  $("#dialogContent").innerHTML = `
    <p class="eyebrow">${event.category}</p>
    <h2>${event.title}</h2>
    <p class="muted">${event.description}</p>
    <div class="detail-grid">
      <div class="detail"><span>Date</span><strong>${fmtDate(event.startDate, { year: "numeric" })} at ${fmtTime(event.startDate)}</strong></div>
      <div class="detail"><span>Location</span><strong>${event.venueName}, ${event.distance} miles away</strong></div>
      <div class="detail"><span>Attendance</span><strong>${Number(event.estimatedAttendance || 0).toLocaleString()}</strong></div>
      <div class="detail"><span>Confidence</span><strong>${event.confidenceScore}%</strong></div>
      <div class="detail"><span>Impact score</span><strong>${rec.impactScore}/100 · ${rec.expectedDemandLevel}</strong></div>
      <div class="detail"><span>Prepare by</span><strong>${fmtDate(rec.bestTimeToPrepare)} at ${fmtTime(rec.bestTimeToPrepare)}</strong></div>
    </div>
    <h3>How this can make money</h3>
    <p>${rec.aiExplanation}</p>
    <p><strong>Best products to stock:</strong> ${rec.recommendedProducts.join(", ")}</p>
    <p><strong>Suggested staffing:</strong> ${rec.recommendedStaffing}</p>
    <p><strong>Promotion:</strong> ${rec.promotionIdea}</p>
    <p><strong>Suggested social post:</strong> ${rec.suggestedSocialPost}</p>
    <p><strong>Source:</strong> <a href="${event.sourceUrl}" target="_blank" rel="noreferrer">${event.sourceName}</a></p>
  `;
  $("#eventDialog").showModal();
}

async function saveBusiness(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  data.state = "FL";
  data.latitude = 29.6506;
  data.longitude = -82.3233;
  await request("/api/businesses", { method: "POST", body: data });
  await refreshAll();
  $("#dashboard").scrollIntoView();
}

async function addEvent(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  data.city = "Gainesville";
  data.state = "FL";
  data.latitude = 29.6522;
  data.longitude = -82.3248;
  data.startDate = new Date(data.startDate).toISOString();
  data.startTime = data.startDate.slice(11, 16);
  data.estimatedAttendance = Number(data.estimatedAttendance || 100);
  data.confidenceScore = 76;
  await request("/api/events", { method: "POST", body: data });
  event.currentTarget.reset();
  await refreshAll();
}

async function addSource(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  data.active = true;
  await request("/api/sources", { method: "POST", body: data });
  event.currentTarget.reset();
  await refreshAll();
}

async function runImport() {
  $("#runImport").textContent = "Importing...";
  const result = await request("/api/import/run", { method: "POST", body: {} });
  $("#runImport").textContent = `Imported ${result.imported}`;
  await refreshAll();
  setTimeout(() => { $("#runImport").textContent = "Run Event Import"; }, 1600);
}

async function checkout(event) {
  const plan = event.currentTarget.dataset.plan;
  const result = await request("/api/checkout", { method: "POST", body: { plan } });
  if (result.mode === "stripe") window.location.href = result.checkoutUrl;
  else alert(`${plan} selected. ${result.message}`);
}

function renderAdmin() {
  const db = state.admin;
  $("#adminStats").innerHTML = [
    ["Users", db.users.length],
    ["Businesses", db.businesses.length],
    ["Events", db.events.length],
    ["Collection jobs", db.collectionJobs.length]
  ].map(([label, value]) => `<div class="stat"><span class="muted">${label}</span><strong>${value}</strong></div>`).join("");
  $("#sourcesList").innerHTML = db.eventSources.map((source) => `
    <div class="source">
      <strong>${source.sourceName}</strong><br>
      <span class="muted">${source.sourceType} · ${source.city} · ${source.active ? "active" : "paused"}</span><br>
      <a href="${source.sourceUrl}" target="_blank" rel="noreferrer">${source.sourceUrl}</a>
    </div>
  `).join("");
}
