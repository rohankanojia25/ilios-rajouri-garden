/* ============================================================================
 * data.js — Single Source of Truth for ilios Restaurant Website
 * ============================================================================
 * Loaded via <script src="/assets/data.js" defer> BEFORE main.js.
 * Every editable string, image URL, price, and schedule lives here.
 * Nothing is exported — all constants attach to the global scope.
 * ========================================================================= */

/* ---------------------------------------------------------------------------
 * IMAGE SLOTS — Required Assets & Recommended Sizes
 * ---------------------------------------------------------------------------
 *   hero              1920 × 1080 (desktop) · 1280 × 800 · 900 × 1200 (mobile)
 *   page banners      1600 × 700 / 800 × 350 WebP
 *   signature dishes  REPLACE: add real dish photos (800×600 WebP) when owner sends them
 *   tables            table-*.webp (real photos in /assets/img/)
 *   gallery           gallery-*.webp (real photos in /assets/img/)
 *   story             story.webp (1200 × 800 WebP)
 *   og-image          og-image.webp (1200 × 630 WebP)
 * ------------------------------------------------------------------------- */


/* ---------------------------------------------------------------------------
 * 1. CONFIG — Site-Wide Settings
 * ------------------------------------------------------------------------- */
const CONFIG = {
  /* Contact ---------------------------------------------------------------- */
  WHATSAPP_NUMBER: "917065041400",   // CONFIRM: is this the WhatsApp Business number?
  PHONE_DISPLAY:   "+91 70650 41400",
  PHONE_TEL:       "+917065041400",

  /* Feature flags --------------------------------------------------------- */
  SHOW_BAR:            false, // CONFIRM: enable only after owner confirms liquor licence
  PARTY_CAPACITY_MAX:  null,  // CONFIRM: e.g. 120

  /* Integrations ---------------------------------------------------------- */
  SHEET_WEBHOOK: "", // Google Apps Script URL for party-enquiry leads; skip silently if empty
  GA4_ID:        "", // e.g. "G-XXXXXXX"; GA tag loads only when this is set

  /* Booking --------------------------------------------------------------- */
  DIRECT_BOOKING_PERK: "First pick of stage-side tables when you book direct on WhatsApp", // CONFIRM

  /* Maps ------------------------------------------------------------------ */
  MAPS_EMBED_URL:      "https://www.google.com/maps?q=ilios+C-6/1+Ring+Rd+Mansarover+Garden+New+Delhi&output=embed",
  MAPS_DIRECTIONS_URL: "https://www.google.com/maps/dir/?api=1&destination=ilios+C-6/1+Ring+Rd+Mansarover+Garden+New+Delhi",
  MAPS_REVIEWS_URL:    "https://www.google.com/maps/search/?api=1&query=ilios+C-6%2F1+Ring+Rd+Mansarover+Garden+New+Delhi",

  /* Address & logistics --------------------------------------------------- */
  TIMINGS_DISPLAY: "12 noon – 12 midnight, all days", // CONFIRM
  ADDRESS:         "C-6/1, Ring Road, near Mayapuri Chowk Flyover, Mansarover Garden, Rajouri Garden, New Delhi 110015",
  LANDMARK:        "Near Mayapuri Chowk Flyover, towards Rajouri Garden",
  METRO:           "Mayapuri (Pink Line); Rajouri Garden (Blue & Pink Line) also nearby", // CONFIRM walking distances
  PARKING:         "Parking is limited nearby. Call us and we'll tell you the easiest spot." // CONFIRM
};


/* ---------------------------------------------------------------------------
 * 2. SCHEDULE — Weekly Live-Event Schedule
 * ---------------------------------------------------------------------------
 *   CONFIRM: all schedule details with management
 * ------------------------------------------------------------------------- */
