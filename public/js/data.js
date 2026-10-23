/* ============================================================
   Rhode Island Getaway — Trip Data
   Newport Mansions · Ocean Drive · Roger Williams Zoo
   ============================================================ */

const maps = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

/* Categories of nearby links generated for every stop */
const CATEGORIES = [
  { key: "indian",     label: "Indian Restaurants",  icon: "🍛", query: (n) => `Indian restaurants near ${n}`,        accent: "from-orange-500 to-red-500" },
  { key: "coffee",     label: "Best Coffee Shops",   icon: "☕", query: (n) => `best coffee shops near ${n}`,         accent: "from-amber-600 to-yellow-700" },
];

/* ---------- Trip timeline ---------- */
const TRIP_DAYS = [
  { day: 1, title: "Saturday — Newport & Zoo Night", date: "Day 1 · Saturday", tint: "from-cyan-400 to-blue-500" },
  { day: 2, title: "Sunday — Drive Home to New Jersey", date: "Day 2 · Sunday", tint: "from-fuchsia-400 to-purple-500" },
];

const STOPS = [
  {
    id: "breakfast-ct",
    day: 1,
    time: "7:30 AM",
    name: "Breakfast — Cohen's Bagels & Salt Meadow Park",
    icon: "🥯",
    tagline: "Picnic breakfast in Madison, CT",
    desc: "Grab freshly baked bagels, breakfast sandwiches and coffee at Cohen's Bagel Company (opens 7 AM), then cross Boston Post Road to Salt Meadow Park for a picnic-table breakfast with the family — then it's onward to Newport.",
    addr: "1347 Boston Post Rd, Madison, CT 06443",
    near: "Cohen's Bagel Company, Madison, CT",
    lat: 41.2779, lon: -72.6029,
    tint: "from-amber-400 to-yellow-500",
  },
  {
    id: "marble-house",
    day: 1,
    time: "9:30 AM",
    name: "Marble House",
    icon: "🏛️",
    tagline: "500,000 cubic feet of marble",
    desc: "William K. Vanderbilt's 'temple to the arts' for his wife Alva. Don't miss the Chinese Tea House on the seaside cliffs behind the house.",
    addr: "596 Bellevue Ave, Newport, RI 02840",
    near: "Marble House, Newport, RI",
    lat: 41.4622, lon: -71.3049,
    tint: "from-rose-400 to-pink-600",
  },
  {
    id: "breakers",
    day: 1,
    time: "11:30 AM",
    name: "The Breakers",
    icon: "🏰",
    tagline: "Vanderbilt's Gilded Age masterpiece",
    desc: "The grandest of Newport's summer 'cottages'. 70-room Italian Renaissance palazzo overlooking the Atlantic — the must-see mansion of the Cliff Walk.",
    addr: "44 Ochre Point Ave, Newport, RI 02840",
    near: "The Breakers, Newport, RI",
    lat: 41.4697, lon: -71.2985,
    tint: "from-amber-400 to-orange-500",
  },
  {
    id: "yagi",
    day: 1,
    time: "1:30 PM",
    name: "Newport Downtown — Yagi Noodles",
    icon: "🍜",
    tagline: "Lunch on Long Wharf",
    desc: "Ramen & Asian-fusion bowls right by the harbor. After lunch, stroll the wharves, browse Thames Street boutiques and watch the boats in Bowen’s Wharf.",
    addr: "Long Wharf, Newport, RI 02840",
    near: "Yagi Noodles, Newport, RI",
    lat: 41.4877, lon: -71.3169,
    tint: "from-teal-400 to-emerald-500",
  },
  {
    id: "ocean-ave",
    day: 1,
    time: "3:30 PM",
    name: "Ocean Drive",
    icon: "🌊",
    tagline: "The classic 10-mile coastal loop",
    desc: "Roll the windows down for Newport's famous Ocean Drive — mansions, rocky coastline and sweeping Atlantic views along Ocean Ave. Plenty of pull-offs for photos.",
    addr: "Ocean Ave, Newport, RI 02840",
    near: "Ocean Drive, Newport, RI",
    lat: 41.4522, lon: -71.3191,
    tint: "from-sky-400 to-cyan-500",
  },
  {
    id: "brenton-point",
    day: 1,
    time: "5:00 PM",
    name: "Brenton Point State Park",
    icon: "🪁",
    tagline: "Sunset at the ocean's edge",
    desc: "Where Narragansett Bay meets the Atlantic. Kites, sea breeze and golden-hour views — the perfect end to the Newport leg of the trip.",
    addr: "Ocean Drive, Newport, RI 02840",
    near: "Brenton Point State Park, Newport, RI",
    lat: 41.4488, lon: -71.3540,
    tint: "from-indigo-400 to-violet-500",
  },
  {
    id: "ocean-fifth",
    day: 1,
    time: "6:00 PM",
    name: "Ocean & Fifth Cafe",
    icon: "☕",
    tagline: "Specialty coffee & the famous cookie croissant",
    desc: "A locally owned Fifth Ward cafe — specialty coffee, matcha, artisan pastries and breakfast sandwiches, with free on-site parking. ⚠️ Closes 3 PM daily, so swing by earlier in the day (or first thing next morning) if it's shut after the park.",
    addr: "7 Carroll Ave, Newport, RI 02840",
    near: "Ocean & Fifth Cafe, Newport, RI",
    lat: 41.4801, lon: -71.3219,
    tint: "from-amber-500 to-orange-600",
  },
  {
    id: "holiday-inn",
    day: 1,
    time: "7:30 PM",
    name: "Holiday Inn Express Fall River North",
    icon: "🏨",
    tagline: "Check-in & dinner nearby",
    desc: "Base camp for the night. Good Indian restaurants, coffee and essentials are all a short drive away around Fall River.",
    addr: "360 Airport Rd, Fall River, MA 02720",
    near: "360 Airport Rd, Fall River, MA 02720",
    lat: 41.7297, lon: -71.1032,
    tint: "from-blue-400 to-indigo-500",
  },
  {
    id: "zoo",
    day: 1,
    time: "8:00 PM",
    name: "Roger Williams Park Zoo",
    icon: "🦁",
    tagline: "Saturday night at the zoo",
    desc: "Evening visit to one of the nation's oldest zoos — in October this is prime time for the glowing Jack-O-Lantern Spectacular, with thousands of carved pumpkins lighting up the park after dark.",
    addr: "1000 Elmwood Ave, Providence, RI 02907",
    near: "Roger Williams Park Zoo, Providence, RI",
    lat: 41.7856, lon: -71.4127,
    tint: "from-green-400 to-emerald-600",
  },
  {
    id: "depart",
    day: 2,
    time: "10:00 AM",
    name: "Depart Providence",
    icon: "🧳",
    tagline: "Check out & hit I-95 South",
    desc: "Coffee for the road, then west on I-95 toward Connecticut. Franklin Park, NJ is about 4 hours away with the lunch stop.",
    addr: "Downtown, Providence, RI 02903",
    near: "Downtown Providence, RI",
    lat: 41.8240, lon: -71.4128,
    tint: "from-sky-400 to-blue-500",
  },
  {
    id: "lunch-ct",
    day: 2,
    time: "1:00 PM",
    name: "Lunch Stop — Norwalk, CT",
    icon: "🍛",
    tagline: "Vedas Indian Cuisine (top pick)",
    desc: "Halfway home — three great Indian options just off I-95. See the comparison below: Vedas for budget, Himalaya Sono for a relaxed family meal, Taj Stamford for fine dining.",
    addr: "388 Westport Ave, Norwalk, CT 06851",
    near: "Vedas Indian Cuisine, Norwalk, CT",
    lat: 41.1298, lon: -73.4175,
    tint: "from-amber-400 to-orange-500",
  },
  {
    id: "home",
    day: 2,
    time: "3:30 PM",
    name: "Home — Franklin Park, NJ",
    icon: "🏠",
    tagline: "Home sweet home",
    desc: "Back down I-95 past New York — home by late afternoon. What a weekend!",
    addr: "Franklin Park, NJ 08823",
    near: "Franklin Park, NJ",
    lat: 40.4451, lon: -74.5446,
    tint: "from-emerald-400 to-teal-500",
  },
];

