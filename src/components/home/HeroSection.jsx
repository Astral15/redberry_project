import { useState } from "react";

const heroSlides = [
  {
    image: "/hero-banner-1.png",
    title: "Slide 1",
  },
  {
    image: "/hero-banner-2.png",
    title: "Slide 2",
  },
  {
    image: "/hero-banner-3.png",
    title: "Slide 3",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = heroSlides[currentSlide];
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === heroSlides.length - 1;

  const goPrev = () => {
    if (!isFirstSlide) setCurrentSlide((prev) => prev - 1);
  };

  const goNext = () => {
    if (!isLastSlide) setCurrentSlide((prev) => prev + 1);
  };

  return (
    <section className="mx-auto mt-[3.2%] w-[81.56%]">
      <div className="relative overflow-hidden rounded-[1.9%]">
        <img src={slide.image} alt={slide.title} className="block w-full" />

        <div className="absolute bottom-[13.5%] left-1/2 flex -translate-x-1/2 items-center">
          <img
            src={
              currentSlide === 0
                ? "/carusel_nav_1.png"
                : currentSlide === 1
                ? "/carusel_nav_2.png"
                : "/carusel_nav_3.png"
            }
            alt="Current slide"
            className="w-[8.4vw]"
          />
        </div>

        <div className="absolute bottom-[12.6%] right-[3.2%] flex items-center gap-[0.8vw]">
          <button type="button" onClick={goPrev} className="flex items-center">
            <img
              src={isFirstSlide ? "/arrow_L_disabled.png" : "/arrowleft.png"}
              alt="Previous"
              className="w-[2.5vw]"
            />
          </button>

          <button type="button" onClick={goNext} className="flex items-center">
            <img
              src={isLastSlide ? "/arrow_R_disabled.png" : "/arrowright.png"}
              alt="Next"
              className="w-[2.5vw]"
            />
          </button>
        </div>
      </div>
    </section>
  );
}