/* ============================================================
   Rhode Island Getaway — UI Logic
   ============================================================ */

const $ = (sel) => document.querySelector(sel);

/* ---------- Render the timeline ---------- */
function renderTimeline() {
  const container = $("#timeline");
  container.innerHTML = "";

  TRIP_DAYS.forEach((d) => {
    const stops = STOPS.filter((s) => s.day === d.day);

    const dayEl = document.createElement("div");
    dayEl.className = "relative";
    dayEl.innerHTML = `
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br ${d.tint} flex items-center justify-center text-2xl shadow-lg">🗓️</div>
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-slate-400">${d.date}</p>
          <h2 class="text-2xl md:text-3xl font-display font-bold text-white">${d.title}</h2>
        </div>
      </div>
      <div class="relative ml-6 md:ml-8 border-l-2 border-slate-700/70 pl-8 md:pl-12 space-y-8 pb-4"></div>
    `;

    const rail = dayEl.querySelector(".space-y-8");
    stops.forEach((s) => {
      const card = document.createElement("button");
      card.className = "group relative w-full text-left";
      card.setAttribute("data-stop", s.id);
      card.innerHTML = `
        <span class="absolute -left-[3.05rem] md:-left-[4.05rem] top-6 w-6 h-6 rounded-full bg-gradient-to-br ${s.tint} ring-4 ring-slate-950 shadow-lg group-hover:scale-125 transition-transform"></span>
        <div class="rounded-3xl bg-slate-900/70 border border-slate-700/60 backdrop-blur p-6 md:p-7 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-transparent group-hover:shadow-2xl group-hover:shadow-black/40 relative overflow-hidden">
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${s.tint}" style="opacity:0"></div>
          <div class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${s.tint}"></div>
          <div class="relative flex items-start gap-5">
            <div class="text-4xl md:text-5xl shrink-0 drop-shadow-lg">${s.icon}</div>
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-3 mb-1">
                <span class="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${s.tint} text-slate-950">${s.time}</span>
                <span class="text-xs text-slate-400">📍 ${s.addr}</span>
              </div>
              <h3 class="text-xl md:text-2xl font-display font-bold text-white">${s.name}</h3>
              <p class="text-sm text-slate-300/80 mt-1">${s.tagline}</p>
              <p class="mt-3 text-xs font-semibold text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Tap for details & directions →</p>
            </div>
          </div>
        </div>
      `;
      card.addEventListener("click", () => openStop(s.id));
      rail.appendChild(card);
    });

    container.appendChild(dayEl);
  });
}

/* ---------- Render Indian-food hubs ---------- */
function renderHubs() {
  const container = $("#indian-hubs");
  INDIAN_HUBS.forEach((h) => {
    const el = document.createElement("div");
    el.className = `rounded-3xl p-[2px] bg-gradient-to-br ${h.tint} shadow-xl`;
    el.innerHTML = `
      <div class="rounded-3xl bg-slate-900/90 p-6 h-full">
        <div class="text-4xl mb-3">${h.icon}</div>
        <h3 class="font-display font-bold text-lg text-white">${h.name}</h3>
        <p class="text-xs text-slate-400 mt-1 mb-4">${h.sub}</p>
        <a href="${maps("best Indian restaurants near " + h.near)}" target="_blank" rel="noopener"
           class="block w-full text-center text-sm font-bold rounded-xl bg-gradient-to-r ${h.tint} text-slate-950 py-3 hover:opacity-90 transition">
          🍛 Best Indian Restaurants →
        </a>
        <a href="${maps("Indian vegetarian restaurants near " + h.near)}" target="_blank" rel="noopener"
           class="block w-full text-center text-xs font-semibold rounded-xl border border-slate-600 text-slate-200 py-2.5 mt-2 hover:bg-slate-800 transition">
          🥗 Vegetarian options
        </a>
      </div>
    `;
    container.appendChild(el);
  });
}

