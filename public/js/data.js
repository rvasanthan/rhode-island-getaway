/* ============================================================
   Rhode Island Getaway — Trip Data
   Newport Mansions · Ocean Drive · Roger Williams Zoo
   ============================================================ */

const maps = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

/* Categories of nearby links generated for every stop */
const CATEGORIES = [
  { key: "indian",     label: "Indian Restaurants",  icon: "🍛", query: (n) => `Indian restaurants near ${n}`,        accent: "from-orange-500 to-red-500" },
  { key: "thai",       label: "Thai Restaurants",    icon: "🍜", query: (n) => `Thai restaurants near ${n}`,          accent: "from-emerald-500 to-teal-500" },
  { key: "mexican",    label: "Mexican Restaurants", icon: "🌮", query: (n) => `Mexican restaurants near ${n}`,       accent: "from-yellow-500 to-orange-500" },
  { key: "chickfila",  label: "Chick-fil-A",         icon: "🐔", query: (n) => `Chick-fil-A near ${n}`,               accent: "from-red-500 to-rose-600" },
  { key: "coffee",     label: "Best Coffee Shops",   icon: "☕", query: (n) => `best coffee shops near ${n}`,         accent: "from-amber-600 to-yellow-700" },
  { key: "dunkin",     label: "Dunkin'",             icon: "🍩", query: (n) => `Dunkin near ${n}`,                    accent: "from-pink-500 to-orange-400" },
  { key: "starbucks",  label: "Starbucks",           icon: "🥤", query: (n) => `Starbucks near ${n}`,                 accent: "from-green-600 to-emerald-700" },
  { key: "pharmacy",   label: "Pharmacies",          icon: "💊", query: (n) => `pharmacy CVS Walgreens near ${n}`,    accent: "from-sky-500 to-blue-600" },
  { key: "stores",     label: "Department Stores",   icon: "🛒", query: (n) => `department store Target Walmart near ${n}`, accent: "from-violet-500 to-purple-600" },
];

/* ---------- Trip timeline ---------- */
const TRIP_DAYS = [
  { day: 1, title: "Newport — Mansions & Coast", date: "Day 1", tint: "from-cyan-400 to-blue-500" },
  { day: 2, title: "Providence — Zoo & Downtown", date: "Day 2", tint: "from-fuchsia-400 to-purple-500" },
];

const STOPS = [
  {
    id: "breakers",
    day: 1,
    time: "9:30 AM",
    name: "The Breakers",
    icon: "🏰",
    tagline: "Vanderbilt's Gilded Age masterpiece",
    desc: "The grandest of Newport's summer 'cottages'. 70-room Italian Renaissance palazzo overlooking the Atlantic — the must-see mansion of the Cliff Walk.",
    addr: "44 Ochre Point Ave, Newport, RI 02840",
    near: "The Breakers, Newport, RI",
    tint: "from-amber-400 to-orange-500",
  },
  {
    id: "marble-house",
    day: 1,
    time: "11:30 AM",
    name: "Marble House",
    icon: "🏛️",
    tagline: "500,000 cubic feet of marble",
    desc: "William K. Vanderbilt's 'temple to the arts' for his wife Alva. Don't miss the Chinese Tea House on the seaside cliffs behind the house.",
    addr: "596 Bellevue Ave, Newport, RI 02840",
    near: "Marble House, Newport, RI",
    tint: "from-rose-400 to-pink-600",
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
    tint: "from-indigo-400 to-violet-500",
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
    tint: "from-blue-400 to-indigo-500",
  },
  {
    id: "zoo",
    day: 2,
    time: "10:00 AM",
    name: "Roger Williams Park Zoo",
    icon: "🦁",
    tagline: "One of the nation's oldest zoos",
    desc: "40 acres inside the beautiful Roger Williams Park — elephants, giraffes, red pandas and the rainforest building. Arrive early to beat the crowds.",
    addr: "1000 Elmwood Ave, Providence, RI 02907",
    near: "Roger Williams Park Zoo, Providence, RI",
    tint: "from-green-400 to-emerald-600",
  },
  {
    id: "providence",
    day: 2,
    time: "2:00 PM",
    name: "Providence Downtown",
    icon: "🏙️",
    tagline: "The Creative Capital",
    desc: "Wrap up the trip downtown: Waterplace Park, the Riverwalk, Westminster Street shops and — the highlight — excellent Indian restaurants for a farewell meal.",
    addr: "Downtown, Providence, RI 02903",
    near: "Downtown Providence, RI",
    tint: "from-fuchsia-400 to-purple-600",
  },
];

/* ---------- Featured: Indian-food hubs ---------- */
const INDIAN_HUBS = [
  {
    name: "Holiday Inn Express Fall River North",
    sub: "360 Airport Rd, Fall River, MA 02720",
    icon: "🏨",
    near: "360 Airport Rd, Fall River, MA 02720",
    tint: "from-orange-500 to-red-500",
  },
  {
    name: "Roger Williams Park Zoo",
    sub: "1000 Elmwood Ave, Providence, RI 02907",
    icon: "🦁",
    near: "Roger Williams Park Zoo, Providence, RI",
    tint: "from-amber-500 to-orange-600",
  },
  {
    name: "Providence Downtown",
    sub: "Downtown, Providence, RI 02903",
    icon: "🏙️",
    near: "Downtown Providence, RI",
    tint: "from-yellow-500 to-red-500",
  },
];

/* Build the link set for one stop */
function linksFor(near) {
  return CATEGORIES.map((c) => ({
    ...c,
    url: maps(c.query(near)),
  }));
}
