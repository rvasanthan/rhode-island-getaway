# ⚓ Rhode Island Getaway

A sleek, colorful tour website for a two-day trip across **Newport** and **Providence, RI** — with food, coffee and essentials mapped at every stop.

## 🗺️ The Trip

**Day 1 — Saturday: Newport, Mansions & Coast**
1. 🏰 The Breakers
2. 🏛️ Marble House
3. 🍜 Newport Downtown — Yagi Noodles (lunch)
4. 🌊 Ocean Drive / Ocean Ave
5. 🪁 Brenton Point State Park
6. 🏨 Check-in: Holiday Inn Express Fall River North (360 Airport Rd, Fall River, MA)
7. 🦁 Roger Williams Park Zoo — Saturday night, 8:00 PM

**Day 2 — Sunday: Providence & Drive Home**
8. 🏙️ Providence Downtown (brunch & stroll)
9. 🚗 Drive back to Connecticut

## ✨ Features

- **Interactive timeline** — tap any stop to open a detail card
- **Every stop includes Google Maps links** for:
  - 🍛 Indian restaurants
  - ☕ Best coffee shops
- **Big tappable “Open in Google Maps” button** on every stop card
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
