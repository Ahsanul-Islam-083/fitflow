import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquareText, ArrowRight } from "lucide-react";

export default function ForumPostCard({ post }) {
  return (
    <Card className="group overflow-hidden rounded-2xl border-0 shadow-[0_2px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] dark:hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] transition-all duration-500 flex flex-col h-full bg-white dark:bg-zinc-900 cursor-pointer">
      <Link href={`/forums/${post._id}`} className="flex flex-1 flex-col">
        {post.image ? (
          <div className="w-full h-44 overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            {post.category && (
              <Badge className="absolute top-3 left-3 bg-white/90 text-zinc-800 border-0 px-2.5 py-0.5 tracking-wide rounded-md text-[10px] font-bold uppercase shadow-sm backdrop-blur-sm">
                {post.category}
              </Badge>
            )}
          </div>
        ) : (
          <div className="w-full h-36 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-zinc-100 dark:from-blue-600/15 dark:via-indigo-600/10 dark:to-zinc-900 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.08),transparent_60%)]" />
            <div className="text-center">
              <MessageSquareText className="size-10 text-blue-600/30 dark:text-blue-600/40 mx-auto mb-1" />
              {post.category && (
                <Badge className="bg-blue-600/10 text-blue-600 dark:text-blue-400 border-0 px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider">
                  {post.category}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <div className="flex flex-col flex-1 p-4 gap-2.5">
          
          {/* Meta row */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
              {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <div className="flex gap-2.5 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">
              <span className="flex items-center gap-1"><ThumbsUp className="size-3" /> {post.upvotes || 0}</span>
              <span className="flex items-center gap-1"><MessageSquareText className="size-3" /> {post.comments || 0}</span>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
          
          {/* Description */}
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed flex-1">
            {post.description}
          </p>

          {/* Read link */}
          <div className="flex items-center text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider group/link">
            <span>Read</span>
            <ArrowRight className="size-3 ml-1 transition-transform group-hover/link:translate-x-1 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
      
      {/* Footer */}
      <div className="flex items-center gap-2 px-4 pb-4 pt-0">
        <Avatar className="size-7 ring-1 ring-zinc-200 dark:ring-zinc-700">
          <AvatarImage src={post.authorImage} />
          <AvatarFallback className="text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500">{post.author ? post.author.charAt(0).toUpperCase() : "A"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 leading-tight">{post.author || "Anonymous"}</span>
          <span className="text-[9px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{post.role || "Member"}</span>
        </div>
      </div>
    </Card>
  );
}
