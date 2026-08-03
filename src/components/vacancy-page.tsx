"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Clock, Building, Briefcase, User, GraduationCap, Send, ThumbsUp, Heart, Share2, Eye, MapPin, Search, ChevronLeft, ChevronRight } from "lucide-react";
import type { PageId } from "@/lib/types";
import { Card, ContentCard } from "./homepage-sections";
import { AnimatedSection, SubPage } from "./subpages";
import { Badge } from "@/components/ui/badge";

interface ApplicationData {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  applicant: {
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    dob: string;
    address: string;
    education: { level: string; institution: string; yearGraduated: number };
    experience: { totalYears: number; recentEmployer: string; currentPosition: string };
  };
  status: "pending" | "reviewed" | "shortlisted" | "rejected";
  appliedAt: string;
  attachments?: { cv?: string; coverLetter?: string };
}

const DEFAULT_VACANCIES = [
  { 
    id: "v1", 
    title: "Senior Education Expert", 
    department: "Education Office", 
    type: "Permanent", 
    deadline: "2026-08-15", 
    postedBy: "HR Department",
    likes: 45,
    shares: 12,
    views: 340,
    location: "Sint Main Office",
    description: "Provide technical leadership in curriculum development, teacher training coordination, and education quality improvement across 47 schools. You will be responsible for standardizing teaching methods and evaluating the performance of headmasters across the Woreda.", 
    requirements: "MA/MSc in Education or related field; 5+ years experience in education sector; strong leadership and communication skills." 
  },
  { 
    id: "v2", 
    title: "Agricultural Development Expert", 
    department: "Agriculture Office", 
    type: "Permanent", 
    deadline: "2026-08-20", 
    postedBy: "Agriculture Bureau",
    likes: 89,
    shares: 34,
    views: 512,
    location: "Sint Rural District",
    description: "Lead agricultural extension programs, coordinate farmer training, and support cooperative development for 28,500+ farming households. This role is crucial for ensuring food security and implementing modern farming technologies.", 
    requirements: "BSc/MSc in Agriculture or related field; 3+ years experience; knowledge of modern farming techniques." 
  },
  { 
    id: "v3", 
    title: "ICT Officer", 
    department: "ICT & Technology Office", 
    type: "Permanent", 
    deadline: "2026-08-25", 
    postedBy: "Admin Office",
    likes: 120,
    shares: 56,
    views: 890,
    location: "Main HQ",
    description: "Manage the woreda's ICT infrastructure, maintain computer labs, provide technical support, and drive digital transformation initiatives across all public service sectors. Must be proficient in networking and cloud administration.", 
    requirements: "BSc in Computer Science or IT; 2+ years experience; networking and hardware maintenance skills." 
  },
  { 
    id: "v4", 
    title: "Health Extension Worker (3 Positions)", 
    department: "Health Office", 
    type: "Contract", 
    deadline: "2026-07-30", 
    postedBy: "Health Bureau",
    likes: 230,
    shares: 89,
    views: 1200,
    location: "Various Kebeles",
    description: "Provide community-level health services including maternal care, immunization, health education, and disease prevention. This frontline role requires high dedication to rural communities.", 
    requirements: "Diploma in Health Extension or Nursing; clinical experience preferred; willingness to work in rural kebeles." 
  },
  { 
    id: "v5", 
    title: "Civil Engineer", 
    department: "Construction Office", 
    type: "Contract", 
    deadline: "2026-09-01", 
    postedBy: "Infrastructure Dept",
    likes: 67,
    shares: 21,
    views: 450,
    location: "Site Locations",
    description: "Supervise road construction, public building projects, and water infrastructure development across the woreda. Ensures all government contracts meet rigorous safety and quality standards.", 
    requirements: "BSc in Civil Engineering; 3+ years construction supervision experience; registered with relevant professional body." 
  },
  { 
    id: "v6", 
    title: "Revenue Collection Officer", 
    department: "Finance & Revenue Office", 
    type: "Permanent", 
    deadline: "2026-08-10", 
    postedBy: "Finance Bureau",
    likes: 34,
    shares: 8,
    views: 290,
    location: "Finance HQ",
    description: "Manage tax assessment, collection, and taxpayer registration for the woreda's growing revenue base. You will directly contribute to the financial sustainability of the Woreda's development goals.", 
    requirements: "BA in Accounting or Finance; 2+ years experience; knowledge of Ethiopian tax law and regulations." 
  },
  { 
    id: "v7", 
    title: "Public Relations Specialist", 
    department: "Communications Office", 
    type: "Permanent", 
    deadline: "2026-09-15", 
    postedBy: "Mayor's Office",
    likes: 156,
    shares: 77,
    views: 930,
    location: "Sint Main Office",
    description: "Handle public relations, media communications, and digital social media platforms for the Woreda administration. Must have excellent writing skills and a good understanding of public sentiment.", 
    requirements: "BA in Journalism, Communications or PR; 3+ years experience; excellent written and verbal communication." 
  },
];

