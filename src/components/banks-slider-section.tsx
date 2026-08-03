"use client";
import React, { useEffect, useState } from "react";
import { Landmark, Building2, Wallet, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedSection } from "./animations";

const BANKS = [
  {
    name: "Commercial Bank of Ethiopia",
    short: "CBE",
    desc: "The leading commercial bank providing comprehensive financial services in Amhara Sayint.",
    color: "#4C148B", // Purple
    icon: Landmark
  },
  {
    name: "Abay Bank",
    short: "Abay",
    desc: "A trusted private bank offering modern banking solutions to the local community.",
    color: "#0066CC", // Blue
    icon: Building2
  },
  {
    name: "Bank of Abyssinia",
    short: "BOA",
    desc: "Delivering innovative and accessible banking services for businesses and individuals.",
    color: "#F59E0B", // Yellow/Gold
    icon: Wallet
  },
  // Add a duplicate set for continuous scrolling if we want, or just leave as is.
];

export function BanksSliderSection() {
  return (
    <section className="py-8 bg-gray-50 border-t border-b border-gray-100 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B3D2E]">
              Financial <span className="text-[#EAB308]">Institutions</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">Banks serving the Amhara Sayint Woreda community</p>
          </div>
        </AnimatedSection>
        
        {/* Smaller Slider */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 pt-2 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {BANKS.map((bank, i) => (
            <AnimatedSection key={i} delay={i * 100} className="min-w-[280px] md:min-w-[350px] flex-shrink-0 snap-center">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-md flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Simulated Logo */}
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2"
                  style={{ borderColor: `${bank.color}30`, backgroundColor: `${bank.color}08`, color: bank.color }}
                >
                  <bank.icon className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">{bank.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{bank.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        {/* CSS for hide-scrollbar */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
      </div>
    </section>
  );
}
