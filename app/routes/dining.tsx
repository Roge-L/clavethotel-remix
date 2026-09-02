import { useCallback, useEffect, useState } from "react";
import type { MetaFunction } from "react-router";
import { CAFE_MENU_PDF, UBER_EATS_URL } from "~/data/site";
import { buildMeta } from "~/lib/seo";
import { breadcrumbs, cafeBusiness, withContext } from "~/lib/structured-data";

export const meta: MetaFunction = ({ location }) => [
  ...buildMeta({
    title: "Clavet Cafe — Chinese & Western Dining",
    description:
      "Chinese and Western comfort food near Saskatoon: crispy dried ribs, chow mein and bacon cheeseburgers. Dine in weekdays 11am–8pm or order on Uber Eats.",
    pathname: location.pathname,
    image: "https://www.clavethotel.com/og-image.jpg",
  }),
  { "script:ld+json": withContext(cafeBusiness()) },
  { "script:ld+json": breadcrumbs([{ name: "Dining", path: "/dining" }]) },
];

const SLIDES = [
  { src: "/cafe-1.webp", alt: "Dining room at Clavet Cafe" },
  { src: "/cafe-2.webp", alt: "Table service at Clavet Cafe" },
  { src: "/cafe-3.webp", alt: "Seating area inside Clavet Cafe" },
];

const SLIDE_INTERVAL_MS = 3500;

const PERKS = [
  {
    icon: "🍽️",
    title: "Full Menu Available",
    detail: "All your favourites, delivered",
  },
  { icon: "👥", title: "Perfect for Groups", detail: "Ideal for office lunches" },
  { icon: "⭐️", title: "Quality Guaranteed", detail: "Packaged with care" },
  { icon: "📱", title: "Easy Ordering", detail: "Just a few taps away" },
];

export default function Dining() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(
      () => setCurrentImage((prev) => (prev + 1) % SLIDES.length),
      SLIDE_INTERVAL_MS
    );
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const goToPrevious = useCallback(
    () => setCurrentImage((prev) => (prev - 1 + SLIDES.length) % SLIDES.length),
    []
  );
  const goToNext = useCallback(
    () => setCurrentImage((prev) => (prev + 1) % SLIDES.length),
    []
  );

  return (
    <div>
      <div className="relative h-[500px] bg-slate-900 md:h-[800px]">
        {SLIDES.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={1600}
            height={1065}
            // The first slide is the LCP image; the rest can wait.
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            aria-hidden={index !== currentImage}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/55" />

        <div className="animate-fadeInOneSecond absolute inset-0 flex flex-col items-center justify-center px-4 font-serif text-white">
          <h1 className="mb-4 max-w-full text-4xl md:text-7xl">Clavet Cafe</h1>
          <p className="text-2xl md:text-4xl">Chinese &amp; Western Delights</p>
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-4 text-2xl text-white transition-all duration-300 hover:bg-white/40 md:left-8"
          aria-label="Previous image"
        >
          ←
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-4 text-2xl text-white transition-all duration-300 hover:bg-white/40 md:right-8"
          aria-label="Next image"
        >
          →
        </button>
        <button
          onClick={() => setIsPlaying((playing) => !playing)}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded-full bg-white/20 px-4 py-2 text-white transition-all duration-300 hover:bg-white/40"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? "⏸︎" : "⏵︎"}
        </button>
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 space-x-2">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              onClick={() => setCurrentImage(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentImage ? "scale-125 bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentImage}
            />
          ))}
        </div>
      </div>

      <section className="flex min-h-[500px] bg-gray-50 px-4 font-serif text-slate-900 md:h-[700px] md:px-16">
        <div className="flex w-full flex-col items-center justify-center gap-8 py-8 md:flex-row md:gap-16 md:py-0">
          <div className="w-full space-y-6 md:w-[500px]">
            <h2 className="text-3xl md:text-6xl">Dining at Clavet Cafe</h2>
            <p className="text-xl leading-relaxed text-slate-700 md:text-2xl">
              At Clavet Cafe, we serve fresh, hearty meals that bring comfort
              food classics and bold Asian-inspired flavours to life. From
              golden, crispy dried ribs and rich bacon cheeseburgers to sizzling
              hot chow mein.
            </p>
            <a
              href={CAFE_MENU_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full rounded-full bg-slate-900 px-8 py-3 text-center text-xl text-white shadow-lg transition-colors hover:bg-slate-700 hover:shadow-xl md:w-auto"
            >
              View Menu (PDF)
            </a>
          </div>
          <img
            src="/food-1.webp"
            alt="A selection of signature dishes from Clavet Cafe"
            width={1436}
            height={957}
            loading="lazy"
            decoding="async"
            className="h-[300px] w-full rounded-2xl object-cover shadow-lg md:h-[520px] md:max-w-[45%]"
          />
        </div>
      </section>

      <section className="flex min-h-[500px] items-center justify-center bg-white px-4 font-serif md:h-[700px] md:px-16">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-24">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-12">
            <div className="flex-1">
              <div className="rounded-2xl bg-gray-50 p-6 md:p-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
                  {PERKS.map((perk) => (
                    <div
                      key={perk.title}
                      className="space-y-2 text-lg text-slate-900"
                    >
                      <div aria-hidden="true" className="text-4xl md:text-5xl">
                        {perk.icon}
                      </div>
                      <div className="font-semibold">{perk.title}</div>
                      <div className="text-gray-600">{perk.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <h2 className="font-serif text-3xl text-slate-900 md:text-6xl">
                Hungry Now?
              </h2>
              <p className="text-xl leading-relaxed text-slate-700 md:text-2xl">
                Get our fusion cuisine delivered straight to your door. Whether
                you&apos;re craving a quick lunch or hosting a family dinner,
                our full menu is available for delivery through Uber Eats.
              </p>
              <div className="flex flex-col items-start gap-4 pt-6 md:flex-row md:items-center md:gap-8">
                <a
                  href={UBER_EATS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-full bg-slate-900 px-8 py-4 text-center text-xl text-white shadow-lg transition-colors hover:bg-slate-700 hover:shadow-xl md:w-auto"
                >
                  Order On Uber Eats
                </a>
                <div className="text-gray-500">
                  Delivery available
                  <div className="font-semibold">
                    11am to 8pm Monday to Saturday
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
