import { useState, useEffect } from 'react';


export default function Dining() {
 const images = [
   'cafe-1.png',
   'cafe-2.png',
   'cafe-3.png',
 ];

 const [currentImage, setCurrentImage] = useState<number>(0);
 const [isPlaying, setIsPlaying] = useState<boolean>(true);
 const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
 const UBER_EATS_URL = 'https://www.ubereats.com/ca/store/clavet-cafe/ix58d4UHWsOkSSFudODHjg?diningMode=DELIVERY&mod=storeDeliveryTime&modctx=%257B%2522entryPoint%2522%253A%2522store-auto-surface%2522%252C%2522encodedStoreUuid%2522%253A%2522ix58d4UHWsOkSSFudODHjg%2522%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMjEwJTIwTWFpbiUyMFN0JTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyOTE1YWU2NjAtMmQ0NC03YWJhLTdiZTgtODUwMjQ0YTAxMmQ1JTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMnViZXJfcGxhY2VzJTIyJTJDJTIybGF0aXR1ZGUlMjIlM0E1MS45OTY5MDc2JTJDJTIybG9uZ2l0dWRlJTIyJTNBLTEwNi4zNzM2ODc1JTdE&ps=1&sc=SEARCH_SUGGESTIO';

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
     {/* Hero Section*/}
     <div className="bg-slate-900 h-auto md:h-[800px] relative">
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
         <h1 className="text-4xl md:text-7xl mb-4 truncate max-w-full">Clavet Cafe</h1>
         <p className="text-2xl md:text-4xl">Chinese & Western Delights</p>
       </div>

       <button
         onClick={goToPrevious}
         className="absolute left-2 md:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-4 rounded-full text-white transition-all duration-300 text-2xl"
       >
         ←
       </button>

       <button
         onClick={goToNext}
         className="absolute right-2 md:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-4 rounded-full text-white transition-all duration-300 text-2xl"
       >
         →
       </button>

       <button
         onClick={togglePlayPause}
         className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white/20 hover:bg-white/40 px-4 py-2 rounded-full text-white transition-all duration-300"
       >
         {isPlaying ? '⏸︎' : '⏵︎'}
       </button>
     </div>

     {/* Dining Section*/}
     <div className="flex min-h-[500px] md:h-[700px] text-slate-900 bg-gray-50 font-serif px-4 md:px-16">
       <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 w-full py-8 md:py-0">  
         <div className="space-y-6 w-full md:w-[500px]">
           <h2 className="text-3xl md:text-6xl whitespace-nowrap">Dining at Clavet Cafe</h2>
           <div className="text-xl md:text-2xl leading-relaxed text-slate-700">
             At Clavet Cafe, we serve fresh, hearty meals that bring comfort food 
             classics and bold Asian-inspired flavors to life. From golden, crispy
             dried ribs and rich bacon cheese burgers to sizzling hot chow mein.
           </div>
           <button 
             onClick={() => window.open('pdfs/clavet-cafe-menu.pdf','_blank')}
             className="w-full md:w-auto bg-slate-900 text-white text-xl rounded-full px-8 py-3 shadow-lg hover:shadow-xl hover:bg-slate-700 transition-colors">
             View Menu
           </button>
         </div>
         <img 
           src="/food-1.jpg"
           alt="Selection of signature dishes"
           className="w-full md:max-w-[45%] h-[300px] md:h-[520px] object-cover rounded-2xl shadow-lg transition-shadow duration-300"
         />
       </div>
     </div>

     {/* UberEats Section*/}
     <div className="flex justify-center items-center min-h-[500px] md:h-[700px] bg-white font-serif px-4 md:px-16">
       <div className="bg-white text-slate-900 py-12 md:py-24">
         <div className="max-w-6xl mx-auto px-4 md:px-8">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
             <div className="flex-1">
               <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                   <div className="space-y-2 text-lg text-slate-900">
                     <div className="text-4xl md:text-5xl">🍽️</div>
                     <div className="font-semibold">Full Menu Available</div>
                     <div className="text-gray-600">All your favorites, delivered</div>
                   </div>
                   <div className="space-y-2 text-lg text-slate-900">
                     <div className="text-4xl md:text-5xl">👥</div>
                     <div className="font-semibold">Perfect for Groups</div>
                     <div className="text-gray-600">Ideal for office lunches</div>
                   </div>
                   <div className="space-y-2 text-lg text-slate-900">
                     <div className="text-4xl md:text-5xl">⭐️</div>
                     <div className="font-semibold">Quality Guaranteed</div>
                     <div className="text-gray-600">Packaged with care</div>
                   </div>
                   <div className="space-y-2 text-lg text-slate-900">
                     <div className="text-4xl md:text-5xl">📱</div>
                     <div className="font-semibold">Easy Ordering</div>
                     <div className="text-gray-600">Just a few taps away</div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="flex-1 space-y-6">
               <h2 className="text-3xl md:text-6xl font-serif text-slate-900">Hungry Now?</h2>
               <p className="text-xl md:text-2xl leading-relaxed text-slate-700">
                 Get our delicious fusion cuisine delivered straight to your door. 
                 Enjoy Clavet's finest dishes in the comfort of your home. Whether 
                 you're craving a quick lunch or hosting a family dinner, our full
                 menu is available for delivery through UberEats.
               </p>
               <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 pt-6">
                 <button 
                   onClick={() => window.open(UBER_EATS_URL, '_blank')}
                   className="w-full md:w-auto bg-slate-900 text-white text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-slate-700 transition-colors">
                   Order On UberEats
                 </button>
                 <div className="text-gray-500">
                   Delivery available 
                   <div className="font-semibold">11am to 8pm Monday to Saturday</div>
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