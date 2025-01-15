import React, { useState, useEffect } from 'react';
  
export default function Dining() {
  const images = [
    'cafe&bar-1.jpg',
    'cafe&bar-2.jpg',
    'cafe&bar-3.jpg',
    'cafe&bar-4.jpg',
    'cafe&bar-5.jpg'
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 3500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };
  
  return (
    <div>
    <div className="bg-slate-900 h-[800px] relative">
      <div 
        className="bg-no-repeat bg-center absolute inset-0"
        style={{ 
          backgroundImage: `url('${images[currentImage]}')`,
          backgroundSize: 'cover',
          opacity: 1.5,
          transition: 'background-image 0.5s ease-in-out'
        }}>
      </div>
      <div className="absolute inset-0 bg-black/55"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center animate-fadeInOneSecond font-serif">
        <h1 className="text-6xl mb-4">Our Cafe & Bar</h1>
        <p className="text-4xl">Chinese & Western Delights</p>
      </div>

        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-4 rounded-full text-white transition-all duration-300 text-2xl"
        >
          ←
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-4 rounded-full text-white transition-all duration-300 text-2xl"
        >
          →
        </button>

        {/* Play/Pause button */}
        <button
          onClick={togglePlayPause}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white/20 hover:bg-white/40 px-4 py-2 rounded-full text-white transition-all duration-300"
        >
          {isPlaying ? '⏸︎' : '⏵︎'}
        </button>
      </div>

      <div className="flex h-[700px] text-slate-900 bg-gray-50 font-serif px-16">
        <div className="flex justify-center items-center gap-16 w-full">  
          <div className="space-y-6 w-[500px]">
            <h2 className="text-6xl"> Dining at Clavet Cafe</h2>
            <div className="text-2xl leading-relaxed text-slate-600">
            At Clavet Cafe, we serve fresh, hearty meals that bring comfort food 
            classics and bold Asian-inspired flavors to life. From golden, crispy
             dried ribs and rich bacon cheese burgers to sizzling hot chow mein.</div>
            <button 
              onClick={() => window.open('pdfs/clavet-cafe-menu.pdf','_blank')}
              className="bg-slate-900 text-white text-xl rounded-full px-8 py-3 shadow-lg hover:shadow-xl hover:bg-slate-700 transition-colors">
              View Menu
            </button>
          </div>
          <img 
            src="/food-1.jpg"
            alt="A Few Dishes of Clavet Cafe"
            className="flex-1 justify-center items-center max-w-[45%] h-[520px] object-cover rounded-2xl shadow-lg transition-shadow duration-300"
            />
        </div>
      </div>
      <div className="flex justify-center items-center h-[700px] bg-white font-serif px-16">
      <div className="bg-white text-slate-900 py-24">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left side - Text content */}
          
          {/* Right side - Feature highlights */}
          <div className="flex-1">
            <div className="bg-gray-50 rounded-2xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 text-lg">
                  <div className="text-5xl">🍽️</div>
                  <div className="font-semibold">Full Menu Available</div>
                  <div className="text-gray-600">All your favorites, delivered</div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl">👥</div>
                  <div className="font-semibold">Perfect for Groups</div>
                  <div className="text-gray-600">Ideal for office lunches</div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl">⭐️</div>
                  <div className="font-semibold">Quality Guaranteed</div>
                  <div className="text-gray-600">Packaged with care</div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl">📱</div>
                  <div className="font-semibold">Easy Ordering</div>
                  <div className="text-gray-600">Just a few taps away</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-6xl font-serif text-slate-900">Hungry Now?</h2>
            <p className="text-2xl leading-relaxed text-slate-600">
            Get our delicious fusion cuisine delivered straight to your door. 
            Enjoy Clavet's finest dishes in the comfort of your home. Whether 
            you're craving a quick lunch or hosting a family dinner, our full
             menu is available for delivery through UberEats.
            </p>
            <div className="flex items-center gap-8 pt-6">
              <button 
                onClick={() => window.open('https://www.ubereats.com/ca/store/clavet-cafe/ix58d4UHWsOkSSFudODHjg?diningMode=DELIVERY&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMjEwJTIwTWFpbiUyMFN0JTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyOTE1YWU2NjAtMmQ0NC03YWJhLTdiZTgtODUwMjQ0YTAxMmQ1JTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMnViZXJfcGxhY2VzJTIyJTJDJTIybGF0aXR1ZGUlMjIlM0E1MS45OTY5MDc2JTJDJTIybG9uZ2l0dWRlJTIyJTNBLTEwNi4zNzM2ODc1JTdE', '_blank')}
                className="bg-slate-900 text-white text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-slate-700 transition-colors flex items-center gap-2"
              >
                Order On UberEats
              </button>
              <div className="text-gray-5 00">
              Delivery available <div className="font-semibold">11am to 8pm Monday to Saturday</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</div>
  );
}