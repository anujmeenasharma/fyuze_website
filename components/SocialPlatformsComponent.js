"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function splitWordsToSpans(text, className = "") {
  // Split by space, keep punctuation attached to word
  return text.split(" ").map((word, idx) => (
    <span
      key={idx}
      className={`word-animate ${className}`}
      style={{ display: "inline-block", whiteSpace: "pre" }}
    >
      {word + (idx !== text.split(" ").length - 1 ? " " : "")}
    </span>
  ));
}

// Helper: for each column, define the images and icon
const columns = [
  {
    // Instagram
    images: [
      { src: "/assets/1.png", icon: "/assets/ig-white.svg" },
      { src: "/assets/img1.png", icon: "/assets/ig-white.svg" },
      { src: "/assets/img2.png", icon: "/assets/ig-white.svg" },
      { src: "/assets/img3.png", icon: "/assets/ig-white.svg" },
    ],
    height: 280,
    animationClass: "animate-scroll-up-slow",
    colClass: "",
  },
  {
    // TikTok
    images: [
      { src: "/assets/2.png", icon: "/assets/tiktok-white.svg", height: 270 },
      { src: "/assets/img4.png", icon: "/assets/tiktok-white.svg", height: 260 },
      { src: "/assets/img5.png", icon: "/assets/tiktok-white.svg", height: 270 },
      { src: "/assets/img6.png", icon: "/assets/tiktok-white.svg", height: 260 },
    ],
    animationClass: "animate-scroll-down-medium",
    colClass: "-top-4",
  },
  {
    // X (Twitter)
    images: [
      { src: "/assets/3.png", icon: "/assets/x-white.svg" },
      { src: "/assets/img7.png", icon: "/assets/x-white.svg" },
      { src: "/assets/1.png", icon: "/assets/x-white.svg" },
      { src: "/assets/2.png", icon: "/assets/x-white.svg" },
    ],
    height: 280,
    animationClass: "animate-scroll-up-fast",
    colClass: "top-2",
  },
];

