/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { AnimatedSection } from "./animations";

const BANKS = [
  {
    name: "Abay Bank",
    logoUrl: "/banks/abay.png",
  },
  {
    name: "Bank of Abyssinia",
    logoUrl: "/banks/boa.png",
  },
  {
    name: "Commercial Bank of Ethiopia",
    logoUrl: "/banks/cbe.png",
  },
];

export function BanksSliderSection() {
  const marqueeItems = [...BANKS, ...BANKS, ...BANKS];

  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <AnimatedSection className="text-left">
          <h2 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">
            Financial Institutions in Amhara Sayint
          </h2>
        </AnimatedSection>
      </div>
      
      <div className="relative w-full overflow-hidden bg-white py-4 flex items-center justify-start">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-fit animate-marquee">
          {marqueeItems.map((bank, i) => (
            <div key={i} className="flex-shrink-0 mx-10 md:mx-16 flex items-center justify-center w-32 md:w-40 h-16 md:h-20">
              <img 
                src={bank.logoUrl} 
                alt={bank.name} 
                title={bank.name}
                className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500 hover:scale-105 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
