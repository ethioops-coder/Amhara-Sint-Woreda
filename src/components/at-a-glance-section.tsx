import React from "react";
import { Users, Map, MapPin, Building, HeartPulse, Stethoscope, School, GraduationCap, Banknote } from "lucide-react";
import { AnimatedSection, AnimatedCounter } from "./animations";

const KEY_STATS = [
  { label: "Population", value: 214056, suffix: "+", icon: Users },
  { label: "Area", value: 1437, suffix: " km²", icon: Map },
  { label: "Kebeles", value: 37, suffix: "", icon: MapPin },
  { label: "Hospitals", value: 1, suffix: "", icon: HeartPulse },
  { label: "Health Centers", value: 8, suffix: "", icon: Stethoscope },
  { label: "Schools", value: 106, suffix: "+", icon: School },
  { label: "Universities/TVET", value: 1, suffix: "", icon: GraduationCap },
  { label: "Annual Budget", value: 200, suffix: "M ETB", icon: Banknote },
];

export function AtAGlanceSection() {
  return (
    <section className="bg-[#0c402b] py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Side-by-Side Information */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text Side */}
            <div className="space-y-6 text-white/90">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">About Amhara Sayint Woreda</h3>
              <p className="text-sm md:text-base leading-relaxed text-white/80">
                Amhara Sayint is a major administrative district in the Amhara Region of Ethiopia, located in the scenic South Wollo Zone. As a rapidly growing urban and rural center, Amhara Sayint serves as a vital hub for commerce, education, and administration in the northeastern part of the country.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-white/80">
                With a population exceeding 214,000, the woreda is committed to delivering modern municipal services, fostering economic development, and improving the quality of life for all its residents through transparent governance and smart development initiatives.
              </p>
            </div>

            {/* Image Side */}
            <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Ajibar.jpg/800px-Ajibar.jpg" 
                alt="Amhara Sayint Administration" 
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513622470522-26c308a201f8?q=80&w=1000&auto=format&fit=crop";
                }}
              />
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
