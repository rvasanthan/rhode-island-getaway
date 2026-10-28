# ⚓ Rhode Island Getaway

A sleek, colorful tour website for a two-day trip across **Newport** and **Providence, RI** — with food, coffee and essentials mapped at every stop.

## 🗺️ The Trip

**Day 1 — Saturday: Newport, Mansions & Coast**
1. 🥯 Breakfast: Cohen's Bagel Company + Salt Meadow Park picnic, Madison, CT (7:30–8:15 AM)
2. �️ Marble House
3. 🏰 The Breakers
4. 🍜 Newport Downtown — Yagi Noodles (lunch)
5. 🌊 Ocean Drive / Ocean Ave
6. 🪁 Brenton Point State Park
7. ☕ Ocean & Fifth Cafe (specialty coffee & cookie croissant)
8. 🏨 Check-in: Holiday Inn Express Fall River North (360 Airport Rd, Fall River, MA)
9. 🦁 Roger Williams Park Zoo — Saturday night, 8:00 PM

**Day 2 — Sunday: Drive Home to New Jersey**
10. 🧳 Depart Providence — 10:00 AM
11. 🗼 Beavertail Lighthouse & State Park, Jamestown, RI — 10:45 AM
12. 🍛 Lunch at **Swad Tandoori**, 150 State St, New London, CT — 1:00–1:30 PM
13. 🏠 Home — Franklin Park, NJ ~3:30 PM

## ✨ Features

- **Interactive timeline** — tap any stop for details, weather and a big one-tap Google Maps button
- **Live route weather** — current conditions + Sat/Sun forecast for every waypoint and every timeline tile (Open-Meteo, no API key)
- **Providence Indian restaurant picks** — India Restaurant, Simha, Empire Biryani, Rasoi, Chennai Express & Taj, with ratings, prices and Maps/website/call buttons
- **Sunday drive-home lunch stop** — Swad Tandoori, New London, with direct Maps, website and call links
- **Shared expense tracker** — per-person entries assigned to one of two families; live summary shows per-family totals and calculates who owes whom (50/50 split). Firestore-backed with localStorage fallback
- Tailwind CSS, single-page static app, mobile-friendly

## 🚀 Deploy to Firebase Hosting

```bash
firebase deploy --only hosting
```

## 📦 Run locally

Any static server works:

```bash
npx serve public
# or
python3 -m http.server -d public 8080
```