/* ---------- Sunday drive home: Connecticut lunch stops ---------- */
const CT_RESTAURANTS = [
  {
    rank: 1,
    name: "Vedas Indian Cuisine",
    badge: "⭐ Top Pick · Best Value",
    category: "Indian Restaurant",
    rating: 4.4,
    price: "$12–18",
    arrival: "12:45 – 1:15 PM",
    addr: "388 Westport Ave, Norwalk, CT 06851",
    phone: "+1-203-846-6634",
    dishes: ["Biryani", "Chicken Curry", "Paneer Curry", "Veg Lunch Bowl", "Naan"],
    special: "🥗 Vegetarian Lunch Bowl from $12 — entree, basmati rice & side",
    bestFor: "Budget-friendly, quick Indian lunch",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Vedas+Indian+Cuisine+388+Westport+Ave+Norwalk+CT",
    site: "https://vedasct.com/",
    tint: "from-orange-500 to-red-500",
  },
  {
    rank: 2,
    name: "Himalaya Sono",
    badge: "👨‍👩‍👧‍👦 Best Family Dining",
    category: "Indian & Nepalese Restaurant",
    rating: 4.7,
    price: "$18–25",
    arrival: "12:45 – 1:15 PM",
    addr: "99 Washington St, Norwalk, CT 06854",
    phone: "+1-203-851-1201",
    dishes: ["Chicken Tikka Masala", "Momos", "Tandoori Chicken", "Veg Curry", "Biryani"],
    special: "🏔️ Indian, Nepalese & Himalayan — try the momos",
    bestFor: "Relaxed family lunch with Indian and Nepalese food",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Himalaya+Sono+99+Washington+St+Norwalk+CT",
    site: "https://www.himalayasono.com/",
    tint: "from-emerald-500 to-teal-600",
  },
  {
    rank: 3,
    name: "Taj Indian Restaurant",
    badge: "🥂 Best Upscale Dining",
    category: "Indian Fine Dining",
    rating: 4.7,
    price: "$20–30",
    arrival: "1:00 – 1:45 PM",
    addr: "211 Summer St, Stamford, CT 06901",
    phone: "+1-203-588-0000",
    dishes: ["Butter Chicken", "Biryani", "Dosa", "Tandoori Chicken", "Naan"],
    special: "🍽️ Fine dining with lunch specials — comfy seating",
    bestFor: "Comfortable, upscale Indian family dining",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Taj+Indian+Restaurant+211+Summer+St+Stamford+CT",
    site: "https://www.tajstamford.com/",
    tint: "from-violet-500 to-purple-600",
  },
];

