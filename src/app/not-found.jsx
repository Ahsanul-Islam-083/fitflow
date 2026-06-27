import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6 py-12 md:py-24">
        
        <div className="max-w-2xl w-full text-center space-y-8 flex flex-col items-center">
          
          {/* 404 Graphic */}
          <div className="relative">
            <div className="text-[10rem] md:text-[14rem] font-black text-blue-600/10 dark:text-blue-600/5 select-none leading-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex gap-3">
                <div className="size-8 md:size-12 rounded-xl bg-blue-600 rotate-12 shadow-lg shadow-blue-600/30" />
                <div className="size-8 md:size-12 rounded-xl bg-blue-500 -rotate-6 shadow-lg shadow-blue-500/30" />
                <div className="size-8 md:size-12 rounded-xl bg-indigo-500 rotate-6 shadow-lg shadow-indigo-500/30" />
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-3 -mt-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-zinc-800 dark:text-zinc-200">
              Page not found
            </h2>
            <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
              This page took a rest day. Let's get you back to your workout.
            </p>
          </div>

          {/* Action */}
          <div className="pt-2">
            <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-12 px-7 text-sm font-bold shadow-lg shadow-blue-600/20 transition-all hover:shadow-blue-600/30 hover:-translate-y-0.5 active:scale-95">
              <Link href="/">
                <ArrowLeft className="size-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
