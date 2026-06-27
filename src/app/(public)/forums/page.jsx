"use client";

import { ArrowRight, MessageSquareText, Search, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { getForumPosts } from "@/lib/api/forumPosts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ForumPostCard from "@/components/forums/ForumPostCard";
import GlobalLoading from "@/components/shared/GlobalLoading";

export default function ForumPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const limit = 8;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getForumPosts(1, limit);
        if (data.message) throw new Error(data.message);
        setPosts(data.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const featuredMain = posts.length > 0 ? posts[0] : null;
  const featuredSide = posts.slice(1, 5);
  const latestPosts = posts.slice(5);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search");
    if (query && query.trim()) {
      router.push(`/forums/latest?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pb-16">

      <div className="mx-auto max-w-7xl px-4 lg:px-8 pt-24 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            
            <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-[0.2em]">Community Hub</span>
            
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Connect, Share, and Grow Together.
          </h1>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mb-12"
        >
          <form onSubmit={handleSearch} className="flex w-full max-w-2xl bg-zinc-100 dark:bg-zinc-800 rounded-xl p-1 gap-0">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400 dark:text-zinc-500" />
              <Input
                name="search"
                placeholder="Search discussions..."
                className="h-10 w-full rounded-xl border-0 bg-transparent pl-10 text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus-visible:ring-0 shadow-none"
              />
            </div>
            <Button type="submit" className="h-10 px-5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shrink-0">
              Search
            </Button>
          </form>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8 space-y-16 animate-in fade-in duration-700">

        {loading ? (
          <GlobalLoading message="Loading discussions..." />
        ) : error ? (
          <div className="py-24 text-center">
            <p className="text-sm font-medium text-red-500">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-24 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4 text-zinc-400 dark:text-zinc-500">
              <MessageSquareText className="size-7" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">No posts found</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Check back later for new discussions.</p>
          </div>
        ) : (
          <>

            {/* Popular Discussions */}
            {featuredMain && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="size-1.5 rounded-full bg-blue-600 shrink-0" />
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Popular Discussions</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Featured large card */}
                  <div className="lg:col-span-7">
                    <Link href={`/forums/${featuredMain._id}`} className="block group">
                      <div className="relative overflow-hidden rounded-xl aspect-video w-full border-0 bg-zinc-100 dark:bg-zinc-800 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-0.5">
                        {featuredMain.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={featuredMain.image} alt={featuredMain.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <MessageSquareText className="size-12 text-zinc-300 dark:text-zinc-600" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-blue-600 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 border-0">Featured</Badge>
                          {featuredMain.category && (
                            <Badge className="bg-black/50 text-white border border-white/20 text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 backdrop-blur-sm">
                              {featuredMain.category}
                            </Badge>
                          )}
                        </div>
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-20">
                          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-3 group-hover:text-blue-400 transition-colors">
                            {featuredMain.title}
                          </h3>
                          <div className="flex items-center gap-3 text-white/80 text-xs font-medium">
                            <span className="flex items-center gap-1.5">
                              <Avatar className="size-5 border border-white/20">
                                <AvatarImage src={featuredMain.authorImage} />
                                <AvatarFallback className="bg-white/10 text-white text-[8px]">{featuredMain.author ? featuredMain.author.charAt(0).toUpperCase() : "A"}</AvatarFallback>
                              </Avatar>
                              {featuredMain.author || "Anonymous"}
                            </span>
                            <span className="text-white/40">|</span>
                            <span>{new Date(featuredMain.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            <span className="text-white/40">|</span>
                            <span className="flex items-center gap-1"><ThumbsUp className="size-3" /> {featuredMain.upvotes || 0}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Side stacked cards */}
                  <div className="lg:col-span-5 grid grid-cols-1 gap-3">
                    {featuredSide.map(post => (
                      <Link href={`/forums/${post._id}`} key={post._id} className="block group">
                        <div className="flex items-center gap-3 p-3 rounded-xl border-0 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300">
                          <div className="size-16 shrink-0 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                            {post.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            ) : (
                              <MessageSquareText className="size-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-300 dark:text-zinc-600" />
                            )}
                          </div>
                          <div className="flex flex-col justify-center min-w-0">
                            {post.category && (
                              <span className="text-[9px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-0.5">{post.category}</span>
                            )}
                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {post.title}
                            </h4>
                            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                              {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Latest Discussions */}
            {latestPosts.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <span className="size-1.5 rounded-full bg-blue-600 shrink-0" />
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Latest Discussions</h2>
                  </div>
                  <Button asChild variant="ghost" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-0">
                    <Link href="/forums/latest">
                      View All <ArrowRight className="size-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {latestPosts.map(post => (
                    <ForumPostCard key={post._id} post={post} />
                  ))}
                </div>

                <div className="flex justify-center pt-4">
                  <Button asChild className="h-10 px-6 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-sm">
                    <Link href="/forums/latest">
                      View All Discussions <ArrowRight className="size-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </section>
            )}

          </>
        )}

      </div>
    </main>
  );
}
