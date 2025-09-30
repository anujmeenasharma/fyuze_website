"use client";
import { ThemeContext } from "@/lib/hooks/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function Navbar() {
  const { darkText } = useContext(ThemeContext);
  return (
    <nav
      className={`w-full fixed p-9 flex-between z-100  ${
        darkText ? "text-gray-500" : "text-white"
      }`}
    >
      <div className="relative flex-center gap-12">
        <div className="relative w-24 h-[30px]">
          <Image
             src={darkText ? "/assets/fyuze-dark.svg" : "/assets/fyuze-logo.svg"}
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
        <div className={`w-[1px] h-[26px] relative ${darkText ? "bg-gray-500" : "bg-white"}`}></div>
        <div className="flex-between gap-10 relativ">
          <Link
            href="/"
            className="group relative inline-block text-xs font-[300] leading-[100%] uppercase"
          >
            How it works
            <span
              className={`absolute left-0 -bottom-2 h-[0.5px] w-0 ${
                darkText ? "bg-gray-500" : "bg-white"
              } transition-all duration-300 group-hover:w-full`}
            ></span>
          </Link>

          <div
            className={`relative w-[2px] h-[2px] rounded-full ${
              darkText ? "bg-gray-500" : "bg-white"
            }`}
          ></div>
          <Link
            href="/"
            className="group relative inline-block text-xs font-[300] leading-[100%] uppercase"
          >
            Features
            <span
              className={`absolute left-0 -bottom-2 h-[0.5px] w-0 ${
                darkText ? "bg-gray-500" : "bg-white"
              } transition-all duration-300 group-hover:w-full`}
            ></span>
          </Link>
          <div
            className={`relative w-[2px] h-[2px] rounded-full ${
              darkText ? "bg-gray-500" : "bg-white"
            }`}
          ></div>
          <Link
            href="/"
            className="group relative inline-block text-xs font-[300] leading-[100%] uppercase"
          >
            pricing
            <span
              className={`absolute left-0 -bottom-2 h-[0.5px] w-0 ${
                darkText ? "bg-gray-500" : "bg-white"
              } transition-all duration-300 group-hover:w-full`}
            ></span>
          </Link>
          <div
            className={`relative w-[2px] h-[2px] rounded-full ${
              darkText ? "bg-gray-500" : "bg-white"
            }`}
          ></div>
          <Link
            href="/"
            className="group relative inline-block text-xs font-[300] leading-[100%] uppercase"
          >
            about
            <span
              className={`absolute left-0 -bottom-2 h-[0.5px] w-0 ${
                darkText ? "bg-gray-500" : "bg-white"
              } transition-all duration-300 group-hover:w-full`}
            ></span>
          </Link>
        </div>
      </div>
      <div className="relative flex-center gap-3 ">
        <div className="w-[30px] h-[30px] relative overflow-hidden rounded-full">
          <Image
            src="/assets/profile.png"
            alt="logo"
            fill
            className="object-cover"
          />
        </div>
        <p className="font-[500] text-base leading-[100%]">Jenny Wilson</p>
      </div>
    </nav>
  );
}
