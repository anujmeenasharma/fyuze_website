"use client";
import { faqContent } from "@/lib/content";
import { useState, useRef, useEffect } from "react";

export default function FAQsection() {
  const [activeTab, setActiveTab] = useState("");
  const contentRef = useRef(null);

  const handleToggle = (id) => {
    setActiveTab((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="relative w-full gradient-1 h-screen pt-[20vh]">
      <div className="relative text-center flex-center flex-col gap-3 lg:gap-5">
        <h2 className="text-[3.5vw] leading-[3vw] lg:text-[1.8vw] lg:leading-[1.8vw] font-[600] font-archivo">
          Frequently asked questions
        </h2>
        <p className="font-inter text-[2.1vw] leading-[2vw] lg:text-[1.1vw] lg:leading-[1.1vw]">
          Everything you need to know about our creator database
        </p>
      </div>
      <div className="w-9/12 lg:w-[42%] mx-auto relative mt-4 lg:mt-10 flex flex-col gap-6">
        {faqContent.map((item) => {
          return (
            <div
              key={item.id}
              className={`cursor-pointer border-white ${
                item.id == 1 ? "border-t-0" : "border-t-[0.5px]"
              }`}
            >
              <div
                className="flex-between w-full relative rounded-t-md pt-4"
                onClick={() => handleToggle(item.id)}
              >
                <h5 className="text-[1.1vw] leading-[1.3vw] font-medium font-archivo">
                  {item.title}
                </h5>
                <div className="w-8 h-8 relative flex-center">
                  {/* Horizontal line */}
                  <div className="w-[18px] h-[1.5px] bg-white rounded-full absolute"></div>
                  {/* Vertical line */}
                  <div
                    className={`w-[18px] h-[1.5px] bg-white rounded-full absolute transition-all duration-300 ${
                      activeTab === item.id
                        ? "rotate-0 opacity-0"
                        : "rotate-90 opacity-100"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Animated height with scrollHeight */}
              <div
                ref={contentRef}
                style={{
                  maxHeight:
                    activeTab === item.id
                      ? `${contentRef.current?.scrollHeight}px`
                      : "0px",
                }}
                className="overflow-hidden transition-[max-height] duration-500 ease-in-out rounded-b-md w-2/3 "
              >
                <p className="text-sm font-[300] mb-1">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