const SCHEDULE = [
  {
    dayOfWeek: 3,
    dayName:   "Wednesday",
    title:     "Bollywood Unplugged",
    genre:     "Retro and melodic Bollywood hits",
    time:      "8:30 PM onwards",
    tag:       "Midweek"
  },
  {
    dayOfWeek: 5,
    dayName:   "Friday",
    title:     "Sufi Night",
    genre:     "Sufi and ghazal fusion",
    time:      "8:30 PM onwards",
    tag:       "Most Popular"
  },
  {
    dayOfWeek: 6,
    dayName:   "Saturday",
    title:     "Live Band Night",
    genre:     "Pop, rock and Bollywood",
    time:      "8:30 PM onwards",
    tag:       "Weekend"
  },
  {
    dayOfWeek: 0,
    dayName:   "Sunday",
    title:     "Sunday Sundowner – Acoustic",
    genre:     "Golden hour chill and unplugged",
    time:      "5:30 PM onwards",   // NOTE: 5:30 PM, not 8:30 PM
    tag:       "Rooftop"
  }
];


/* ---------------------------------------------------------------------------
 * 3. MENU — Food & Drink Items
 * ---------------------------------------------------------------------------
 *   ⚠  REPLACE: entire menu from the real ilios menu
 *   ⚠  CONFIRM: all prices
 *
 *   Categories: small_plates · mains · pizza_pasta · shakes · bar
 *   Descriptions rewritten plainly — no origin or ageing claims.
 * ------------------------------------------------------------------------- */
