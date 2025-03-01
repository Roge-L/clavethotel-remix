import { useState, useEffect } from 'react';

export default function Events() {
const images = [
    'bar-1.png',
    'bar-2.png',
    'bar-3.png'
];

const [currentImage, setCurrentImage] = useState<number>(0);
const [isPlaying, setIsPlaying] = useState<boolean>(true);
const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

useEffect(() => {
  images.forEach(imageSrc => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => setLoadedImages(prev => new Set([...prev, imageSrc]));
  });
}, []);

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

const togglePlayPause = (): void => {
  setIsPlaying(!isPlaying);
};

const goToPrevious = (): void => {
  setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
};

const goToNext = (): void => {
  setCurrentImage((prev) => (prev + 1 + images.length) % images.length);
};


return (
  <div>
  <div className="bg-slate-900 h-[500px] md:h-[800px] relative">
  <div 
    className="bg-no-repeat bg-center absolute inset-0"
    style={{ 
      backgroundImage: `url('${images[currentImage]}')`,
      backgroundSize: 'cover',
      opacity: 1.0,
      transition: 'background-image 0.5s ease-in-out'
    }}>
  </div>
  <div className="absolute inset-0 bg-black/55"></div>
  <div className="absolute inset-0 flex flex-col items-center justify-center animate-fadeInOneSecond font-serif px-4">
    <h1 className="text-4xl md:text-7xl mb-4 text-center">Clavet Bar</h1>
    <p className="text-2xl md:text-4xl text-center">Events & Entertainment</p>
  </div>

  <button
    onClick={goToPrevious}
    className="absolute left-2 md:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 md:p-4 rounded-full text-white transition-all duration-300 text-xl md:text-2xl"
  >
    ←
  </button>

  <button
    onClick={goToNext}
    className="absolute right-2 md:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 md:p-4 rounded-full text-white transition-all duration-300 text-xl md:text-2xl"
  >
    →
  </button>

  <button
    onClick={togglePlayPause}
    className="absolute bottom-8 md:bottom-16 left-1/2 transform -translate-x-1/2 bg-white/20 hover:bg-white/40 px-3 py-1 md:px-4 md:py-2 rounded-full text-white transition-all duration-300"
  >
    {isPlaying ? '⏸︎' : '⏵︎'}
  </button>     
</div>
  
  <div className="flex min-h-[450px] md:h-[650px] items-center bg-amber-50 font-serif">
    <div className="text-center max-w-3xl mx-auto p-6 md:p-16">
      <h2 className="text-4xl md:text-6xl font-medium text-slate-900 pb-4">
        Book an Event
      </h2>
      <p className="text-slate-900 text-xl md:text-2xl tracking-wide leading-relaxed">
        Enjoy fresh air from our spacious outdoor patio. 
        Perfect for meals or drinks with friends, our 
        comfortable outdoor space makes any visit special. 
        Open during good weather, our patio offers a 
        relaxing spot to unwind.
      </p>
      <a 
        href="tel:306-242-2848" 
        className="inline-block mt-6 bg-slate-900 text-white py-3 px-8 rounded-lg text-xl hover:bg-slate-700 transition-colors"
      >
        Call to Reserve: 306-242-2848
      </a>
    </div>
  </div>

  <div>    
    <div className="flex flex-col md:flex-row min-h-[500px] md:h-[700px] items-center bg-white font-serif">
      <div className="w-full md:w-1/2 flex p-6 md:p-16">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-semi mb-4 text-slate-900 tracking-wide">VLTs</h2>
          <p className="text-xl md:text-2xl leading-relaxed text-slate-700 text-center">
            Join us for VLT gaming in our welcoming bar area. Our modern machines and friendly service 
            ensure a comfortable gaming experience, with complimentary beverages available for players. 
            Whether you're a regular or new to VLTs, stop by and try your luck.
          </p>
        </div>
      </div>
      <img 
        src="/vlt-1.png"
        alt="VLTs"
        className="w-[90%] md:w-auto md:h-[85%] object-cover rounded-2xl shadow-lg my-6 md:my-0">
      </img>
    </div>
  </div>
  
  <div className="flex flex-col-reverse md:flex-row min-h-[500px] md:h-[700px] items-center bg-gray-50 font-serif px-6 md:px-16">
    <img 
      src="/pool-table.png"
      alt="Pool Table"
      className="w-[90%] md:w-auto md:h-[85%] object-cover rounded-2xl shadow-lg my-6 md:my-0">
    </img>
    <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-semi mb-4 text-slate-900 tracking-wide">Pool Table</h1>
        <div className="text-xl md:text-2xl leading-relaxed text-slate-700 text-center">
          Test your skills at our full-sized pool table. In our spacious bar
          area, it's the perfect spot to enjoy a friendly game with drinks and
          good company. Our well-maintained table and relaxed atmosphere 
          make for an enjoyable experience any time of day.
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