/* ---------- Render CT lunch-stop restaurant cards ---------- */
function renderLunchStops() {
  const container = $("#lunch-stops");
  CT_RESTAURANTS.forEach((r) => {
    const el = document.createElement("div");
    el.className = `relative rounded-3xl p-[2px] bg-gradient-to-br ${r.tint} shadow-xl ${r.rank === 1 ? "md:-translate-y-3 ring-2 ring-amber-300/70" : ""}`;
    el.innerHTML = `
      <div class="rounded-3xl bg-slate-900/95 p-6 h-full flex flex-col">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-black px-3 py-1 rounded-full bg-gradient-to-r ${r.tint} text-slate-950">#${r.rank}</span>
          <span class="text-[10px] font-bold uppercase tracking-wider text-amber-300">${r.badge}</span>
        </div>
        <h3 class="font-display font-black text-xl text-white">${r.name}</h3>
        <p class="text-xs text-slate-400 mt-0.5">${r.category}</p>
        <div class="flex items-center gap-3 mt-3 text-sm">
          <span class="text-amber-300 font-bold">★ ${r.rating}</span>
          <span class="text-slate-400">·</span>
          <span class="text-emerald-300 font-bold">${r.price}<span class="text-xs text-slate-400"> / adult</span></span>
          <span class="text-slate-400">·</span>
          <span class="text-cyan-300 text-xs font-semibold">🕐 ${r.arrival}</span>
        </div>
        <p class="text-xs text-slate-400 mt-3">📍 ${r.addr}</p>
        <div class="flex flex-wrap gap-1.5 mt-3">
          ${r.dishes.map((d) => `<span class="text-[10px] font-semibold px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-200">${d}</span>`).join("")}
        </div>
        <p class="text-xs text-slate-300 mt-3">${r.special}</p>
        <p class="text-xs italic text-slate-400 mt-1">Best for: ${r.bestFor}</p>
        <div class="mt-auto pt-4 space-y-2">
          <a href="${r.mapsUrl}" target="_blank" rel="noopener"
             class="block w-full text-center text-sm font-bold rounded-xl bg-gradient-to-r ${r.tint} text-slate-950 py-3 hover:opacity-90 transition">
            🗺️ Open in Google Maps →
          </a>
          <div class="grid grid-cols-2 gap-2">
            <a href="${r.site}" target="_blank" rel="noopener"
               class="text-center text-xs font-semibold rounded-xl border border-slate-600 text-slate-200 py-2.5 hover:bg-slate-800 transition">🌐 Website</a>
            <a href="tel:${r.phone}"
               class="text-center text-xs font-semibold rounded-xl border border-slate-600 text-slate-200 py-2.5 hover:bg-slate-800 transition">📞 Call</a>
          </div>
        </div>
      </div>
    `;
    container.appendChild(el);
  });
}

