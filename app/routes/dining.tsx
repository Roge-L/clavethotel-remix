import React, { useState, useEffect } from 'react';
  
export default function Dining() {
  const images = [
    'cafe&bar-2.jpg',
    'cafe&bar-1.jpg',
    'cafe&bar-3.jpg',
    'cafe&bar-4.jpg',
    'cafe&bar-5.jpg'
  ];

  const [currentImage, setCurrentImage] = useState(0);
  
  const [isPlaying, setIsPlaying] = useState(true);

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

  const[isPdfOpen, setIsPdfOpen] = useState(false)
  
  return (
    <div>
      <div className="bg-slate-900 min-h-screen relative">
  <div 
    className="bg-no-repeat bg-center absolute inset-0"
    style={{ 
      backgroundImage: `url('${images[currentImage]}')`,
      backgroundSize: '80% 90%',
      opacity: 1,
      transition: 'background-image 0.5s ease-in-out'
    }}>
  </div>
        <div className="absolute inset-0 bg-black/45"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center animate-fadeInOneSecond font-serif ">
          <h1 className="text-6xl mb-3">Our Cafe & Bar</h1>
          <p className="text-4xl">Chinese & Western Delights</p>
        </div>

        {/* Add play/pause button */}
        <button
          onClick={togglePlayPause}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white/20 hover:bg-white/40 px-4 py-2 rounded-full text-white transition-all duration-300"
        >
          {isPlaying ? '⏸︎' : '⏵︎'}
        </button>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 
                ${index === currentImage ? 'bg-white scale-125' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="flex h-[650px] text-slate-900 bg-white font-serif px-24">
        <div className="w-full flex items-center justify-center gap-8">  
          <div className="space-y-4">
          <h2 className="text-6xl font-semibold">Dining in Clavet</h2>
          <div className="text-4xl leading-relaxed">Clavet Cafe blends authentic Western cuisine with Chinese favorites in a serene, welcoming space.</div>
            <button 
              onClick={() => window.open('/pdfs/menu.pdf','_blank')}
              className="px-6 py-3 bg-slate-900 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-slate-800 transition-colors">
              View Menu
            </button>
          </div>
        <img src="/food-1.jpg"
          alt="food"
          className="w-1/2 object-cover rounded-lg shadow-lg transition-shadow duration-300 "></img>
        </div>
      </div>
      <div className="flex h-[650px] text-slate-900 bg-white font-serif px">

      </div>
    </div>
  );
}