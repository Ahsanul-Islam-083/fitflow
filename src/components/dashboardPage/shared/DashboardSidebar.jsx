"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
    BadgeCheck,
    CalendarCheck2,
    Dumbbell,
    GraduationCap,
    Heart,
    LayoutDashboard,
    LogOut,
    MessageSquareText,
    PanelLeftClose,
    PanelLeftOpen,
    PlusCircle,
    ShieldCheck,
    Users,
    WalletCards
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import LogoutButton from "@/components/shared/LogoutButton";
import Logo from "@/components/shared/Logo";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const roleLinks = {
  user: [
    {
      sector: "Overview",
      items: [
        { icon: LayoutDashboard, href: "/dashboard/user", label: "Dashboard" },
        { icon: CalendarCheck2, href: "/dashboard/user/booked-classes", label: "Booked Classes" },
        { icon: WalletCards, href: "/dashboard/user/transactions", label: "Transactions" },
      ],
    },
    {
      sector: "Settings & More",
      items: [
        { icon: Heart, href: "/dashboard/favorites", label: "Favorites" },
        { icon: ShieldCheck, href: "/dashboard/user/apply-trainer", label: "Apply Trainer" },
      ],
    },
  ],
  trainer: [
    {
      sector: "Overview",
      items: [
        { icon: LayoutDashboard, href: "/dashboard/trainer", label: "Dashboard" },
        { icon: WalletCards, href: "/dashboard/trainer/transactions", label: "Transactions" },
      ],
    },
    {
      sector: "Management",
      items: [
        { 
          icon: Dumbbell, 
          href: "/dashboard/trainer/classes", 
          label: "My Classes",
          subItems: [
            { icon: PlusCircle, href: "/dashboard/trainer/add-class", label: "Add New Class" }
          ]
        },
        { icon: GraduationCap, href: "/dashboard/trainer/students", label: "All Students" },
      ],
    },
    {
      sector: "Community",
      items: [
        { 
          icon: MessageSquareText, 
          href: "/dashboard/trainer/forum-posts", 
          label: "My Posts",
          subItems: [
            { icon: PlusCircle, href: "/dashboard/trainer/forum-posts/new", label: "Add New Post" }
          ]
        },
        { icon: Heart, href: "/dashboard/favorites", label: "Favorites" },
      ],
    },
  ],
  admin: [
    {
      sector: "Analytics",
      items: [
        { icon: LayoutDashboard, href: "/dashboard/admin", label: "Dashboard" },
        { icon: WalletCards, href: "/dashboard/admin/transactions", label: "Transactions" },
      ],
    },
    {
      sector: "Management",
      items: [
        { icon: Users, href: "/dashboard/admin/users", label: "Users" },
        { icon: GraduationCap, href: "/dashboard/admin/students", label: "All Students" },
        { icon: BadgeCheck, href: "/dashboard/admin/trainers", label: "Trainer Management" },
        { icon: Dumbbell, href: "/dashboard/admin/classes", label: "Classes" },
      ],
    },
    {
      sector: "Community",
      items: [
        { 
          icon: MessageSquareText, 
          href: "/dashboard/admin/forum-posts", 
          label: "Forum",
          subItems: [
            { icon: PlusCircle, href: "/dashboard/admin/forum-posts/new", label: "Add New Post" }
          ]
        },
        { icon: Heart, href: "/dashboard/favorites", label: "Favorites" },
      ],
    },
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
    <span className={cn("flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-600 text-sm font-bold text-white", className)}>
      {user?.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.image} alt="" className="size-full object-cover" referrerPolicy="no-referrer" />
      ) : (
        getInitials(user)
      )}
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const user = session?.user;
  const role = getRole(user);
  const sectors = roleLinks[role] || roleLinks.user;

  return (
    <TooltipProvider delayDuration={100}>
      <aside 
        className={cn(
          "relative hidden shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 lg:sticky lg:top-0 lg:flex lg:flex-col min-h-screen transition-all duration-300 ease-in-out z-50",
          isCollapsed ? "w-[80px]" : "w-[280px]"
        )}
      >
      <div className={cn("flex h-16 items-center border-b border-zinc-200 dark:border-zinc-800", isCollapsed ? "justify-center px-0" : "px-6")}>
        <Link href="/" className="flex items-center outline-none group">
          {isCollapsed ? (
            <img 
              src="/FItFlow_Logo.png" 
              alt="FitFlow Icon" 
              className="size-7 object-contain transition-transform duration-300 group-hover:scale-105 dark:brightness-0 dark:invert" 
            />
          ) : (
            <AnimatePresence>
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <Logo className="h-7 w-auto transition-transform duration-300 group-hover:scale-105" />
              </motion.div>
            </AnimatePresence>
          )}
        </Link>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-4 z-50 flex size-7 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-400 shadow-sm hover:text-zinc-600 dark:hover:text-zinc-300 transition-all duration-300"
      >
        {isCollapsed ? <PanelLeftOpen className="size-3.5" /> : <PanelLeftClose className="size-3.5" />}
      </button>

      <div className="flex-1 py-6 flex flex-col items-center overflow-x-hidden overflow-y-auto no-scrollbar">
        <motion.nav 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn("flex flex-col gap-5 w-full", isCollapsed ? "px-2" : "px-3")}
        >
          {sectors.map((sectorObj) => (
            <div key={sectorObj.sector} className="flex flex-col gap-1">
              {isCollapsed ? (
                <div className="mx-auto w-8 border-t border-zinc-200 dark:border-zinc-800 my-1.5" />
              ) : (
                <motion.p variants={itemVariants} className="px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 mb-0.5 whitespace-nowrap">
                  {sectorObj.sector}
                </motion.p>
              )}

              {sectorObj.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                const LinkContent = (
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex items-center rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 overflow-hidden",
                      isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200",
                      isCollapsed ? "justify-center px-0 h-10 w-10 mx-auto" : "gap-2.5 px-3"
                    )}
                  >
                    <Icon 
                      className={cn(
                        "size-4 shrink-0",
                        isActive && "scale-110"
                      )} 
                      aria-hidden="true" 
                    />
                    
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                );

                return (
                  <motion.div key={`${item.href}-${item.label}`} variants={itemVariants} className="relative group">
                    {isCollapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {LinkContent}
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={12} className="font-semibold text-xs bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-none rounded-lg px-3 py-1.5 shadow-md">
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      LinkContent
                    )}

                    {!isCollapsed && item.subItems && (
                      <div className="mt-0.5 flex flex-col gap-0.5 ml-3 pl-3 border-l border-zinc-200 dark:border-zinc-800">
                        {item.subItems.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                "flex items-center gap-2.5 rounded-lg py-1.5 px-2.5 text-[11px] font-semibold transition-all duration-200",
                                isSubActive
                                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
                                  : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                              )}
                            >
                              <SubIcon className="size-3" />
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </motion.nav>
      </div>

      {/* Logout Button */}
      <div className={cn("border-t border-zinc-200 dark:border-zinc-800 py-3", isCollapsed ? "px-2" : "px-3")}>
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center">
                <LogoutButton text="" className="flex items-center justify-center size-10 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-red-500 transition-all" iconClassName="size-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={12} className="font-semibold text-xs bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-none rounded-lg px-3 py-1.5 shadow-md">
              Logout
            </TooltipContent>
          </Tooltip>
        ) : (
          <LogoutButton className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-all" iconClassName="size-4" />
        )}
      </div>

      </aside>
    </TooltipProvider>
  );
}
