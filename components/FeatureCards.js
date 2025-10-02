"use client";
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    icon: "/sealCheck.svg",
    iconHover: "/sealHover.svg",
    title: "100M + Verified Creators",
    desc: "Ai-powered	discovery	systems	that	continuously	identify	new	creators."
  },
  {
    icon: "/userFocus.svg",
    iconHover: "/UserFocusHover.svg",
    title: "30+	Metrics	for	Creator	Vetting",
    desc: "Ai-powered	subcategorization	for	hyper-specific	targeting."
  },
  {
    icon: "/crossHair.svg",
    iconHover: "/crossHairHover.svg",
    title: "99% Match Accuracy",
    desc: "Ai-powered	creator	matching and	cutting-edge	fraud detection."
  }
];

const FeatureCards = () => {
  const cardRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const cardElements = cardRefs.current;

    // Set initial states for fade-up animation
    gsap.set(cardElements, { y: 50, opacity: 0 });

    // Fade-up animations for cards
    cardElements.forEach((card, index) => {
      gsap.to(card, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <div className='h-[44vh] w-[80%] mx-auto flex justify-between'>
      {cardData.map((card, idx) => (
        <div
          key={card.title}
          ref={addToRefs}
          className='relative group'
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className='h-80 w-96 bg-[#FF6B3A] absolute -top-8 -left-8 blur-[7vw] z-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
          </div>
          <div className='h-[20vw] w-[25vw] rounded-4xl cards-gradient p-5 flex flex-col gap-8 relative z-10'>
            <div className='relative z-10'>
              <Image
                src={hoveredIndex === idx ? card.iconHover : card.icon}
                alt={`feature-card-${idx + 1}`}
                width={35}
                height={35}
                priority
              />
              <h1 className={`text-white text-3xl font-bold pt-6${idx === 2 ? " w-[80%]" : ""}`}>
                {card.title}
              </h1>
            </div>
            <p className='text-white text-sm relative z-10'>
              {card.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FeatureCards