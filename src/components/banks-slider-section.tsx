/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { AnimatedSection } from "./animations";

const CBE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect width="400" height="200" fill="transparent"/><circle cx="100" cy="100" r="70" fill="%238a2be2"/><text x="100" y="115" font-family="Arial" font-size="40" font-weight="bold" fill="%23ffffff" text-anchor="middle">CBE</text><text x="190" y="110" font-family="Arial" font-size="30" font-weight="bold" fill="%23333333">Commercial Bank</text></svg>`;

const BOA_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect width="400" height="200" fill="transparent"/><circle cx="100" cy="100" r="70" fill="%23ffd700"/><text x="100" y="115" font-family="Arial" font-size="40" font-weight="bold" fill="%23000000" text-anchor="middle">BoA</text><text x="190" y="110" font-family="Arial" font-size="30" font-weight="bold" fill="%23333333">Bank of Abyssinia</text></svg>`;

const ABAY_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect width="400" height="200" fill="transparent"/><rect x="40" y="30" width="100" height="140" fill="%230B3D2E"/><text x="90" y="110" font-family="Arial" font-size="40" font-weight="bold" fill="%23ffffff" text-anchor="middle">AB</text><text x="160" y="110" font-family="Arial" font-size="30" font-weight="bold" fill="%23333333">Abay Bank</text></svg>`;

const BANKS = [
  {
    name: "Abay Bank",
    logoUrl: ABAY_SVG,
  },
  {
    name: "Bank of Abyssinia",
    logoUrl: BOA_SVG,
  },
  {
    name: "Commercial Bank of Ethiopia",
    logoUrl: CBE_SVG,
  },
];

export function BanksSliderSection() {
  const marqueeItems = [...BANKS, ...BANKS, ...BANKS];

  return (
    <section className="py-4 bg-white border-y border-gray-50 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mb-2">
        <AnimatedSection className="text-left">
          <h2 className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.1em]">
            Financial Partners
          </h2>
        </AnimatedSection>
      </div>
      
      <div className="relative w-full overflow-hidden bg-white py-2 flex items-center justify-start">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-marquee">
          {marqueeItems.map((bank, i) => (
            <div key={i} className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center w-24 md:w-32 h-12 md:h-16">
              <img 
                src={bank.logoUrl} 
                alt={bank.name} 
                title={bank.name}
                className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 hover:scale-105 cursor-pointer"
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
