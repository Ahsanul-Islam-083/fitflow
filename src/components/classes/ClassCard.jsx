
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Heart, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function ClassCard({ cls, isFavorited, onToggleFavorite }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="p-0 group h-full overflow-hidden border-0 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.1)] dark:hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)] transition-all duration-500 flex flex-col bg-white dark:bg-zinc-900 relative rounded-2xl">
      
        {/* Image Section */}
        <div className="relative h-[200px] w-full overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={cls.image} 
            alt={cls.title} 
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute bottom-3 left-3 z-20">
            <Badge className="bg-white/90 text-zinc-800 border-0 px-2.5 py-0.5 font-semibold tracking-wide rounded-md text-[10px] uppercase shadow-sm backdrop-blur-sm">
              {cls.category || "Class"}
            </Badge>
          </div>

          {/* Favorite Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite?.(cls._id);
            }}
            className={cn(
              "absolute top-3 right-3 z-20 h-8 w-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition-all duration-200 active:scale-90",
              isFavorited 
                ? "text-red-500 bg-red-500/20" 
                : "text-white/70 hover:text-white hover:bg-black/50"
            )}
          >
            <Heart className={cn("size-3.5", isFavorited ? "fill-red-500" : "")} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 px-4 pb-4 pt-3.5 gap-3">
          
          {/* Title + Price */}
          <div className="flex justify-between items-start gap-3">
            <h3 className="font-heading text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2 flex-1">
              {cls.title}
            </h3>
            <div className="shrink-0 bg-blue-600 text-white px-2 py-0.5 rounded-md">
              <span className="text-sm font-bold tracking-tight">
                ${parseFloat(cls.price).toFixed(0)}
              </span>
            </div>
          </div>
          
          {/* Coach Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {cls.trainer?.image || cls.trainerImage ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img 
                  src={cls.trainer?.image || cls.trainerImage} 
                  alt={cls.trainer?.name || cls.trainerName || "Coach"} 
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-700" 
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-zinc-500">FT</span>
                </div>
              )}
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 truncate max-w-[120px]">
                {cls.trainer?.name || cls.trainerName || "Expert Trainer"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">
              <Users className="size-3" />
              {cls.enrolledCount || 0}
            </div>
          </div>

          {/* Metric Pills */}
          <div className="flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-semibold px-2 py-1 rounded-md">
              <Clock className="size-3" /> {cls.duration} min
            </span>
            <span className="inline-flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-semibold px-2 py-1 rounded-md">
              <Zap className="size-3 text-amber-500" /> {cls.estBurn ? `${cls.estBurn} cal` : '420 cal'}
            </span>
            <span className="inline-flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-semibold px-2 py-1 rounded-md capitalize">
              {cls.difficulty || "Advanced"}
            </span>
            <span className="inline-flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-semibold px-2 py-1 rounded-md">
              {cls.focus || "Full Body"}
            </span>
          </div>

          {/* Schedule */}
          <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2 rounded-xl">
            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              {cls.time || "05:30 AM"}
            </span>
            <div className="flex gap-1">
              {cls.scheduleDays && cls.scheduleDays.length > 0 ? (
                cls.scheduleDays.slice(0, 3).map((day, idx) => (
                  <span key={idx} className="bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                    {day.substring(0,3)}
                  </span>
                ))
              ) : (
                ["TUE", "FRI", "SAT"].map((day) => (
                  <span key={day} className="bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                    {day}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Button */}
          <Button 
            asChild 
            className="w-full bg-blue-600 text-white hover:bg-blue-500 h-11 uppercase tracking-[0.1em] text-[11px] font-bold rounded-xl transition-all shadow-none group/btn mt-1"
          >
            <Link href={`/classes/${cls._id}`} className="flex items-center justify-center gap-1.5">
              <span>Details</span>
              <ArrowRight className="size-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}