/* ---------- Route weather waypoints ---------- */
const WEATHER_POINTS = [
  { name: "Madison, CT",       sub: "Breakfast stop",      icon: "🥯", lat: 41.2795, lon: -72.6004, tint: "from-amber-400 to-yellow-500" },
  { name: "Newport, RI",       sub: "Mansions & coast",    icon: "🏰", lat: 41.4901, lon: -71.3128, tint: "from-cyan-400 to-blue-500" },
  { name: "Fall River, MA",    sub: "Hotel",               icon: "🏨", lat: 41.7015, lon: -71.1550, tint: "from-blue-400 to-indigo-500" },
  { name: "Providence, RI",    sub: "Zoo & departure",     icon: "🦁", lat: 41.8240, lon: -71.4128, tint: "from-green-400 to-emerald-600" },
  { name: "Norwalk, CT",       sub: "Sunday lunch",        icon: "🍛", lat: 41.1177, lon: -73.4082, tint: "from-orange-500 to-red-500" },
  { name: "Franklin Park, NJ", sub: "Home",                icon: "🏠", lat: 40.4451, lon: -74.5446, tint: "from-emerald-400 to-teal-500" },
];

/* ---------- Providence Indian restaurants (dinner before zoo night) ---------- */
const PVD_INDIAN = [
  {
    name: "India Restaurant",
    rating: "4.8",
    reviews: "6,703",
    price: "$20–30",
    addr: "1060 Hope St, Providence, RI 02906",
    phone: "+1-401-421-2600",
    note: "Elegant venue for vegetarians & non, with Bollywood films. Dine-in, takeout, delivery.",
    site: "https://www.indiarestaurant.com/",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=India+Restaurant+1060+Hope+St+Providence+RI",
    tint: "from-orange-500 to-red-500",
    badge: "⭐ Most reviewed",
  },
  {
    name: "Simha Indian Kitchen & Bar",
    rating: "4.7",
    reviews: "356",
    price: "$20–30",
    addr: "385 Westminster St, Providence, RI 02903",
    phone: "+1-401-537-7588",
    note: "Downtown location — closest to Providence Downtown. Dine-in, takeout, no-contact delivery.",
    site: "https://simhaprovidence.com/",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Simha+Indian+Kitchen+385+Westminster+St+Providence+RI",
    tint: "from-fuchsia-500 to-purple-600",
    badge: "📍 Downtown pick",
  },
  {
    name: "Empire Biryani & Grille",
    rating: "4.8",
    reviews: "386",
    price: "$20–30",
    addr: "198 Putnam Pike, Johnston, RI 02919",
    phone: "+1-401-477-3475",
    note: "Biryani house with dine-in, takeout & no-contact delivery.",
    site: "https://order.toasttab.com/online/empirebiryaniandgrille",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Empire+Biryani+Grille+198+Putnam+Pike+Johnston+RI",
    tint: "from-amber-500 to-orange-600",
    badge: "🍚 Biryani pick",
  },
  {
    name: "Rasoi",
    rating: "4.5",
    reviews: "959",
    price: "$20–30",
    addr: "727 East Ave, Pawtucket, RI 02860",
    phone: "+1-401-728-5500",
    note: "Broad Indian menu, lots of veggie & gluten-free choices. Dine-in, curbside pickup.",
    site: "https://www.rasoirestaurant.com/",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rasoi+727+East+Ave+Pawtucket+RI",
    tint: "from-emerald-500 to-teal-600",
    badge: "🥗 Veggie friendly",
  },
  {
    name: "Chennai Express",
    rating: "4.3",
    reviews: "506",
    price: "$10–20",
    addr: "745 Reservoir Ave, Cranston, RI 02910",
    phone: "+1-401-497-7840",
    note: "South Indian cuisine — dosas & more. Budget friendly. Dine-in, curbside pickup.",
    site: "https://chennaiexpressri.com/",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Chennai+Express+745+Reservoir+Ave+Cranston+RI",
    tint: "from-sky-500 to-blue-600",
    badge: "💰 Budget pick",
  },
  {
    name: "Taj Indian Restaurant & Bar",
    rating: "4.7",
    reviews: "835",
    price: "$20–30",
    addr: "49 S County Commons Way, South Kingstown, RI 02879",
    phone: "+1-401-642-7545",
    note: "Dine-in, takeout & delivery. The Village at South County Commons.",
    site: "https://tajrhodeisland.com/",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Taj+Indian+Restaurant+49+S+County+Commons+Way+South+Kingstown+RI",
    tint: "from-violet-500 to-purple-600",
    badge: "🥂 South County",
  },
];

