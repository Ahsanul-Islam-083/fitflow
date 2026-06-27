"use client";

import { ArrowLeft, Image as ImageIcon, MessageSquareText, UploadCloud, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateForumPost } from "@/lib/actions/forumPosts";

export default function EditForumPostForm({ backHref, initialData }) {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialData?.image || null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [category, setCategory] = useState(initialData?.category || "Cardio");
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    
    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          const objectUrl = URL.createObjectURL(file);
          setImagePreview(objectUrl);
        }, 300);
      }
    }, 150);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile && !imagePreview) {
      setError("Please select an image");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      let imageUrl = initialData?.image; // keep existing by default

      // 1. Upload new image to imgbb only if a new file was selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        
        const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, {
          method: "POST",
          body: formData,
        });
        const imgbbData = await imgbbRes.json();
        
        if (!imgbbData.success) {
          throw new Error("Failed to upload image");
        }
        
        imageUrl = imgbbData.data.url;
      }

      // 2. Submit post to backend
      const title = e.target.title.value;
      const description = e.target.description.value;
      
      const postData = {
        title,
        description,
        category,
        image: imageUrl || null,
      };

      const res = await updateForumPost(initialData._id, postData);

      if (res.message && res.message.includes("Forbidden")) {
        throw new Error(res.message);
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <Link
          href={backHref}
          className="flex size-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-400 dark:text-zinc-500"
        >
          <ArrowLeft className="size-4.5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Edit Forum Post</h1>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            Update your post details and content below.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="rounded-2xl border-0 bg-white dark:bg-zinc-900 shadow-sm">
        <form className="px-6 py-6 space-y-6" onSubmit={handleSubmit}>
          
          {error && (
            <div className="rounded-xl bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 flex items-start gap-2.5">
              <X className="mt-0.5 size-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-2.5">
              <X className="mt-0.5 size-4 shrink-0" />
              <p>Post updated successfully!</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Post Title
              </Label>
              <Input
                id="title"
                type="text"
                defaultValue={initialData?.title}
                placeholder="e.g., Important update to our class schedule..."
                className="h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-sm"
                required
              />
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-sm">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent sideOffset={4} className="rounded-xl border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg">
                  {["Yoga", "Strength Training", "Cardio", "CrossFit", "HIIT", "Recovery", "Pilates"].map((cat) => (
                    <SelectItem key={cat} value={cat} className="rounded-lg focus:bg-blue-50 dark:focus:bg-blue-950/40 focus:text-blue-600 dark:focus:text-blue-400 font-medium cursor-pointer py-2.5 px-3 my-0.5 mx-1 text-sm">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Featured Image
            </Label>

            {imagePreview ? (
              <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/30 aspect-video w-full group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="flex items-center gap-2 rounded-lg bg-white/90 dark:bg-zinc-800/90 px-3.5 py-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-lg backdrop-blur-sm"
                  >
                    <X className="size-4" /> Remove Image
                  </button>
                </div>
              </div>
            ) : isUploading ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/30 p-10 text-center">
                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 animate-pulse">
                  <ImageIcon className="size-6 animate-bounce" />
                </div>
                <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Uploading image...</h3>
                <div className="w-full max-w-xs h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">{uploadProgress}% complete</p>
              </div>
            ) : (
              <div
                className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${
                  dragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="image"
                  ref={fileInputRef}
                  onChange={handleChange}
                  className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
                  accept="image/*"
                />
                <div className="flex size-14 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="size-6" />
                </div>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Drag and drop your image here</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">or click to browse from your computer</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-4 uppercase tracking-wider font-semibold">Max file size: 5MB</p>
              </div>
            )}
          </div>

          {/* Description Textarea */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Post Content
            </Label>
            <Textarea
              id="description"
              defaultValue={initialData?.description}
              placeholder="Write the full content of your post here..."
              className="min-h-[220px] rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-sm resize-y"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm active:scale-[0.97] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              <MessageSquareText className="size-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
