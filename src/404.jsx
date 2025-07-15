import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const UnderConstruction = () => {
  const svgRef = useRef(null);
  const heroBgRef = useRef(null);

  // Animate heading chars and SVG illustration on mount
  useGSAP(() => {
    const comingSoonSplit = new SplitText("#coming-soon", { type: "chars, words" });
    gsap.set(comingSoonSplit.chars, { display: "inline-block" });

    gsap.from(svgRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
    });

    gsap.fromTo(
      comingSoonSplit.chars,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
      }
    );
  }, []);

  return (
    <section
      ref={heroBgRef}
      className="relative pt-16 w-full min-h-screen transition-all duration-500"
      style={{ background: "linear-gradient(to bottom right, #3b82f6, #ffffff)" }}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 gap-y-8">
        {/* Left panel with heading, description, and developer contact */}
        <div className="w-full md:w-2/5 flex flex-col items-center md:items-start md:pt-24 text-black">
          <h3 className="uppercase tracking-widest text-sm sm:text-base">
            we're working on
          </h3>
          <h1
            id="coming-soon"
            className="font-extrabold leading-none whitespace-nowrap mt-2"
            style={{ fontSize: "clamp(3rem, 10vw, 12rem)" }}
          >
            COMING SOON
          </h1>
          <p className="text-sm mt-4 text-center md:text-left">
            Our team is hard at work building something amazing.
            <br className="hidden md:block" />
            Stay tuned for updates and exciting announcements!
          </p>
          <a
            href="mailto:antirmenel@gmail.com"
            className="mt-6 inline-block text-blue-600 underline hover:text-blue-800 transition-colors text-sm font-medium"
            aria-label="Contact developer via email"
          >
            Contact developer
          </a>
        </div>

        {/* Right panel with animated SVG and background watermark text */}
        <div className="relative w-full md:w-3/5 h-[50vh] md:h-[80vh] flex items-center justify-center">
          <h1
            className="absolute top-10 right-4 text-black opacity-20"
            style={{
              fontSize: "clamp(6rem, 20vw, 15rem)",
              lineHeight: "0.8",
            }}
          >
            WIP
          </h1>

          <div ref={svgRef} className="w-full h-full flex items-center justify-center">
            <svg width="80%" height="80%" viewBox="0 0 200 200" className="max-h-[400px]">
              <path d="M50,70 L150,70 L130,40 L70,40 Z" fill="#FF6B35" stroke="#000" strokeWidth="2" />
              <rect x="70" y="40" width="60" height="10" fill="#FFE74C" stroke="#000" strokeWidth="1" />

              <rect x="60" y="100" width="80" height="10" rx="2" fill="#2F4858" stroke="#000" strokeWidth="1" />
              <rect x="80" y="80" width="10" height="30" rx="2" fill="#2F4858" stroke="#000" strokeWidth="1" />
              <circle cx="120" cy="120" r="15" fill="#86BBD8" stroke="#000" strokeWidth="1" />
              <line x1="120" y1="105" x2="120" y2="135" stroke="#000" strokeWidth="2" />
              <line x1="105" y1="120" x2="135" y2="120" stroke="#000" strokeWidth="2" />

              <path d="M140,150 L160,180 L120,180 Z" fill="#FFE74C" stroke="#000" strokeWidth="1" />
              <text x="140" y="170" textAnchor="middle" fontSize="16" fill="#000">!</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnderConstruction;