/* ---------- Stop detail modal ---------- */
function openStop(id) {
  const s = STOPS.find((x) => x.id === id);
  if (!s) return;

  $("#modal-time").textContent = `Day ${s.day} · ${s.time}`;
  $("#modal-name").textContent = s.name;
  $("#modal-tagline").textContent = s.tagline;
  $("#modal-desc").textContent = s.desc;
  $("#modal-addr").textContent = s.addr;
  $("#modal-place-link").href = maps(s.addr);
  $("#modal-banner").className = `h-28 md:h-36 rounded-t-3xl bg-gradient-to-br ${s.tint} flex items-center justify-center text-6xl md:text-7xl`;
  $("#modal-banner-icon").textContent = s.icon;
  $("#modal-weather").innerHTML = stopWeatherHTML(s);

  $("#modal").classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeModal() {
  $("#modal").classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

/* ---------- Weather across the route + per-stop (Open-Meteo, no key) ---------- */
async function renderWeather() {
  const grid = $("#weather-grid");
  const stamp = $("#weather-updated");

  /* One batch call covers route waypoints AND every timeline stop */
  const all = [...WEATHER_POINTS, ...STOPS];
  const lats = all.map((p) => p.lat).join(",");
  const lons = all.map((p) => p.lon).join(",");
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}` +
    `&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code` +
    `&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FNew_York&forecast_days=3`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const arr = Array.isArray(data) ? data : [data];

    /* per-stop cache */
    STOPS.forEach((s, i) => {
      stopWeather[s.id] = arr[WEATHER_POINTS.length + i];
    });

    /* route-waypoint cards */
    grid.innerHTML = "";
    arr.slice(0, WEATHER_POINTS.length).forEach((d, i) => {
      const p = WEATHER_POINTS[i];
      if (!d || !d.current) return;
      const cur = d.current;
      const w = wmo(cur.weather_code);
      const tSat = d.daily?.weather_code?.[1] != null ? wmo(d.daily.weather_code[1]) : null;
      const tSun = d.daily?.weather_code?.[2] != null ? wmo(d.daily.weather_code[2]) : null;
      const rain = (v) => (v == null ? "—" : `${Math.round(v)}%`);

      const el = document.createElement("div");
      el.className = `rounded-3xl p-[2px] bg-gradient-to-br ${p.tint} shadow-xl`;
      el.innerHTML = `
        <div class="rounded-3xl bg-slate-900/95 p-5 h-full">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-display font-bold text-white">${p.name}</p>
              <p class="text-[11px] text-slate-400">${p.icon} ${p.sub}</p>
            </div>
            <span class="text-4xl">${w.icon}</span>
          </div>
          <div class="flex items-end gap-2 mt-3">
            <span class="text-4xl font-black text-white">${Math.round(cur.temperature_2m)}°</span>
            <span class="text-xs text-slate-400 pb-1.5">feels ${Math.round(cur.apparent_temperature)}°F · ${w.label}</span>
          </div>
          <div class="grid grid-cols-2 gap-2 mt-4 text-center">
            <div class="rounded-xl bg-slate-800/70 border border-slate-700/60 py-2">
              <p class="text-[10px] uppercase tracking-wider text-slate-400">Sat</p>
              <p class="text-sm font-bold text-slate-100">${tSat ? tSat.icon : ""} ${Math.round(d.daily.temperature_2m_min[1])}°/${Math.round(d.daily.temperature_2m_max[1])}°</p>
              <p class="text-[10px] text-sky-300">☔ ${rain(d.daily.precipitation_probability_max?.[1])}</p>
            </div>
            <div class="rounded-xl bg-slate-800/70 border border-slate-700/60 py-2">
              <p class="text-[10px] uppercase tracking-wider text-slate-400">Sun</p>
              <p class="text-sm font-bold text-slate-100">${tSun ? tSun.icon : ""} ${Math.round(d.daily.temperature_2m_min[2])}°/${Math.round(d.daily.temperature_2m_max[2])}°</p>
              <p class="text-[10px] text-sky-300">☔ ${rain(d.daily.precipitation_probability_max?.[2])}</p>
            </div>
          </div>
          <p class="text-[10px] text-slate-500 mt-3">💨 ${Math.round(cur.wind_speed_10m)} mph wind</p>
        </div>
      `;
      grid.appendChild(el);
    });

    stamp.textContent = `Updated ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} · Open-Meteo forecast`;
    addStopWeatherBadges();
  } catch (e) {
    stamp.textContent = "Weather unavailable right now — check back shortly.";
  }
}

/* Small ☀️ 55° badge on each timeline tile */
function addStopWeatherBadges() {
  document.querySelectorAll("[data-stop]").forEach((card) => {
    const s = STOPS.find((x) => x.id === card.getAttribute("data-stop"));
    const d = stopWeather[s?.id];
    if (!d?.current) return;
    const badge = document.createElement("span");
    badge.className =
      "text-xs font-semibold px-3 py-1 rounded-full bg-slate-800/80 border border-slate-600/70 text-slate-100";
    badge.textContent = `${wmo(d.current.weather_code).icon} ${Math.round(d.current.temperature_2m)}°F`;
    card.querySelector(".flex.flex-wrap.items-center").appendChild(badge);
  });
}

/* Weather block injected into a stop's detail card */
function stopWeatherHTML(s) {
  const d = stopWeather[s.id];
  if (!d?.current) return "";
  const cur = d.current;
  const w = wmo(cur.weather_code);
  const day = (i) => ({
    w: wmo(d.daily.weather_code[i]),
    lo: Math.round(d.daily.temperature_2m_min[i]),
    hi: Math.round(d.daily.temperature_2m_max[i]),
    rain: d.daily.precipitation_probability_max?.[i],
  });
  const sat = day(1);
  const sun = day(2);
  return `
    <div class="mt-5 rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4">
      <div class="flex items-center justify-between">
        <p class="text-xs font-bold uppercase tracking-[0.25em] text-sky-300">Weather here</p>
        <p class="text-sm text-slate-200">${w.icon} <span class="font-black">${Math.round(cur.temperature_2m)}°F</span>
          <span class="text-xs text-slate-400">feels ${Math.round(cur.apparent_temperature)}° · ${w.label} · 💨 ${Math.round(cur.wind_speed_10m)} mph</span></p>
      </div>
      <div class="grid grid-cols-2 gap-2 mt-3 text-center">
        <div class="rounded-xl bg-slate-900/60 py-2">
          <p class="text-[10px] uppercase tracking-wider text-slate-400">Sat</p>
          <p class="text-sm font-bold text-slate-100">${sat.w.icon} ${sat.lo}°/${sat.hi}° <span class="text-sky-300 text-[10px]">☔ ${sat.rain ?? 0}%</span></p>
        </div>
        <div class="rounded-xl bg-slate-900/60 py-2">
          <p class="text-[10px] uppercase tracking-wider text-slate-400">Sun</p>
          <p class="text-sm font-bold text-slate-100">${sun.w.icon} ${sun.lo}°/${sun.hi}° <span class="text-sky-300 text-[10px]">☔ ${sun.rain ?? 0}%</span></p>
        </div>
      </div>
    </div>`;
}

/* Small ☀️ 55° badge on each timeline tile */

/* ---------- Expense tracker (Firestore-backed, shared) ---------- */
const Expenses = (() => {
  let expenses = [];
  let db = null;
  let dbReady = false;
  let dbErr = "";
  const LS_KEY = "ri-expenses";

  const fmt = (n) => `$${Number(n).toFixed(2)}`;
  const catMeta = (key) => EXPENSE_CATEGORIES.find((c) => c.key === key) || EXPENSE_CATEGORIES.at(-1);

  function loadLocal() {
    try { expenses = JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch { expenses = []; }
  }
  function saveLocal() {
    localStorage.setItem(LS_KEY, JSON.stringify(expenses));
  }

  async function init() {
    loadLocal();
    render();
    try {
      const [{ initializeApp }, fs] = await Promise.all([
        import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"),
      ]);
      const app = initializeApp(FIREBASE_CONFIG);
      db = fs.getFirestore(app);
      const q = fs.query(fs.collection(db, "expenses"), fs.orderBy("createdAt", "desc"));
      fs.onSnapshot(q, (snap) => {
        expenses = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        dbReady = true;
        render();
      }, (err) => { dbErr = err.message; setStatus(); });
    } catch (e) {
      dbErr = e.message;
      setStatus();
    }
    setStatus();
  }

  function setStatus() {
    const el = $("#exp-status");
    if (!el) return;
    el.textContent = dbReady
      ? "🟢 Shared — anyone with the link can add expenses"
      : dbErr
        ? "🟡 Offline mode — saved on this device only"
        : "⏳ Connecting to shared store…";
  }

  async function add({ title, amount, category, paidBy, family, stop }) {
    const entry = {
      title: title.trim(),
      amount: Math.round(Number(amount) * 100) / 100,
      category,
      paidBy: paidBy.trim() || "Someone",
      family: family === "B" ? "B" : "A",
      stop: stop || "",
      createdAt: Date.now(),
    };
    if (!entry.title || !(entry.amount > 0)) return "Enter a description and a valid amount.";
    if (dbReady) {
      const fs = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
      await fs.addDoc(fs.collection(db, "expenses"), entry);
    } else {
      entry.id = "local-" + entry.createdAt;
      expenses.unshift(entry);
      saveLocal();
      render();
    }
    return null;
  }

  async function remove(id) {
    if (dbReady && !String(id).startsWith("local-")) {
      const fs = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
      await fs.deleteDoc(fs.doc(db, "expenses", id));
    } else {
      expenses = expenses.filter((e) => e.id !== id);
      saveLocal();
      render();
    }
  }

  function familyNames() {
    return {
      A: ($("#fam-a-name")?.value || "").trim() || "Family A",
      B: ($("#fam-b-name")?.value || "").trim() || "Family B",
    };
  }

  function settlement(totA, totB) {
    const names = familyNames();
    const total = totA + totB;
    if (total <= 0) return { text: "Add expenses to see who owes what.", neutral: true };
    const share = total / 2;               // each family should pay half
    const owed = Math.abs(totA - totB) / 2;
    if (Math.abs(totA - totB) < 0.005) {
      return { text: `✅ All square — each family spent ${fmt(share)}.`, neutral: true };
    }
    const payer = totA > totB ? names.B : names.A;   // family that paid less owes
    const payee = totA > totB ? names.A : names.B;
    return { text: `💸 ${payer} owes ${payee} ${fmt(owed)}`, neutral: false };
  }

  function render() {
    const list = $("#exp-list");
    if (!list) return;

    /* summary */
    const total = expenses.reduce((s, e) => s + e.amount, 0);
    const byCat = {};
    const byPerson = {};
    expenses.forEach((e) => {
      byCat[e.category] = (byCat[e.category] || 0) + e.amount;
      byPerson[e.paidBy] = (byPerson[e.paidBy] || 0) + e.amount;
    });
    $("#exp-total").textContent = fmt(total);
    $("#exp-count").textContent = expenses.length;

    $("#exp-by-cat").innerHTML = Object.entries(byCat).sort((a, b) => b[1] - a[1]).map(([k, v]) => {
      const m = catMeta(k);
      const pct = total ? Math.round((v / total) * 100) : 0;
      return `
        <div class="flex items-center gap-2 text-xs">
          <span class="w-5">${m.icon}</span>
          <span class="w-28 text-slate-300">${m.label}</span>
          <div class="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div class="h-full rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-400" style="width:${pct}%"></div>
          </div>
          <span class="w-16 text-right font-semibold text-slate-100">${fmt(v)}</span>
        </div>`;
    }).join("") || '<p class="text-xs text-slate-500">No expenses yet.</p>';

    $("#exp-by-person").innerHTML = Object.entries(byPerson).sort((a, b) => b[1] - a[1]).map(([k, v]) =>
      `<div class="flex items-center justify-between rounded-xl bg-slate-800/70 border border-slate-700/60 px-3 py-2">
        <span class="text-xs font-semibold text-slate-200">🧑 ${k}</span>
        <span class="text-xs font-black text-emerald-300">${fmt(v)}</span>
      </div>`).join("") || '<p class="text-xs text-slate-500">—</p>';

    /* family summary + settlement */
    const totA = expenses.filter((e) => e.family !== "B").reduce((s, e) => s + e.amount, 0);
    const totB = expenses.filter((e) => e.family === "B").reduce((s, e) => s + e.amount, 0);
    const names = familyNames();
    $("#fam-a-total").textContent = fmt(totA);
    $("#fam-b-total").textContent = fmt(totB);
    $("#fam-a-label").textContent = names.A;
    $("#fam-b-label").textContent = names.B;
    const s = settlement(totA, totB);
    const box = $("#exp-settle");
    box.textContent = s.text;
    box.className = `rounded-2xl px-5 py-4 text-center font-display font-bold text-lg md:text-xl border ${s.neutral ? "border-slate-700/60 bg-slate-900/70 text-slate-200" : "border-amber-400/50 bg-amber-500/10 text-amber-200"}`;

    /* entries */
    list.innerHTML = expenses.map((e) => {
      const m = catMeta(e.category);
      const dt = new Date(e.createdAt).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
      return `
        <div class="flex items-center gap-3 rounded-2xl bg-slate-900/70 border border-slate-700/60 px-4 py-3">
          <span class="text-xl">${m.icon}</span>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-white truncate">${e.title}</p>
            <p class="text-[11px] text-slate-400">${e.paidBy} · ${familyNames()[e.family === "B" ? "B" : "A"]}${e.stop ? ` · ${e.stop}` : ""} · ${dt}</p>
          </div>
          <span class="text-sm font-black text-emerald-300">${fmt(e.amount)}</span>
          <button data-del="${e.id}" class="text-slate-500 hover:text-red-400 transition text-sm px-1" title="Delete">🗑️</button>
        </div>`;
    }).join("") || '<p class="text-sm text-slate-500 text-center py-4">No expenses yet — add the first one above!</p>';

    list.querySelectorAll("[data-del]").forEach((b) =>
      b.addEventListener("click", () => {
        const entry = expenses.find((e) => e.id === b.getAttribute("data-del"));
        if (entry && confirm(`Delete "${entry.title}" (${fmt(entry.amount)})?`)) {
          remove(entry.id);
        }
      })
    );
  }

  return { init, add, rerender: render };
})();

/* ---------- Render Providence Indian restaurants ---------- */
function renderPvdIndian() {
  const grid = $("#pvd-indian-grid");
  if (!grid) return;
  PVD_INDIAN.forEach((r) => {
    const el = document.createElement("div");
    el.className = `rounded-3xl p-[2px] bg-gradient-to-br ${r.tint} shadow-xl`;
    el.innerHTML = `
      <div class="rounded-3xl bg-slate-900/95 p-5 h-full flex flex-col">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-bold uppercase tracking-wider text-amber-300">${r.badge}</span>
          <span class="text-xs font-bold text-slate-300">★ ${r.rating} <span class="text-slate-500 font-normal">(${r.reviews})</span></span>
        </div>
        <h3 class="font-display font-black text-lg text-white">${r.name}</h3>
        <p class="text-xs text-slate-400 mt-1">📍 ${r.addr}</p>
        <p class="text-xs text-emerald-300 font-semibold mt-1">${r.price} per person</p>
        <p class="text-xs text-slate-300 mt-2 flex-1">${r.note}</p>
        <div class="mt-4 space-y-2">
          <a href="${r.mapsUrl}" target="_blank" rel="noopener"
             class="block w-full text-center text-sm font-bold rounded-xl bg-gradient-to-r ${r.tint} text-slate-950 py-2.5 hover:opacity-90 transition">🗺️ Google Maps →</a>
          <div class="grid grid-cols-2 gap-2">
            <a href="${r.site}" target="_blank" rel="noopener"
               class="text-center text-xs font-semibold rounded-xl border border-slate-600 text-slate-200 py-2 hover:bg-slate-800 transition">🌐 Website</a>
            <a href="tel:${r.phone}"
               class="text-center text-xs font-semibold rounded-xl border border-slate-600 text-slate-200 py-2 hover:bg-slate-800 transition">📞 Call</a>
          </div>
        </div>
      </div>`;
    grid.appendChild(el);
  });
}

/* ---------- Wire up ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderTimeline();
  renderLunchStops();
  renderPvdIndian();
  renderWeather();
  Expenses.init();

  /* populate the "link to a stop" dropdown */
  const stopSel = $("#exp-stop");
  STOPS.forEach((s) => {
    const o = document.createElement("option");
    o.value = s.name;
    o.textContent = `${s.icon} ${s.name}`;
    stopSel.appendChild(o);
  });

  $("#exp-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = $("#exp-add-btn");
    btn.disabled = true;
    btn.textContent = "Adding…";
    const err = await Expenses.add({
      title: $("#exp-title").value,
      amount: $("#exp-amount").value,
      category: $("#exp-category").value,
      paidBy: $("#exp-paidby").value,
      family: $("#exp-family").value,
      stop: $("#exp-stop").value,
    });
    btn.disabled = false;
    btn.textContent = "＋ Add Expense";
    if (err) {
      $("#exp-error").textContent = err;
    } else {
      $("#exp-error").textContent = "";
      e.target.reset();
    }
  });

  /* re-render summary when family names change */
  ["#fam-a-name", "#fam-b-name"].forEach((sel) =>
    $(sel).addEventListener("input", () => Expenses.rerender())
  );

  $("#modal-close").addEventListener("click", closeModal);
  $("#modal-backdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
