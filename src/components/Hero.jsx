import React, { useState, useRef, useEffect } from "react";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import blackScooter from "../assets/mainScooter.png";
import whiteScooter from "../assets/whiteScooter.png";

const models = [
  {
    name: "EV-B",
    image: blackScooter,
    bg: "linear-gradient(to bottom right, #4b4b4b, #000000)",
    speed: "50km/hr",
    battery: "80km",
    charging: "3.5hr",
  },
  {
    name: "EV-W",
    image: whiteScooter,
    bg: "linear-gradient(to bottom right, #3b82f6, #ffffff)",
    speed: "45km/hr",
    battery: "70km",
    charging: "3.2hr",
  },
];

const circularText = "THE FUTURE OF ELECTRIC MOBILITY • ";

const Hero = () => {
  const [modelIndex, setModelIndex] = useState(0);
  const scooterRef = useRef(null);
  const heroBgRef = useRef(null);
  const circleTextRef = useRef(null);
  const rotatedTextLeftRef = useRef(null);
  const rotatedTextRightRef = useRef(null);

  // Render circular text characters positioned around a circle
  useEffect(() => {
    const circle = circleTextRef.current;
    if (!circle) return;

    const text = circularText.repeat(4);
    circle.innerHTML = "";

    const radius = 120;
    const centerX = radius;
    const centerY = radius;
    const chars = text.split("");

    chars.forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.position = "absolute";
      span.style.height = "20px";
      span.style.width = "20px";

      const angle = (360 / chars.length) * i;
      const rad = (angle * Math.PI) / 180;

      const x = centerX + radius * Math.cos(rad) - 10;
      const y = centerY + radius * Math.sin(rad) - 10;

      span.style.left = `${x}px`;
      span.style.top = `${y}px`;
      span.style.transform = `rotate(${angle + 90}deg)`;
      span.style.color = modelIndex === 0 ? "white" : "black";
      span.style.fontWeight = "600";
      span.style.fontSize = "14px";

      circle.appendChild(span);
    });
  }, [modelIndex]);

  // GSAP animations for heading, scooter, and rotating texts
  useGSAP(() => {
    const futureSplit = new SplitText("#heading", { type: "chars, words" });
    gsap.set(futureSplit.chars, { display: "inline-block" });

    gsap.from(scooterRef.current, {
      x: 500,
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
    });

    gsap.fromTo(
      futureSplit.chars,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
      }
    );

    gsap.to(circleTextRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "linear",
      transformOrigin: "120px 120px",
    });

    gsap.fromTo(
      [rotatedTextLeftRef.current, rotatedTextRightRef.current],
      { scale: 1 },
      {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      }
    );
  }, []);

  // Handle model switching with animation and background update
  const handleModelChange = (direction) => {
    const nextIndex =
      direction === "next"
        ? (modelIndex + 1) % models.length
        : (modelIndex - 1 + models.length) % models.length;

    gsap.to(scooterRef.current, {
      x: direction === "next" ? -500 : 500,
      opacity: 0,
      duration: 0.5,
      ease: "power1.inOut",
      onComplete: () => {
        setModelIndex(nextIndex);
        gsap.to(heroBgRef.current, {
          background: models[nextIndex].bg,
          duration: 0.6,
        });

        gsap.fromTo(
          scooterRef.current,
          { x: direction === "next" ? 500 : -500, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power1.inOut" }
        );
      },
    });
  };

  const currentModel = models[modelIndex];
  const isMainScooter = currentModel.name === "EV-B";

  return (
    <section
      ref={heroBgRef}
      className="relative pt-16 w-full min-h-screen transition-all duration-500 overflow-hidden"
      style={{ background: currentModel.bg }}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 gap-y-8 relative z-10">
        {/* Left panel with model details and stats */}
        <div
          className={`w-full md:w-2/5 flex flex-col items-center md:items-start md:pt-24 ${
            isMainScooter ? "text-white" : "text-black"
          }`}
        >
          <h3 className="uppercase tracking-widest text-sm sm:text-base">
            let's ride the
          </h3>
          <h1
            id="heading"
            className="font-extrabold leading-none whitespace-nowrap mt-2"
            style={{
              fontSize: "clamp(3rem, 10vw, 12rem)",
              fontFamily: '"Bebas Neue", sans-serif',
            }}
          >
            FUTURE
          </h1>
          <p className="text-sm mt-4 text-center md:text-left">
            Engineered for optimal performance and user experience,
            <br className="hidden md:block" />
            combining innovative technology with elegant design.
          </p>

          <div className="w-full max-w-4xl mx-auto mt-6 md:mt-12 px-4 md:mb-0 mb-4">
            <div className="flex flex-col md:flex-row md:justify-between bg-white/20 backdrop-blur-md px-6 py-6 shadow-md ">
              {["speed", "battery", "charging"].map((key) => (
                <div
                  key={key}
                  className={`flex flex-col items-center text-center py-4 md:py-0 md:w-1/3 ${
                    isMainScooter ? "text-white" : "text-black"
                  }`}
                >
                  <h5 className="text-lg md:text-2xl font-semibold">
                    {currentModel[key]}
                  </h5>
                  <p
                    className={`text-xs md:text-sm capitalize mt-1 ${
                      isMainScooter ? "text-white/80" : "text-zinc-700"
                    }`}
                  >
                    {key === "charging"
                      ? "Charging Time"
                      : key === "battery"
                      ? "Battery Range"
                      : "Speed"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel with scooter image, circular text, and controls */}
        <div className="relative w-full md:w-3/5 h-[50vh] md:h-[80vh] flex items-center justify-center">
          <div
            ref={circleTextRef}
            className="absolute w-[240px] h-[240px] rounded-full pointer-events-none"
            style={{ top: "-80px", right: "-100px", userSelect: "none" }}
          ></div>

          <div
            ref={rotatedTextLeftRef}
            className={`absolute top-20 left-[-40px] uppercase tracking-widest font-bold ${
              isMainScooter ? "text-white/50" : "text-black/40"
            }`}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "left top",
              fontSize: "0.875rem",
            }}
          >
            ELECTRIC POWER
          </div>

          <div
            ref={rotatedTextRightRef}
            className={`absolute bottom-24 right-[-40px] uppercase tracking-widest font-bold ${
              isMainScooter ? "text-white/50" : "text-black/40"
            }`}
            style={{
              transform: "rotate(90deg)",
              transformOrigin: "right bottom",
              fontSize: "0.875rem",
            }}
          >
            RIDE CLEAN
          </div>

          <h1
            className="absolute top-10 right-4 text-white opacity-20"
            style={{
              fontFamily: "robson",
              fontSize: "clamp(6rem, 20vw, 15rem)",
              lineHeight: "0.8",
              userSelect: "none",
            }}
          >
            {currentModel.name}
          </h1>

          <div
            ref={scooterRef}
            className="w-full h-full bg-center bg-no-repeat bg-contain transition-all duration-500 pointer-events-none"
            style={{ backgroundImage: `url(${currentModel.image})` }}
          ></div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-6">
            <GrFormPreviousLink
              onClick={() => handleModelChange("prev")}
              size={30}
              className={`${isMainScooter ? "text-white" : "text-black"} cursor-pointer`}
            />
            <div className="flex gap-2">
              {models.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full ${
                    i === modelIndex
                      ? "bg-white border border-black"
                      : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
            <GrFormNextLink
              onClick={() => handleModelChange("next")}
              size={30}
              className={`${isMainScooter ? "text-white" : "text-black"} cursor-pointer`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
