"use client";
import Image from "next/image";
import SparkleSvg2 from "./SparkleSvg2";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitType from "split-type";
import GlassSurface from "./GlassSurface";

gsap.registerPlugin(ScrollTrigger);

export default function AboutComponent() {
  const aboutCont = useRef(null);
  const inputRef = useRef(null);
  const cursorRef = useRef(null);
  const step3Reached = useRef(false);
  const [restartSparkle, setRestartSparkle] = useState(false);
  const textMeasureRef = useRef(null);

  const scopeRef = useRef(null);

  const handlePlayAnimation = () => {
    setRestartSparkle(true);
    setTimeout(() => setRestartSparkle(false), 100);
  };

  const updateCursorPosition = (text) => {
    if (!textMeasureRef.current || !cursorRef.current || !inputRef.current) return;
    textMeasureRef.current.textContent = text;
    const textWidth = textMeasureRef.current.offsetWidth;
    gsap.set(cursorRef.current, {
      left: textWidth + 'px',
      willChange: "transform"
    });
  };

  useEffect(() => {
    if (!scopeRef.current) return;
    const ctx = gsap.context(() => {
      const handleMouseMove = (e) => {
        if (!aboutCont.current) return;
        const dims = aboutCont.current.getBoundingClientRect();
        const xNorm = gsap.utils.clamp(
          -1,
          1,
          ((e.clientX - dims.left) / dims.width) * 2 - 1
        );
        const yNorm = gsap.utils.clamp(
          -1,
          1,
          ((e.clientY - dims.top) / dims.height) * 2 - 1
        );

        const moveAmount = 40;
        const moveAmountY = 30;
        const imgConfigs = [
          { selector: ".img1", factor: 1.5 },
          { selector: ".img2", factor: 1 },
          { selector: ".img3", factor: 0.6 },
          { selector: ".img4", factor: 0.2 },
          { selector: ".img5", factor: -0.8 },
          { selector: ".img6", factor: -1.2, disableOnStep3: true },
          { selector: ".img7", factor: -1.7 },
          { selector: ".img8", factor: 0.5 },
        ];

        imgConfigs.forEach(({ selector, factor, disableOnStep3 }) => {
          if (disableOnStep3 && step3Reached.current) return;
          gsap.to(selector, {
            x: xNorm * moveAmount * factor,
            y: yNorm * moveAmountY * factor,
            duration: 2,
            ease: "power2.inOut",
            willChange: "transform",
          });
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!scopeRef.current) return;
    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutCont.current,
          start: "top top",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
          scrub: false,
        },
      });
      loadTl
        .from(
          [
            ".img1",
            ".img2",
            ".img3",
            ".img4",
            ".img5",
            ".img6",
            ".img7",
            ".img8",
          ],
          {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "opacity",
          },
          "q"
        )
        .from(
          ".img1",
          {
            left: "-15vw",
            top: "-5vh",
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "transform",
          },
          "q"
        )
        .from(
          ".img2",
          {
            left: "-5vw",
            bottom: "-5vh",
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "transform",
          },
          "q"
        )
        .from(
          ".img3",
          {
            bottom: "-50vh",
            left: "-10vw",
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "transform",
          },
          "q"
        )
        .from(
          ".img4",
          {
            right: "-5vw",
            bottom: "-5vh",
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "transform",
          },
          "q"
        )
        .from(
          ".img5",
          {
            right: "-10vw",
            bottom: "-10vh",
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "transform",
          },
          "q"
        )
        .from(
          ".img6",
          {
            right: "-10vw",
            top: "-5vh",
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "transform",
          },
          "q"
        )
        .from(
          ".img7",
          {
            right: "-20vw",
            top: "-10vh",
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "transform",
          },
          "q"
        )
        .from(
          ".img8",
          {
            left: "-5vw",
            top: "-2vh",
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "transform",
          },
          "q"
        )
        .fromTo(
          ".content-text",
          { opacity: 0, y: 80, willChange: "opacity, transform" },
          {
            opacity: 1,
            y: 0,
            stagger: 0.3,
            duration: 1,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "q"
        );
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!scopeRef.current) return;
    const ctx = gsap.context(() => {
      const text = "Travel influencers in Lebanon";

      const heading = new SplitType(aboutCont.current.querySelector("h3"), {
        types: "words",
      });
      const heading2 = new SplitType(aboutCont.current.querySelector("h4"), {
        types: "words",
      });
      gsap.set(heading.words, {
        opacity: 0,
        y: 30,
        willChange: "opacity, transform",
      });
      gsap.set("anim3-desc .desc", {
        opacity: 0,
        y: 40,
        willChange: "opacity, transform",
      });
      gsap.set(heading2.words, {
        opacity: 0,
        y: 10,
        willChange: "opacity, transform",
      });
      gsap.set(".anim4-desc .desc", {
        opacity: 0,
        y: 20,
        willChange: "opacity, transform",
      });
      gsap.set(".popup", {
        opacity: 0,
        y: 5,
        willChange: "opacity, transform",
      });
      gsap.set(".gradient", {
        opacity: 0,
        y: 30,
        willChange: "opacity, transform",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutCont.current,
          start: "top top",
          end: "+=800%",
          scrub: 2,
          pin: true,
          anticipatePin: 1,
          refreshPriority: -1,
          onUpdate: (self) => {
            if (cursorRef.current) {
              const progress = self.progress;
              const showCursor = progress > 0.1 && progress < 0.4;
              gsap.set(cursorRef.current, {
                display: showCursor ? 'block' : 'none',
                opacity: showCursor ? 1 : 0
              });
            }
          }
        },
      });

      const chars = { value: 0 };
      tl.to(
        chars,
        {
          value: text.length,
          duration: 1.2,
          delay: 0.8,
          ease: "none",
          onStart: () => {
            handlePlayAnimation();
          },
          onUpdate: () => {
            if (inputRef.current) {
              const currentText = text.slice(0, Math.floor(chars.value));
              inputRef.current.placeholder = currentText;
              updateCursorPosition(currentText);
            }
          },
          willChange: "opacity",
        },
        "step2"
      );

      tl.to(
        ".img1",
        {
          left: "-20vw",
          top: "-5vh",
          opacity: 1,
          delay: 1.5,
          duration: 1.8,
          ease: "power2.inOut",
          willChange: "opacity, transform",
        },
        "step3"
      )
        .to(
          ".img2",
          {
            left: "-5vw",
            bottom: "-5vh",
            opacity: 1,
            delay: 1.5,
            duration: 1.8,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step3"
        )
        .to(
          ".img3",
          {
            bottom: "-50vh",
            left: "-10vw",
            opacity: 1,
            delay: 1.5,
            duration: 1.8,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step3"
        )
        .to(
          ".img4",
          {
            right: "-8vw",
            bottom: "-15vh",
            opacity: 1,
            delay: 1.5,
            duration: 1.8,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step3"
        )
        .to(
          ".img5",
          {
            right: "-15vw",
            bottom: "-10vh",
            opacity: 1,
            delay: 1.5,
            duration: 1.8,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step3"
        )
        .to(
          ".img6",
          {
            x: () =>
              window.innerWidth / 2 -
              document.querySelector(".img6").getBoundingClientRect().left -
              document.querySelector(".img6").offsetWidth / 2,
            y: () =>
              window.innerHeight / 2 -
              document.querySelector(".img6").getBoundingClientRect().top -
              document.querySelector(".img6").offsetHeight / 2 +
              40,
            scale: 2.8,
            opacity: 1,
            delay: 1.5,
            duration: 2,
            ease: "power2.inOut",
            onStart: () => {
              step3Reached.current = true;
            },
            borderBottom: 1,
            borderBottomColor: "#ffffff",
            willChange: "opacity, transform",
          },
          "step3"
        )
        .to(
          ".img7",
          {
            right: "-20vw",
            top: "-15vh",
            opacity: 1,
            duration: 1.8,
            delay: 1.5,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step3"
        )
        .to(
          ".img8",
          {
            left: "-10vw",
            top: "-2vh",
            opacity: 1,
            delay: 1.5,
            duration: 1.8,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step3"
        )
        .to(
          ".content-text.heading",
          { y: -60, opacity: 0, delay: 1.5, duration: 1.2, ease: "power2.inOut", willChange: "opacity, transform" },
          "step3"
        )
        .to(
          ".content-text.para",
          { y: 60, opacity: 0, delay: 1.5, duration: 1.2, ease: "power2.inOut", willChange: "opacity, transform" },
          "step3"
        )
        .to(
          ".input-field",
          {
            scale: 1.2,
            x: () =>
              window.innerWidth / 2 -
              document.querySelector(".input-field").getBoundingClientRect()
                .left -
              document.querySelector(".input-field").offsetWidth / 2,
            y: () =>
              window.innerHeight / 4 -
              document.querySelector(".input-field").getBoundingClientRect().top -
              document.querySelector(".input-field").offsetHeight / 2,
            delay: 1.5,
            duration: 1.2,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step3"
        )
        .to(
          ".ig-name",
          {
            opacity: 1,
            delay: 1.5,
            duration: 1.2,
            ease: "power2.inOut",
            willChange: "opacity",
          },
          "step3"
        )
        .to(
          heading.words,
          {
            y: 0,
            opacity: 1,
            delay: 2.5,
            duration: 1.5,
            stagger: 0.15,
            ease: "power3.inOut",
            willChange: "opacity, transform",
          },
          "step3"
        )
        .to(
          ".glass",
          {
            opacity: 1,
            delay: 2,
            willChange: "opacity",
          },
          "step3"
        )
        .to(
          ".glass",
          {
            top: 140,
            delay: 2.3,
            duration: 2.8,
            ease: "power3.inOut",
            willChange: "transform",
          },
          "step3"
        )
        .to(
          ".popup",
          {
            y: 0,
            opacity: 1,
            delay: 2.5,
            duration: 1.5,
            stagger: 0.22,
            ease: "power3.inOut",
            willChange: "opacity, transform",
          },
          "step3"
        )
        .to(
          ".anim3-desc .desc",
          {
            y: 0,
            opacity: 1,
            delay: 2.5,
            duration: 1.5,
            stagger: 0.22,
            ease: "power3.inOut",
            willChange: "opacity, transform",
          },
          "step3"
        )
        .to(
          ".gradient",
          {
            opacity: 1,
            delay: 2,
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "opacity",
          },
          "step3"
        )
        .to(
          chars,
          {
            value: text.length,
            duration: 0,
            delay: 1.5,
            onUpdate: () => {
              if (inputRef.current) {
                inputRef.current.placeholder = text;
                updateCursorPosition(text);
              }
            },
            onComplete: () => {
              if (cursorRef.current) {
                gsap.set(cursorRef.current, { opacity: 0 });
              }
            },
            willChange: "opacity",
          },
          "step3"
        );

      tl.to(
        ".anim3-heading",
        {
          y: "-25vh",
          opacity: 0,
          filter: "blur(6px)",
          duration: 1,
          ease: "power2.inOut",
          willChange: "opacity, transform, filter",
        },
        "step4"
      )
        .to(
          ".anim3-desc",
          {
            y: "-50vh",
            filter: "blur(6px)",
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "opacity, transform, filter",
          },
          "step4"
        )
        .to(
          ".anim3-gradient",
          {
            y: "-5vh",
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step4"
        )
        .to(
          ".input-field",
          {
            filter: "blur(6px)",
            opacity: 0,
            duration: 0.7,
            ease: "power2.inOut",
            willChange: "opacity, filter",
          },
          "step4"
        )
        .to(
          [".popup.one", ".popup.two", ".popup.three"],
          {
            filter: "blur(6px)",
            opacity: 0,
            duration: 0.6,
            stagger: 0.18,
            ease: "power2.inOut",
            willChange: "opacity, filter",
          },
          "step4"
        )
        .to(
          ".popup.four",
          {
            y: "10vh",
            x: "-21.5vw",
            duration: 1.5,
            willChange: "transform",
          },
          "step4"
        )
        .to(
          ".img6",
          {
            x: () => gsap.getProperty(".img6", "x") - window.innerWidth * 0.1,
            y: () => gsap.getProperty(".img6", "y") - window.innerHeight * 0.05,
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "transform",
          },
          "step4"
        )
        .to(
          ".img6 .img-gradient",
          {
            scale: 1.8,
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "transform",
          },
          "step4"
        )
        .to(
          heading2.words,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.8,
            stagger: 0.15,
            ease: "power3.inOut",
            willChange: "opacity, transform",
          },
          "step4"
        )
        .to(
          ".anim4-desc .desc",
          {
            y: 0,
            opacity: 1,
            delay: 0.8,
            duration: 1.5,
            stagger: 0.22,
            ease: "power3.inOut",
            willChange: "opacity, transform",
          },
          "step4"
        )
        .to(
          ".img8",
          {
            left: "-2vw",
            top: "10vh",
            filter: "blur(4px)",
            opacity: 1,
            duration: 1.5,
            ease: "power3.inOut",
            willChange: "opacity, transform, filter",
          },
          "step4"
        )
        .to(
          ".img3",
          {
            left: "20vw",
            bottom: "-30vh",
            scale: 0.5,
            filter: "blur(4px)",
            opacity: 1,
            duration: 1.5,
            ease: "power3.inOut",
            willChange: "opacity, transform, filter",
          },
          "step4"
        )
        .to(
          ".img4",
          {
            right: "15vw",
            bottom: "-2vh",
            filter: "blur(4px)",
            opacity: 1,
            duration: 1.5,
            ease: "power3.inOut",
            willChange: "opacity, transform, filter",
          },
          "step4"
        )
        .to(
          ".img5",
          {
            right: "-3vw",
            top: "-2vh",
            filter: "blur(4px)",
            opacity: 1,
            duration: 1.5,
            ease: "power3.inOut",
            willChange: "opacity, transform, filter",
          },
          "step4"
        )
        .to(
          ".img7",
          {
            right: "-20vw",
            top: "-6vh",
            filter: "blur(4px)",
            opacity: 1,
            duration: 1.1,
            ease: "power3.inOut",
            willChange: "opacity, transform, filter",
          },
          "step4"
        )
        .from(
          ".chat-logo",
          {
            scale: 0,
            opacity: 0,
            duration: 1.1,
            ease: "back.out(1.7)",
            willChange: "opacity, transform",
          },
          "step4"
        )
        .from(
          ".chat-bubble",
          {
            x: -100,
            y: -20,
            scale: 0.2,
            opacity: 0,
            duration: 1.5,
            ease: "power3.inOut",
            willChange: "opacity, transform",
          },
          "step4+=0.3"
        );

      tl.to(
          ".img6",
          {
            y: "-70vh",
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step5"
        )
        .to(
          ".anim4-heading",
          {
            y: "-70vh",
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step5+=0.2"
        )
        .to(
          ".anim4-desc",
          {
            y: "-70vh",
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step5+=0.4"
        )
        .to(
          [".chat-logo", ".chat-bubble"],
          {
            y: "-70vh",
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step5+=0.6"
        )
        .to(
          ".popup.four",
          {
            y: "-70vh",
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step5+=0.8"
        )
        .to(
          ".img1",
          {
            left: "-25vw",
            top: "-15vh",
            opacity: 0,
            duration: 1.8,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step5"
        )
        .to(
          ".img2",
          {
            left: "-15vw",
            bottom: "-15vh",
            opacity: 0,
            duration: 1.8,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step5"
        )
        .to(
          ".img3",
          {
            bottom: "-60vh",
            left: "-20vw",
            opacity: 0,
            duration: 1.8,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step5"
        )
        .to(
          ".img4",
          {
            right: "-15vw",
            bottom: "-25vh",
            opacity: 0,
            duration: 1.8,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step5"
        )
        .to(
          ".img5",
          {
            right: "-20vw",
            bottom: "-20vh",
            opacity: 0,
            duration: 1.8,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step5"
        )
        .to(
          ".img7",
          {
            right: "-30vw",
            top: "-20vh",
            opacity: 0,
            duration: 1.8,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step5"
        )
        .to(
          ".img8",
          {
            left: "-15vw",
            top: "-12vh",
            opacity: 0,
            duration: 1.8,
            ease: "power2.inOut",
            willChange: "opacity, transform",
          },
          "step5"
        );
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!scopeRef.current) return;
    const ctx = gsap.context(() => {
      if (!cursorRef.current) return;
      const cursorTl = gsap.timeline({ repeat: -1 });
      cursorTl.to(cursorRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power1.inOut",
        willChange: "opacity",
      })
      .to(cursorRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power1.inOut",
        willChange: "opacity",
      });

      return () => {
        cursorTl.kill();
      };
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-[400vh] bg-transparent" ref={scopeRef}>
      <div
        className="bg-beige-800 w-full h-screen sticky top-0 overflow-hidden flex-center text-dark-black"
        ref={aboutCont}
      >
        <div className="relative w-[40%] flex flex-col gap-14 -top-14">
          <div className="text-[2.5vw] leading-[3vw] font-archivo font-[100] content-text heading z-10">
            <div className="w-[5.8vw] h-[2.8vw] relative inline-block">
              <Image
                src="/assets/logo2.svg"
                alt="fyuze"
                fill
                className="object-contain mt-3"
              />
            </div>
            <span className="ml-2">
              Helps from discovery to ROI fully automated, fully optimized.
            </span>
          </div>
          <div className="relative w-7/12 ml-auto bg-white border border-gray-600 rounded-full flex-center p-3 font-[300] text-sm content-text input-field z-50">
            <SparkleSvg2 restart={restartSparkle} />
            <div className="relative w-full ml-3">
              <input
                ref={inputRef}
                type="text"
                placeholder=""
                className="w-full relative bg-transparent border-none outline-none"
              />
              <span
                ref={textMeasureRef}
                className="absolute top-0 left-0 opacity-0 pointer-events-none whitespace-nowrap"
                style={{ fontSize: 'inherit', fontFamily: 'inherit', fontWeight: 'inherit' }}
              ></span>
              <span
                ref={cursorRef}
                className="absolute top-0 left-0 w-[1px] h-full bg-black"
              ></span>
            </div>
          </div>
          <p className="text-sm font-[300] text-gray-500 leading-[100%] content-text para z-10">
            Ask FYUZE AI to fetch a real-time, curated list of influencers based
            on your niche, audience, and campaign goals so you save time, money,
            and effort.
          </p>
        </div>
        <div className="w-full h-full absolute z-20 top-0 left-0">
          <div className="w-[12vw] h-[18vw] absolute top-[11vh] left-[-6vw] rounded-[56px] overflow-hidden img1">
            <Image
              src="/assets/img5.png"
              fill
              alt="img1"
              className="object-cover object-left-top"
            />
          </div>
          <div className="w-[4.2vw] h-[6.2vw] z-10 absolute bottom-[20vh] left-[8vw] rounded-2xl overflow-hidden img2">
            <Image
              src="/assets/img6.png"
              fill
              alt="img2"
              className="object-cover object-center scale-[1.15]"
            />
          </div>
          <div className="w-[21vw] h-[26vw] absolute -bottom-[19vh] left-[35.5vw] rounded-[32px] overflow-hidden img3">
            <Image
              src="/assets/img7.png"
              fill
              alt="img3"
              className="object-cover object-center scale-[1.15]"
            />
          </div>
          <div className="w-[6.3vw] h-[10vw] absolute bottom-[1.5vh] right-[20vw] rounded-[28px] overflow-hidden img4">
            <Image
              src="/assets/img1.png"
              fill
              alt="img4"
              className="object-cover object-left scale-[1.15]"
            />
          </div>
          <div className="w-[10vw] h-[14vw] absolute bottom-[24vh] -right-[6vw] rounded-[32px] overflow-hidden img5">
            <Image
              src="/assets/img2.png"
              fill
              alt="img5"
              className="object-cover object-center"
            />
          </div>
          <div className="w-[7.2vw] h-[11.5vw] absolute top-[14vh] right-[11vw] rounded-[20px] img6">
            <div className="w-full h-full relative overflow-hidden rounded-[20px]">
              <Image
                src="/assets/img3.png"
                fill
                alt="img6"
                className="object-cover object-center rounded-[20px] overflow-hidden z-40"
              />
              <div className="w-full h-full relative border border-blue-800 ">
                <GlassSurface
                  borderRadius={20}
                  className="absolute top-0 left-0 w-full h-[30px] z-50 glass scale-[1.1] opacity-0"
                ></GlassSurface>
              </div>
            </div>
            <Image
              src="/assets/gradient-3.svg"
              fill
              alt="img6"
              className="object-contain img-gradient object-center absolute top-0 left-0 scale-[1.2] z-10"
            />
            <p className="text-[5px] opacity-0 font-medium absolute bottom-[10px] left-[10px] text-white z-100 ig-name">
              @Nick travels
            </p>
          </div>
          <div className="w-[4.2vw] h-[6.2vw] absolute -top-[2.8vh] left-[60vw] rounded-2xl overflow-hidden img7">
            <Image
              src="/assets/img4.png"
              fill
              alt="img7"
              className="object-cover object-center scale-[1.15]"
            />
          </div>
          <div className="w-[9.5vw] h-[16vw] absolute top-[19vh] left-[14vw] rounded-2xl overflow-hidden bg-[#d9d9d9] img8">
            <Image
              src="/assets/quote.svg"
              fill
              alt="img8"
              className="object-contain object-center"
            />
          </div>
        </div>
        <div className="w-[88%] absolute flex-center h-[40vh]">
          <div className="h-full relative w-3/12 anim3-heading">
            <h3
              className="text-[2.6vw] leading-[3vw] font-bold font-archivo w-10/12"
              style={{ willChange: "opacity, transform, filter" }}
            >
              Discover the Right Voices
            </h3>
          </div>
          <div className="w-6/12 relative h-[40vh] z-100 flex-center flex-col">
            <div className="absolute popup one right-[5vw] top-1/8 flex-center gap-2 bg-white/20 backdrop-blur-2xl p-[10px] w-[14vw] rounded-2xl overflow-hidden ">
              <Image
                src="/assets/grow.svg"
                alt="trendup"
                width={21}
                height={21}
                className="object-contain relative"
              />
              <span className="font-medium text-[0.9vw] text-dark-black">
                Reach : 2 Million
              </span>
            </div>
            <div className="absolute popup two left-[4vw] top-3/8 flex-center gap-2 bg-white/20 backdrop-blur-2xl p-[10px] w-[11vw] rounded-2xl overflow-hidden ">
              <Image
                src="/assets/ig.svg"
                alt="ig"
                width={21}
                height={21}
                className="object-contain relative"
              />
              <span className="font-medium text-[0.9vw] text-dark-black">
                140k Followers
              </span>
            </div>
            <div className="absolute popup four right-[4vw] top-[55%] flex-center gap-2  p-[10px] min-w-[14vw] rounded-[20px] overflow-hidden popup-gradient">
              <Image
                src="/assets/icon.svg"
                alt="ig"
                width={21}
                height={21}
                className="object-contain relative mb-1"
              />
              <span className="font-[500] text-[0.9vw] leading-[2vw] text-white">
                FYUZE Score :
                <span className="text-[1.3vw] leading-[1.3vw]">90</span>/100
              </span>
            </div>
            <div className="absolute popup three left-[6vw] top-[85%] flex justify-center items-start gap-2  p-[10px] pl-[17px] w-[15.5vw] rounded-[20px] overflow-hidden bg-white/20 backdrop-blur-2xl">
              <Image
                src="/assets/info.svg"
                alt="ig"
                width={21}
                height={21}
                className="object-contain relative mb-1"
              />
              <span className="font-[500] text-[0.9vw] leading-[1.2vw] text-dark-black">
                Worked with more that 50 brands, with 75% ROI.
              </span>
            </div>
          </div>
          <div className="absolute top-0 w-11/12 mx-auto h-screen border-black gradient anim3-gradient">
            <div className="w-full h-full bottom-[10vh] absolute">
              <Image
                src="/assets/gradient-2.svg"
                alt="gradient-1"
                fill
                className="relative object-contain"
              />
            </div>
          </div>
          <div className="top-[9vh] text-[0.85vw] left-[2vw] w-3/12 leading-[120%] text-gray-500 anim3-desc font-[300] relative ">
            <p className="opacity-0 desc">
              Search millions of creators in seconds using
            </p>
            <p className="opacity-0 desc">
              AI-powered filters:
              <span className="font-medium">audience authenticity,</span>
            </p>
            <p className="font-medium  desc opacity-0">
              geo-verification, sentiment, engagement
            </p>
            <p className="font-medium desc opacity-0">
              quality, niche fit, and more.
            </p>
          </div>
        </div>
        <div className="absolute w-8/12 h-[60vh] flex  top-1/2 -translate-y-1/2">
          <div className="relative left-0 top-0 w-1/2 h-full"></div>
          <div className="relative w-1/2  h-full flex-center ">
            <div className="flex-center flex-col gap-5 w-[55%] relative">
              <div className="relative anim4-heading w-full">
                <h4
                  className="text-[2.6vw] leading-[3.2vw] font-bold font-archivo"
                  style={{ willChange: "opacity, transform, filter" }}
                >
                  Match with Precision
                </h4>
              </div>
              <div className="text-[0.85vw] leading-[120%] w-full text-gray-500 anim4-desc font-[300]">
                <p className="opacity-0 desc">
                  Our proprietary FYUZE Score™ ranks
                </p>
                <p className="opacity-0 desc">
                  influencers by projected ROI, audience trust,
                </p>
                <p className="desc opacity-0">
                  and contextual brand alignment —
                  <span className="font-medium">so you</span>
                </p>
                <p className="font-medium desc opacity-0">
                  know who&apos;s truly worth it.
                </p>
              </div>
              <div className="chat-popup flex justify-center w-full relative mt-2">
                <div className="w-2/12 chat-logo relative">
                  <div className="w-10 h-10 rounded-full bg-white relative flex-center">
                    <Image
                      src="/assets/orange-logo.svg"
                      width={15}
                      height={21}
                      alt="gradient-logo"
                    />
                  </div>
                </div>
                <div className="chat-bubble bg-white/40 backdrop-blur-3xl relative flex-center py-3 px-3 rounded-tl-sm rounded-xl w-[80%]">
                  <p className="text-sm text-[#383838] w-10/12 leading-[120%]">
                    I&apos;ve found the right influencer for you. Ready to launch?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
