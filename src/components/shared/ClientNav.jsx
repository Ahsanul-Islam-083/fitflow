"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNavLinks({ links, user }) {
  const pathname = usePathname();

  const isLinkActive = (href) => {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <>
      {links.map((link) => {
        const isActive = isLinkActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center rounded-md px-4 py-3 text-base font-bold transition-colors ${
              isActive 
                ? "text-blue-600 bg-blue-50 dark:bg-blue-500/10" 
                : "text-neutral-500 hover:text-blue-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
      {user && (
        <Link
          href="/dashboard"
          className={`flex items-center rounded-md px-4 py-3 text-base font-bold transition-colors ${
            isLinkActive("/dashboard")
              ? "text-blue-600 bg-blue-50 dark:bg-blue-500/10"
              : "text-neutral-500 hover:text-blue-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
        >
          Dashboard
        </Link>
      )}
    </>
  );
}

export function DesktopNavLinks({ links, user }) {
  const pathname = usePathname();

  const isLinkActive = (href) => {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <>
      {links.map((link) => {
        const isActive = isLinkActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-4 py-2 text-sm font-medium transition-colors group ${
              isActive ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            {link.name}
            <span 
              className={`absolute inset-x-4 -bottom-1 h-0.5 bg-blue-600 origin-left transition-transform duration-300 rounded-full ${
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`} 
            />
          </Link>
        );
      })}
      {user && (
        <Link
          href="/dashboard"
            className={`relative px-4 py-2 text-sm font-medium transition-colors group ${
              isLinkActive("/dashboard") ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
        >
          Dashboard
          <span 
            className={`absolute inset-x-4 -bottom-1 h-0.5 bg-blue-600 origin-left transition-transform duration-300 rounded-full ${
              isLinkActive("/dashboard") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`} 
          />
        </Link>
      )}
    </>
  );
}
