import { requireAdminUser } from "@/lib/require-user";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdminUser();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1">
        <div className="flex items-center justify-between border-b border-ck-border bg-ck-bg-elevated px-4 py-3 sm:px-6">
          <p className="font-display font-bold md:hidden">🛡️ Admin CodeKids</p>
          <div className="ml-auto text-sm text-ck-text-muted">Connecté en tant que {user.name}</div>
        </div>
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
