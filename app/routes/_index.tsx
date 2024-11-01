import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Clavet Motor Inn - Your Cozy Prairie Retreat" },
    {
      name: "description",
      content:
        "Welcome to Clavet Motor Inn, your comfortable stay just 15 minutes from Saskatoon. Featuring cozy rooms, friendly service, and small-town charm.",
    },
  ];
};

export default function Index() {
  const rooms = [
    {
      slug: "standard-queen",
      image: "/home-double-room.png",
      capacity: "2 Adults",
      title: "Standard Queen Room",
      description: "One queen bed",
      price: "109",
    },
    {
      slug: "king-room",
      image: "/home-stargazer-king.png",
      capacity: "2 Adults",
      title: "King Room",
      description: "One king bed",
      price: "129",
    },
    {
      slug: "double-queen",
      image: "/home-family-suite.png",
      capacity: "4 Adults",
      title: "Double Queen Room",
      description: "Two queen beds",
      price: "149",
    },
    {
      slug: "family-room",
      image: "/home-family-suite.png",
      capacity: "3-4 People",
      title: "Family Room",
      description: "Queen bed + futon",
      price: "139",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="h-screen bg-[url('/cover.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col items-center justify-center h-full backdrop-brightness-65 pt-20">
          <header className="flex flex-col items-center gap-9">
            <div className="animate-fadeInOneSecond flex flex-col items-center text-center">
              <h1 className="tracking-widest text-xl">WELCOME TO</h1>
              <h1 className="font-serif text-7xl md:text-9xl">
                Clavet Motor Inn
              </h1>
              <h1 className="font-serif text-2xl md:text-4xl">
                Your Cozy Prairie Retreat
              </h1>
            </div>
            <div className="animate-fadeInOneAndAHalfSecond tracking-widest text-l text-black">
              <Link to="/book">
                <div className="transition duration-500 hover:scale-105 hover:bg-slate-50 mx-auto mt-16 max-w-7xl text-center bg-white py-2 px-20">
                  Book Now
                </div>
              </Link>
            </div>
          </header>
        </div>
      </div>

      {/* Description Section */}
      <div className="flex justify-center py-20 px-4 bg-white min-h-[600px]">
        <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12 items-center">
          <div className="font-serif text-left flex-1 text-black">
            <h2 className="text-3xl mb-4">
              A prairie sanctuary in Clavet, where comfort meets convenience.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="border-l-2 border-gray-200 pl-4">
                <p className="font-semibold mb-1 flex items-center gap-2">
                  <span role="img" aria-label="wifi" className="text-lg">
                    📶
                  </span>
                  Free WiFi
                </p>
                <p className="text-sm text-gray-600">High-Speed Internet</p>
              </div>
              <div className="border-l-2 border-gray-200 pl-4">
                <p className="font-semibold mb-1 flex items-center gap-2">
                  <span role="img" aria-label="car" className="text-lg">
                    🚗
                  </span>
                  15 min
                </p>
                <p className="text-sm text-gray-600">from Saskatoon</p>
              </div>
              <div className="border-l-2 border-gray-200 pl-4">
                <p className="font-semibold mb-1 flex items-center gap-2">
                  <span role="img" aria-label="home" className="text-lg">
                    🏘️
                  </span>
                  Local Hub
                </p>
                <p className="text-sm text-gray-600">Heart of the Community</p>
              </div>
            </div>
            <h3 className="text-xl text-gray-700">
              Whether you're here for work, visiting family, or just passing
              through, we offer clean, comfortable rooms at reasonable rates.
              Join us at our café and bar to experience true Saskatchewan
              hospitality.
            </h3>
          </div>
          <div className="w-full md:w-1/3 relative">
            <img
              src="/sunsets-01.jpg"
              alt="Saskatchewan prairie sunset"
              className="w-full rounded-lg shadow-lg aspect-[2/3] object-cover"
            />
            <div className="absolute bottom-2 right-2 text-xs text-white opacity-70 hover:opacity-100 transition-opacity">
              <a
                href="https://herry.ca/saskatchewan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Photo: Herry Himanshu
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-black flex flex-col items-center py-20 px-4 bg-gray-50">
        <h2 className="font-serif text-4xl mb-12">Our Rooms</h2>
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4">
            {rooms.map((room) => (
              <Link
                key={room.slug}
                to="/book"
                className="block bg-white rounded-lg overflow-hidden shadow-lg transition duration-500 hover:scale-105"
              >
                <div className="aspect-video w-full">
                  <img
                    src={room.image}
                    alt={`${room.title}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-2 text-sm">{room.capacity}</p>
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    {room.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {room.description}
                  </p>
                  <p className="text-gray-800">from ${room.price} per night</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center text-xs text-gray-500 mt-8">
            Room photography by{" "}
            <a
              href="https://www.johnlyrealestate.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              John Ly Real Estate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
