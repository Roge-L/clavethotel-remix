import { useCallback, useEffect, useState } from "react";
import type { MetaFunction } from "react-router";
import { BUSINESS } from "~/data/site";
import { buildMeta } from "~/lib/seo";
import { barBusiness, breadcrumbs, withContext } from "~/lib/structured-data";

export const meta: MetaFunction = ({ location }) => [
  ...buildMeta({
    title: "Clavet Bar — Events & Entertainment",
    description:
      "VLTs, a full-sized pool table and a spacious outdoor patio at Clavet Bar, minutes from Saskatoon. Book the space for private events by calling " +
      BUSINESS.telephoneDisplay +
      ".",
    pathname: location.pathname,
  }),
  { "script:ld+json": withContext(barBusiness()) },
  { "script:ld+json": breadcrumbs([{ name: "Events", path: "/events" }]) },
];

const SLIDES = [
  { src: "/bar-1.webp", alt: "The bar at Clavet Motor Inn" },
  { src: "/bar-2.webp", alt: "Seating in the Clavet Bar lounge" },
  { src: "/bar-3.webp", alt: "The Clavet Bar on a busy evening" },
];

const SLIDE_INTERVAL_MS = 3500;

export default function Events() {
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
            width={1280}
            height={851}
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
          <h1 className="mb-4 text-center text-4xl md:text-7xl">Clavet Bar</h1>
          <p className="text-center text-2xl md:text-4xl">
            Events &amp; Entertainment
          </p>
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-xl text-white transition-all duration-300 hover:bg-white/40 md:left-8 md:p-4 md:text-2xl"
          aria-label="Previous image"
        >
          ←
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-xl text-white transition-all duration-300 hover:bg-white/40 md:right-8 md:p-4 md:text-2xl"
          aria-label="Next image"
        >
          →
        </button>
        <button
          onClick={() => setIsPlaying((playing) => !playing)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-white/20 px-3 py-1 text-white transition-all duration-300 hover:bg-white/40 md:bottom-16 md:px-4 md:py-2"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? "⏸︎" : "⏵︎"}
        </button>
      </div>

      <section className="flex min-h-[450px] items-center bg-amber-50 font-serif md:h-[650px]">
        <div className="mx-auto max-w-3xl p-6 text-center md:p-16">
          <h2 className="pb-4 text-4xl font-medium text-slate-900 md:text-6xl">
            Book an Event
          </h2>
          <p className="text-xl leading-relaxed tracking-wide text-slate-900 md:text-2xl">
            Enjoy fresh air from our spacious outdoor patio. Perfect for meals
            or drinks with friends, our comfortable outdoor space makes any
            visit special. Open during good weather, our patio offers a relaxing
            spot to unwind.
          </p>
          <a
            href={`tel:${BUSINESS.telephone}`}
            className="mt-6 inline-block rounded-lg bg-slate-900 px-8 py-3 text-xl text-white transition-colors hover:bg-slate-700"
          >
            Call to Reserve: {BUSINESS.telephoneDisplay}
          </a>
        </div>
      </section>

      <section className="flex min-h-[500px] flex-col items-center bg-white font-serif md:h-[700px] md:flex-row">
        <div className="flex w-full p-6 md:w-1/2 md:p-16">
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-3xl tracking-wide text-slate-900 md:text-5xl">
              VLTs
            </h2>
            <p className="text-center text-xl leading-relaxed text-slate-700 md:text-2xl">
              Join us for VLT gaming in our welcoming bar area. Our modern
              machines and friendly service ensure a comfortable gaming
              experience, with complimentary beverages available for players.
              Whether you&apos;re a regular or new to VLTs, stop by and try your
              luck.
            </p>
          </div>
        </div>
        <img
          src="/vlt-1.webp"
          alt="Video lottery terminals in the Clavet Bar"
          width={1280}
          height={852}
          loading="lazy"
          decoding="async"
          className="my-6 w-[90%] rounded-2xl object-cover shadow-lg md:my-0 md:h-[85%] md:w-auto"
        />
      </section>

      <section className="flex min-h-[500px] flex-col-reverse items-center bg-gray-50 px-6 font-serif md:h-[700px] md:flex-row md:px-16">
        <img
          src="/pool-table.webp"
          alt="Full-sized pool table in the Clavet Bar"
          width={1280}
          height={853}
          loading="lazy"
          decoding="async"
          className="my-6 w-[90%] rounded-2xl object-cover shadow-lg md:my-0 md:h-[85%] md:w-auto"
        />
        <div className="flex w-full items-center justify-center p-6 md:w-1/2 md:p-16">
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-3xl tracking-wide text-slate-900 md:text-5xl">
              Pool Table
            </h2>
            <p className="text-center text-xl leading-relaxed text-slate-700 md:text-2xl">
              Test your skills at our full-sized pool table. In our spacious bar
              area, it&apos;s the perfect spot to enjoy a friendly game with
              drinks and good company. Our well-maintained table and relaxed
              atmosphere make for an enjoyable experience any time of day.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
