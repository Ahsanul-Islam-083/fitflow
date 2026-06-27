"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export function CallToAction() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-blue-700 mt-20 relative z-10 -mb-[1px] overflow-hidden">
      {/* Decorative ring */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-[20px] border-white/5 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full border-[16px] border-white/5 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-blue-200 ring-1 ring-white/20 mb-4">
              <MessageCircle className="size-3.5" />
              <span>We're here to help</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Ready to Take the Next Step?
            </h2>
            <p className="mt-2 text-blue-100/80 max-w-xl leading-relaxed">
              Have questions about our programs, pricing, or membership? Our team is ready to assist you on your fitness journey.
            </p>
          </div>

          {/* Right Button */}
          <div className="shrink-0">
            <Button asChild className="bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 h-13 px-8 text-sm font-bold shadow-xl transition-all hover:scale-105 active:scale-95">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
