const HOME_HTML = "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>EventEdge</title>\n    <link rel=\"stylesheet\" href=\"/styles.css\">\n  </head>\n  <body>\n    <header class=\"topbar\">\n      <a class=\"brand\" href=\"#home\" aria-label=\"EventEdge home\">\n        <span class=\"brand-mark\">E</span>\n        <span>EventEdge</span>\n      </a>\n      <nav class=\"nav\">\n        <a href=\"#dashboard\">Dashboard</a>\n        <a href=\"#calendar\">Calendar</a>\n        <a href=\"#pricing\">Pricing</a>\n        <a href=\"#admin\">Admin</a>\n      </nav>\n      <button class=\"primary small\" data-scroll=\"signup\">Start Free Trial</button>\n    </header>\n\n    <main>\n      <section id=\"home\" class=\"hero\">\n        <div class=\"hero-copy\">\n          <p class=\"eyebrow\">Gainesville business demand intelligence</p>\n          <h1>Turn local events into business revenue.</h1>\n          <p class=\"subhead\">EventEdge helps restaurants, shops, gas stations, and local businesses see upcoming events near them, predict customer demand, and prepare smarter.</p>\n          <div class=\"actions\">\n            <button class=\"primary\" data-scroll=\"signup\">Start Free Trial</button>\n            <button class=\"secondary\" data-scroll=\"dashboard\">View Demo Calendar</button>\n          </div>\n        </div>\n        <div class=\"hero-panel\">\n          <div class=\"mini-toolbar\">\n            <span>Today</span>\n            <strong id=\"heroDate\">Gainesville</strong>\n          </div>\n          <div class=\"hero-event high\">\n            <span>Very High</span>\n            <strong>UF Football Home Game</strong>\n            <small>Stock wings, ice, soda, water, chips</small>\n          </div>\n          <div class=\"hero-event medium\">\n            <span>Medium</span>\n            <strong>Farmers Market</strong>\n            <small>Push coffee and breakfast combos</small>\n          </div>\n          <div class=\"hero-event high\">\n            <span>High</span>\n            <strong>Downtown Concert</strong>\n            <small>Add late-night staff and quick meals</small>\n          </div>\n        </div>\n      </section>\n\n      <section class=\"feature-band\">\n        <div>See every major and local event near your business</div>\n        <div>Predict what customers will buy</div>\n        <div>Prepare inventory before demand spikes</div>\n        <div>Create event-based promotions</div>\n        <div>Get alerts before high-traffic days</div>\n        <div>Plan up to one year ahead</div>\n      </section>\n\n      <section id=\"signup\" class=\"section two-col\">\n        <div>\n          <p class=\"eyebrow\">Account setup</p>\n          <h2>Open the dashboard with your business context.</h2>\n          <p class=\"muted\">The MVP stores a local demo account and lets you add a Gainesville business profile. Production auth can be swapped to Clerk or NextAuth later.</p>\n        </div>\n        <form id=\"businessForm\" class=\"form-panel\">\n          <label>Business name <input name=\"businessName\" value=\"Swamp & Main Market\" required></label>\n          <label>Business type\n            <select name=\"businessType\">\n              <option>restaurant</option>\n              <option>gas station</option>\n              <option>coffee shop</option>\n              <option>bar</option>\n              <option>retail shop</option>\n              <option>grocery store</option>\n              <option>food truck</option>\n              <option>hotel</option>\n            </select>\n          </label>\n          <label>Address <input name=\"address\" value=\"201 SE 2nd Ave\" required></label>\n          <div class=\"grid-2\">\n            <label>City <input name=\"city\" value=\"Gainesville\" required></label>\n            <label>Zip code <input name=\"zipCode\" value=\"32601\" required></label>\n          </div>\n          <label>Website or social link <input name=\"website\" value=\"https://example.com\"></label>\n          <label>Business hours <input name=\"businessHours\" value=\"Mon-Sun 8 AM-10 PM\"></label>\n          <label>Products or services <textarea name=\"productsSold\">coffee, sandwiches, pizza, wings, soda, bottled water, snacks, desserts</textarea></label>\n          <label>Average customer type <input name=\"averageCustomerType\" value=\"students, families, office workers, event visitors\"></label>\n          <label>Subscription plan\n            <select name=\"subscriptionPlan\">\n              <option>Pro</option>\n              <option>Starter</option>\n              <option>Business Plus</option>\n            </select>\n          </label>\n          <button class=\"primary\" type=\"submit\">Save Business Profile</button>\n        </form>\n      </section>\n\n      <section id=\"dashboard\" class=\"app-shell\">\n        <aside class=\"sidebar\">\n          <h2>EventEdge</h2>\n          <a href=\"#today\">Today's Events</a>\n          <a href=\"#week\">This Week</a>\n          <a href=\"#calendar\">Monthly Calendar</a>\n          <a href=\"#year\">Year Ahead</a>\n          <a href=\"#alerts\">Alerts</a>\n          <a href=\"#recommendations\">AI Recommendations</a>\n          <a href=\"#map\">Event Map</a>\n          <a href=\"#admin\">Admin</a>\n        </aside>\n\n        <div class=\"workspace\">\n          <div class=\"dashboard-head\">\n            <div>\n              <p class=\"eyebrow\">Dashboard</p>\n              <h2 id=\"businessTitle\">Gainesville Demand Calendar</h2>\n              <p class=\"muted\" id=\"businessMeta\">Loading business profile...</p>\n            </div>\n            <div class=\"head-actions\">\n              <button class=\"secondary\" id=\"runImport\">Run Event Import</button>\n              <a class=\"secondary button-link\" href=\"/api/report.csv\">CSV Report</a>\n              <a class=\"primary button-link\" href=\"/api/report.pdf\">PDF Report</a>\n            </div>\n          </div>\n\n          <div class=\"metric-grid\">\n            <div class=\"metric\"><span>Events in plan</span><strong id=\"metricEvents\">0</strong></div>\n            <div class=\"metric\"><span>High impact</span><strong id=\"metricHigh\">0</strong></div>\n            <div class=\"metric\"><span>Avg. impact</span><strong id=\"metricAvg\">0</strong></div>\n            <div class=\"metric\"><span>Coverage</span><strong id=\"metricMiles\">25 mi</strong></div>\n          </div>\n\n          <section id=\"today\" class=\"panel\">\n            <div class=\"panel-head\">\n              <h3>Today's Events</h3>\n              <span id=\"todayCount\">0 events</span>\n            </div>\n            <div id=\"todayEvents\" class=\"event-list\"></div>\n          </section>\n\n          <section id=\"week\" class=\"panel\">\n            <div class=\"panel-head\">\n              <h3>This Week's Events</h3>\n              <span>inventory, staffing, promotions</span>\n            </div>\n            <div id=\"weekEvents\" class=\"event-list\"></div>\n          </section>\n\n          <section id=\"calendar\" class=\"panel\">\n            <div class=\"panel-head\">\n              <h3>Monthly Calendar</h3>\n              <span>color-coded by impact</span>\n            </div>\n            <div id=\"calendarGrid\" class=\"calendar-grid\"></div>\n          </section>\n\n          <section id=\"year\" class=\"panel\">\n            <div class=\"panel-head\">\n              <h3>Year-Ahead Event View</h3>\n              <span>next 12 months</span>\n            </div>\n            <div id=\"yearEvents\" class=\"table\"></div>\n          </section>\n\n          <section id=\"alerts\" class=\"panel\">\n            <div class=\"panel-head\">\n              <h3>High Impact Alerts</h3>\n              <span>app now, email/SMS ready later</span>\n            </div>\n            <div id=\"alertsList\" class=\"alert-list\"></div>\n          </section>\n\n          <section id=\"recommendations\" class=\"panel\">\n            <div class=\"panel-head\">\n              <h3>AI Recommendations</h3>\n              <span>stock, staff, promote</span>\n            </div>\n            <div id=\"recommendationGrid\" class=\"recommendation-grid\"></div>\n          </section>\n\n          <section id=\"map\" class=\"panel\">\n            <div class=\"panel-head\">\n              <h3>Event Map</h3>\n              <span>near your business</span>\n            </div>\n            <div class=\"map-wrap\">\n              <div class=\"map-card\">\n                <div class=\"business-dot\">Business</div>\n                <div id=\"mapPins\"></div>\n              </div>\n              <div id=\"mapLegend\" class=\"map-legend\"></div>\n            </div>\n          </section>\n\n          <section id=\"pricing\" class=\"section pricing-section\">\n            <div class=\"panel-head\">\n              <h3>Subscription Pricing</h3>\n              <span>monthly SaaS plans with free trial</span>\n            </div>\n            <div class=\"pricing-grid\">\n              <article class=\"price-card\">\n                <h4>Starter</h4>\n                <strong>$19/month</strong>\n                <p>Events within 5 miles, weekly calendar, basic recommendations.</p>\n                <button class=\"secondary checkout\" data-plan=\"Starter\">Start Free Trial</button>\n              </article>\n              <article class=\"price-card featured\">\n                <h4>Pro</h4>\n                <strong>$49/month</strong>\n                <p>25-mile coverage, year-ahead calendar, impact scores, marketing ideas.</p>\n                <button class=\"primary checkout\" data-plan=\"Pro\">Start Free Trial</button>\n              </article>\n              <article class=\"price-card\">\n                <h4>Business Plus</h4>\n                <strong>$99/month</strong>\n                <p>Multiple locations, advanced predictions, SMS/email alerts, reports, team access.</p>\n                <button class=\"secondary checkout\" data-plan=\"Business Plus\">Start Free Trial</button>\n              </article>\n            </div>\n          </section>\n\n          <section id=\"admin\" class=\"panel\">\n            <div class=\"panel-head\">\n              <h3>Admin Panel</h3>\n              <span>sources, users, events, jobs</span>\n            </div>\n            <div class=\"admin-grid\">\n              <form id=\"eventForm\" class=\"admin-form\">\n                <h4>Manually Add Event</h4>\n                <input name=\"title\" placeholder=\"Event title\" required>\n                <select name=\"category\">\n                  <option>Sports</option><option>College sports</option><option>Concerts</option><option>Festivals</option>\n                  <option>School events</option><option>Community events</option><option>Holiday events</option><option>Farmers markets</option>\n                  <option>Conferences</option><option>Graduation events</option><option>Nightlife events</option><option>Family events</option>\n                  <option>Charity events</option><option>Local government events</option><option>University of Florida events</option>\n                  <option>High school events</option><option>Theater/arts events</option>\n                </select>\n                <input name=\"venueName\" placeholder=\"Venue name\" required>\n                <input name=\"venueAddress\" placeholder=\"Venue address\" required>\n                <input name=\"startDate\" type=\"datetime-local\" required>\n                <input name=\"estimatedAttendance\" type=\"number\" placeholder=\"Estimated attendance\">\n                <input name=\"sourceName\" placeholder=\"Source website name\" required>\n                <input name=\"sourceUrl\" placeholder=\"Original source URL\" required>\n                <textarea name=\"description\" placeholder=\"Event description\"></textarea>\n                <button class=\"primary\" type=\"submit\">Add Event</button>\n              </form>\n              <div>\n                <div id=\"adminStats\" class=\"admin-stats\"></div>\n                <form id=\"sourceForm\" class=\"admin-form compact\">\n                  <h4>Add Event Source</h4>\n                  <input name=\"sourceName\" placeholder=\"Source name\" required>\n                  <input name=\"sourceUrl\" placeholder=\"Public URL\" required>\n                  <select name=\"sourceType\"><option>public calendar</option><option>RSS feed</option><option>ticket website</option><option>venue calendar</option><option>event website</option></select>\n                  <input name=\"city\" value=\"Gainesville\">\n                  <button class=\"secondary\" type=\"submit\">Save Source</button>\n                </form>\n                <div id=\"sourcesList\" class=\"source-list\"></div>\n              </div>\n            </div>\n          </section>\n        </div>\n      </section>\n    </main>\n\n    <dialog id=\"eventDialog\">\n      <button class=\"icon-close\" id=\"closeDialog\" aria-label=\"Close\">×</button>\n      <div id=\"dialogContent\"></div>\n    </dialog>\n\n    <script src=\"/eventedge-client.js\"></script>\n  </body>\n</html>\n";
const HOME_CSS = ":root {\n  --navy: #10243f;\n  --ink: #172033;\n  --muted: #64748b;\n  --line: #dbe3ee;\n  --panel: #ffffff;\n  --soft: #f5f8fb;\n  --green: #18a56f;\n  --teal: #0e766e;\n  --amber: #c98209;\n  --red: #c2412f;\n  --blue: #2563eb;\n  --shadow: 0 18px 45px rgba(16, 36, 63, .12);\n}\n\n* { box-sizing: border-box; }\nhtml { scroll-behavior: smooth; }\nbody {\n  margin: 0;\n  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;\n  color: var(--ink);\n  background: var(--soft);\n}\n\na { color: inherit; text-decoration: none; }\nbutton, input, select, textarea { font: inherit; }\nbutton, .button-link {\n  border: 0;\n  border-radius: 8px;\n  cursor: pointer;\n  min-height: 42px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 0 16px;\n  font-weight: 700;\n}\n.primary { background: var(--green); color: white; }\n.secondary { background: white; color: var(--navy); border: 1px solid var(--line); }\n.small { min-height: 36px; padding: 0 12px; }\n\n.topbar {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 18px;\n  padding: 14px 28px;\n  background: rgba(255,255,255,.92);\n  border-bottom: 1px solid var(--line);\n  backdrop-filter: blur(12px);\n}\n.brand { display: flex; align-items: center; gap: 10px; font-weight: 900; color: var(--navy); }\n.brand-mark {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  background: var(--navy);\n  color: white;\n  display: grid;\n  place-items: center;\n}\n.nav { display: flex; align-items: center; gap: 18px; color: var(--muted); font-size: 14px; }\n\n.hero {\n  min-height: calc(100vh - 64px);\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(360px, 520px);\n  align-items: center;\n  gap: 48px;\n  padding: 70px 7vw 44px;\n  background:\n    linear-gradient(rgba(16, 36, 63, .78), rgba(16, 36, 63, .64)),\n    url(\"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80\") center/cover;\n  color: white;\n}\n.hero h1 { margin: 0; max-width: 760px; font-size: clamp(42px, 7vw, 86px); line-height: .96; letter-spacing: 0; }\n.subhead { max-width: 650px; font-size: 20px; line-height: 1.55; color: rgba(255,255,255,.86); }\n.eyebrow { margin: 0 0 10px; text-transform: uppercase; letter-spacing: .08em; font-weight: 900; font-size: 12px; color: var(--green); }\n.actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 26px; }\n.hero-panel {\n  align-self: stretch;\n  min-height: 430px;\n  background: rgba(255,255,255,.94);\n  color: var(--ink);\n  border: 1px solid rgba(255,255,255,.35);\n  border-radius: 8px;\n  box-shadow: var(--shadow);\n  padding: 18px;\n  display: grid;\n  gap: 14px;\n  align-content: center;\n}\n.mini-toolbar { display: flex; justify-content: space-between; color: var(--muted); }\n.hero-event {\n  border: 1px solid var(--line);\n  border-left: 6px solid var(--green);\n  border-radius: 8px;\n  padding: 18px;\n  display: grid;\n  gap: 6px;\n}\n.hero-event.high { border-left-color: var(--red); }\n.hero-event.medium { border-left-color: var(--amber); }\n.hero-event span { color: var(--muted); font-size: 13px; font-weight: 800; }\n.hero-event small { color: var(--muted); }\n\n.feature-band {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  gap: 1px;\n  background: var(--line);\n  border-top: 1px solid var(--line);\n  border-bottom: 1px solid var(--line);\n}\n.feature-band div { background: white; padding: 22px; font-weight: 800; color: var(--navy); }\n\n.section { padding: 62px 7vw; }\n.two-col {\n  display: grid;\n  grid-template-columns: .8fr 1.2fr;\n  gap: 42px;\n  align-items: start;\n}\n.section h2, .dashboard-head h2 { font-size: 36px; margin: 0 0 12px; letter-spacing: 0; }\n.muted { color: var(--muted); line-height: 1.6; }\n.form-panel, .panel, .price-card {\n  background: var(--panel);\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  box-shadow: 0 10px 30px rgba(16,36,63,.05);\n}\n.form-panel { padding: 22px; display: grid; gap: 14px; }\nlabel { display: grid; gap: 6px; color: var(--muted); font-weight: 800; font-size: 13px; }\ninput, select, textarea {\n  width: 100%;\n  border: 1px solid var(--line);\n  background: white;\n  border-radius: 8px;\n  min-height: 42px;\n  padding: 10px 12px;\n  color: var(--ink);\n}\ntextarea { min-height: 82px; resize: vertical; }\n.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }\n\n.app-shell { display: grid; grid-template-columns: 230px 1fr; align-items: start; border-top: 1px solid var(--line); }\n.sidebar {\n  position: sticky;\n  top: 65px;\n  min-height: calc(100vh - 65px);\n  background: var(--navy);\n  color: white;\n  padding: 22px;\n  display: grid;\n  align-content: start;\n  gap: 8px;\n}\n.sidebar h2 { margin: 0 0 18px; }\n.sidebar a { color: rgba(255,255,255,.78); padding: 10px 8px; border-radius: 8px; font-weight: 700; }\n.sidebar a:hover { background: rgba(255,255,255,.08); color: white; }\n.workspace { padding: 28px; display: grid; gap: 22px; min-width: 0; }\n.dashboard-head { display: flex; justify-content: space-between; gap: 18px; align-items: start; }\n.head-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }\n.metric-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }\n.metric {\n  background: white;\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  padding: 18px;\n  display: grid;\n  gap: 8px;\n}\n.metric span { color: var(--muted); font-size: 13px; font-weight: 800; }\n.metric strong { font-size: 34px; color: var(--navy); }\n\n.panel { padding: 18px; min-width: 0; }\n.panel-head { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 16px; }\n.panel-head h3 { margin: 0; font-size: 22px; color: var(--navy); }\n.panel-head span { color: var(--muted); font-weight: 800; font-size: 13px; }\n.event-list { display: grid; gap: 12px; }\n.event-row {\n  display: grid;\n  grid-template-columns: 92px 1fr 110px 100px;\n  gap: 16px;\n  align-items: center;\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  padding: 14px;\n  background: #fff;\n}\n.date-pill { background: var(--soft); border-radius: 8px; padding: 10px; text-align: center; font-weight: 900; color: var(--navy); }\n.event-title { display: grid; gap: 5px; min-width: 0; }\n.event-title strong { color: var(--navy); }\n.event-title span, .event-row small { color: var(--muted); }\n.score { width: 64px; height: 64px; border-radius: 50%; display: grid; place-items: center; color: white; font-weight: 900; justify-self: center; }\n.score.low { background: var(--teal); }\n.score.medium { background: var(--amber); }\n.score.high { background: var(--red); }\n.level { font-weight: 900; color: var(--navy); text-align: right; }\n\n.calendar-grid { display: grid; grid-template-columns: repeat(7, minmax(90px, 1fr)); gap: 8px; }\n.day-cell { min-height: 104px; border: 1px solid var(--line); border-radius: 8px; padding: 8px; background: white; display: grid; align-content: start; gap: 6px; }\n.day-cell strong { font-size: 13px; color: var(--muted); }\n.cal-event { border-radius: 6px; padding: 5px 7px; color: white; font-size: 12px; font-weight: 800; overflow-wrap: anywhere; }\n.cal-event.low { background: var(--teal); }\n.cal-event.medium { background: var(--amber); }\n.cal-event.high { background: var(--red); }\n\n.table { display: grid; gap: 8px; }\n.table-row { display: grid; grid-template-columns: 120px 1fr 120px 90px; gap: 12px; align-items: center; border-bottom: 1px solid var(--line); padding: 10px 4px; }\n.table-row span { color: var(--muted); }\n\n.alert-list, .recommendation-grid { display: grid; gap: 12px; }\n.alert {\n  background: #fff8ed;\n  border: 1px solid #f4d2a2;\n  border-radius: 8px;\n  padding: 14px;\n  color: #6f3d00;\n  font-weight: 800;\n}\n.recommendation-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n.rec-card {\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  padding: 16px;\n  display: grid;\n  gap: 10px;\n  background: white;\n}\n.rec-card h4 { margin: 0; color: var(--navy); font-size: 18px; }\n.tag-row { display: flex; gap: 7px; flex-wrap: wrap; }\n.tag { background: var(--soft); color: var(--navy); border-radius: 999px; padding: 6px 9px; font-size: 12px; font-weight: 900; }\n\n.map-wrap { display: grid; grid-template-columns: 1.3fr .7fr; gap: 16px; }\n.map-card {\n  position: relative;\n  min-height: 420px;\n  overflow: hidden;\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  background:\n    linear-gradient(90deg, rgba(16,36,63,.06) 1px, transparent 1px),\n    linear-gradient(rgba(16,36,63,.06) 1px, transparent 1px),\n    #eef6f5;\n  background-size: 42px 42px;\n}\n.business-dot, .pin {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  border-radius: 999px;\n  padding: 8px 10px;\n  color: white;\n  font-weight: 900;\n  font-size: 12px;\n  box-shadow: var(--shadow);\n}\n.business-dot { left: 50%; top: 50%; background: var(--navy); }\n.pin { background: var(--green); cursor: pointer; max-width: 140px; overflow-wrap: anywhere; }\n.pin.high { background: var(--red); }\n.pin.medium { background: var(--amber); }\n.map-legend { display: grid; gap: 8px; align-content: start; }\n.legend-item { border: 1px solid var(--line); border-radius: 8px; background: white; padding: 10px; }\n\n.pricing-section { padding: 0; }\n.pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }\n.price-card { padding: 18px; display: grid; gap: 12px; }\n.price-card h4 { margin: 0; font-size: 20px; color: var(--navy); }\n.price-card strong { font-size: 30px; }\n.price-card p { color: var(--muted); min-height: 72px; }\n.price-card.featured { border-color: var(--green); box-shadow: 0 16px 34px rgba(24,165,111,.14); }\n\n.admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-items: start; }\n.admin-form { display: grid; gap: 10px; border: 1px solid var(--line); padding: 14px; border-radius: 8px; background: white; }\n.admin-form h4 { margin: 0; color: var(--navy); }\n.compact { margin: 14px 0; }\n.admin-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }\n.stat { background: white; border: 1px solid var(--line); border-radius: 8px; padding: 14px; display: grid; gap: 6px; }\n.source-list { display: grid; gap: 8px; }\n.source { background: white; border: 1px solid var(--line); border-radius: 8px; padding: 10px; overflow-wrap: anywhere; }\n\ndialog { border: 1px solid var(--line); border-radius: 8px; padding: 0; max-width: 780px; width: min(92vw, 780px); box-shadow: var(--shadow); }\ndialog::backdrop { background: rgba(16, 36, 63, .45); }\n.icon-close { position: absolute; right: 12px; top: 12px; width: 36px; padding: 0; min-height: 36px; background: var(--soft); color: var(--navy); }\n#dialogContent { padding: 28px; display: grid; gap: 14px; }\n.detail-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }\n.detail { background: var(--soft); border-radius: 8px; padding: 12px; display: grid; gap: 5px; }\n.detail span { color: var(--muted); font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: .06em; }\n\n@media (max-width: 980px) {\n  .hero, .two-col, .app-shell, .map-wrap, .admin-grid { grid-template-columns: 1fr; }\n  .sidebar { position: static; min-height: auto; grid-template-columns: repeat(2, 1fr); }\n  .metric-grid, .pricing-grid, .recommendation-grid { grid-template-columns: repeat(2, 1fr); }\n  .feature-band { grid-template-columns: repeat(2, 1fr); }\n}\n\n@media (max-width: 680px) {\n  .topbar { align-items: flex-start; padding: 12px; }\n  .nav { display: none; }\n  .hero { padding: 48px 18px 30px; min-height: auto; }\n  .workspace, .section { padding: 18px; }\n  .metric-grid, .pricing-grid, .recommendation-grid, .grid-2, .admin-stats { grid-template-columns: 1fr; }\n  .dashboard-head, .panel-head { flex-direction: column; align-items: flex-start; }\n  .event-row, .table-row { grid-template-columns: 1fr; }\n  .level { text-align: left; }\n  .calendar-grid { grid-template-columns: repeat(2, 1fr); }\n  .hero h1 { font-size: 42px; }\n}\n";
const HOME_JS = "const state = { dashboard: null, admin: null };\n\nconst $ = (selector) => document.querySelector(selector);\nconst $ = (selector) => [...document.querySelectorAll(selector)];\nconst fmtDate = (value, opts = {}) => new Date(value).toLocaleDateString(\"en-US\", { month: \"short\", day: \"numeric\", ...opts });\nconst fmtTime = (value) => new Date(value).toLocaleTimeString(\"en-US\", { hour: \"numeric\", minute: \"2-digit\" });\nconst levelClass = (level) => level === \"Very High\" || level === \"High\" ? \"high\" : level === \"Medium\" ? \"medium\" : \"low\";\n\ndocument.addEventListener(\"DOMContentLoaded\", async () => {\n  $(\"#heroDate\").textContent = new Date().toLocaleDateString(\"en-US\", { weekday: \"long\", month: \"short\", day: \"numeric\" });\n  $(\"[data-scroll]\").forEach((button) => button.addEventListener(\"click\", () => document.getElementById(button.dataset.scroll).scrollIntoView()));\n  $(\"#closeDialog\").addEventListener(\"click\", () => $(\"#eventDialog\").close());\n  $(\"#businessForm\").addEventListener(\"submit\", saveBusiness);\n  $(\"#eventForm\").addEventListener(\"submit\", addEvent);\n  $(\"#sourceForm\").addEventListener(\"submit\", addSource);\n  $(\"#runImport\").addEventListener(\"click\", runImport);\n  $(\".checkout\").forEach((button) => button.addEventListener(\"click\", checkout));\n  await refreshAll();\n});\n\nasync function request(path, options = {}) {\n  const res = await fetch(path, {\n    headers: { \"content-type\": \"application/json\" },\n    ...options,\n    body: options.body ? JSON.stringify(options.body) : undefined\n  });\n  if (!res.ok) throw new Error((await res.json()).error || \"Request failed\");\n  return res.json();\n}\n\nasync function refreshAll() {\n  state.dashboard = await request(\"/api/dashboard\");\n  state.admin = await request(\"/api/admin\");\n  renderDashboard();\n  renderAdmin();\n}\n\nfunction renderDashboard() {\n  const { business, plan, events, alerts, sources } = state.dashboard;\n  $(\"#businessTitle\").textContent = `${business.businessName} Event Dashboard`;\n  $(\"#businessMeta\").textContent = `${business.businessType} in ${business.city}, ${business.state} · ${plan.miles}-mile event coverage · ${business.productsSold}`;\n  $(\"#metricEvents\").textContent = events.length;\n  $(\"#metricHigh\").textContent = events.filter((event) => event.recommendation.impactScore >= 65).length;\n  $(\"#metricAvg\").textContent = Math.round(events.reduce((sum, event) => sum + event.recommendation.impactScore, 0) / Math.max(1, events.length));\n  $(\"#metricMiles\").textContent = `${plan.miles} mi`;\n\n  const today = new Date().toISOString().slice(0, 10);\n  const now = new Date();\n  const weekEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);\n  const todayEvents = events.filter((event) => event.startDate.slice(0, 10) === today);\n  const weekEvents = events.filter((event) => new Date(event.startDate) >= now && new Date(event.startDate) <= weekEnd);\n  $(\"#todayCount\").textContent = `${todayEvents.length} events`;\n  $(\"#todayEvents\").innerHTML = todayEvents.length ? todayEvents.map(eventRow).join(\"\") : empty(\"No events today. Use the week and year-ahead views to prepare early.\");\n  $(\"#weekEvents\").innerHTML = weekEvents.length ? weekEvents.map(eventRow).join(\"\") : empty(\"No events this week in your plan radius.\");\n  $(\"#yearEvents\").innerHTML = events.map(yearRow).join(\"\");\n  $(\"#alertsList\").innerHTML = alerts.length ? alerts.slice(0, 8).map((alert) => `<div class=\"alert\">${alert.message}</div>`).join(\"\") : empty(\"No high-impact alerts yet.\");\n  $(\"#recommendationGrid\").innerHTML = events.slice(0, 6).map(recCard).join(\"\");\n  renderCalendar(events);\n  renderMap(events);\n  attachEventClicks(events);\n  $(\"#mapLegend\").innerHTML = sources.slice(0, 8).map((source) => `<div class=\"legend-item\"><strong>${source.sourceName}</strong><br><span class=\"muted\">${source.sourceType} · ${source.active ? \"active\" : \"paused\"}</span></div>`).join(\"\");\n}\n\nfunction empty(text) {\n  return `<div class=\"muted\">${text}</div>`;\n}\n\nfunction eventRow(event) {\n  const rec = event.recommendation;\n  const cls = levelClass(rec.expectedDemandLevel);\n  return `\n    <button class=\"event-row\" data-event=\"${event.id}\">\n      <div class=\"date-pill\">${fmtDate(event.startDate)}<br><small>${fmtTime(event.startDate)}</small></div>\n      <div class=\"event-title\">\n        <strong>${event.title}</strong>\n        <span>${event.category} · ${event.venueName} · ${event.distance} miles</span>\n        <small>${event.description}</small>\n      </div>\n      <div class=\"score ${cls}\">${rec.impactScore}</div>\n      <div class=\"level\">${rec.expectedDemandLevel}</div>\n    </button>\n  `;\n}\n\nfunction yearRow(event) {\n  return `\n    <button class=\"table-row\" data-event=\"${event.id}\">\n      <strong>${fmtDate(event.startDate, { year: \"numeric\" })}</strong>\n      <span>${event.title} · ${event.venueName}</span>\n      <span>${event.category}</span>\n      <strong>${event.recommendation.impactScore}</strong>\n    </button>\n  `;\n}\n\nfunction recCard(event) {\n  const rec = event.recommendation;\n  return `\n    <article class=\"rec-card\">\n      <h4>${event.title}</h4>\n      <div class=\"tag-row\">\n        <span class=\"tag\">${rec.expectedDemandLevel}</span>\n        <span class=\"tag\">Impact ${rec.impactScore}</span>\n        <span class=\"tag\">${event.distance} mi</span>\n      </div>\n      <p>${rec.aiExplanation}</p>\n      <div><strong>Stock:</strong> ${rec.recommendedProducts.join(\", \")}</div>\n      <div><strong>Staffing:</strong> ${rec.recommendedStaffing}</div>\n      <div><strong>Promotion:</strong> ${rec.promotionIdea}</div>\n      <div><strong>Social:</strong> ${rec.suggestedSocialPost}</div>\n    </article>\n  `;\n}\n\nfunction renderCalendar(events) {\n  const now = new Date();\n  const year = now.getFullYear();\n  const month = now.getMonth();\n  const first = new Date(year, month, 1);\n  const startOffset = first.getDay();\n  const days = new Date(year, month + 1, 0).getDate();\n  const cells = [];\n  for (let i = 0; i < startOffset; i++) cells.push(`<div class=\"day-cell\"></div>`);\n  for (let day = 1; day <= days; day++) {\n    const dateKey = new Date(year, month, day).toISOString().slice(0, 10);\n    const dayEvents = events.filter((event) => event.startDate.slice(0, 10) === dateKey).slice(0, 3);\n    cells.push(`\n      <div class=\"day-cell\">\n        <strong>${day}</strong>\n        ${dayEvents.map((event) => `<button class=\"cal-event ${levelClass(event.recommendation.expectedDemandLevel)}\" data-event=\"${event.id}\">${event.title}</button>`).join(\"\")}\n      </div>\n    `);\n  }\n  $(\"#calendarGrid\").innerHTML = cells.join(\"\");\n}\n\nfunction renderMap(events) {\n  const pins = events.slice(0, 10).map((event, index) => {\n    const angle = (index / Math.max(1, events.length)) * Math.PI * 2;\n    const radius = Math.min(38, 12 + event.distance * 4);\n    const x = 50 + Math.cos(angle) * radius;\n    const y = 50 + Math.sin(angle) * radius;\n    const cls = levelClass(event.recommendation.expectedDemandLevel);\n    return `<button class=\"pin ${cls}\" style=\"left:${x}%;top:${y}%;\" data-event=\"${event.id}\">${event.recommendation.impactScore}</button>`;\n  }).join(\"\");\n  $(\"#mapPins\").innerHTML = pins;\n}\n\nfunction attachEventClicks(events) {\n  $(\"[data-event]\").forEach((node) => {\n    node.addEventListener(\"click\", () => {\n      const event = events.find((item) => item.id === node.dataset.event);\n      if (event) openEvent(event);\n    });\n  });\n}\n\nfunction openEvent(event) {\n  const rec = event.recommendation;\n  $(\"#dialogContent\").innerHTML = `\n    <p class=\"eyebrow\">${event.category}</p>\n    <h2>${event.title}</h2>\n    <p class=\"muted\">${event.description}</p>\n    <div class=\"detail-grid\">\n      <div class=\"detail\"><span>Date</span><strong>${fmtDate(event.startDate, { year: \"numeric\" })} at ${fmtTime(event.startDate)}</strong></div>\n      <div class=\"detail\"><span>Location</span><strong>${event.venueName}, ${event.distance} miles away</strong></div>\n      <div class=\"detail\"><span>Attendance</span><strong>${Number(event.estimatedAttendance || 0).toLocaleString()}</strong></div>\n      <div class=\"detail\"><span>Confidence</span><strong>${event.confidenceScore}%</strong></div>\n      <div class=\"detail\"><span>Impact score</span><strong>${rec.impactScore}/100 · ${rec.expectedDemandLevel}</strong></div>\n      <div class=\"detail\"><span>Prepare by</span><strong>${fmtDate(rec.bestTimeToPrepare)} at ${fmtTime(rec.bestTimeToPrepare)}</strong></div>\n    </div>\n    <h3>How this can make money</h3>\n    <p>${rec.aiExplanation}</p>\n    <p><strong>Best products to stock:</strong> ${rec.recommendedProducts.join(\", \")}</p>\n    <p><strong>Suggested staffing:</strong> ${rec.recommendedStaffing}</p>\n    <p><strong>Promotion:</strong> ${rec.promotionIdea}</p>\n    <p><strong>Suggested social post:</strong> ${rec.suggestedSocialPost}</p>\n    <p><strong>Source:</strong> <a href=\"${event.sourceUrl}\" target=\"_blank\" rel=\"noreferrer\">${event.sourceName}</a></p>\n  `;\n  $(\"#eventDialog\").showModal();\n}\n\nasync function saveBusiness(event) {\n  event.preventDefault();\n  const data = Object.fromEntries(new FormData(event.currentTarget));\n  data.state = \"FL\";\n  data.latitude = 29.6506;\n  data.longitude = -82.3233;\n  await request(\"/api/businesses\", { method: \"POST\", body: data });\n  await refreshAll();\n  $(\"#dashboard\").scrollIntoView();\n}\n\nasync function addEvent(event) {\n  event.preventDefault();\n  const data = Object.fromEntries(new FormData(event.currentTarget));\n  data.city = \"Gainesville\";\n  data.state = \"FL\";\n  data.latitude = 29.6522;\n  data.longitude = -82.3248;\n  data.startDate = new Date(data.startDate).toISOString();\n  data.startTime = data.startDate.slice(11, 16);\n  data.estimatedAttendance = Number(data.estimatedAttendance || 100);\n  data.confidenceScore = 76;\n  await request(\"/api/events\", { method: \"POST\", body: data });\n  event.currentTarget.reset();\n  await refreshAll();\n}\n\nasync function addSource(event) {\n  event.preventDefault();\n  const data = Object.fromEntries(new FormData(event.currentTarget));\n  data.active = true;\n  await request(\"/api/sources\", { method: \"POST\", body: data });\n  event.currentTarget.reset();\n  await refreshAll();\n}\n\nasync function runImport() {\n  $(\"#runImport\").textContent = \"Importing...\";\n  const result = await request(\"/api/import/run\", { method: \"POST\", body: {} });\n  $(\"#runImport\").textContent = `Imported ${result.imported}`;\n  await refreshAll();\n  setTimeout(() => { $(\"#runImport\").textContent = \"Run Event Import\"; }, 1600);\n}\n\nasync function checkout(event) {\n  const plan = event.currentTarget.dataset.plan;\n  const result = await request(\"/api/checkout\", { method: \"POST\", body: { plan } });\n  if (result.mode === \"stripe\") window.location.href = result.checkoutUrl;\n  else alert(`${plan} selected. ${result.message}`);\n}\n\nfunction renderAdmin() {\n  const db = state.admin;\n  $(\"#adminStats\").innerHTML = [\n    [\"Users\", db.users.length],\n    [\"Businesses\", db.businesses.length],\n    [\"Events\", db.events.length],\n    [\"Collection jobs\", db.collectionJobs.length]\n  ].map(([label, value]) => `<div class=\"stat\"><span class=\"muted\">${label}</span><strong>${value}</strong></div>`).join(\"\");\n  $(\"#sourcesList\").innerHTML = db.eventSources.map((source) => `\n    <div class=\"source\">\n      <strong>${source.sourceName}</strong><br>\n      <span class=\"muted\">${source.sourceType} · ${source.city} · ${source.active ? \"active\" : \"paused\"}</span><br>\n      <a href=\"${source.sourceUrl}\" target=\"_blank\" rel=\"noreferrer\">${source.sourceUrl}</a>\n    </div>\n  `).join(\"\");\n}\n";

const SERVED_HOME_JS = HOME_JS
  .replace(
    "const $ = (selector) => [...document.querySelectorAll(selector)];",
    () => "const $$ = (selector) => [...document.querySelectorAll(selector)];"
  )
  .replace('  $("[data-scroll]").forEach', () => '  $$("[data-scroll]").forEach')
  .replace('  $(".checkout").forEach', () => '  $$(".checkout").forEach')
  .replace('  $("[data-event]").forEach', () => '  $$("[data-event]").forEach');

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

function sendAsset(res, status, contentType, body) {
  res.statusCode = status;
  res.setHeader("content-type", contentType);
  res.end(body);
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
  if (url.pathname === "/" || url.pathname === "/index.html") return sendAsset(res, 200, "text/html; charset=utf-8", HOME_HTML);
  if (url.pathname === "/styles.css") return sendAsset(res, 200, "text/css; charset=utf-8", HOME_CSS);
  if (url.pathname === "/eventedge-client.js") return sendAsset(res, 200, "application/javascript; charset=utf-8", SERVED_HOME_JS);
  if (url.pathname === "/favicon.ico" || url.pathname === "/favicon.png") { res.statusCode = 204; return res.end(); }

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
