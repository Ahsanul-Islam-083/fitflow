import { Dumbbell, Zap, Heart, Flame } from "lucide-react";

const items = [
  { icon: Dumbbell, text: "Strength Training" },
  { icon: Heart, text: "Cardio & HIIT" },
  { icon: Zap, text: "Energy & Endurance" },
  { icon: Flame, text: "Burn & Transform" },
  { icon: Dumbbell, text: "Strength Training" },
  { icon: Heart, text: "Cardio & HIIT" },
  { icon: Zap, text: "Energy & Endurance" },
  { icon: Flame, text: "Burn & Transform" },
];

export default function Marquee() {
  return (
    <div className="overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 py-4 border-y border-blue-400/20 shadow-lg">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-loop {
          animation: marqueeScroll 30s linear infinite;
        }
      `}} />
      <div className="flex animate-marquee-loop gap-12 whitespace-nowrap w-max hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="inline-flex items-center gap-3">
              <div className="size-8 rounded-lg bg-white/15 flex items-center justify-center">
                <Icon className="size-4 text-white" />
              </div>
              <span className="text-sm font-bold text-white uppercase tracking-widest">
                {item.text}
              </span>
              <span className="size-1.5 rounded-full bg-white/30" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
