import { Link } from "@remix-run/react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white font-sans">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-normal mb-6">Hours</h3>
            <div className="space-y-6 text-gray-300">
              <div>
                <p className="font-sans font-medium text-white mb-2">
                  Front Desk & Bar
                </p>
                <p className="font-sans">Monday - Saturday: 8AM-11PM</p>
                <p className="font-sans text-gray-400">Sunday: Closed</p>
              </div>
              <div>
                <p className="font-sans font-medium text-white mb-2">
                  Clavet Café
                </p>
                <p className="font-sans">Monday - Friday: 11AM-8PM</p>
                <p className="font-sans text-gray-400">Weekends: Closed</p>
              </div>
              <div>
                <p className="font-sans font-medium text-white mb-2">
                  Liquor Store
                </p>
                <p className="font-sans">Monday - Saturday: 11AM-10PM</p>
                <p className="font-sans text-gray-400">Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-normal mb-6">Contact</h3>
            <div className="space-y-6 text-gray-300">
              <div>
                <p className="font-sans">Clavet Motor Inn</p>
                <p className="font-sans">2-10 Main Street</p>
                <p className="font-sans">Clavet, SK S0K 0Y0</p>
              </div>
              <div>
                <p className="font-sans">+1 (306) 242-2848</p>
                <p className="font-sans">management@clavethotel.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links & Social */}
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-xl font-normal mb-6">
                Quick Links
              </h3>
              <nav>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <Link
                      to="/rooms"
                      className="font-sans hover:text-white transition-colors"
                    >
                      Rooms & Rates
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dining"
                      className="font-sans hover:text-white transition-colors"
                    >
                      Café & Bar
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/events"
                      className="font-sans hover:text-white transition-colors"
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/gallery"
                      className="font-sans hover:text-white transition-colors"
                    >
                      Gallery
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div>
              <h3 className="font-serif text-xl font-normal mb-6">Follow Us</h3>
              <div className="flex gap-6">
                <a
                  href="https://www.facebook.com/ClavetBar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.5 2H7.5C4.46243 2 2 4.46243 2 7.5V16.5C2 19.5376 4.46243 22 7.5 22H16.5C19.5376 22 22 19.5376 22 16.5V7.5C22 4.46243 19.5376 2 16.5 2ZM15.1 12H13V20H10V12H8V9.5H10V7.5C10 6.4 10.9 5 13 5H15V7.5H13.5C13.2 7.5 13 7.7 13 8V9.5H15.1L15.1 12Z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/clavetmotorinn/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
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

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 pt-12 mt-12 border-t border-gray-800">
          <p className="font-sans">
            © 2024 Clavet Motor Inn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
