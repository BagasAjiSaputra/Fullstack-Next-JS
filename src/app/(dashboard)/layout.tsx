import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Sidebar />
      <main className="pt-20">{children}</main>
    </div>
  );
}
