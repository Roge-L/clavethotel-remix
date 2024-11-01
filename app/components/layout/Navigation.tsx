import { useState } from "react";
import { Link, useLocation } from "@remix-run/react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isCurrentPage = (path: string) => {
    return location.pathname === path;
  };

  const isHomePage = location.pathname === "/";

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/rooms", label: "Rooms" },
    { path: "/dining", label: "Dining" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="absolute w-full z-50">
      {/* Full Screen Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-slate-900 transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {/* Mobile Logo */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`font-serif text-3xl tracking-wide mb-12 text-white transition-all duration-500 delay-100 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            Clavet Motor Inn
          </Link>

          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`relative text-xl text-white tracking-wider transition-all duration-500 delay-${
                  (index + 2) * 100
                } group ${
                  isOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                } ${isCurrentPage(link.path) ? "font-medium" : ""}`}
              >
                <span className="relative">
                  {link.label.toUpperCase()}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setIsOpen(false)}
              className={`mt-4 px-8 py-3 text-xl tracking-wider text-white bg-slate-800 rounded-lg 
                transition-all duration-500 delay-700 hover:bg-slate-700 active:bg-slate-600
                hover:scale-105 active:scale-95 ${
                  isOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }`}
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <div
        className={`transition-colors duration-300 ${
          isHomePage ? "" : "bg-white shadow-md"
        }`}
      >
        <div className="px-4 mx-auto max-w-7xl">
          {/* Desktop Navigation */}
          <div className="flex items-center justify-between h-20">
            {/* Logo/Home link - Visible on all pages */}
            <Link
              to="/"
              className={`font-serif text-2xl tracking-wide transition-opacity hover:opacity-75 ${
                isHomePage ? "text-white md:block hidden" : "text-slate-900"
              }`}
            >
              Clavet Motor Inn
            </Link>

            {/* Mobile Menu Button - Right-aligned */}
            <div className="md:hidden ml-auto relative z-[60]">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 transition-colors ${
                  isOpen
                    ? "text-white"
                    : isHomePage
                      ? "text-gray-100"
                      : "text-slate-900"
                }`}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <span
                    className={`absolute top-1/2 left-0 block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                      isOpen ? "rotate-45" : "-translate-y-2"
                    }`}
                  />
                  <span
                    className={`absolute top-1/2 left-0 block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                      isOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`absolute top-1/2 left-0 block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                      isOpen ? "-rotate-45" : "translate-y-2"
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm tracking-wider transition-colors hover:text-gray-500 ${
                    isHomePage
                      ? "text-white hover:text-gray-300"
                      : "text-slate-900"
                  } ${isCurrentPage(link.path) ? "font-medium" : ""}`}
                >
                  {link.label.toUpperCase()}
                </Link>
              ))}
              <Link
                to="/book"
                className={`px-6 py-2 text-sm tracking-wider rounded transition-colors ${
                  isHomePage
                    ? "text-white bg-slate-900 hover:bg-slate-800"
                    : "text-white bg-slate-900 hover:bg-slate-800"
                }`}
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
