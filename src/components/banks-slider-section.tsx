"use client";
import React, { useState } from "react";
import { Landmark, Building2, Wallet } from "lucide-react";
import { AnimatedSection } from "./animations";

const BANKS = [
  {
    name: "Commercial Bank of Ethiopia",
    short: "CBE",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Commercial_Bank_of_Ethiopia_logo.png",
    color: "#4C148B",
    icon: Landmark
  },
  {
    name: "Bank of Abyssinia",
    short: "BOA",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Bank_of_Abyssinia_logo.svg/1200px-Bank_of_Abyssinia_logo.svg.png",
    color: "#F59E0B",
    icon: Wallet
  },
  {
    name: "Abay Bank",
    short: "Abay",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Abay_Bank_logo.png",
    color: "#0066CC",
    icon: Building2
  },
  {
    name: "Dashen Bank",
    short: "Dashen",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Dashen_Bank_logo.png",
    color: "#0B3D2E",
    icon: Landmark
  },
  {
    name: "Awash Bank",
    short: "Awash",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Awash_Bank_logo.png",
    color: "#0284C7",
    icon: Building2
  },
  {
    name: "Amhara Bank",
    short: "Amhara",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/03/Amhara_Bank_Logo.png",
    color: "#0B3D2E",
    icon: Wallet
  }
];

function BankLogo({ bank }: { bank: typeof BANKS[0] }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer h-20 w-48" title={bank.name}>
      {!imageError ? (
        <img 
          src={bank.logoUrl} 
          alt={bank.name} 
          className="max-h-16 max-w-full object-contain"
          onError={() => setImageError(true)}
        />
      ) : (
        <div 
          className="px-4 py-2 rounded-xl font-black text-xl md:text-2xl tracking-tighter flex items-center justify-center gap-2 w-full h-full border-2 bg-white"
          style={{ color: bank.color, borderColor: `${bank.color}30`, backgroundColor: `${bank.color}08` }}
        >
          <bank.icon className="w-6 h-6 md:w-8 md:h-8" />
          {bank.short}
        </div>
      )}
    </div>
  );
}

export function BanksSliderSection() {
  // Triple the array to ensure smooth infinite scroll
  const marqueeItems = [...BANKS, ...BANKS, ...BANKS];

  return (
    <section className="py-8 md:py-10 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-8">
        <AnimatedSection className="text-center">
          <h2 className="text-sm md:text-base font-bold text-gray-400 uppercase tracking-widest">
            Financial Institutions in Amhara Sayint
          </h2>
        </AnimatedSection>
      </div>
      
      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden bg-white py-2 flex items-center">
        {/* Gradient Fades for Smooth Edge */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-fit animate-marquee hover:[animation-play-state:paused]">
          {marqueeItems.map((bank, i) => (
            <BankLogo key={i} bank={bank} />
          ))}
        </div>
      </div>

      {/* Global Style for Marquee Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}} />
    </section>
  );
}

