import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { BUSINESS } from "~/data/site";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/dining", label: "Dining" },
  { path: "/events", label: "Events" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // A full-screen drawer over a scrollable page traps the scroll behind it.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav aria-label="Main" className="absolute z-50 w-full">
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-slate-900 transition-all duration-500 ease-in-out md:hidden ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="mb-12 font-serif text-3xl tracking-wide text-white"
          >
            {BUSINESS.name}
          </Link>

          <div className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `group relative text-xl tracking-wider text-white ${
                    isActive ? "font-medium" : ""
                  }`
                }
              >
                <span className="relative">
                  {link.label.toUpperCase()}
                  <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </span>
              </NavLink>
            ))}
            <Link
              to="/book"
              onClick={() => setIsOpen(false)}
              className="mt-4 rounded-lg bg-slate-800 px-8 py-3 text-xl tracking-wider text-white transition-all duration-500 hover:scale-105 hover:bg-slate-700 active:scale-95 active:bg-slate-600"
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      </div>

      <div className={isHomePage ? "" : "bg-white shadow-md"}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-20 items-center justify-between">
            <Link
              to="/"
              className={`font-serif text-2xl tracking-wide transition-opacity hover:opacity-75 ${
                isHomePage ? "hidden text-white md:block" : "text-slate-900"
              }`}
            >
              {BUSINESS.name}
            </Link>

            <div className="relative z-[60] ml-auto md:hidden">
              <button
                onClick={() => setIsOpen((open) => !open)}
                className={`p-2 transition-colors ${
                  isOpen
                    ? "text-white"
                    : isHomePage
                      ? "text-gray-100"
                      : "text-slate-900"
                }`}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <div className="relative h-6 w-6">
                  <span
                    className={`absolute left-0 top-1/2 block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
                      isOpen ? "rotate-45" : "-translate-y-2"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
                      isOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
                      isOpen ? "-rotate-45" : "translate-y-2"
                    }`}
                  />
                </div>
              </button>
            </div>

            <div className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `text-sm tracking-wider transition-colors ${
                      isHomePage
                        ? "text-white hover:text-gray-300"
                        : "text-slate-900 hover:text-gray-500"
                    } ${isActive ? "font-medium" : ""}`
                  }
                >
                  {link.label.toUpperCase()}
                </NavLink>
              ))}
              <Link
                to="/book"
                className="rounded bg-slate-900 px-6 py-2 text-sm tracking-wider text-white transition-colors hover:bg-slate-800"
              >
                BOOK NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
