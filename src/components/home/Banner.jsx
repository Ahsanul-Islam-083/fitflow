// "use client";

// import { Button } from "@/components/ui/button";
// import { ArrowRight, Dumbbell, Sparkles, TrendingUp } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useRef } from "react";

// function FloatingShape({ className, children }) {
//   return (
//     <div className={`absolute animate-float ${className}`}>
//       {children}
//     </div>
//   );
// }

// export default function Banner() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     let animId;
//     const particles = [];

//     for (let i = 0; i < 60; i++) {
//       particles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         size: Math.random() * 3 + 1,
//         speedX: (Math.random() - 0.5) * 0.5,
//         speedY: (Math.random() - 0.5) * 0.5,
//         opacity: Math.random() * 0.5 + 0.2,
//       });
//     }

//     const resize = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       particles.forEach((p) => {
//         p.x += p.speedX;
//         p.y += p.speedY;
//         if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
//         if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(147, 197, 253, ${p.opacity})`;
//         ctx.fill();
//       });
//       animId = requestAnimationFrame(animate);
//     };
//     animate();

//     return () => {
//       cancelAnimationFrame(animId);
//       window.removeEventListener("resize", resize);
//     };
//   }, []);

//   return (
//     <section className="relative min-h-[90vh] flex items-center overflow-hidden">
//       {/* Animated particle canvas */}
//       <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

//       {/* Bold gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 dark:bg-black z-0" />

//       {/* Radial glow orbs */}
//       <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-blue-500/20 blur-[120px] pointer-events-none z-0" />
//       <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none z-0" />
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-400/5 blur-[150px] pointer-events-none z-0" />

//       {/* Floating geometric shapes */}
//       <FloatingShape className="top-[15%] left-[8%]">
//         <div className="size-16 rounded-2xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 rotate-12" />
//       </FloatingShape>
//       <FloatingShape className="top-[25%] right-[12%]">
//         <div className="size-10 rounded-full bg-blue-400/10 ring-1 ring-blue-400/20" />
//       </FloatingShape>
//       <FloatingShape className="bottom-[20%] left-[15%]">
//         <div className="size-20 rounded-2xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 -rotate-12" />
//       </FloatingShape>
//       <FloatingShape className="bottom-[30%] right-[8%]">
//         <div className="size-12 rounded-lg bg-indigo-400/10 ring-1 ring-indigo-400/20 rotate-45" />
//       </FloatingShape>

//       {/* Grid pattern overlay */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-0" />

//       {/* Bottom wave */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent pointer-events-none z-0" />

//       <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
//         <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

//           {/* Left: Content */}
//           <div className="space-y-8">
//             <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-200 backdrop-blur-sm">
//               <Sparkles className="size-3.5 text-blue-300" />
//               <span>New: AI-powered workout plans</span>
//             </div>

//             <div>
//               <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
//                 <span className="text-white">Transform Your</span>
//                 <br />
//                 <span className="bg-gradient-to-r from-blue-300 via-blue-100 to-white bg-clip-text text-transparent">
//                   Body & Mind
//                 </span>
//               </h1>
//               <p className="mt-4 max-w-lg text-lg text-blue-200/80 leading-relaxed">
//                 FitFlow combines expert coaching, smart tracking, and a supportive community to help you reach your fitness goals faster.
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3">
//               <Button asChild size="lg" className="h-13 bg-white text-blue-900 hover:bg-blue-50 shadow-2xl shadow-blue-900/30 px-8 text-base font-semibold">
//                 <Link href="/sign-up">
//                   Start Free Trial
//                   <ArrowRight className="size-4 ml-1.5" />
//                 </Link>
//               </Button>
//               <Button asChild size="lg" variant="outline" className="h-13 border-blue-400/30 text-blue-200 hover:bg-blue-500/10 hover:text-white px-8 text-base font-semibold">
//                 <Link href="/classes">View Programs</Link>
//               </Button>
//             </div>

//             {/* Trusted bar */}
//             <div className="flex items-center gap-6 pt-2">
//               <div className="flex -space-x-2">
//                 {[1,2,3,4].map((i) => (
//                   <div key={i} className="size-8 rounded-full border-2 border-blue-800 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
//                     {String.fromCharCode(64+i)}
//                   </div>
//                 ))}
//                 <div className="size-8 rounded-full border-2 border-blue-800 bg-blue-900/50 flex items-center justify-center text-[10px] font-bold text-blue-300 backdrop-blur-sm">
//                   +5K
//                 </div>
//               </div>
//               <div className="text-sm">
//                 <p className="font-semibold text-white">5,000+</p>
//                 <p className="text-blue-300/70">active members</p>
//               </div>
//             </div>
//           </div>

//           {/* Right: Visual */}
//           <div className="relative hidden lg:flex items-center justify-center">
//             <div className="relative">
//               {/* Floating card 1 */}
//               <div className="absolute -top-6 -left-6 z-10 rounded-2xl bg-white/10 backdrop-blur-md p-4 shadow-xl shadow-blue-900/30 ring-1 ring-white/20">
//                 <div className="flex items-center gap-3">
//                   <div className="size-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
//                     <TrendingUp className="size-5 text-blue-300" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-blue-200/60">Progress</p>
//                     <p className="text-sm font-bold text-white">+28% this month</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Main image card */}
//               <div className="relative rounded-3xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-3 shadow-2xl shadow-blue-900/30 ring-1 ring-white/10">
//                 <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none" />
//                 <img
//                   src="/images/slider/slide-image-1.png"
//                   alt="Fitness hero"
//                   className="w-full max-w-[420px] h-auto rounded-2xl object-cover"
//                 />
//               </div>

