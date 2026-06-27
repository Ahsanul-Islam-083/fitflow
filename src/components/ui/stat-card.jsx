import { AnimatedCounter } from "@/components/ui/animated-counter";
import Link from "next/link";
import { cn } from "@/lib/utils";

const colorStyles = {
  blue: { icon: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400", value: "text-blue-600 dark:text-blue-400" },
  emerald: { icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400", value: "text-emerald-600 dark:text-emerald-400" },
  rose: { icon: "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400", value: "text-rose-600 dark:text-rose-400" },
  purple: { icon: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400", value: "text-purple-600 dark:text-purple-400" },
  orange: { icon: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400", value: "text-orange-600 dark:text-orange-400" },
  indigo: { icon: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400", value: "text-indigo-600 dark:text-indigo-400" },
  red: { icon: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400", value: "text-blue-600 dark:text-blue-400" },
  cyan: { icon: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400", value: "text-cyan-600 dark:text-cyan-400" }
};

export function StatCard({
  title,
  value,
  icon: Icon,
  color = "blue",
  description,
  prefix = "",
  link,
  variant = "default",
  className
}) {
  const styles = colorStyles[color] || colorStyles.blue;
  const isHorizontal = variant === "horizontal";

  if (isHorizontal) {
    return (
      <article className={cn("min-w-0 flex flex-col rounded-2xl border-0 bg-white dark:bg-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)] p-5 transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)]", className)}>
        <div className="flex items-center gap-3 mb-3">
          <div className={cn("flex size-9 items-center justify-center rounded-lg", styles.icon)}>
            <Icon className="size-4.5" />
          </div>
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{title}</span>
        </div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {typeof value === 'number' ? (
            <>{prefix}<AnimatedCounter value={value} /></>
          ) : (
            <>{prefix}{value}</>
          )}
        </div>
        {description && (
          <p className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-1">
            {description}
          </p>
        )}
      </article>
    );
  }

  return (
    <article className={cn("min-w-0 group relative overflow-hidden rounded-2xl border-0 bg-white dark:bg-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)] flex flex-col", className)}>
      <div className={cn("flex flex-col items-center justify-center text-center p-6")}>
        <div className={cn("flex size-12 items-center justify-center rounded-xl mb-3 group-hover:scale-110 transition-transform", styles.icon)}>
          <Icon className="size-5" />
        </div>
        <div className={cn("text-3xl font-heading font-bold flex items-center justify-center h-9", styles.value)}>
          {typeof value === 'number' ? (
            <>{prefix}<AnimatedCounter value={value} /></>
          ) : (
            <>{prefix}{value}</>
          )}
        </div>
        <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-1.5">
          {title}
        </p>
        {description && (
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-2">
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link href={link.href} className="mt-auto flex items-center justify-center w-full py-2.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors border-t border-zinc-100 dark:border-zinc-800">
          {link.text}
        </Link>
      )}
    </article>
  );
}