/* ---------- Firebase (shared expense store) ---------- */
const FIREBASE_CONFIG = {
  projectId: "rhode-island-getaway",
  apiKey: "AIzaSyCPSnbKQSgOKnNy8YAgScPbOIAZDYrwMaQ",
  authDomain: "rhode-island-getaway.firebaseapp.com",
};

const EXPENSE_CATEGORIES = [
  { key: "food", label: "Food & Drinks", icon: "🍽️" },
  { key: "tickets", label: "Tickets & Entry", icon: "🎟️" },
  { key: "gas", label: "Gas & Tolls", icon: "⛽" },
  { key: "hotel", label: "Hotel", icon: "🏨" },
  { key: "shopping", label: "Shopping", icon: "🛍️" },
  { key: "other", label: "Other", icon: "💵" },
];

/* Shared weather cache for all stops (fetched once, batch) */
const stopWeather = {};

/* WMO weather-code → emoji + label */
function wmo(code) {
  if (code === 0) return { icon: "☀️", label: "Clear" };
  if (code === 1) return { icon: "🌤️", label: "Mostly clear" };
  if (code === 2) return { icon: "⛅", label: "Partly cloudy" };
  if (code === 3) return { icon: "☁️", label: "Overcast" };
  if (code === 45 || code === 48) return { icon: "🌫️", label: "Fog" };
  if (code >= 51 && code <= 57) return { icon: "🌦️", label: "Drizzle" };
  if (code >= 61 && code <= 67) return { icon: "🌧️", label: "Rain" };
  if (code >= 71 && code <= 77) return { icon: "🌨️", label: "Snow" };
  if (code >= 80 && code <= 82) return { icon: "🌦️", label: "Showers" };
  if (code >= 85 && code <= 86) return { icon: "🌨️", label: "Snow showers" };
  if (code >= 95) return { icon: "⛈️", label: "Thunderstorms" };
  return { icon: "🌡️", label: "—" };
}

/* Build the link set for one stop */
function linksFor(near) {
  return CATEGORIES.map((c) => ({
    ...c,
    url: maps(c.query(near)),
  }));
}
