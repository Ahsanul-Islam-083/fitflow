"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Tabs({ ...props }) {
  return <TabsPrimitive.Root data-slot="tabs" {...props} />;
}

function TabsList({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-10 w-fit items-center justify-center gap-1 rounded-xl bg-blue-50 p-1 text-muted-foreground dark:bg-blue-900/20",
        className
      )}
      {...props} />
  );
}

function TabsTrigger({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm dark:data-[state=active]:bg-blue-950/60 dark:data-[state=active]:text-blue-300",
        className
      )}
      {...props} />
  );
}

function TabsContent({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("mt-3 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50", className)}
      {...props} />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