const MENU = [
  /* — Signature items (signature: true) ----------------------------------- */
  {
    id:        "cream-tomato-soup",
    category:  "small_plates",
    name:      "Cream of Tomato Soup",
    desc:      "Slow-roasted tomato soup with basil and garlic croutons.",
    price:     "₹345",
    veg:       true,
    signature: true
  },
  {
    id:        "lotus-stem-honey-chilli",
    category:  "small_plates",
    name:      "Lotus Stem Honey Chilli",
    desc:      "Crispy lotus stem tossed in sweet-spicy honey chilli.",
    price:     "₹425",
    veg:       true,
    signature: true
  },
  {
    id:        "avocado-toast",
    category:  "small_plates",
    name:      "Avocado Toast on Sourdough",
    desc:      "Smashed avocado with feta, tomatoes and greens on toasted sourdough.",
    price:     "₹495",
    veg:       true,
    signature: true
  },
  {
    id:        "chicken-tikka-tacos",
    category:  "small_plates",
    name:      "Chicken Tikka Tacos",
    desc:      "Grilled chicken tikka with pickled onion and mint drizzle in flour tortillas.",
    price:     "₹545",
    veg:       false,
    signature: true
  },
  {
    id:        "veg-quesadillas",
    category:  "small_plates",
    name:      "Vegetable Quesadillas",
    desc:      "Grilled peppers, corn and melted cheese in toasted tortillas with salsa.",
    price:     "₹475",
    veg:       true,
    signature: true
  },
  {
    id:        "alfredo-pasta",
    category:  "pizza_pasta",
    name:      "Alfredo Pasta",
    desc:      "Penne in a creamy parmesan sauce with mushrooms.",
    price:     "₹525",
    veg:       true,
    signature: true
  },

  /* — Small plates (non-signature) ---------------------------------------- */
  {
    id:        "veg-dimsum",
    category:  "small_plates",
    name:      "Veg Dimsum",
    desc:      "Steamed vegetable and mushroom dumplings with a spicy dip.",
    price:     "₹465",
    veg:       true,
    signature: false
  },
  {
    id:        "crispy-calamari",
    category:  "small_plates",
    name:      "Crispy Calamari Rings",
    desc:      "Golden fried squid rings with lemon and garlic aioli.",
    price:     "₹575",
    veg:       false,
    signature: false
  },

  /* — Mains --------------------------------------------------------------- */
  {
    id:        "dal-makhani",
    category:  "mains",
    name:      "Dal Makhani",
    desc:      "Slow-cooked black lentils in rich tomato and butter gravy.",
    price:     "₹495",
    veg:       true,
    signature: false
  },
  {
    id:        "paneer-lababdar",
    category:  "mains",
    name:      "Paneer Lababdar",
    desc:      "Paneer in a creamy onion-tomato gravy with dried fenugreek.",
    price:     "₹525",
    veg:       true,
    signature: false
  },
  {
    id:        "butter-chicken",
    category:  "mains",
    name:      "Butter Chicken",
    desc:      "Tender chicken in a smooth tomato makhani.",
    price:     "₹595",
    veg:       false,
    signature: false
  },
  {
    id:        "mutton-rogan-josh",
    category:  "mains",
    name:      "Mutton Rogan Josh",
    desc:      "Slow-cooked mutton in a spiced gravy with cardamom and mace.",
    price:     "₹675",
    veg:       false,
    signature: false
  },
  {
    id:        "pan-seared-fish",
    category:  "mains",
    name:      "Pan-Seared Fish",
    desc:      "Fish fillet with lemon butter sauce and mashed potatoes.",
    price:     "₹645",
    veg:       false,
    signature: false
  },

  /* — Pizza & Pasta ------------------------------------------------------- */
  /* NOTE: Alfredo Pasta is already listed above with id "alfredo-pasta".
     It belongs to both "small_plates" (signature) and "pizza_pasta".
     Templates should render it in pizza_pasta by referencing the same id. */
  {
    id:        "arrabbiata-rigatoni",
    category:  "pizza_pasta",
    name:      "Arrabbiata Rigatoni",
    desc:      "Pasta in a spicy tomato sauce with olives and basil.",
    price:     "₹515",
    veg:       true,
    signature: false
  },
  {
    id:        "garden-flatbread-pizza",
    category:  "pizza_pasta",
    name:      "Garden Flatbread Pizza",
    desc:      "Thin crust with olives, feta, bell peppers.",
    price:     "₹585",
    veg:       true,
    signature: false
  },
  {
    id:        "smoked-chicken-pizza",
    category:  "pizza_pasta",
    name:      "Smoked Chicken Pizza",
    desc:      "Smoked chicken with jalapeños and mozzarella.",
    price:     "₹645",
    veg:       false,
    signature: false
  },
  {
    id:        "mushroom-risotto",
    category:  "pizza_pasta",
    name:      "Mushroom Risotto",
    desc:      "Creamy mushroom risotto with parmesan.",
    price:     "₹575",
    veg:       true,
    signature: false
  },

  /* — Shakes & Mocktails -------------------------------------------------- */
  {
    id:        "strawberry-shake",
    category:  "shakes",
    name:      "Strawberry Shake",
    desc:      "Fresh strawberry shake with vanilla cream.",
    price:     "₹345",
    veg:       true,
    signature: false
  },
  {
    id:        "aegean-mist",
    category:  "shakes",
    name:      "Aegean Mist",
    desc:      "Blue citrus mocktail with lime and rosemary.",
    price:     "₹325",
    veg:       true,
    signature: false
  },
  {
    id:        "passionfruit-sparkler",
    category:  "shakes",
    name:      "Passionfruit Sparkler",
    desc:      "Passionfruit with mint and soda.",
    price:     "₹315",
    veg:       true,
    signature: false
  },
  {
    id:        "rose-lemonade",
    category:  "shakes",
    name:      "Rose Lemonade",
    desc:      "Rose water lemonade with chia seeds.",
    price:     "₹295",
    veg:       true,
    signature: false
  },
  {
    id:        "nutella-frappe",
    category:  "shakes",
    name:      "Nutella Frappé",
    desc:      "Coffee with Nutella and roasted hazelnuts.",
    price:     "₹365",
    veg:       true,
    signature: false
  },

  /* — Bar (only rendered when CONFIG.SHOW_BAR === true) ------------------- */
  {
    id:        "golden-sun-cocktail",
    category:  "bar",
    name:      "Golden Sun Cocktail",
    desc:      "Gin with passionfruit and orange blossom.",
    price:     "₹695",
    veg:       true,
    signature: false
  },
  {
    id:        "santorini-highball",
    category:  "bar",
    name:      "Santorini Highball",
    desc:      "Scotch with ginger ale and lemon.",
    price:     "₹675",
    veg:       true,
    signature: false
  },
  {
    id:        "smoked-rosemary-negroni",
    category:  "bar",
    name:      "Smoked Rosemary Negroni",
    desc:      "Gin, Campari and sweet vermouth with smoked rosemary.",
    price:     "₹695",
    veg:       true,
    signature: false
  },
  {
    id:        "aegean-sea-breeze",
    category:  "bar",
    name:      "Aegean Sea Breeze",
    desc:      "Vodka, elderflower and tonic with sea salt rim.",
    price:     "₹625",
    veg:       true,
    signature: false
  },
  {
    id:        "beer-bucket",
    category:  "bar",
    name:      "Beer Bucket (4 Pints)",
    desc:      "Choice of imported beers over ice.",
    price:     "₹1,495",
    veg:       true,
    signature: false
  }
];


