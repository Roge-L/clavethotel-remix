import { Link } from "@remix-run/react";


export default function RoomsRates(){
  const rooms = [
    {
      slug: "standard-queen",
      image: "/home-double-room.png",
      capacity: "2 Adults",
      title: "Standard Queen Room",
      description: "One queen bed",
      price: "80",
    },
    {
      slug: "king-room",
      image: "/home-stargazer-king.png",
      capacity: "2 Adults",
      title: "King Room",
      description: "One king bed",
      price: "90",
    },
    {
      slug: "double-queen",
      image: "/home-family-suite.png",
      capacity: "4 Adults",
      title: "Double Queen Room",
      description: "Two queen beds",
      price: "99",
    },
    {
      slug: "family-room",
      image: "/home-family-suite.png",
      capacity: "3-4 People",
      title: "Family Room",
      description: "Queen bed + futon",
      price: "90",
    },
  ];
return(
<div>
<div className="h-[500px] md:h-[800px] relative">
    <div className="bg-no-repeat bg-center absolute w-full h-full"
    style={{
        backgroundImage: `url(/home-stargazer-king.png)`,
        backgroundSize: `cover`,
        opacity: 0.7}}>
    </div>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-serif">
        <h1 className="text-4xl md:text-7xl mb-4">Rooms & Rates</h1>
        <p className="text-center text-2xl md:text-4xl">Your Perfect Stay, Priced Right</p>
    </div>
</div> 
<div className="flex flex-col items-center h-[500px] md:h-[700px] bg-gray-50 font-serif">
    <h2 className="text-4xl md:text-6xl text-slate-900 p-8">Room Types</h2>
    <div className="mb-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-medium text-slate-800">
                  Standard Queen Room
                </h3>
                <p className="text-slate-600 mt-1">
                  Starting at $89.99/night + tax
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-medium text-slate-800">
                  Double Queen Room
                </h3>
                <p className="text-slate-600 mt-1">
                  Starting at $99.99/night + tax
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-medium text-slate-800">King Room</h3>
                <p className="text-slate-600 mt-1">
                  Starting at $109.99/night + tax
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-medium text-slate-800">Family Room</h3>
                <p className="text-slate-600 mt-1">
                  Starting at $119.99/night + tax
                </p>
              </div>
            </div>
          </div>
</div>
</div>
)
}