//               {/* Floating card 2 */}
//               <div className="absolute -bottom-4 -right-4 z-10 rounded-2xl bg-white/10 backdrop-blur-md p-4 shadow-xl shadow-blue-900/30 ring-1 ring-white/20">
//                 <div className="flex items-center gap-3">
//                   <div className="size-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
//                     <Dumbbell className="size-5 text-blue-300" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-blue-200/60">Programs</p>
//                     <p className="text-sm font-bold text-white">50+ classes</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell, Sparkles, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Banner() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId;
    const particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-900">
      {/* Dynamic Interactive Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70" />

      {/* Atmospheric Glow Layout */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none z-0" />

      {/* Modern Radial Gradient Mask */}
      <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_center,transparent_20%,#09090b_90%)] bg-[radial-gradient(ellipse_at_center,transparent_20%,#f8fafc_90%)] pointer-events-none z-0" />
      
      {/* Grid Overlay Matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(39,39,42,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(39,39,42,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(39,39,42,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(39,39,42,0.15)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-12">

          {/* Left Column Content Layout */}
          <div className="space-y-8 lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-300 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/5 px-4 py-1.5 text-xs font-medium tracking-wide text-blue-600 dark:text-blue-400 backdrop-blur-md uppercase">
              <Sparkles className="size-3.5 text-blue-500 dark:text-blue-400 animate-pulse" />
              <span>New: AI-powered workout plans</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-sans text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.1] text-zinc-900 dark:text-white">
                Transform Your
                <span className="block mt-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 dark:bg-gradient-to-r dark:from-blue-400 dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">
                  Body & Mind
                </span>
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                FitFlow combines expert coaching, smart tracking, and a supportive community to help you reach your fitness goals faster.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button asChild size="lg" className="h-12 bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-600/20 px-8 text-sm font-semibold rounded-xl group transition-all duration-300">
                <Link href="/sign-up">
                  Start Free Trial
                  <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white px-8 text-sm font-semibold rounded-xl backdrop-blur-sm transition-all duration-300">
                <Link href="/classes">View Programs</Link>
              </Button>
            </div>

            {/* Social Trust Element */}
            <div className="flex items-center gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-900/80 max-w-md">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="size-9 rounded-full border-2 border-white dark:border-zinc-950 bg-gradient-to-tr from-zinc-300 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-600 dark:text-zinc-300">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                <div className="size-9 rounded-full border-2 border-white dark:border-zinc-950 bg-blue-100 dark:bg-blue-950/80 flex items-center justify-center text-[11px] font-bold text-blue-700 dark:text-blue-400 backdrop-blur-sm">
                  +5K
                </div>
              </div>
              <div className="text-xs sm:text-sm">
                <p className="font-bold text-zinc-800 dark:text-zinc-200">5,000+ Active Members</p>
                <p className="text-zinc-500 dark:text-zinc-400 font-normal">Thriving fitness community</p>
              </div>
            </div>
          </div>

          {/* Right Column Visual Mockup Layout */}
          <div className="relative lg:col-span-5 hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-[400px] aspect-[4/5] group">
              
              {/* Outer Neon Edge Lines */}
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-tr from-blue-600 to-indigo-600 opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500" />
              
              {/* Profile Card Container Frame */}
              <div className="relative w-full h-full rounded-[30px] bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-950 p-3 border border-zinc-200 dark:border-zinc-800/80 shadow-2xl overflow-hidden flex flex-col justify-between">
                
                {/* Header Badge */}
                <div className="flex justify-between items-center px-2 pt-2 z-10">
                  <div className="flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-xl backdrop-blur-md">
                    <Users className="size-3.5 text-blue-500 dark:text-blue-400" />
                    <span className="text-[11px] font-medium tracking-wide text-zinc-700 dark:text-zinc-300 uppercase">Live Sessions</span>
                  </div>
                </div>

                {/* Main Dynamic Image Layout */}
                <div className="absolute inset-3 rounded-[22px] overflow-hidden bg-zinc-200 dark:bg-zinc-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent dark:from-zinc-950 dark:via-zinc-950/10 dark:to-transparent z-10" />
                  <img
                    src="/images/banner.png"
                    alt="Fitness hero"
                    className="w-full h-full object-cover object-top grayscale-[20%] group-hover:scale-102 transition-transform duration-700"
                  />
                </div>

                {/* Layered Content Metrics Overlay */}
                <div className="grid grid-cols-2 gap-3 p-2 relative z-20 mt-auto">
                  {/* Metric Box 1 */}
                  <div className="rounded-2xl bg-white/90 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-xl p-3.5 shadow-xl">
                    <div className="size-8 rounded-lg bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mb-2">
                      <TrendingUp className="size-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-[10px] uppercase font-semibold tracking-wider text-zinc-500">Progress</p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white mt-0.5">+28% This Month</p>
                  </div>

                  {/* Metric Box 2 */}
                  <div className="rounded-2xl bg-white/90 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-xl p-3.5 shadow-xl">
                    <div className="size-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mb-2">
                      <Dumbbell className="size-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <p className="text-[10px] uppercase font-semibold tracking-wider text-zinc-500">Programs</p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white mt-0.5">50+ Classes</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}