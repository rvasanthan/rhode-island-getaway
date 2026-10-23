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
              <p class="mt-3 text-xs font-semibold text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Tap for food, coffee & essentials →</p>
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

  const grid = $("#modal-links");
  grid.innerHTML = "";
  linksFor(s.near).forEach((l) => {
    const a = document.createElement("a");
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.className =
      "flex items-center gap-3 rounded-2xl border border-slate-700/70 bg-slate-800/60 px-4 py-3.5 hover:border-transparent hover:bg-slate-800 transition group/link";
    a.innerHTML = `
      <span class="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br ${l.accent} flex items-center justify-center text-lg">${l.icon}</span>
      <span class="text-sm font-semibold text-slate-100">${l.label}</span>
      <span class="ml-auto text-slate-500 group-hover/link:text-white transition">↗</span>
    `;
    grid.appendChild(a);
  });

  $("#modal").classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeModal() {
  $("#modal").classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

/* ---------- Wire up ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderTimeline();
  renderHubs();
  renderLunchStops();

  $("#modal-close").addEventListener("click", closeModal);
  $("#modal-backdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
