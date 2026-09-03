import { Link } from "react-router";
import { BUSINESS, CAFE_HOURS, INN_HOURS } from "~/data/site";

const QUICK_LINKS = [
  { to: "/book", label: "Rooms & Rates" },
  { to: "/dining", label: "Café & Bar" },
  { to: "/events", label: "Events" },
];

function range(days: readonly string[]) {
  return days.length === 1 ? days[0] : `${days[0]} - ${days[days.length - 1]}`;
}

export function Footer() {
  return (
    <footer className="bg-slate-900 font-sans text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <h2 className="mb-6 font-serif text-xl font-normal">Hours</h2>
            <div className="space-y-6 text-gray-300">
              <div>
                <p className="mb-2 font-medium text-white">Front Desk &amp; Bar</p>
                {INN_HOURS.map((h) => (
                  <p key={`inn-${h.opens}`}>
                    {range(h.days)}: {h.opens}-{h.closes}
                  </p>
                ))}
                <p className="text-gray-400">Sunday: Closed</p>
              </div>
              <div>
                <p className="mb-2 font-medium text-white">Clavet Café</p>
                {CAFE_HOURS.map((h) => (
                  <p key={`cafe-${h.opens}`}>
                    {range(h.days)}: {h.opens}-{h.closes}
                  </p>
                ))}
                <p className="text-gray-400">Weekends: Closed</p>
              </div>
              <div>
                <p className="mb-2 font-medium text-white">Liquor Store</p>
                {INN_HOURS.map((h) => (
                  <p key={`liquor-${h.opens}`}>
                    {range(h.days)}: {h.opens}-{h.closes}
                  </p>
                ))}
                <p className="text-gray-400">Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="mb-6 font-serif text-xl font-normal">Contact</h2>
            <div className="space-y-6 text-gray-300">
              <address className="not-italic">
                <p>{BUSINESS.name}</p>
                <p>{BUSINESS.address.street}</p>
                <p>
                  {BUSINESS.address.locality}, {BUSINESS.address.region}{" "}
                  {BUSINESS.address.postalCode}
                </p>
              </address>
              <div>
                <p>
                  <a
                    href={`tel:${BUSINESS.telephone}`}
                    className="transition-colors hover:text-white"
                  >
                    +1 {BUSINESS.telephoneDisplay}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="transition-colors hover:text-white"
                  >
                    {BUSINESS.email}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="mb-6 font-serif text-xl font-normal">
                Quick Links
              </h2>
              <nav aria-label="Footer">
                <ul className="space-y-2 text-gray-300">
                  {QUICK_LINKS.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div>
              <h2 className="mb-6 font-serif text-xl font-normal">Follow Us</h2>
              <div className="flex gap-6">
                <a
                  href="https://www.facebook.com/ClavetBar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-white"
                  aria-label="Clavet Motor Inn on Facebook"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M16.5 2H7.5C4.46243 2 2 4.46243 2 7.5V16.5C2 19.5376 4.46243 22 7.5 22H16.5C19.5376 22 22 19.5376 22 16.5V7.5C22 4.46243 19.5376 2 16.5 2ZM15.1 12H13V20H10V12H8V9.5H10V7.5C10 6.4 10.9 5 13 5H15V7.5H13.5C13.2 7.5 13 7.7 13 8V9.5H15.1L15.1 12Z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/clavetmotorinn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-white"
                  aria-label="Clavet Motor Inn on Instagram"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.5 2H7.5C4.46243 2 2 4.46243 2 7.5V16.5C2 19.5376 4.46243 22 7.5 22H16.5C19.5376 22 22 19.5376 22 16.5V7.5C22 4.46243 19.5376 2 16.5 2ZM12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15ZM17 8C17.5523 8 18 7.55228 18 7C18 6.44772 17.5523 6 17 6C16.4477 6 16 6.44772 16 7C16 7.55228 16.4477 8 17 8Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-12 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