export default function SocialPlatformsComponent() {
  const h2Ref = useRef(null);
  const pRef = useRef(null);

  // Refs for each column to animate in from bottom
  const colRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    // Animate h2 words (word by word)
    if (h2Ref.current) {
      const h2Words = h2Ref.current.querySelectorAll(".word-animate");
      gsap.set(h2Words, { y: 50, opacity: 0 });
      gsap.to(h2Words, {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: h2Ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }
    // Animate p lines (line by line)
    if (pRef.current) {
      const pLines = pRef.current.querySelectorAll(".line-animate");
      gsap.set(pLines, { y: 50, opacity: 0 });
      gsap.to(pLines, {
        y: 0,
        opacity: 1,
        stagger: 0.18,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }

    // Animate each column in from bottom, then start infinite animation
    colRefs.forEach((ref, idx) => {
      if (ref.current) {
        // Set initial state: move down and transparent
        gsap.set(ref.current, { y: 100, opacity: 0 });
        // Animate in
        gsap.to(ref.current, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          // On complete, add the infinite animation class
          onComplete: () => {
            // Add the animation class for infinite scroll
            if (ref.current) {
              ref.current.classList.add(columns[idx].animationClass);
            }
          },
        });
      }
    });
    // Remove animation class initially so it doesn't start before reveal
    colRefs.forEach((ref, idx) => {
      if (ref.current) {
        ref.current.classList.remove(columns[idx].animationClass);
      }
    });
  }, []);

  const socialPlatforms = [
    {
      icon: "/assets/insta.svg",
      title: "Instagram",
    },
    {
      icon: "/assets/fb.svg",
      title: "Facebook",
    },
    {
      icon: "/assets/tiktok.svg",
      title: "Tiktok",
    },
    {
      icon: "/assets/news.svg",
      title: "Newsletter",
    },
    {
      icon: "/assets/yt.svg",
      title: "Youtube",
    },
    {
      icon: "/assets/x.svg",
      title: "X",
    },
  ];

  // Texts to animate
  const h2Text = "Supported Social Platforms";
  // Split the para into lines for line-by-line animation
  const paraLines = [
    "Search millions of creators in seconds using AI-powered filters:",
    "audience authenticity, geo-verification, sentiment, engagement quality, niche fit, and more.",
  ];

  // Helper to render a column of images
  function renderColumn(colIdx) {
    const col = columns[colIdx];
    // For seamless loop, duplicate the images
    const images = [...col.images, ...col.images.slice(0, 2)];
    return (
      <div className={`w-1/3 relative ${col.colClass}`}>
        <div ref={colRefs[colIdx]}>
          {images.map((img, i) => (
            <div
              key={i}
              className="w-full relative rounded-4xl overflow-hidden mb-7"
              style={{
                height: img.height
                  ? `${img.height}px`
                  : col.height
                  ? `${col.height}px`
                  : "280px",
              }}
            >
              <Image
                src={img.src}
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src={img.icon}
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-beige-800 flex items-center pt-[10vh] flex-col gap-6">
      <div className="relative w-5/12 text-center flex-center flex-col">
        <div className="relative w-full z-80">
          <h2
            className="text-[3.5vw] leading-[4.2vw] mb-2 font-[700] text-dark-black z-50"
            ref={h2Ref}
          >
            {splitWordsToSpans(h2Text)}
          </h2>
          <p
            className="text-gray-500 font-[300] w-11/12 mx-auto leading-[120%] text-xs z-50"
            ref={pRef}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <span className="line-animate" style={{ display: "block" }}>
              {paraLines[0]}
            </span>
            <span className="line-animate font-[500]" style={{ display: "block" }}>
              {paraLines[1]}
            </span>
          </p>
        </div>
        <div className="w-[400px] absolute h-[300px] z-10 -top-20 opacity-50 gradient-4 border-black backdrop-blur-[120px]"></div>
      </div>
      <div className="w-1/2 relative flex flex-col gap-4 z-100">
        <div className="social-media flex-center gap-[10px]">
          {socialPlatforms.map((item) => (
            <div
              key={item.icon}
              className="flex-center py-[9px] px-4 border border-gray-400 gap-[10px] text-gray-500 rounded-4xl text-sm leading-[100%] font-[300]"
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={10}
                height={10}
                className="relative object-contain"
              />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
        <div className="relative flex-center gap-4">
          <div className="rounded-full py-[9px] text-xs leading-[100%] left-10  border uppercase font-medium min-w-[180px] cursor-pointer flex-center text-white bg-orange-500">
            Browse Creators
          </div>
          <div className="rounded-full py-[9px] text-xs leading-[100%] left-10 border-orange-500 border uppercase font-medium text-orange-500 min-w-[180px] cursor-pointer flex-center">
            SEE PRICING
          </div>
        </div>
      </div>
      <div className="w-[55%] relative h-[47vh] flex gap-7 -top-6 overflow-hidden">
        <div className="w-full absolute top-0 h-[18vh] gradient-6 z-60"></div>
        <div className="w-full absolute bottom-0 h-[18vh] gradient-7 z-60"></div>
        {/* Columns: Instagram, TikTok, X */}
        {renderColumn(0)}
        {renderColumn(1)}
        {renderColumn(2)}
      </div>
      <div className="flex-between w-full px-10 mx-auto absolute bottom-8 z-100">
        <div className="rounded-full px-8 py-[10px] text-xs leading-[100%] left-10 border-gray-500 border font-medium text-gray-500">
          FIND YOUR NEXT INFLUENCER
        </div>
        <div className="flex-center flex-col gap-1">
          <div className="w-[0.5px] h-[20px] relative bg-gray-500 line1"></div>
          <p className="text-xs text-center font-medium font-archivo leading-[100%] uppercase text text-gray-500">
            Scroll to explore
          </p>
          <div className="w-[0.5px] h-[5px] relative bg-gray-500 line2"></div>
        </div>
      </div>
    </div>
  );
}
