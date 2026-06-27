"use client";

import { ChevronDown, Menu, X, LayoutDashboard, CalendarCheck2, Heart, ShieldCheck, Dumbbell, Users, MessageSquareText, BadgeCheck, WalletCards, GraduationCap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import LogoutButton from "@/components/shared/LogoutButton";
import Logo from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const roleLinks = {
  user: [
    { href: "/dashboard/user", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/user/booked-classes", label: "Booked Classes", icon: CalendarCheck2 },
    { href: "/dashboard/user/transactions", label: "Transactions", icon: WalletCards },
    { href: "/dashboard/favorites", label: "Favorites", icon: Heart },
    { href: "/dashboard/user/apply-trainer", label: "Apply Trainer", icon: ShieldCheck },
  ],
  trainer: [
    { href: "/dashboard/trainer", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/trainer/transactions", label: "Transactions", icon: WalletCards },
    { href: "/dashboard/trainer/classes", label: "My Classes", icon: Dumbbell },
    { href: "/dashboard/trainer/students", label: "Students", icon: GraduationCap },
    { href: "/dashboard/trainer/forum-posts", label: "My Posts", icon: MessageSquareText },
    { href: "/dashboard/favorites", label: "Favorites", icon: Heart },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/admin/transactions", label: "Transactions", icon: WalletCards },
    { href: "/dashboard/admin/users", label: "Users", icon: Users },
    { href: "/dashboard/admin/students", label: "All Students", icon: GraduationCap },
    { href: "/dashboard/admin/trainers", label: "Trainer Management", icon: BadgeCheck },
    { href: "/dashboard/admin/classes", label: "Classes", icon: Dumbbell },
    { href: "/dashboard/admin/forum-posts", label: "Forum", icon: MessageSquareText },
    { href: "/dashboard/favorites", label: "Favorites", icon: Heart },
  ],
};

function getInitials(user) {
  const label = user?.name?.trim() || user?.email?.split("@")[0] || "User";
  const parts = label.split(" ").filter(Boolean);

  if (parts.length < 2) {
    return (parts[0] || "US").slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function getRole(user) {
  return (user?.role || user?.initialRole || "user").toLowerCase();
}

function Avatar({ user, className }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-bold text-primary-foreground",
        className
      )}
    >
      {user?.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.image} alt="" className="size-full object-cover" referrerPolicy="no-referrer" />
      ) : (
        getInitials(user)
      )}
    </span>
  );
}

export default function DashboardNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const role = getRole(user);
  const navItems = roleLinks[role] || roleLinks.user;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur">
        <div className="flex h-16 items-center justify-between gap-3 px-4 lg:px-6">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 lg:hidden hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Open dashboard menu"
        >
          <Menu className="size-4.5" aria-hidden="true" />
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-1 pr-2.5 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 data-[state=open]:ring-2 data-[state=open]:ring-blue-500/50 transition-all group hover:bg-zinc-50 dark:hover:bg-zinc-800">
                {isPending ? (
                  <span className="size-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                ) : (
                  <Avatar user={user} className="size-8" />
                )}
                <span className="hidden text-left sm:block">
                  <span className="block container truncate text-sm font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {user?.name || "Dashboard user"}
                  </span>
                  <span className="block text-[11px] capitalize text-zinc-400 dark:text-zinc-500">{role}</span>
                </span>
                <ChevronDown className="size-3.5 text-zinc-400 transition-transform duration-300 group-data-[state=open]:rotate-180" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 rounded-xl p-0 border-0 shadow-lg dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <DropdownMenuLabel className="p-3">
                <p className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {user?.name || "Dashboard user"}
                </p>
                <p className="truncate text-xs font-medium text-zinc-400 dark:text-zinc-500">{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="m-0 bg-zinc-200 dark:bg-zinc-800" />
              <div className="p-1">
                {navItems.map((item) => (
                  <DropdownMenuItem key={`${item.href}-${item.label}`} asChild className="rounded-lg px-3 py-2 text-sm font-medium cursor-pointer focus:bg-zinc-100 dark:focus:bg-zinc-800">
                    <Link href={item.href} className="flex w-full items-center gap-2">
                      <item.icon className="size-4" aria-hidden="true" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator className="m-0 bg-zinc-200 dark:bg-zinc-800" />
              <div className="p-1">
                <DropdownMenuItem asChild className="rounded-lg px-3 py-2 text-sm font-medium cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30">
                  <LogoutButton className="w-full" iconClassName="size-4" />
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            aria-label="Close dashboard menu"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="relative h-full w-72 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl p-4">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <Logo className="h-7 w-auto" />
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex size-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close dashboard menu"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
            <nav className="mt-4 grid gap-0.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200"
                    )}
                  >
                    <item.icon className="size-4" aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      ) : null}
    </>
  );
}
