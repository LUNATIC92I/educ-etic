import { requireChildUser } from "@/lib/require-user";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { MobileTabbar } from "@/components/dashboard/mobile-tabbar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireChildUser();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col pb-16 md:pb-0">
        <Topbar name={user.name} avatarEmoji={user.avatarEmoji} xp={user.xp} streakCount={user.streakCount} />
        <main className="flex-1 bg-ck-bg p-4 sm:p-6">{children}</main>
      </div>
      <MobileTabbar />
    </div>
  );
}