/* ---------------------------------------------------------------------------
 * 4. TABLES — Reservable Table Types
 * ---------------------------------------------------------------------------
 *   Real ilios Seating Configurations
 * ------------------------------------------------------------------------- */
const TABLES = [
  {
    slug:   "cocoon-pod",
    name:   "Cocoon Pod",
    guests: "2–4 guests", // CONFIRM: guest count
    desc:   "Sit inside a wicker cocoon on the rooftop. Cosy, private, made for dates.",
    image:  "/assets/img/table-cocoon-pod.webp",
    perks:  ["Wicker cocoon privacy", "Iconic date-night spot"]
  },
  {
    slug:   "ring-daybed",
    name:   "The Ring Daybed",
    guests: "4–6 guests", // CONFIRM: guest count
    desc:   "Cushioned round daybed under the wooden arch. Best for friend groups.",
    image:  "/assets/img/table-ring-daybed.webp",
    perks:  ["Circular cushioned daybed", "Wooden ring arch"]
  },
  {
    slug:   "pink-shutter-terrace",
    name:   "Pink Shutter Terrace",
    guests: "2–8 guests", // CONFIRM: guest count
    desc:   "Open-air tables by the pink shutters and bougainvillea.",
    image:  "/assets/img/table-pink-shutter-terrace.webp",
    perks:  ["Open-air rooftop terrace", "Pink shutters & bougainvillea"]
  },
  {
    slug:   "indoor-lantern-room",
    name:   "Indoor Lantern Room",
    guests: "2–10 guests", // CONFIRM: guest count
    desc:   "Warm indoor tables under yellow wicker lanterns. Good for families and cooler nights.",
    image:  "/assets/img/table-indoor-lantern-room.webp",
    perks:  ["Yellow wicker lanterns", "Air-conditioned indoor dining"]
  }
];


/* ---------------------------------------------------------------------------
 * 5. PACKAGES — Party & Private-Dining Packages (for /parties)
 * ------------------------------------------------------------------------- */
const PACKAGES = [
  {
    name:     "Classic Set Menu",
    price:    "From ₹____ per person",       // CONFIRM: price and items
    includes: [
      "Starters, mains, dessert",
      "Soft drinks",
      "Basic table setup"
    ],
    note:     "CONFIRM: price and items"
  },
  {
    name:     "Premium Set Menu",
    price:    "From ₹____ per person",       // CONFIRM: price and items
    includes: [
      "Extended starters, mains, dessert",
      "Soft drinks and mocktails",
      "Table setup with basic décor"
    ],
    note:     "CONFIRM: price and items"
  },
  {
    name:     "Live Night Package",
    price:    "From ₹____ per person",       // CONFIRM: price and items
    includes: [
      "Premium set menu",
      "Stage and sound for speeches",
      "Dedicated area"
    ],
    note:     "CONFIRM: price and items"
  }
];


/* ---------------------------------------------------------------------------
 * 6. REVIEWS — Sample Review Cards
 * ---------------------------------------------------------------------------
 *   ⚠  REPLACE: with real Google reviews (first name + month)
 * ------------------------------------------------------------------------- */
const REVIEWS = [
  {
    stars:  5,
    text:   "Loved the Santorini-style décor — every corner is photo-worthy. The rooftop vibe is unmatched.",
    author: "Google reviewer",
    badge:  "Sample"
  },
  {
    stars:  5,
    text:   "The arches and blue domes feel like you've stepped into a Greek island. Beautiful place for an evening out.",
    author: "Google reviewer",
    badge:  "Sample"
  },
  {
    stars:  5,
    text:   "Came on a Friday for the Sufi night — the live music made the whole experience special.",
    author: "Google reviewer",
    badge:  "Sample"
  },
  {
    stars:  5,
    text:   "Perfect spot to celebrate with friends. The open-air seating and vibe are great for groups.",
    author: "Google reviewer",
    badge:  "Sample"
  },
  {
    stars:  5,
    text:   "Food was solid and the Greek-themed ambience makes it stand out from everything else in Rajouri Garden.",
    author: "Google reviewer",
    badge:  "Sample"
  },
  {
    stars:  5,
    text:   "The live band on Saturday was fantastic. Will definitely come back for more music nights.",
    author: "Google reviewer",
    badge:  "Sample"
  }
];


