"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 size-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 size-[500px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        
        {/* Main Grid: Info + Nav Links + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-zinc-900">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <Image 
                src="/Fitflow-Dashboard.png" 
                alt="Fitflow Logo" 
                width={180} 
                height={40} 
                className="h-8 md:h-9 w-auto object-contain transition-all duration-300 group-hover:opacity-80 brightness-0 invert" 
                priority
              />
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400 max-w-sm">
              FitFlow connects you with top trainers and a supportive community to help you reach your fitness potential.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-2 pt-2">
              {[
                { label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                { label: "Twitter", path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" },
                { label: "YouTube", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
              ].map(({ label, path }) => (
                <a key={label} href="#" aria-label={label}
                  className="flex items-center justify-center size-9 rounded-xl bg-zinc-900 border border-zinc-800/60 hover:border-blue-500 text-zinc-400 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  <svg className="size-3.5 fill-current" viewBox="0 0 24 24"><path d={path} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="sm:col-span-6 lg:col-span-4 grid grid-cols-2 gap-4 border-l border-zinc-900/50 pl-0 lg:pl-8">
            {/* Navigate Link List */}
            <div className="space-y-4">
              <h3 className="text-zinc-200 font-semibold text-sm uppercase tracking-wider">Navigate</h3>
              <ul className="space-y-2.5 text-sm">
                {[
                  { name: "Home", href: "/" },
                  { name: "Browse Classes", href: "/classes" },
                  { name: "Community", href: "/forums" },
                  { name: "Become a Trainer", href: "/dashboard" },
                  { name: "Get Started", href: "/register" },
                ].map(({ name, href }) => (
                  <li key={name}>
                    <Link href={href} className="inline-block text-zinc-400 hover:text-blue-400 transition-all duration-200 transform hover:translate-x-1">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories Link List */}
            <div className="space-y-4">
              <h3 className="text-zinc-200 font-semibold text-sm uppercase tracking-wider">Categories</h3>
              <ul className="space-y-2.5 text-sm">
                {[
                  { name: "Yoga", href: "/classes?category=Yoga" },
                  { name: "Strength", href: "/classes?category=Strength" },
                  { name: "Cardio", href: "/classes?category=Cardio" },
                  { name: "Zumba", href: "/classes?category=Zumba" },
                  { name: "Pilates", href: "/classes?category=Pilates" },
                ].map(({ name, href }) => (
                  <li key={name}>
                    <Link href={href} className="inline-block text-zinc-400 hover:text-blue-400 transition-all duration-200 transform hover:translate-x-1">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="sm:col-span-6 lg:col-span-4 space-y-4 bg-zinc-900/30 border border-zinc-900 p-6 rounded-2xl relative overflow-hidden backdrop-blur-sm">
            <h3 className="text-zinc-200 font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
              Stay Updated
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Get the latest class updates and fitness tips straight to your inbox.
            </p>
            <form className="space-y-2.5" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="your@email.com" 
                className="w-full h-10 bg-zinc-900 text-zinc-300 border-zinc-800 focus-visible:border-blue-600 focus-visible:ring-0 rounded-xl placeholder:text-zinc-600 text-sm"
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium h-10 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-blue-600/10">
                <Sparkles className="size-3.5 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>

        </div>

        {/* Contact Info Strip */}
        <div className="flex flex-wrap items-center justify-start gap-y-3 gap-x-6 py-8 text-xs text-zinc-400 border-b border-zinc-900">
          <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-zinc-200 transition-colors py-1.5 px-3 rounded-full bg-zinc-900/40 border border-zinc-900">
            <Phone className="size-3.5 text-blue-500" />
            <span>+1 234 567 890</span>
          </a>
          <a href="mailto:support@fitflow.com" className="flex items-center gap-2 hover:text-zinc-200 transition-colors py-1.5 px-3 rounded-full bg-zinc-900/40 border border-zinc-900">
            <Mail className="size-3.5 text-blue-500" />
            <span>support@fitflow.com</span>
          </a>
          <div className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-zinc-900/40 border border-zinc-900">
            <MapPin className="size-3.5 text-blue-500" />
            <span>123 Fitness Ave, NY</span>
          </div>
        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>&copy; {new Date().getFullYear()} FitFlow. All rights reserved.</p>
          <div className="flex items-center gap-4 font-medium">
            <Link href="#" className="hover:text-zinc-300 transition-colors">Privacy</Link>
            <span className="size-1 rounded-full bg-zinc-800"></span>
            <Link href="#" className="hover:text-zinc-300 transition-colors">Help</Link>
            <span className="size-1 rounded-full bg-zinc-800"></span>
            <Link href="#" className="hover:text-zinc-300 transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}