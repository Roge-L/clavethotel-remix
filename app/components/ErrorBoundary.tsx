import React from "react";
import { Link, useRouteError, isRouteErrorResponse } from "@remix-run/react";

export default function ErrorBoundary() {
  const error = useRouteError();

  let status = "404";
  let statusText = "Page not found";

  if (isRouteErrorResponse(error)) {
    status = error.status.toString();
    statusText = error.statusText;
  } else if (error instanceof Error) {
    status = "500";
    statusText = error.message;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Construction Animation */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto relative">
            {/* Construction Icon */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-slate-900"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Base */}
              <rect
                x="10"
                y="70"
                width="80"
                height="10"
                className="fill-current"
              />

              {/* Crane Tower */}
              <rect
                x="40"
                y="20"
                width="8"
                height="50"
                className="fill-current"
              >
                <animate
                  attributeName="height"
                  values="50;48;50"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>

              {/* Crane Arm */}
              <rect
                x="35"
                y="20"
                width="45"
                height="8"
                className="fill-current origin-center"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 40 24; -10 40 24; 0 40 24"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </rect>

              {/* Crane Cable */}
              <line x1="70" y1="28" x2="70" y2="45" className="origin-top">
                <animate
                  attributeName="y2"
                  values="45;40;45"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </line>

              {/* Hook */}
              <path d="M67 45 H73 M70 45 L70 50" className="origin-top">
                <animate
                  attributeName="y"
                  values="0;-5;0"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Support Beams */}
              <line x1="25" y1="70" x2="40" y2="45" />
              <line x1="63" y1="70" x2="48" y2="45" />

              {/* Small Details */}
              <circle cx="40" cy="24" r="3" className="fill-current" />
              <rect
                x="15"
                y="80"
                width="70"
                height="4"
                className="fill-current"
              />
            </svg>
          </div>

          {/* Construction barrier stripes */}
          <div className="h-4 w-full bg-yellow-400 mt-8 relative overflow-hidden">
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 w-[200%]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, #1e293b 0, #1e293b 20px, #eab308 20px, #eab308 40px)",
                  animation: "slide 20s linear infinite",
                }}
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="bg-white rounded-lg shadow-xl p-8 space-y-6">
          <h1 className="font-serif text-4xl text-slate-900">
            Under Construction
          </h1>
          <p className="text-lg text-slate-600">
            Oops! This page is still being renovated. Our team is working hard
            to make it perfect for you.
          </p>
          <p className="text-slate-500">
            Error {status}: {statusText}
          </p>
          <div className="pt-4">
            <Link
              to="/"
              className="inline-block px-6 py-3 text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors duration-300 hover:scale-105 transform"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
