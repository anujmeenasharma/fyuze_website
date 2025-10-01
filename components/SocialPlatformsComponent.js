import Image from "next/image";

export default function SocialPlatformsComponent() {
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
  return (
    <div className="relative w-full h-screen bg-beige-800 flex items-center pt-[10vh] flex-col gap-6">
      <div className="relative w-5/12 text-center flex-center flex-col">
        <div className="relative w-full z-80">
          <h2 className="text-[3.5vw] leading-[4.2vw] mb-2 font-[700] text-dark-black z-50">
            Supported Social Platforms
          </h2>
          <p className="text-gray-500 font-[300] w-11/12 mx-auto leading-[120%] text-xs z-50">
            Search millions of creators in seconds using AI-powered filters:
            <span className="font-[500]">
              audience authenticity, geo-verification, sentiment, engagement
              quality, niche fit, and more.
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
        
        {/* Column 1 - Instagram */}
        <div className="w-1/3 relative">
          <div className="animate-scroll-up-slow">
            <div className="w-full relative h-[280px] rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/1.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/ig-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
            <div className="w-full relative h-[280px] rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/img1.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/ig-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
            <div className="w-full relative h-[280px] rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/img2.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/ig-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
            <div className="w-full relative h-[280px] rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/img3.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/ig-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
            {/* Duplicate for seamless loop */}
            <div className="w-full relative h-[280px] rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/1.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/ig-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
            <div className="w-full relative h-[280px] rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/img1.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/ig-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
          </div>
        </div>
        
        {/* Column 2 - TikTok */}
        <div className="w-1/3 relative -top-4">
          <div className="animate-scroll-down-medium">
            <div className="w-full h-[270px] relative rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/2.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/tiktok-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
            <div className="w-full h-[260px] relative rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/img4.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/tiktok-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
            <div className="w-full h-[270px] relative rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/img5.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/tiktok-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
            <div className="w-full h-[260px] relative rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/img6.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/tiktok-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
            {/* Duplicate for seamless loop */}
            <div className="w-full h-[270px] relative rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/2.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/tiktok-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
            <div className="w-full h-[260px] relative rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/img4.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/tiktok-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
          </div>
        </div>
        
        {/* Column 3 - X (Twitter) */}
        <div className="w-1/3 relative top-2">
          <div className="animate-scroll-up-fast">
            <div className="w-full relative h-[280px] rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/3.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/x-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
            <div className="w-full relative h-[280px] rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/img7.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/x-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
            <div className="w-full relative h-[280px] rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/1.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/x-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
            <div className="w-full relative h-[280px] rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/2.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/x-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
            {/* Duplicate for seamless loop */}
            <div className="w-full relative h-[280px] rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/3.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/x-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
            <div className="w-full relative h-[280px] rounded-4xl overflow-hidden mb-7">
              <Image
                src="/assets/img7.png"
                alt="post"
                fill
                className="object-cover relative"
              />
              <Image
                src="/assets/x-white.svg"
                alt="post"
                width={32}
                height={32}
                className="object-contain absolute z-80 left-4 bottom-4"
              />
            </div>
          </div>
        </div>
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
