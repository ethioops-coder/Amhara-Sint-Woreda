"use client";

import dynamic from "next/dynamic";

// Load the entire admin page with SSR disabled — prevents all window/document crashes
const AdminPageContent = dynamic(() => import("./admin-content"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-[3px] border-[#0B3D2E]/20 border-t-[#0B3D2E] rounded-full animate-spin" />
        <p className="text-sm text-gray-500 font-medium">Loading admin panel...</p>
      </div>
    </div>
  ),
});

export default function AdminWrapper() {
  return <AdminPageContent />;
}
