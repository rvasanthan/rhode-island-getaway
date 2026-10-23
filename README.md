# ⚓ Rhode Island Getaway

A sleek, colorful tour website for a two-day trip across **Newport** and **Providence, RI** — with food, coffee and essentials mapped at every stop.

## 🗺️ The Trip

**Day 1 — Saturday: Newport, Mansions & Coast**
1. 🥯 Breakfast: Cohen's Bagel Company + Salt Meadow Park picnic, Madison, CT (7:30–8:15 AM)
2. 🏰 The Breakers
3. 🏛️ Marble House
4. 🍜 Newport Downtown — Yagi Noodles (lunch)
5. 🌊 Ocean Drive / Ocean Ave
6. 🪁 Brenton Point State Park
7. ☕ Ocean & Fifth Cafe (specialty coffee & cookie croissant)
8. 🏨 Check-in: Holiday Inn Express Fall River North (360 Airport Rd, Fall River, MA)
9. 🦁 Roger Williams Park Zoo — Saturday night, 8:00 PM

**Day 2 — Sunday: Drive Home to New Jersey**
10. 🧳 Depart Providence — 10:00 AM (I-95 South)
11. 🍛 Lunch stop in Connecticut — 1:00–1:30 PM
   - ⭐ #1 **Vedas Indian Cuisine**, Norwalk (Top pick · best value, $12–18/adult)
   - #2 **Himalaya Sono**, Norwalk (Indian & Nepalese, 4.7★)
   - #3 **Taj Indian Restaurant**, Stamford (fine dining, 4.7★)
12. 🏠 Home — Franklin Park, NJ ~3:30 PM", "oldString": "**Day 2 — Sunday: Providence & Drive Home**
8. 🏙️ Providence Downtown (brunch & stroll)
9. 🚗 Drive back to Connecticut"

## ✨ Features

- **Interactive timeline** — tap any stop to open a detail card
- **Interactive timeline** — tap any stop for details and a big one-tap Google Maps button
- **Live route weather** — current conditions + Sat/Sun forecast for every waypoint, plus a weather badge on every timeline tile and a forecast block in each stop's detail card (Open-Meteo, no API key)
- **Shared expense tracker** — anyone with the link can add expenses; live summary by category and person (Firestore-backed, localStorage fallback)
- **Indian-food hub finder** for the three key anchors: Holiday Inn Fall River, Roger Williams Zoo, and Providence Downtown
- All links are live Google Maps searches — always current ratings, hours and directions
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
