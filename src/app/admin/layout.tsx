import { cookies } from "next/headers";
import AdminSessionGuard from "@/components/admin-session-guard";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;

  // No session — show login page without the session guard
  if (!sessionToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#062B1F] via-[#0B3D2E] to-[#145A44]">
        {children}
      </div>
    );
  }

  // Has session — render the admin UI with the idle-timeout guard active
  return (
    <>
      <AdminSessionGuard />
      {children}
    </>
  );
}