/* ---------------------------------------------------------------------------
 * 7. GALLERY — Image Grid Items
 * ---------------------------------------------------------------------------
 *   Real ilios Photos (Categories: rooftop, seating, indoor, food)
 * ------------------------------------------------------------------------- */
const GALLERY = [
  /* Rooftop */
  {
    src: "/assets/img/gallery-01-rooftop-pods-dusk.webp",
    srcset: "/assets/img/gallery-01-rooftop-pods-dusk-600.webp 600w, /assets/img/gallery-01-rooftop-pods-dusk.webp 1200w",
    alt: "Wicker cocoon pods glowing at dusk on the ilios rooftop, Rajouri Garden",
    caption: "Rooftop cocoon pods at dusk",
    category: "rooftop"
  },
  {
    src: "/assets/img/gallery-02-rooftop-night-600.webp",
    srcset: "/assets/img/gallery-02-rooftop-night-600.webp 600w, /assets/img/gallery-02-rooftop-night.webp 1200w",
    alt: "Night ambiance on the ilios rooftop with illuminated cocoon seating and Ring Road city view",
    caption: "Rooftop night ambiance",
    category: "rooftop"
  },
  {
    src: "/assets/img/gallery-03-pods-courtyard-evening.webp",
    srcset: "/assets/img/gallery-03-pods-courtyard-evening-600.webp 600w, /assets/img/gallery-03-pods-courtyard-evening.webp 1200w",
    alt: "Courtyard and wicker pods in the evening light at ilios",
    caption: "Pods courtyard in the evening",
    category: "rooftop"
  },
  {
    src: "/assets/img/gallery-04-pink-shutters.webp",
    srcset: "/assets/img/gallery-04-pink-shutters-600.webp 600w, /assets/img/gallery-04-pink-shutters.webp 1200w",
    alt: "Pink shutters and driftwood screens on the ilios terrace",
    caption: "Pink shutters and terrace seating",
    category: "rooftop"
  },
  {
    src: "/assets/img/gallery-05-terrace-statue.webp",
    srcset: "/assets/img/gallery-05-terrace-statue-600.webp 600w, /assets/img/gallery-05-terrace-statue.webp 1200w",
    alt: "Classic Greek statue and floral arrangements on the ilios terrace",
    caption: "Terrace statue and floral decor",
    category: "rooftop"
  },
  {
    src: "/assets/img/gallery-06-rooftop-day.webp",
    srcset: "/assets/img/gallery-06-rooftop-day-600.webp 600w, /assets/img/gallery-06-rooftop-day.webp 1200w",
    alt: "Daytime view of the breezy open-air ilios rooftop lounge",
    caption: "Open-air rooftop by day",
    category: "rooftop"
  },
  {
    src: "/assets/img/gallery-09-staircase-night.webp",
    srcset: "/assets/img/gallery-09-staircase-night-600.webp 600w, /assets/img/gallery-09-staircase-night.webp 1200w",
    alt: "Spiral staircase illuminated at night on the ilios rooftop",
    caption: "Spiral staircase at night",
    category: "rooftop"
  },

  /* Seating */
  {
    src: "/assets/img/gallery-07-ring-daybed.webp",
    srcset: "/assets/img/gallery-07-ring-daybed-500.webp 500w, /assets/img/gallery-07-ring-daybed.webp 1000w",
    alt: "The Ring Daybed with plush cushions and circular wooden arch at ilios",
    caption: "The Ring Daybed",
    category: "seating"
  },
  {
    src: "/assets/img/gallery-08-cocoon-pod.webp",
    srcset: "/assets/img/gallery-08-cocoon-pod-500.webp 500w, /assets/img/gallery-08-cocoon-pod.webp 1000w",
    alt: "Private wicker cocoon pod for intimate dining and dates on the rooftop",
    caption: "Private cocoon pod",
    category: "seating"
  },

  /* Indoor & Bar */
  {
    src: "/assets/img/gallery-10-indoor-lanterns.webp",
    srcset: "/assets/img/gallery-10-indoor-lanterns-600.webp 600w, /assets/img/gallery-10-indoor-lanterns.webp 1200w",
    alt: "Indoor dining room with yellow wicker lanterns at ilios",
    caption: "Indoor lantern dining room",
    category: "indoor"
  },
  {
    src: "/assets/img/gallery-11-bar.webp",
    srcset: "/assets/img/gallery-11-bar-600.webp 600w, /assets/img/gallery-11-bar.webp 1200w",
    alt: "ilios bar with a white scalloped counter",
    caption: "The ilios bar",
    category: "indoor"
  },

  /* Food & Drinks */
  {
    src: "/assets/img/gallery-12-cocktail.webp",
    srcset: "/assets/img/gallery-12-cocktail-500.webp 500w, /assets/img/gallery-12-cocktail.webp 1000w",
    alt: "Refreshing handcrafted cocktail garnished with citrus at ilios",
    caption: "Handcrafted cocktail",
    category: "food"
  },
  {
    src: "/assets/img/gallery-13-salad-and-drink.webp",
    srcset: "/assets/img/gallery-13-salad-and-drink-500.webp 500w, /assets/img/gallery-13-salad-and-drink.webp 1000w",
    alt: "Fresh salad platter and chilled drink served at ilios",
    caption: "Fresh salad & drink",
    category: "food"
  }
];


