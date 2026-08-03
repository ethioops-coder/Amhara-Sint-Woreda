"use client";
import React, { useState } from "react";
import { ArrowRight, Calendar, User, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import type { PageId } from "@/lib/types";
import { AnimatedSection } from "./animations";

const mockNews = [
  {
    id: "1",
    category: "BREAKING NEWS",
    date: "Jul 17, 2026",
    author: "Admin",
    title: "Ethiopia is Beginning to Negotiate: The Historic National Consultation...",
    summary: "Ethiopia has officially begun its historic national consultation, marking a new chapter of unity, peace, and understanding.",
    image: "https://sfile.chatglm.cn/images-ppt/35f5cc0fa1a7.jpg"
  },
  {
    id: "2",
    category: "INFRASTRUCTURE",
    date: "Jul 17, 2026",
    author: "Admin",
    title: "Water Treatment Plant Begins Full Operations",
    summary: "The new facility provides clean drinking water to an additional 100,000 residents.",
    image: "https://sfile.chatglm.cn/images-ppt/4f86eab1aa4a.jpg"
  },
  {
    id: "3",
    category: "CULTURE",
    date: "Jul 17, 2026",
    author: "Admin",
    title: "Annual Dessie Cultural Festival Dates Announced",
    summary: "The week-long festival showcases traditional music, dance, crafts, and Amhara cuisine.",
    image: "https://sfile.chatglm.cn/images-ppt/b60b21cb0921.jpg"
  },
  {
    id: "4",
    category: "EDUCATION",
    date: "Jul 15, 2026",
    author: "Admin",
    title: "New Primary School Inaugurated in Kebele 05",
    summary: "The woreda administration inaugurated a fully equipped primary school serving 400 students with modern classrooms.",
    image: "https://sfile.chatglm.cn/images-ppt/a842501dc00b.jpg"
  },
  {
    id: "5",
    category: "AGRICULTURE",
    date: "Jul 10, 2026",
    author: "Admin",
    title: "Annual Agricultural Exhibition a Great Success",
    summary: "Over 2,000 farmers participated in this year's exhibition showcasing modern farming techniques and improved seed varieties.",
    image: "https://sfile.chatglm.cn/images-ppt/b37b6e89b27a.jpg"
  },
  {
    id: "6",
    category: "HEALTH",
    date: "Jul 05, 2026",
    author: "Admin",
    title: "Health Campaign Reaches 10,000 Residents",
    summary: "A week-long health awareness campaign reached residents with free screenings for diabetes, hypertension, and eye diseases.",
    image: "https://sfile.chatglm.cn/images-ppt/40afb43a5118.jpg"
  },
];

export function PaginatedNewsSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  const totalPages = Math.ceil(mockNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleNews = mockNews.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full">
        {/* Header Section */}
        <AnimatedSection className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#DC2626] rounded-md p-1">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-[#DC2626] text-xs font-bold uppercase tracking-wider">
                Latest Updates
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight relative pb-3">
              LATEST NEWS
              <span className="absolute bottom-0 left-0 w-24 h-1.5 bg-[#DC2626]"></span>
            </h2>
          </div>
          
          <button 
            onClick={() => onNavigate("news-news")} 
            className="flex items-center gap-2 text-[#DC2626] font-bold text-sm uppercase tracking-wide border border-[#DC2626]/20 px-6 py-3 rounded-full hover:bg-[#DC2626] hover:text-white transition-colors"
          >
            View All News <ArrowRight className="w-4 h-4" />
          </button>
        </AnimatedSection>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {visibleNews.map((item, i) => (
            <AnimatedSection key={item.id} delay={i * 100}>
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col group cursor-pointer" onClick={() => onNavigate("news-news")}>
                
                {/* Image & Badge */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4 bg-[#DC2626] text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-4">
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <Calendar className="w-3.5 h-3.5 text-[#DC2626]" /> {item.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <User className="w-3.5 h-3.5 text-[#DC2626]" /> {item.author}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-extrabold text-gray-900 mb-3 leading-snug group-hover:text-[#DC2626] transition-colors line-clamp-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mt-auto">
                    {item.summary}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <button 
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-3 rounded-full border transition-all flex items-center justify-center ${currentPage === 1 ? 'border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:border-[#DC2626] hover:text-[#DC2626] bg-white'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all ${currentPage === idx + 1 ? 'bg-[#DC2626] text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-3 rounded-full border transition-all flex items-center justify-center ${currentPage === totalPages ? 'border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:border-[#DC2626] hover:text-[#DC2626] bg-white'}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
