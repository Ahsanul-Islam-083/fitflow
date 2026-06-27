import DashboardNavbar from "@/components/dashboardPage/shared/DashboardNavbar";
import { DashboardSidebar } from "@/components/dashboardPage/shared/DashboardSidebar";
import { Inter, Outfit } from "next/font/google";

const dashboardSans = Inter({
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

const dashboardHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-kanit",
});

export default function DashboardLayout({ children }) {
  return (
    <div className={`${dashboardSans.variable} ${dashboardHeading.variable} font-sans`}>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 lg:flex">
        <DashboardSidebar />
        <div className="min-w-0 flex-1 flex flex-col">
          <DashboardNavbar />
          <main className="flex-1 container mx-auto px-4 py-6 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
