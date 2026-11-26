"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Calendar, Heart, MessageCircle, Newspaper } from "lucide-react";
import type { PageId } from "@/lib/types";

export function InternationalNewsFeed({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [items, setItems] = useState<any[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/admin/api/news")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const published = data.filter((n: any) => n.status === "published").map((n: any) => ({ ...n, image: n.image || n.imageUrl }));
          if (published.length > 0) { setItems(published); return; }
        }
        // Fallback data
        setItems([
          { id: "1", title: "Amhara Sayint Launches New Water Supply Project", summary: "A major clean water initiative covering 8 kebeles has been approved with a budget of ETB 12 million, bringing safe drinking water to over 15,000 residents.", category: "Water", date: "2026-06-28", image: "https://sfile.chatglm.cn/images-ppt/35f5cc0fa1a7.jpg", initialLikes: 47, initialComments: 12, featured: true },
          { id: "2", title: "Annual Agricultural Exhibition a Great Success", summary: "Over 2,000 farmers participated in this year's exhibition showcasing modern farming techniques.", category: "Agriculture", date: "2026-06-25", image: "https://sfile.chatglm.cn/images-ppt/4f86eab1aa4a.jpg", initialLikes: 83, initialComments: 24, featured: false },
          { id: "3", title: "New Primary School Inaugurated in Kebele 05", summary: "The woreda administration inaugurated a fully equipped primary school serving 400 students with modern classrooms.", category: "Education", date: "2026-06-20", image: "https://sfile.chatglm.cn/images-ppt/b60b21cb0921.jpg", initialLikes: 62, initialComments: 8, featured: false },
          { id: "4", title: "TVET College Enrolls Record 500 Students", summary: "Amhara Sayint TVET College has enrolled a record 500 students this academic year in various programs.", category: "Education", date: "2026-06-15", image: "https://sfile.chatglm.cn/images-ppt/a842501dc00b.jpg", initialLikes: 95, initialComments: 31, featured: false },
        ]);
      })
      .catch(() => {
        setItems([
          { id: "1", title: "Amhara Sayint Launches New Water Supply Project", summary: "A major clean water initiative covering 8 kebeles has been approved.", category: "Water", date: "2026-06-28", image: "https://sfile.chatglm.cn/images-ppt/35f5cc0fa1a7.jpg", initialLikes: 47, initialComments: 12, featured: true },
          { id: "2", title: "Annual Agricultural Exhibition a Great Success", summary: "Over 2,000 farmers participated in this year's exhibition.", category: "Agriculture", date: "2026-06-25", image: "https://sfile.chatglm.cn/images-ppt/4f86eab1aa4a.jpg", initialLikes: 83, initialComments: 24, featured: false },
        ]);
      });
  }, []);

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLiked((p) => ({ ...p, [id]: !p[id] }));
    setLikes((p) => ({ ...p, [id]: (p[id] || 0) + (liked[id] ? -1 : 1) }));
  };

  const featured = items.find((i) => i.featured) || items[0];
  const others = items.filter((i) => i.id !== featured?.id).slice(0, 4); // Show top 4 others

  if (!items.length) return null;

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Newspaper className="w-4 h-4" /> Latest Updates
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              News & Announcements
            </h3>
          </div>
          <button onClick={() => onNavigate("news-news")} className="mt-4 md:mt-0 flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group">
            View All News 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Featured Article (Left 7 columns) */}
          {featured && (
            <div 
              className="lg:col-span-7 group cursor-pointer"
              onClick={() => onNavigate("news-news")}
            >
              <div className="relative rounded-3xl overflow-hidden mb-6 aspect-[4/3] lg:aspect-[16/10] shadow-lg">
                <img 
                  src={featured.image} 
                  alt={featured.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://sfile.chatglm.cn/images-ppt/35f5cc0fa1a7.jpg'; }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {featured.category}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 text-slate-500 text-sm font-medium mb-3">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {featured.date}</span>
                </div>
                <h4 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight group-hover:text-emerald-600 transition-colors">
                  {featured.title}
                </h4>
                <p className="text-slate-600 text-lg leading-relaxed mb-6 line-clamp-3">
                  {featured.summary}
                </p>
                <div className="flex items-center gap-6">
                  <button onClick={(e) => toggleLike(e, featured.id)} className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors font-medium">
                    <Heart className={`w-5 h-5 ${liked[featured.id] ? "fill-rose-500 text-rose-500" : ""}`} /> 
                    {(featured.initialLikes || 0) + (likes[featured.id] || 0)} Likes
                  </button>
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <MessageCircle className="w-5 h-5" /> {featured.initialComments || 0} Comments
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Articles (Right 5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {others.map((item) => (
              <div 
                key={item.id} 
                className="group cursor-pointer grid grid-cols-3 gap-6 items-center"
                onClick={() => onNavigate("news-news")}
              >
                <div className="col-span-1 aspect-square rounded-2xl overflow-hidden shadow-sm">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://sfile.chatglm.cn/images-ppt/b60b21cb0921.jpg'; }}
                  />
                </div>
                <div className="col-span-2 flex flex-col justify-center">
                  <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2 block">
                    {item.category}
                  </span>
                  <h5 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {item.title}
                  </h5>
                  <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
                    <span>{item.date}</span>
                    <span>•</span>
                    <button onClick={(e) => toggleLike(e, item.id)} className="flex items-center gap-1 hover:text-rose-400 transition-colors">
                      <Heart className={`w-3.5 h-3.5 ${liked[item.id] ? "fill-rose-500 text-rose-500" : ""}`} /> 
                      {(item.initialLikes || 0) + (likes[item.id] || 0)}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
