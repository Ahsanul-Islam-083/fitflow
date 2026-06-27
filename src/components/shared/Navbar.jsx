import {
    Activity,
    CalendarCheck2,
    ChevronDown,
    Dumbbell,
    GraduationCap,
    Heart,
    LayoutDashboard,
    Menu,
    MessageSquareText,
    ShieldCheck,
    UserRound,
    Users,
    WalletCards,
    BadgeCheck,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getUserSession } from "@/lib/core/session";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationsDropdown } from "@/components/dashboardPage/shared/NotificationsDropdown";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Classes", href: "/classes" },
  { name: "Community", href: "/forums" },
];

const ROLE_DETAILS = {
  admin: {
    label: "Admin",
    icon: ShieldCheck,
    links: [
      { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
      { name: "Transactions", href: "/dashboard/admin/transactions", icon: WalletCards },
      { name: "Users", href: "/dashboard/admin/users", icon: Users },
      { name: "All Students", href: "/dashboard/admin/students", icon: GraduationCap },
      { name: "Trainer Management", href: "/dashboard/admin/trainers", icon: BadgeCheck },
      { name: "Classes", href: "/dashboard/admin/classes", icon: Dumbbell },
      { name: "Forum", href: "/dashboard/admin/forum-posts", icon: MessageSquareText },
      { name: "Favorites", href: "/dashboard/favorites", icon: Heart },
    ],
  },
  trainer: {
    label: "Trainer",
    icon: Dumbbell,
    links: [
      { name: "Dashboard", href: "/dashboard/trainer", icon: LayoutDashboard },
      { name: "Transactions", href: "/dashboard/trainer/transactions", icon: WalletCards },
      { name: "My Classes", href: "/dashboard/trainer/classes", icon: Dumbbell },
      { name: "Students", href: "/dashboard/trainer/students", icon: GraduationCap },
      { name: "My Posts", href: "/dashboard/trainer/forum-posts", icon: MessageSquareText },
      { name: "Favorites", href: "/dashboard/favorites", icon: Heart },
    ],
  },
  user: {
    label: "Member",
    icon: UserRound,
    links: [
      { name: "Dashboard", href: "/dashboard/user", icon: LayoutDashboard },
      { name: "Booked Classes", href: "/dashboard/user/booked-classes", icon: CalendarCheck2 },
      { name: "Transactions", href: "/dashboard/user/transactions", icon: WalletCards },
      { name: "Favorites", href: "/dashboard/favorites", icon: Heart },
      { name: "Apply Trainer", href: "/dashboard/user/apply-trainer", icon: ShieldCheck },
    ],
  },
};

const getUserRole = (user) => {
  return (user?.role || user?.initialRole || "user").toLowerCase();
};

const getInitials = (user) => {
  const label = user?.name?.trim() || user?.email?.split("@")[0] || "User";
  const parts = label.split(" ").filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const getFirstName = (user) => {
  return user?.name?.trim()?.split(" ")[0] || "Member";
};

import Logo from "@/components/shared/Logo";
import LogoutButton from "@/components/shared/LogoutButton";
import { MobileNavLinks, DesktopNavLinks } from "@/components/shared/ClientNav";

function BrandLink() {
  return (
    <Link href="/" className="flex items-center outline-none group">
      <Logo className="h-7 sm:h-8 w-auto" />
    </Link>
  );
}

function Avatar({ user, className = "size-8" }) {
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-bold text-zinc-500 dark:text-zinc-400 ${className}`}
      aria-hidden="true"
    >
      {user?.image ? (
        <Image
          src={user?.image}
          alt=""
          className="size-full object-cover"
          referrerPolicy="no-referrer"
          width={48}
          height={48}
        />
      ) : (
        getInitials(user)
      )}
    </span>
  );
}

function NavLinks({ user }) {
  return <DesktopNavLinks links={NAV_LINKS} user={user} />;
}

function UserDropdown({ user }) {
  const role = getUserRole(user);
  const roleDetails = ROLE_DETAILS[role] || ROLE_DETAILS.user;
  const RoleIcon = roleDetails.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-1.5 py-1.5 pr-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 data-[state=open]:ring-2 data-[state=open]:ring-blue-500/50 group">
          <Avatar user={user} />
          <span className="hidden min-w-0 text-left lg:block">
            <span className="block truncate text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-tight">
              {getFirstName(user)}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
              <RoleIcon className="size-2.5" aria-hidden="true" />
              {roleDetails.label}
            </span>
          </span>
          <ChevronDown className="size-3.5 text-zinc-400 transition-transform duration-300 group-data-[state=open]:rotate-180" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 rounded-xl border-0 bg-white dark:bg-zinc-900 shadow-lg dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] p-0 overflow-hidden">
        <DropdownMenuLabel className="p-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <Avatar user={user} className="size-10" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                {user?.name || "FitFlow member"}
              </p>
              <p className="truncate text-xs text-zinc-400 dark:text-zinc-500">
                {user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <div className="p-1.5 space-y-0.5">
          {roleDetails.links.map((item) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem asChild key={item.href} className="rounded-lg px-3 py-2 text-sm font-medium cursor-pointer focus:bg-zinc-100 dark:focus:bg-zinc-800">
                <Link href={item.href} className="flex items-center gap-2.5">
                  <Icon className="size-4 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                  {item.name}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </div>

        <DropdownMenuSeparator className="m-0 bg-zinc-200 dark:bg-zinc-800" />

        <div className="p-1.5">
          <DropdownMenuItem asChild className="rounded-lg px-3 py-2 text-sm font-medium cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30">
            <LogoutButton className="w-full" iconClassName="size-4" />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthActions({ user }) {
  if (user) {
    return <UserDropdown user={user} />;
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors px-3 py-1.5"
      >
        Log in
      </Link>
      <Button asChild size="sm" className="h-9 px-4 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-sm">
        <Link href="/register">Join now</Link>
      </Button>
    </div>
  );
}

function MobileMenu({ user }) {
  const role = getUserRole(user);
  const roleDetails = ROLE_DETAILS[role] || ROLE_DETAILS.user;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors md:hidden">
          <Menu className="size-4.5" aria-hidden="true" />
          <span className="sr-only">Toggle navigation menu</span>
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:w-[320px] flex flex-col p-0 border-0 border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" showCloseButton={true}>
        <div className="flex-1 overflow-y-auto p-5">
          <SheetHeader className="mb-6 text-left">
            <SheetTitle className="text-lg font-bold text-zinc-900 dark:text-white">Menu</SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            <MobileNavLinks links={NAV_LINKS} user={user} />
          </nav>

          <div className="mt-6 border-t border-zinc-200 dark:border-zinc-800 pt-6">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-3">
                  <Avatar user={user} className="size-11" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                      {user?.name || "Member"}
                    </p>
                    <p className="truncate text-xs text-zinc-400 dark:text-zinc-500">
                      {roleDetails.label} account
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5">
                  {roleDetails.links.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Icon className="size-4" aria-hidden="true" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <LogoutButton
                    className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    iconClassName="size-4"
                    showIcon={true}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button asChild variant="outline" className="w-full h-11 rounded-lg text-sm font-semibold">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild className="w-full h-11 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                  <Link href="/register">Create account</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export async function Navbar() {
  const user = await getUserSession();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandLink />

        <nav className="hidden lg:flex items-center" aria-label="Primary navigation">
          <NavLinks user={user} />
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {user && <NotificationsDropdown />}
          <ThemeToggle />
          <AuthActions user={user} />
        </div>

        <div className="flex md:hidden items-center gap-2">
          {user && <NotificationsDropdown />}
          <ThemeToggle />
          <MobileMenu user={user} />
        </div>
      </div>
    </header>
  );
}
