"use client";
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeatureCards = () => {
  const cardRefs = useRef([]);

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
        ease: "power2.out",
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
      <div ref={addToRefs} className='relative group'>
        <div className='h-60 w-72 bg-[#FF6B3A] absolute -top-8 -left-8 blur-[7vw] z-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
        </div>
        <div className='h-64 w-96 rounded-4xl cards-gradient p-5 flex flex-col gap-8 relative z-10'>
          <div className='relative z-10'>
            <Image src="/sealCheck.svg" alt="feature-card-1" width={35} height={35} />
            <h1 className='text-white pt-6 text-3xl font-bold'>
              100M + Verified Creators
            </h1>
          </div>
          <p className='text-white text-sm relative z-10'>
            Ai-powered	discovery	systems	that	continuously	identify	new	creators.
          </p>
        </div>
      </div>
      <div ref={addToRefs} className='relative group'>
        <div className='h-80 w-96 bg-[#FF6B3A] absolute -top-8 -left-8 blur-[7vw] z-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
        </div>
        <div className='h-64 w-96 rounded-4xl cards-gradient p-5 flex flex-col gap-8 relative z-10'>
          <div className='relative z-10'>
            <Image src="/userFocus.svg" alt="feature-card-1" width={35} height={35} />
            <h1 className='text-white text-3xl font-bold pt-6'>
              30+	Metrics	for	Creator	Vetting
            </h1>
          </div>
          <p className='text-white text-sm relative z-10'>
            Ai-powered	subcategorization	for	hyper-specific	targeting.
          </p>
        </div>
      </div>
      <div ref={addToRefs} className='relative group'>
        <div className='h-80 w-96 bg-[#FF6B3A] absolute -top-8 -left-8 blur-[7vw] z-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
        </div>
        <div className='h-64 w-96 rounded-4xl cards-gradient p-5 flex flex-col gap-8 relative z-10'>
          <div className='relative z-10'>
            <Image src="/crossHair.svg" alt="feature-card-1" width={35} height={35} />
            <h1 className='text-white text-3xl font-bold pt-6 w-[80%]'>
              99% Match Accuracy
            </h1>
          </div>
          <p className='text-white text-sm relative z-10'>
            Ai-powered	creator	matching and	cutting-edge	fraud detection.
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeatureCards