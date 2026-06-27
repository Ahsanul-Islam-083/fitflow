import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

function Pagination({ className, ...props }) {
  return (
    <nav role="navigation" aria-label="pagination" data-slot="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />
  );
}

function PaginationContent({
  className,
  ...props
}) {
  return <ul data-slot="pagination-content" className={cn("flex flex-row items-center gap-1.5", className)} {...props} />;
}

function PaginationItem({ ...props }) {
  return <li data-slot="pagination-item" {...props} />;
}

function PaginationLink({
  className,
  isActive,
  size = "default",
  ...props
}) {
  return (
    <Button
      size={size}
      variant={isActive ? "default" : "ghost"}
      className={cn(
        "min-w-9 rounded-lg",
        isActive && "shadow-xs",
        className
      )}
      aria-current={isActive ? "page" : undefined}
      {...props} />
  );
}

function PaginationPrevious({
  className,
  ...props
}) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1.5 pl-2.5", className)}
      {...props}>
      <ChevronLeftIcon />
      <span>Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1.5 pr-2.5", className)}
      {...props}>
      <span>Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}>
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious }
