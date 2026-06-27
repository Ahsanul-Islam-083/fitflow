"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle } from "lucide-react";

const perks = [
  "Unlimited class access",
  "Personalized workout plans",
  "Expert trainer guidance",
  "Progress tracking",
];

export default function Promo() {
  return (
    <section className="relative w-full bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 dark:from-blue-950 dark:via-blue-900 dark:to-indigo-950 mt-20 md:mt-32 shadow-2xl overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-400/10 dark:bg-blue-400/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-400/10 dark:bg-indigo-400/5 blur-[100px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 py-16 md:py-24">
          {/* Left: Image */}
          <div className="w-full md:w-5/12 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-3xl bg-white/5 dark:bg-white/[0.02] blur-sm" />
              <img
                src="/images/cta.png"
                alt="Fitness transformation"
                className="relative w-full max-w-[380px] h-auto object-contain drop-shadow-2xl dark:brightness-90 dark:contrast-110"
              />
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-7/12 space-y-6 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 dark:bg-white/5 px-4 py-1.5 text-sm text-blue-200 dark:text-blue-300 ring-1 ring-white/20 dark:ring-white/10"
            >
              <Sparkles className="size-3.5" />
              <span>Limited time offer</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-3xl font-bold sm:text-4xl lg:text-5xl leading-tight"
            >
              Start Your{" "}
              <span className="text-blue-200 dark:text-blue-300">Free Trial</span>{" "}
              Today
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-blue-100/80 dark:text-blue-200/60 max-w-lg leading-relaxed"
            >
              Join FitFlow and get 14 days of full access to all features, programs, and trainers. No credit card required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2.5"
            >
              {perks.map((perk) => (
                <div key={perk} className="flex items-center gap-2.5">
                  <CheckCircle className="size-4 text-blue-300 dark:text-blue-400 shrink-0" />
                  <span className="text-sm text-white/90 dark:text-white/80">{perk}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <Button asChild className="bg-white text-blue-700 hover:bg-blue-50 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 h-12 px-8 text-sm font-bold shadow-xl">
                <Link href="/sign-up">
                  Claim Free Trial
                  <ArrowRight className="size-4 ml-1.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent dark:bg-transparent border-white/30 dark:border-white/20 text-white hover:bg-white/10 hover:text-white dark:hover:bg-white/5 h-12 px-8 text-sm font-bold shadow-none">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
