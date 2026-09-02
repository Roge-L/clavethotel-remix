/**
 * Schema.org JSON-LD graph.
 *
 * Google recommends JSON-LD over microdata, and requires that structured data
 * describe content actually rendered on the page. Everything here is derived
 * from `~/data/site`, which is also what the pages render — so the two cannot
 * drift apart.
 */
import {
  AMENITIES,
  BUSINESS,
  CAFE_HOURS,
  CHECK_IN_TIME,
  CHECK_OUT_TIME,
  HIGHEST_RATE,
  INN_HOURS,
  LOWEST_RATE,
  ROOMS,
  SITE_URL,
  type OpeningHours,
} from "~/data/site";

export const INN_ID = `${SITE_URL}/#lodging`;
export const CAFE_ID = `${SITE_URL}/dining#restaurant`;
export const BAR_ID = `${SITE_URL}/events#bar`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORG_ID = `${SITE_URL}/#organization`;

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  };
}

function geoCoordinates() {
  return {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  };
}

function openingHours(hours: readonly OpeningHours[]) {
  return hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [...h.days],
    opens: h.opens,
    closes: h.closes,
  }));
}

function amenityFeatures() {
  return AMENITIES.map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  }));
}

/** One `HotelRoom` offer per room type, priced from the shared rate card. */
function hotelRooms() {
  return ROOMS.map((room) => ({
    "@type": "HotelRoom",
    "@id": `${SITE_URL}/rooms#${room.slug}`,
    name: room.name,
    description: room.description,
    image: `${SITE_URL}${room.image}`,
    bed: { "@type": "BedDetails", typeOfBed: room.beds },
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: room.occupancy,
      unitCode: "C62",
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: `${SITE_URL}/book`,
    },
    offers: {
      "@type": "Offer",
      price: room.price.toFixed(2),
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/book`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: room.price.toFixed(2),
        priceCurrency: "CAD",
        unitCode: "DAY",
        valueAddedTaxIncluded: false,
      },
    },
  }));
}

export function lodgingBusiness() {
  return {
    "@type": ["Hotel", "LodgingBusiness"],
    "@id": INN_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: BUSINESS.currenciesAccepted,
    paymentAccepted: BUSINESS.paymentAccepted,
    image: [`${SITE_URL}/cover.webp`, `${SITE_URL}/og-image.jpg`],
    logo: `${SITE_URL}/logo-dark.webp`,
    address: postalAddress(),
    geo: geoCoordinates(),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${BUSINESS.geo.latitude},${BUSINESS.geo.longitude}`,
    openingHoursSpecification: openingHours(INN_HOURS),
    checkinTime: CHECK_IN_TIME,
    checkoutTime: CHECK_OUT_TIME,
    petsAllowed: false,
    smokingAllowed: false,
    numberOfRooms: ROOMS.length,
    amenityFeature: amenityFeatures(),
    containsPlace: hotelRooms(),
    makesOffer: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: LOWEST_RATE.toFixed(2),
        maxPrice: HIGHEST_RATE.toFixed(2),
        priceCurrency: "CAD",
      },
    },
    sameAs: [...BUSINESS.sameAs],
    areaServed: [
      { "@type": "City", name: "Clavet" },
      { "@type": "City", name: "Saskatoon" },
      { "@type": "AdministrativeArea", name: "Saskatchewan" },
    ],
  };
}

export function cafeBusiness() {
  return {
    "@type": "Restaurant",
    "@id": CAFE_ID,
    name: "Clavet Cafe",
    description:
      "Chinese and Western comfort food in Clavet, Saskatchewan — dried ribs, chow mein, burgers and daily specials. Dine in or order delivery.",
    url: `${SITE_URL}/dining`,
    telephone: BUSINESS.telephone,
    servesCuisine: ["Chinese", "Canadian", "Western"],
    priceRange: BUSINESS.priceRange,
    acceptsReservations: true,
    hasMenu: `${SITE_URL}/dining`,
    image: [`${SITE_URL}/cafe-1.webp`, `${SITE_URL}/food-1.webp`],
    address: postalAddress(),
    geo: geoCoordinates(),
    openingHoursSpecification: openingHours(CAFE_HOURS),
    sameAs: [...BUSINESS.sameAs],
    containedInPlace: { "@id": INN_ID },
  };
}

export function barBusiness() {
  return {
    "@type": "BarOrPub",
    "@id": BAR_ID,
    name: "Clavet Bar",
    description:
      "The bar at Clavet Motor Inn: VLTs, a full-sized pool table, an outdoor patio and an on-site liquor store. Available for private events.",
    url: `${SITE_URL}/events`,
    telephone: BUSINESS.telephone,
    priceRange: BUSINESS.priceRange,
    image: [`${SITE_URL}/bar-1.webp`, `${SITE_URL}/pool-table.webp`],
    address: postalAddress(),
    geo: geoCoordinates(),
    openingHoursSpecification: openingHours(INN_HOURS),
    sameAs: [...BUSINESS.sameAs],
    containedInPlace: { "@id": INN_ID },
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS.name,
    description: BUSINESS.description,
    inLanguage: "en-CA",
    publisher: { "@id": INN_ID },
  };
}

/**
 * The site-wide graph, rendered once in the root document. Page-level schema
 * references these nodes by `@id` instead of repeating them.
 */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [website(), lodgingBusiness()],
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbs(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map(
      (crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `${SITE_URL}${crumb.path}`,
      })
    ),
  };
}

export function withContext(node: object) {
  return { "@context": "https://schema.org", ...node };
}

export function faqPage(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
