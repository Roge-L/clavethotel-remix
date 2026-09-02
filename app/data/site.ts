/**
 * Single source of truth for business facts (NAP, hours, socials, rooms).
 *
 * Everything user-visible AND every piece of JSON-LD is generated from here so
 * the structured data can never drift from the rendered page — Google treats
 * schema that describes content absent from the page as spam.
 */

export const SITE_URL = "https://www.clavethotel.com";

export const BUSINESS = {
  name: "Clavet Motor Inn",
  legalName: "Clavet Motor Inn",
  tagline: "Your Cozy Prairie Retreat",
  description:
    "Clavet Motor Inn is a family-run motel, café and bar in Clavet, Saskatchewan — 15 minutes from Saskatoon. Clean, comfortable rooms at honest rates, plus Chinese & Western dining, VLTs and a full liquor store.",
  email: "management@clavethotel.com",
  telephone: "+1-306-242-2848",
  telephoneDisplay: "(306) 242-2848",
  priceRange: "$$",
  currenciesAccepted: "CAD",
  paymentAccepted: "Cash, Credit Card, Debit Card",
  address: {
    street: "2-10 Main Street",
    locality: "Clavet",
    region: "SK",
    regionName: "Saskatchewan",
    postalCode: "S0K 0Y0",
    country: "CA",
  },
  geo: { latitude: 51.9969076, longitude: -106.3736875 },
  sameAs: [
    "https://www.facebook.com/ClavetBar",
    "https://www.instagram.com/clavetmotorinn/",
  ],
} as const;

export type OpeningHours = {
  days: readonly string[];
  opens: string;
  closes: string;
};

/** Front desk, bar and liquor store all keep the same schedule. */
export const INN_HOURS: readonly OpeningHours[] = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "11:00",
    closes: "23:00",
  },
];

export const CAFE_HOURS: readonly OpeningHours[] = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "11:00",
    closes: "20:00",
  },
];

export const CHECK_IN_TIME = "15:00";
export const CHECK_OUT_TIME = "11:00";

export const AMENITIES = [
  "Free High-Speed WiFi",
  "Free Parking",
  "On-site Café",
  "On-site Bar",
  "Liquor Store",
  "VLTs",
  "Pool Table",
  "Outdoor Patio",
  "Non-Smoking Rooms",
] as const;

export type Room = {
  slug: string;
  name: string;
  /** Nightly rate in CAD, before GST/PST. */
  price: number;
  beds: string;
  occupancy: number;
  image: string;
  imageAlt: string;
  description: string;
};

/**
 * Rates and room types follow the /book rate card, which management keeps
 * current. The home page renders from this list so the two can't disagree.
 */
export const ROOMS: readonly Room[] = [
  {
    slug: "standard-queen",
    name: "Standard Queen Room",
    price: 89.99,
    beds: "One queen bed",
    occupancy: 2,
    image: "/home-double-room.webp",
    imageAlt: "Standard Queen Room at Clavet Motor Inn with one queen bed",
    description:
      "Our most popular room. One queen bed, free WiFi and everything you need for a comfortable night on the prairies.",
  },
  {
    slug: "double-queen",
    name: "Double Queen Room",
    price: 99.99,
    beds: "Two queen beds",
    occupancy: 4,
    image: "/home-family-suite.webp",
    imageAlt: "Double Queen Room at Clavet Motor Inn with two queen beds",
    description:
      "Two queen beds with room to spread out — a good fit for families or a work crew sharing a room.",
  },
  {
    slug: "king-room",
    name: "King Room",
    price: 109.99,
    beds: "One king bed",
    occupancy: 2,
    image: "/home-stargazer-king.webp",
    imageAlt: "King Room at Clavet Motor Inn with one king bed",
    description:
      "A little more space and a king bed, for when you want to stretch out after a long drive.",
  },
  {
    slug: "kitchen-suite",
    name: "Kitchen Suite",
    price: 119.99,
    beds: "Queen bed + kitchenette",
    occupancy: 3,
    image: "/home-single-room.webp",
    imageAlt: "Kitchen Suite at Clavet Motor Inn with a kitchenette",
    description:
      "Our largest room, with a kitchenette for longer stays and guests who'd rather cook in.",
  },
];

export const LOWEST_RATE = Math.min(...ROOMS.map((r) => r.price));
export const HIGHEST_RATE = Math.max(...ROOMS.map((r) => r.price));

export const UBER_EATS_URL =
  "https://www.ubereats.com/ca/store/clavet-cafe/ix58d4UHWsOkSSFudODHjg";

export const CAFE_MENU_PDF = "/pdfs/2025-10-30-clavet-cafe-menu.pdf";

/** Formats a rate the same way everywhere: `$89.99`. */
export function formatRate(price: number): string {
  return `$${price.toFixed(2)}`;
}