/* ---------------------------------------------------------------------------
 * 8. LOCATIONS — Restaurant Branches
 * ------------------------------------------------------------------------- */
const LOCATIONS = [
  {
    name:     "Rajouri Garden",
    address:  CONFIG.ADDRESS,
    flagship: true,
    phone:    CONFIG.PHONE_DISPLAY,
    mapsUrl:  CONFIG.MAPS_DIRECTIONS_URL
  },
  {
    name:     "Greater Kailash",
    address:  "REPLACE: full address",   // REPLACE with real address
    flagship: false,
    phone:    "REPLACE",                 // REPLACE with real phone number
    mapsUrl:  "REPLACE"                  // REPLACE with real Google Maps URL
  },
  {
    name:     "Gurugram",
    address:  "M3M Broadway, Sector 71, Gurugram",
    flagship: false,
    phone:    "REPLACE",                 // REPLACE with real phone number
    mapsUrl:  "REPLACE"                  // REPLACE with real Google Maps URL
  }
];


/* ---------------------------------------------------------------------------
 * 9. SOCIAL_LINKS — Social Media & Listing Profiles
 * ---------------------------------------------------------------------------
 *   ⚠  REPLACE: every url with the real ilios profile link
 * ------------------------------------------------------------------------- */
const SOCIAL_LINKS = [
  {
    name:      "Instagram",
    url:       "https://www.instagram.com/ilios.india/",   // REPLACE: confirm handle
    ariaLabel: "Follow ilios on Instagram",
    svgPath:   "M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.42.403a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.163.45.349 1.25.403 2.42.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.42a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.45.163-1.25.349-2.42.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.42-.403a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.163-.45-.349-1.25-.403-2.42C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.42A4.902 4.902 0 013.79 2.958a4.902 4.902 0 011.772-1.153c.45-.163 1.25-.349 2.42-.403C9.416 2.175 9.796 2.163 12 2.163M12 0C8.741 0 8.333.014 7.053.072 5.775.13 4.902.333 4.14.63a6.87 6.87 0 00-2.485 1.62A6.87 6.87 0 00.035 4.735C-.262 5.498-.465 6.37-.523 7.648-.581 8.928-.595 9.336-.595 12.595c0 3.259.014 3.667.072 4.947.058 1.278.261 2.15.558 2.913a6.87 6.87 0 001.62 2.485 6.87 6.87 0 002.485 1.62c.763.297 1.635.5 2.913.558C8.333 24.581 8.741 24.595 12 24.595s3.667-.014 4.947-.072c1.278-.058 2.15-.261 2.913-.558a6.87 6.87 0 002.485-1.62 6.87 6.87 0 001.62-2.485c.297-.763.5-1.635.558-2.913.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.278-.261-2.15-.558-2.913a6.87 6.87 0 00-1.62-2.485A6.87 6.87 0 0019.86.035C19.097-.262 18.225-.465 16.947-.523 15.667-.581 15.259-.595 12-.595S8.333-.581 7.053-.523zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"
  },
  {
    name:      "Facebook",
    url:       "https://www.facebook.com/iliosindia/",     // REPLACE: confirm page URL
    ariaLabel: "Follow ilios on Facebook",
    svgPath:   "M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.025 4.388 11.018 10.125 11.927v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97H15.83c-1.491 0-1.955.93-1.955 1.886v2.265h3.328l-.532 3.49h-2.796v8.437C19.612 23.09 24 18.098 24 12.073z"
  },
  {
    name:      "Zomato",
    url:       "https://www.zomato.com/ncr/ilios-rajouri-garden-new-delhi",  // REPLACE: confirm Zomato listing URL
    ariaLabel: "View ilios on Zomato",
    svgPath:   "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.857 17.75H7.786c-.347 0-.629-.282-.629-.629V6.879c0-.347.282-.629.629-.629h1.071c0 .629.315 1.218.838 1.569l-1.909 1.296v7.306l3.357.001v1.328zm5.928-.629c0 .347-.282.629-.629.629h-3.357v-1.328h3.357V9.115l-1.909-1.296c.523-.351.838-.94.838-1.569h1.071c.347 0 .629.282.629.629v10.242z"
  },
  {
    name:      "Swiggy",
    url:       "https://www.swiggy.com/restaurants/ilios-rajouri-garden-new-delhi",  // REPLACE: confirm Swiggy listing URL
    ariaLabel: "Order from ilios on Swiggy",
    svgPath:   "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.248 18.2c-.482.228-1.318.376-2.152.376-.94 0-1.693-.188-2.262-.547-.598-.376-.901-.928-.901-1.636v-5.04H7.8V9.6h2.133V6.4h2.534V9.6h2.781v1.753h-2.781v4.46c0 .518.154.86.467 1.038.288.163.737.25 1.346.25.325 0 .651-.037.968-.108v1.207z"
  },
  {
    name:      "Google",
    url:       CONFIG.MAPS_REVIEWS_URL,
    ariaLabel: "Read ilios reviews on Google",
    svgPath:   "M21.35 11.1h-9.18v2.73h5.51c-.24 1.27-.98 2.34-2.09 3.06v2.54h3.38c1.98-1.82 3.12-4.5 3.12-7.58 0-.52-.05-1.02-.14-1.5-.16-.83-.38-1.25-.6-1.25zM12.17 22c2.83 0 5.2-.94 6.93-2.54l-3.38-2.54c-.94.63-2.14 1-3.55 1-2.73 0-5.04-1.84-5.87-4.32H2.81v2.62A10.49 10.49 0 0012.17 22zM6.3 13.6a6.26 6.26 0 010-3.2V7.78H2.81A10.49 10.49 0 002 12c0 1.69.4 3.29 1.11 4.72l3.49-2.72-.3-.4zM12.17 5.68c1.54 0 2.92.53 4.01 1.57l3-3A10.49 10.49 0 0012.17 2 10.49 10.49 0 002.81 7.78l3.49 2.72c.83-2.48 3.14-4.32 5.87-4.32z"
  }
];


