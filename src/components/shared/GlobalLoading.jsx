// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function GlobalLoading({ message = "Please wait while we fetch your data." }) {
//   return (
//     <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-8 p-8">
//       {/* Dynamic Logo/Spinner */}
//       <div className="relative flex items-center justify-center">
//         <motion.div 
//           animate={{ rotate: 360 }}
//           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//           className="absolute inset-0 rounded-full border-t-2 border-r-2 border-blue-600/40 w-24 h-24 -m-2"
//         />
//         <motion.div 
//           animate={{ rotate: -360 }}
//           transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//           className="absolute inset-0 rounded-full border-b-2 border-l-2 border-blue-600/40 w-28 h-28 -m-4"
//         />
//         <motion.div 
//           animate={{ scale: [1, 1.1, 1] }}
//           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//           className="flex size-20 items-center justify-center rounded-full bg-blue-600/10 border border-blue-600/20 backdrop-blur-sm shadow-xl shadow-blue-600/10"
//         >
//           <Image src="/NavbarLogo.png" alt="FitFlow Logo" width={48} height={48} priority={true} className="object-contain drop-shadow-md dark:brightness-0 dark:invert" />
//         </motion.div>
//       </div>
      
//       {/* Typography */}
//       <div className="flex flex-col items-center gap-3 text-center mt-4">
//         <motion.h3 
//           animate={{ opacity: [0.5, 1, 0.5] }}
//           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//           className="font-heading text-3xl md:text-4xl font-black uppercase tracking-[0.15em] text-foreground"
//         >
//           Loading
//         </motion.h3>
//         <p className="text-xs md:text-sm font-bold text-blue-600 uppercase tracking-[0.25em]">
//           {message}
//         </p>
//       </div>
//     </div>
//   );
// }


"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const bars = [0, 1, 2, 3, 4];

export default function GlobalLoading({ message = "Please wait while we fetch your data." }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 p-8">
        <div className="flex items-end gap-1 h-10">
          {bars.map((i) => (
            <div key={i} className="w-1.5 bg-blue-600/30 rounded-full" style={{ height: `${6 + i * 4}px` }} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="font-heading text-2xl font-black uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
            Loading
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 p-8">
      {/* Audio-visualizer bars */}
      <div className="flex items-end gap-1 h-10">
        {bars.map((i) => (
          <motion.div
            key={i}
            animate={{ height: ["8px", `${20 + i * 8}px`, "8px"] }}
            transition={{ duration: 0.8 + i * 0.15, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 bg-blue-600 rounded-full"
          />
        ))}
      </div>
      
      {/* Typography */}
      <div className="flex flex-col items-center gap-2 text-center">
        <motion.h3 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="font-heading text-2xl font-black uppercase tracking-[0.15em] text-zinc-800 dark:text-zinc-200"
        >
          Loading
        </motion.h3>
        <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-[0.2em]">
          {message}
        </p>
      </div>
    </div>
  );
}