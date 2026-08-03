import React, { useState } from "react";
import { ArrowLeft, Compass, MapPin, Landmark } from "lucide-react";
import type { PageId } from "@/lib/types";
import { CULTURAL_PLACES } from "@/app/page";

export function TourismPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Hero Banner */}
      <div className="relative w-full h-[60vh] min-h-[400px]">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6d/TedbabeMariyam_Church.jpg" 
          alt="Amhara Sayint Tourism" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E] via-[#0B3D2E]/60 to-transparent" />
        
        {/* Back Button */}
        <button 
          onClick={() => onNavigate("home")}
          className="absolute top-8 left-4 md:left-12 flex items-center gap-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold text-sm tracking-widest uppercase">Back to Home</span>
        </button>

        <div className="absolute bottom-12 left-4 md:left-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-amber-500/90 backdrop-blur text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            <Landmark className="w-4 h-4" /> Tourism & Heritage
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow-xl">
            Discover the Heart <br className="hidden md:block"/> of South Wollo
          </h1>
          <p className="text-lg text-white/90 max-w-2xl font-medium drop-shadow-md">
            Ancient monasteries dating to King Solomon's era, dramatic canyons, and towering Afro-alpine peaks.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {CULTURAL_PLACES.map((place, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col group">
              {/* Image Header */}
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={place.img} 
                  alt={place.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider text-white bg-gradient-to-r ${place.tagGradient}`}>
                    {place.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full">
                  <Compass className="w-3 h-3 text-amber-400" />{place.coordinates}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-2xl font-black text-[#0B3D2E] mb-1 group-hover:text-amber-600 transition-colors">
                      {place.title}
                    </h3>
                    <p className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-4">
                      {place.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6 pb-6 border-b border-gray-100">
                  <MapPin className="w-4 h-4 text-gray-400" /> {place.location}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-1">
                  {place.description}
                </p>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-auto">
                  {place.stats.map((s: any, i: number) => (
                    <div key={i} className="text-center p-3 rounded-2xl bg-gray-50 border border-gray-100 group-hover:bg-amber-50 transition-colors">
                      <s.icon className="w-5 h-5 mx-auto mb-2 text-[#0B3D2E] group-hover:text-amber-600" />
                      <div className="text-sm font-black text-[#0B3D2E]">{s.value}</div>
                      <div className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