/* ---------------------------------------------------------------------------
 * 10. HELPER — getUpcomingEvents(n)
 * ---------------------------------------------------------------------------
 *   Returns the next `n` real calendar dates with live events, in IST.
 *   Today's event counts if the current IST time is before its end time
 *   (assumed 3 hours after advertised start).
 * ------------------------------------------------------------------------- */
function getUpcomingEvents(n) {
  if (!n || n <= 0) return [];

  /** Parse a time string like "8:30 PM" into { hours24, minutes }. */
  function parseTime(timeStr) {
    var match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) return { hours24: 20, minutes: 30 }; // fallback
    var h = parseInt(match[1], 10);
    var m = parseInt(match[2], 10);
    var period = match[3].toUpperCase();
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return { hours24: h, minutes: m };
  }

  /* Build a lookup: dayOfWeek → schedule entry */
  var dayMap = {};
  SCHEDULE.forEach(function (entry) {
    dayMap[entry.dayOfWeek] = entry;
  });

  /* Current IST time (UTC + 5 h 30 min) */
  var now    = new Date();
  var utcMs  = now.getTime() + now.getTimezoneOffset() * 60000;
  var istMs  = utcMs + 5.5 * 3600000;
  var nowIST = new Date(istMs);

  var results = [];
  var cursor  = new Date(nowIST);
  cursor.setHours(0, 0, 0, 0);

  for (var d = 0; d < 28 && results.length < n; d++) {
    var checkDate = new Date(cursor.getTime() + d * 86400000);
    var dow       = checkDate.getDay(); // 0 = Sun

    if (!dayMap[dow]) continue;

    var entry     = dayMap[dow];
    var parsed    = parseTime(entry.time);
    var startMs   = new Date(checkDate).setHours(parsed.hours24, parsed.minutes, 0, 0);
    var endMs     = startMs + 3 * 3600000; // event lasts ~3 hours

    /* Skip today's event if we're past its end time */
    if (d === 0 && nowIST.getTime() > endMs) continue;

    var isTonight = (d === 0 && nowIST.getTime() <= endMs);

    /* Format: "Friday, 21 Nov" */
    var dayNames   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dd         = checkDate.getDate();
    var mm         = checkDate.getMonth();
    var yyyy       = checkDate.getFullYear();
    var formattedDate = dayNames[dow] + ", " + dd + " " + monthNames[mm];

    /* Abbreviated day / month for compact cards */
    var shortDay = dayNames[dow].substring(0, 3);
    var dayShortUpper = shortDay.toUpperCase();
    var monthShortUpper = monthNames[mm].toUpperCase();
    var displayDate = shortDay + ", " + dd + " " + monthNames[mm];

    /* dateStr: "21/11/2025",  dateISO: "2025-11-21" */
    var ddStr  = dd < 10 ? "0" + dd : "" + dd;
    var mmStr  = (mm + 1) < 10 ? "0" + (mm + 1) : "" + (mm + 1);
    var dateStr = ddStr + "/" + mmStr + "/" + yyyy;
    var dateISO = yyyy + "-" + mmStr + "-" + ddStr;

    results.push({
      dayOfWeek:     entry.dayOfWeek,
      dayName:       entry.dayName,
      dayShort:      dayShortUpper,
      dateNum:       dd < 10 ? "0" + dd : "" + dd,
      monthShort:    monthShortUpper,
      displayDate:   displayDate,
      title:         entry.title,
      genre:         entry.genre,
      time:          entry.time,
      tag:           entry.tag,
      formattedDate: formattedDate,
      dateStr:       dateStr,
      dateISO:       dateISO,
      isTonight:     isTonight
    });
  }

  return results;
}


