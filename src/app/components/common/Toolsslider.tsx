"use client"

import Image, { StaticImageData } from "next/image"; // 1. Import StaticImageData type
import Figma from "../../../../public/Tools/figma.png";
import Meta from "../../../../public/Tools/facebook-meta.png";
import Framer from "../../../../public/Tools/framer.png";
import Googleads from "../../../../public/Tools/google-ads.png";
import Gsap from "../../../../public/Tools/gsap.png";
import Shopify from "../../../../public/Tools/shopify.png";
import ReactJs from "../../../../public/Tools/react-js.png";
import Webflow from "../../../../public/Tools/webflow.png";
import Laravel from "../../../../public/Tools/laravel.png";
import NextJs from "../../../../public/Tools/next-js.png";
import Wix from "../../../../public/Tools/wix.png";
import Wordpress from "../../../../public/Tools/wordpress.png";
import Adobe from "../../../../public/Tools/adobe.png";

// 2. Define the shape of a single tool item
interface ToolItem {
  name: string;
  src: StaticImageData;
}

const Toolsslider = () => {

  const allTools: ToolItem[] = [ // Optional: Explicitly type this array for safety
    { name: "Figma", src: Figma },
    { name: "Meta", src: Meta },
    { name: "Framer", src: Framer },
    { name: "Google Ads", src: Googleads },
    { name: "GSAP", src: Gsap },
    { name: "Shopify", src: Shopify },
    { name: "React JS", src: ReactJs },
    { name: "Webflow", src: Webflow },
    { name: "Laravel", src: Laravel },
    { name: "Next JS", src: NextJs },
    { name: "Wix", src: Wix },
    { name: "Wordpress", src: Wordpress },
    { name: "Adobe", src: Adobe },
  ];

  const halfLength = Math.ceil(allTools.length / 2);
  const row1 = allTools.slice(0, halfLength);
  const row2 = allTools.slice(halfLength);

  return (
    <section className="w-full py-12 bg-white flex flex-col gap-2 overflow-hidden">
      <style jsx>{`
        /* We have 4 sets of logos. 
           We want to scroll exactly 1 set's worth of width (25% of total width) 
           to create the seamless loop illusion.
        */
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
        
        .group:hover .animate-scroll-left,
        .group:hover .animate-scroll-right {
          animation-play-state: paused;
        }
      `}</style>

      {/* Row 1: Sliding Left */}
      <div className="group flex w-full overflow-hidden">
        {/* Added w-max to prevent blank gaps if screen is wide */}
        <div className="flex w-max animate-scroll-left group-hover:cursor-pointer">
          {/* Render 4 sets to ensure coverage on large screens */}
          <LogoSet items={row1} />
          <LogoSet items={row1} />
          <LogoSet items={row1} />
          <LogoSet items={row1} />
        </div>
      </div>

      {/* Row 2: Sliding Right */}
      <div className="group flex w-full overflow-hidden">
        <div className="flex w-max animate-scroll-right group-hover:cursor-pointer">
          <LogoSet items={row2} />
          <LogoSet items={row2} />
          <LogoSet items={row2} />
          <LogoSet items={row2} />
        </div>
      </div>
    </section>
  );
};

// 3. Apply the type to the props here
const LogoSet = ({ items }: { items: ToolItem[] }) => {
  return (
    // UPDATED: gap-[50px] and pr-[50px]
    // REMOVED: min-w-full (This was causing the large blank gap)
    <div className="flex shrink-0 items-center gap-[50px] pr-[50px]">
      {items.map((tool, index) => (
        <div 
          key={index} 
          className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-transform hover:scale-110"
        >
          <Image
            src={tool.src}
            alt={tool.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 64px, 80px"
          />
        </div>
      ))}
    </div>
  );
};

export default Toolsslider;