export function VacancyPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [selectedVacancy, setSelectedVacancy] = useState<any>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  // Interaction State
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // Load vacancies from admin API
    fetch("/admin/api/vacancies").then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) {
        // Merge extra metadata into API vacancies if missing
        const enhanced = data.map(v => ({
          ...v,
          postedBy: v.postedBy || "HR Department",
          likes: v.likes || Math.floor(Math.random() * 100) + 10,
          shares: v.shares || Math.floor(Math.random() * 30),
          views: v.views || Math.floor(Math.random() * 500) + 100,
          location: v.location || "Sint Main Office"
        }));
        setVacancies(enhanced);
      } else {
        try { const v = localStorage.getItem("amharasint_vacancies"); if (v) { setVacancies(JSON.parse(v)); return; } } catch {}
        setVacancies(DEFAULT_VACANCIES);
      }
    }).catch(() => {
      try { const v = localStorage.getItem("amharasint_vacancies"); if (v) setVacancies(JSON.parse(v)); else setVacancies(DEFAULT_VACANCIES); } catch { setVacancies(DEFAULT_VACANCIES); }
    });
    // Load application count
    try { const a = localStorage.getItem("amharasint_applications"); if (a) setApplications(JSON.parse(a)); } catch {}
  }, []);

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/admin/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      return data.storedName || null;
    } catch { return null; }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const fd = new FormData(e.currentTarget);
      const cvFile = fd.get("cv") as File;
      const coverFile = fd.get("coverLetter") as File;

      let cvStoredName: string | null = null;
      let coverStoredName: string | null = null;

      if (cvFile && cvFile.size > 0) {
        cvStoredName = await uploadFile(cvFile).catch(() => null);
      }
      if (coverFile && coverFile.size > 0) {
        coverStoredName = await uploadFile(coverFile).catch(() => null);
      }

      const data: ApplicationData = {
        id: "app_" + Date.now(),
        vacancyId: selectedVacancy?.id || "",
        vacancyTitle: selectedVacancy?.title || "",
        applicant: {
          fullName: fd.get("fullName") as string,
          email: fd.get("email") as string,
          phone: fd.get("phone") as string,
          gender: fd.get("gender") as string,
          dob: fd.get("dob") as string,
          address: fd.get("address") as string,
          education: {
            level: fd.get("education") as string,
            institution: fd.get("institution") as string,
            yearGraduated: parseInt(fd.get("yearGraduated") as string)
          },
          experience: {
            totalYears: parseInt(fd.get("totalExp") as string),
            recentEmployer: fd.get("recentEmployer") as string,
            currentPosition: fd.get("currentPosition") as string
          }
        },
        status: "pending",
        appliedAt: new Date().toISOString(),
        attachments: { cv: cvStoredName || undefined, coverLetter: coverStoredName || undefined }
      };

      try {
        const all = [...applications, data];
        localStorage.setItem("amharasint_applications", JSON.stringify(all));
        setApplications(all);
      } catch {}

      setFormStatus("success");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => { setSelectedVacancy(null); setFormStatus("idle"); }, 4000);
    } catch (err: any) {
      console.error("Application submit error:", err);
      setFormStatus("error");
    }
  };

  const isExpired = (deadline: string) => new Date(deadline) < new Date();

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (v: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Check out this vacancy for ${v.title} at Amhara Sayint Woreda!`;
    if (navigator.share) {
      navigator.share({ title: v.title, text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text);
      alert("Vacancy copied to clipboard!");
    }
  };

  // Pagination Logic
  const activeVacancies = vacancies.filter(v => !isExpired(v.deadline));
  const totalPages = Math.max(1, Math.ceil(activeVacancies.length / itemsPerPage));
  const visibleVacancies = activeVacancies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <SubPage onNavigate={onNavigate} title="Job Vacancies" breadcrumb="Careers / Vacancy" badge="Join Our Team">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {formStatus === "success" && (
          <ContentCard>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3"><ThumbsUp className="w-7 h-7 text-green-600" /></div>
              <h3 className="font-bold text-green-800 text-lg mb-1">Application Submitted Successfully!</h3>
              <p className="text-green-600 text-sm">Thank you for applying for the {selectedVacancy?.title} position. We will review your application and contact you if shortlisted.</p>
            </div>
          </ContentCard>
        )}

        {!selectedVacancy ? (
          <>
            {/* Header Banner */}
            <AnimatedSection>
              <div className="bg-gradient-to-r from-[#0B3D2E] to-[#145A44] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-black mb-4">Build Your Career with Us</h2>
                  <p className="text-white/80 text-lg max-w-2xl">Join our team of dedicated public servants making a difference in the community. Browse open positions, share with friends, and apply online in minutes.</p>
                  
                  <div className="flex gap-4 mt-8">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 min-w-[120px] text-center">
                      <div className="text-3xl font-black text-[#EAB308]">{activeVacancies.length}</div>
                      <div className="text-white/70 text-xs uppercase tracking-wider font-bold mt-1">Open Roles</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 min-w-[120px] text-center">
                      <div className="text-3xl font-black text-emerald-400">{applications.length}</div>
                      <div className="text-white/70 text-xs uppercase tracking-wider font-bold mt-1">Total Applicants</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Vacancy Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {visibleVacancies.map((v, i) => {
                const isLiked = likedItems[v.id];
                const displayLikes = (v.likes || 0) + (isLiked ? 1 : 0);
                
                return (
                  <AnimatedSection key={v.id} delay={i * 100}>
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col group">
                      
                      {/* Top Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-[#0B3D2E]/10 flex items-center justify-center shrink-0">
                            <Building className="w-6 h-6 text-[#0B3D2E]" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#EAB308] uppercase tracking-wider flex items-center gap-1">
                              <User className="w-3 h-3" /> {v.postedBy}
                            </p>
                            <h3 className="font-extrabold text-[#0B3D2E] text-lg leading-tight group-hover:text-[#16A34A] transition-colors">{v.title}</h3>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none px-3 py-1 font-black">OPEN</Badge>
                      </div>
                      
                      {/* Badges Row */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-gray-50 text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 border border-gray-100">
                          <Briefcase className="w-3 h-3" /> {v.type}
                        </span>
                        <span className="bg-gray-50 text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 border border-gray-100">
                          <MapPin className="w-3 h-3" /> {v.location}
                        </span>
                        <span className="bg-red-50 text-red-600 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 border border-red-100">
                          <Clock className="w-3 h-3" /> Ends: {v.deadline}
                        </span>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                        {v.description}
                      </p>
                      
                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-auto">
                        <div className="flex items-center gap-4 text-xs font-semibold text-gray-400">
                          <button onClick={(e) => handleLike(v.id, e)} className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}>
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} /> {displayLikes}
                          </button>
                          <button onClick={(e) => handleShare(v, e)} className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                            <Share2 className="w-4 h-4" /> {v.shares}
                          </button>
                          <span className="flex items-center gap-1.5 hidden sm:flex">
                            <Eye className="w-4 h-4" /> {v.views}
                          </span>
                        </div>
                        
                        <button onClick={() => setSelectedVacancy(v)} className="inline-flex items-center gap-2 bg-[#0B3D2E] hover:bg-[#16A34A] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                          Apply Now <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className={`p-3 rounded-full border transition-all flex items-center justify-center ${currentPage === 1 ? 'border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:border-[#0B3D2E] hover:text-[#0B3D2E] bg-white'}`}>
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button key={idx} onClick={() => setCurrentPage(idx + 1)} className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all ${currentPage === idx + 1 ? 'bg-[#0B3D2E] text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={`p-3 rounded-full border transition-all flex items-center justify-center ${currentPage === totalPages ? 'border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:border-[#0B3D2E] hover:text-[#0B3D2E] bg-white'}`}>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <ContentCard>
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
              <button onClick={() => setSelectedVacancy(null)} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-100 shadow-sm"><ArrowLeft className="w-6 h-6 text-[#0B3D2E]" /></button>
              <div>
                <p className="text-xs font-bold text-[#16A34A] uppercase tracking-wider mb-1">Application Form</p>
                <h2 className="text-2xl font-black text-[#0B3D2E] leading-tight">{selectedVacancy.title}</h2>
                <div className="flex flex-wrap gap-3 text-xs font-semibold text-gray-500 mt-2">
                  <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><Building className="w-3.5 h-3.5" /> {selectedVacancy.department}</span>
                  <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><Briefcase className="w-3.5 h-3.5" /> {selectedVacancy.type}</span>
                  <span className="flex items-center gap-1 bg-red-50 text-red-600 px-2 py-1 rounded"><Clock className="w-3.5 h-3.5" /> Deadline: {selectedVacancy.deadline}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Personal Information */}
              <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                <h3 className="font-extrabold text-[#0B3D2E] mb-6 flex items-center gap-2 text-lg"><User className="w-6 h-6 text-[#EAB308]" /> Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <div><label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Full Name *</label><input name="fullName" required className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white" placeholder="Enter your full name" /></div>
                  <div><label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Email Address *</label><input name="email" type="email" required className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white" placeholder="your.email@example.com" /></div>
                  <div><label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Phone Number *</label><input name="phone" type="tel" required className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white" placeholder="+251 9XX XXX XXX" /></div>
                  <div><label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Date of Birth *</label><input name="dob" type="date" required className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white" /></div>
                  <div><label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Gender *</label><select name="gender" required className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white"><option value="">Select Gender</option><option>Male</option><option>Female</option></select></div>
                  <div><label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Address *</label><input name="address" required className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white" placeholder="City, Woreda, Zone" /></div>
                </div>
              </div>

              {/* Education */}
              <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                <h3 className="font-extrabold text-[#0B3D2E] mb-6 flex items-center gap-2 text-lg"><GraduationCap className="w-6 h-6 text-[#EAB308]" /> Education Background</h3>
                <div className="grid md:grid-cols-3 gap-5">
                  <div><label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Highest Qualification *</label><select name="education" required className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white"><option value="">Select</option><option>PhD</option><option>Masters (MA/MSc/MBA)</option><option>Bachelors (BA/BSc)</option><option>Diploma</option><option>Certificate</option><option>TVET</option></select></div>
                  <div><label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Institution *</label><input name="institution" required className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white" placeholder="University/College name" /></div>
                  <div><label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Year Graduated *</label><input name="yearGraduated" type="number" required min="1980" max="2026" className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white" placeholder="e.g. 2020" /></div>
                </div>
              </div>

              {/* Experience */}
              <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                <h3 className="font-extrabold text-[#0B3D2E] mb-6 flex items-center gap-2 text-lg"><Briefcase className="w-6 h-6 text-[#EAB308]" /> Work Experience</h3>
                <div className="grid md:grid-cols-3 gap-5">
                  <div><label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Total Years of Exp *</label><input name="totalExp" type="number" required min="0" max="50" className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white" placeholder="Years" /></div>
                  <div><label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Most Recent Employer *</label><input name="recentEmployer" required className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white" placeholder="Company/Org name" /></div>
                  <div><label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Current/Last Position *</label><input name="currentPosition" required className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white" placeholder="Job title" /></div>
                </div>
              </div>

              {/* Attachments */}
              <div className="bg-[#0B3D2E]/5 p-6 rounded-3xl border border-[#0B3D2E]/10">
                <h3 className="font-extrabold text-[#0B3D2E] mb-6 flex items-center gap-2 text-lg">Attachments</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Upload CV (PDF) *</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#0B3D2E]/20 border-dashed rounded-xl cursor-pointer bg-white hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <p className="mb-2 text-sm text-gray-500"><span className="font-bold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-400">PDF, DOCX (MAX. 5MB)</p>
                        </div>
                        <input name="cv" type="file" className="hidden" accept=".pdf,.doc,.docx" required />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Cover Letter (PDF)</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#0B3D2E]/20 border-dashed rounded-xl cursor-pointer bg-white hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <p className="mb-2 text-sm text-gray-500"><span className="font-bold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-400">PDF, DOCX (MAX. 5MB)</p>
                        </div>
                        <input name="coverLetter" type="file" className="hidden" accept=".pdf,.doc,.docx" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                <button type="button" onClick={() => setSelectedVacancy(null)} className="px-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all">Cancel</button>
                <button type="submit" disabled={formStatus === "loading"} className="inline-flex items-center gap-2 bg-[#0B3D2E] hover:bg-[#16A34A] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50">
                  {formStatus === "loading" ? "Submitting..." : "Submit Application"} <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </ContentCard>
        )}
      </div>
    </SubPage>
  );
}