/* ---------------------------------------------------------------------------
 * 11. HELPER — getTonightOrNextEvent()
 * ---------------------------------------------------------------------------
 *   Returns a hero-chip object:
 *     { text: "🎶 Tonight: Sufi Night · 8:30 PM", mobileText: "Tonight 5:30 PM · Sundowner · ≈₹1,000 for two" }
 *     { text: "Next live night: Fri 21/11 · Sufi Night", mobileText: "Fri · Sufi Night 8:30 PM · ≈₹1,000 for two" }
 *   Returns null if no events found within 28 days.
 * ------------------------------------------------------------------------- */
function getTonightOrNextEvent() {
  var upcoming = getUpcomingEvents(1);
  if (!upcoming.length) return null;

  var evt = upcoming[0];

  function getShortTitle(title) {
    if (/sundowner/i.test(title)) return "Sundowner";
    if (/sufi/i.test(title)) return "Sufi Night";
    if (/live band/i.test(title)) return "Live Band";
    if (/bollywood/i.test(title)) return "Bollywood";
    return title;
  }

  function getShortTime(timeStr) {
    var m = timeStr.match(/\d+:\d+\s*(?:AM|PM)/i);
    return m ? m[0] : timeStr;
  }

  var shortTitle = getShortTitle(evt.title);
  var shortTime  = getShortTime(evt.time);
  var shortDay   = evt.dayName.substring(0, 3);

  if (evt.isTonight) {
    return {
      text: "\uD83C\uDFB6 Tonight: " + evt.title + " \u00B7 " + evt.time,
      mobileText: "Tonight " + shortTime + " \u00B7 " + shortTitle + " \u00B7 \u2248\u20B91,000 for two"
    };
  }

  return {
    text: "Next live night: " + shortDay + " " + evt.dateStr + " \u00B7 " + evt.title,
    mobileText: shortDay + " \u00B7 " + shortTitle + " " + shortTime + " \u00B7 \u2248\u20B91,000 for two"
  };
}
