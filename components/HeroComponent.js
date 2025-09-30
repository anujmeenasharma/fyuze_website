"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import SparkleSvg from "./SparkleSvg";
import SparkleSvg2 from "./SparkleSvg2";
import LiquidEther from "./LiquidEther";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function HeroComponent() {
  const homeContainer = useRef();
  const scrollBtn = useRef();

  useGSAP(() => {
    const tl1 = gsap.timeline({
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5,
    });

    tl1
      .fromTo(
        ".line1",
        {
          clipPath: "inset(0 0 100% 0)",
        },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.5,
        }
      )
      .fromTo(
        ".line2",
        {
          clipPath: "inset(0 0 100% 0)",
        },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.5,
        }
      )
      .from(
        ".text",
        {
          opacity: 0,
          duration: 1,
        },
        "-=1"
      );

    gsap.to(".home-cont", {
      scaleX: 0.95,
      scaleY: 0.75,
      borderRadius: 56,
      scrollTrigger: {
        trigger: homeContainer.current,
        start: "bottom bottom",
        end: "bottom top",
        scrub: 2,
      },
    });
  }, homeContainer);

  return (
    <div
      className="font-sans h-screen w-full relative text-white flex-center"
      ref={homeContainer}
    >
      <div className="w-full h-full home-cont overflow-hidden relative bg-black z-100">
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <div className="absolute top-0 left-0  w-full h-full opacity-60 pointer-events-none"></div>
          <LiquidEther />
        </div>
        <div className="background w-full h-full pointer-events-none absolute top-0 left-0 z-20"></div>
        <div className="absolute w-full h-full flex-center z-100 left-0 top-0 pointer-events-none">
          <div className="relative flex-center flex-col w-1/2">
            <div className="relative w-full flex-center flex-col gap-12">
              <div className="flex-center flex-col gap-6 relative">
                <h1 className="font-archivo text-[1.8vw] leading-[1.5vw] font-bold">
                  Ask Fyuze to find your next Influencer
                </h1>
                <p className="text-sm font-[300] leading-[110%] w-[58%] mx-auto text-center">
                  AI-powered influencer discovery that filters by niche,
                  authenticity & ROI so you spend less time searching and more
                  time growing.
                </p>
              </div>
              <div className="relative w-full h-full pointer-events-auto">
                <input
                  type="text"
                  className="w-full h-full absolute bg-transparent outline-none text-white placeholder:text-white pl-20"
                />
                <div className="relative w-full flex-between p-5 h-full input-gradient rounded-[28px] backdrop-blur-[120px] z-80">
                  <SparkleSvg />
                  <div className="flex-center relative gap-3">
                    <div className="relative flex-center p-3 rounded-2xl icon-gradient cursor-pointer hover:scale-105 transition">
                      <div className="relative w-5 h-5">
                        <Image
                          src="/assets/clip.svg"
                          alt="logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="relative flex-center p-3 rounded-2xl icon-gradient cursor-pointer hover:scale-105 transition">
                      <div className="relative w-5 h-5">
                        <Image
                          src="/assets/arrow.svg"
                          alt="logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full absolute top-0 left-0 overflow-hidden custom-border h-full z-90 pointer-events-none"></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 flex justify-start items-start w-full pl-10 pointer-events-auto">
            <div className="flex-between gap-10 relative">
              <Link
                href="/"
                className="text-sm font-[300] leading-[100%] uppercase hover:underline"
              >
                terms
              </Link>
              <div className="relative w-[2px] h-[2px] rounded-full bg-white"></div>
              <Link
                href="/"
                className="text-sm font-[300] leading-[100%] uppercase hover:underline"
              >
                privacy policy
              </Link>
            </div>
          </div>
          <div
            className="absolute bottom-8 flex-center flex-col gap-1 pointer-events-none"
            ref={scrollBtn}
          >
            <div className="w-[0.6px] h-[20px] relative bg-white line1"></div>
            <p className="text-xs text-center font-medium font-archivo leading-[100%] uppercase text">
              Scroll to explore
            </p>
            <div className="w-[0.6px] h-[5px] relative bg-white line2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
