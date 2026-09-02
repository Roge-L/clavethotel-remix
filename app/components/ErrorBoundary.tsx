import { Link, isRouteErrorResponse, useRouteError } from "react-router";

export default function ErrorBoundary() {
  const error = useRouteError();

  let status = 500;
  let heading = "Something went wrong";
  let detail =
    "Our team has been notified. Try again in a moment, or head back home.";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    if (status === 404) {
      heading = "Page not found";
      detail =
        "The page you're looking for doesn't exist or has moved. Try one of the links below.";
    } else {
      detail = error.statusText || detail;
    }
  } else if (error instanceof Error) {
    console.error(error);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md text-center">
        <div className="space-y-6 rounded-lg bg-white p-8 shadow-xl">
          <p className="font-mono text-sm tracking-widest text-slate-400">
            ERROR {status}
          </p>
          <h1 className="font-serif text-4xl text-slate-900">{heading}</h1>
          <p className="text-lg text-slate-600">{detail}</p>
          <nav aria-label="Helpful links">
            <ul className="flex flex-wrap justify-center gap-4 pt-2 text-slate-900">
              <li>
                <Link to="/rooms" className="underline hover:no-underline">
                  Rooms
                </Link>
              </li>
              <li>
                <Link to="/dining" className="underline hover:no-underline">
                  Dining
                </Link>
              </li>
              <li>
                <Link to="/contact" className="underline hover:no-underline">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-block rounded-lg bg-slate-900 px-6 py-3 text-white transition-colors duration-300 hover:bg-slate-800"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
