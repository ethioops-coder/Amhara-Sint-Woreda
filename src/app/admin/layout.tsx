import { cookies } from "next/headers";
import AdminSessionGuard from "@/components/admin-session-guard";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const hasSession = !!cookieStore.get("admin_session")?.value;

  return (
    <>
      {/* Only show session guard when logged in */}
      {hasSession && <AdminSessionGuard />}
      {children}
    </>
  );
}
