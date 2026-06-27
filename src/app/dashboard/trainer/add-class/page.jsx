"use client";

import { createClass } from "@/lib/api/classes";
import { useSession } from "@/lib/auth-client";
import { CalendarClock, ImageIcon, Info, Loader2, Save, Target, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const MINUTES = ["00", "15", "30", "45"];

export default function AddClassPage() {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // Controlled inputs for complex fields
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [focus, setFocus] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  
  // Image Upload State
  const [imageUrl, setImageUrl] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  
  // Custom Time Picker State
  const [hour, setHour] = useState("08");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmpm] = useState("AM");

  const toggleDay = (day) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setError(null);
    
    try {
      const imgData = new FormData();
      imgData.append("image", file);

      const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, {
        method: "POST",
        body: imgData,
      });
      const imgbbResult = await imgbbRes.json();

      if (!imgbbResult.success) {
        throw new Error("Failed to upload image to ImgBB");
      }

      setImageUrl(imgbbResult.data.url);
    } catch (err) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!session?.user) {
      setError("You must be logged in as a trainer to add a class.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const duration = formData.get("duration");
    const price = formData.get("price");
    const description = formData.get("description");
    const imageFile = formData.get("image");
    const estBurn = formData.get("estBurn");
    
    const time = `${hour}:${minute} ${ampm}`;

    if (!title || !category || !difficulty || !focus || !estBurn || !duration || !price || selectedDays.length === 0 || !description || !imageUrl) {
      setError("Please fill in all required fields and ensure the cover image has finished uploading.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit Class Data
      const classData = {
        trainerId: session.user.id,
        trainerName: session.user.name,
        title,
        image: imageUrl,
        category,
        difficulty,
        focus,
        estBurn: parseInt(estBurn, 10),
        duration,
        price: parseFloat(price),
        scheduleDays: selectedDays,
        time,
        description,
      };

      const res = await createClass(classData);
      if (res.message && res.message.includes("Failed")) {
        throw new Error(res.message);
      }

      toast.success("Class submitted successfully!");

      // Success! Redirect to class list
      router.push("/dashboard/trainer/classes");
    } catch (err) {
      setError(err.message || "An unexpected error occurred while adding the class.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-16">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Add New Class</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Structure your new fitness class and submit it for platform approval.
        </p>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 flex items-start gap-2.5">
          <XCircle className="mt-0.5 size-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Main Content */}
        <div className="rounded-2xl border-0 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                <Info className="size-4.5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-zinc-900 dark:text-white">Basic Information</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Core details about what you&apos;ll be teaching.</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Class Name</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Power Yoga Flow"
                className="h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-sm"
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-sm">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-700">
                    <SelectItem value="Yoga">Yoga</SelectItem>
                    <SelectItem value="Strength">Strength</SelectItem>
                    <SelectItem value="Cardio">Cardio</SelectItem>
                    <SelectItem value="Flexibility">Flexibility</SelectItem>
                    <SelectItem value="CrossFit">CrossFit</SelectItem>
                    <SelectItem value="HIIT">HIIT</SelectItem>
                    <SelectItem value="Recovery">Recovery</SelectItem>
                    <SelectItem value="Pilates">Pilates</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Difficulty Level</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-sm">
                    <SelectValue placeholder="Select Difficulty" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-700">
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="All Levels">All Levels</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Focus Area</Label>
                <Select value={focus} onValueChange={setFocus}>
                  <SelectTrigger className="h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-sm">
                    <SelectValue placeholder="Select Focus" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-700">
                    <SelectItem value="Full Body">Full Body</SelectItem>
                    <SelectItem value="Upper Body">Upper Body</SelectItem>
                    <SelectItem value="Lower Body">Lower Body</SelectItem>
                    <SelectItem value="Core">Core</SelectItem>
                    <SelectItem value="Flexibility">Flexibility</SelectItem>
                    <SelectItem value="Endurance">Endurance</SelectItem>
                    <SelectItem value="Balance">Balance</SelectItem>
                    <SelectItem value="Recovery">Recovery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estBurn" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Estimated Burn (Kcal)</Label>
                <Input
                  id="estBurn"
                  name="estBurn"
                  type="number"
                  min="50"
                  placeholder="e.g. 450"
                  className="h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Duration (Mins)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  placeholder="e.g. 60"
                  className="h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Price per Class ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="25.00"
                  className="h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide a detailed description of what members can expect..."
                className="min-h-[140px] rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-sm resize-y"
                required
              />
            </div>
          </div>
        </div>

        {/* Two-column side section */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Media */}
          <div className="rounded-2xl border-0 bg-white dark:bg-zinc-900 shadow-sm">
            <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                  <Target className="size-4.5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-zinc-900 dark:text-white">Media</h2>
                </div>
              </div>
            </div>
            <div className="px-6 py-5">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Cover Image</Label>
                <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer group relative overflow-hidden min-h-[180px]">
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 disabled:cursor-not-allowed"
                  />
                  
                  {isUploadingImage ? (
                    <div className="flex flex-col items-center justify-center z-10">
                      <Loader2 className="size-7 text-blue-600 dark:text-blue-400 animate-spin mb-3" />
                      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Uploading Image...</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Please wait</p>
                    </div>
                  ) : imageUrl ? (
                    <div className="absolute inset-0 z-10 bg-white dark:bg-zinc-900">
                      <img src={imageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-sm font-semibold bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">Click to Change Image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center z-10 pointer-events-none">
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                        <ImageIcon className="size-6" />
                      </div>
                      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Click to upload cover image</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 font-medium">SVG, PNG, JPG or GIF (max. 5MB)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Scheduling */}
          <div className="rounded-2xl border-0 bg-white dark:bg-zinc-900 shadow-sm">
            <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                  <CalendarClock className="size-4.5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-zinc-900 dark:text-white">Scheduling</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">When does this class take place?</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-5 space-y-5">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Active Days</Label>
                <div className="flex gap-1.5">
                  {DAYS_OF_WEEK.map((day) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`flex-1 h-9 rounded-lg text-xs font-semibold transition-colors border ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                {selectedDays.length === 0 && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">Please select at least one day.</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Class Time</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Select value={hour} onValueChange={setHour}>
                      <SelectTrigger className="h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-sm px-3">
                        <SelectValue placeholder="HH" />
                      </SelectTrigger>
                      <SelectContent className="max-h-48 rounded-xl border-zinc-200 dark:border-zinc-700">
                        {HOURS.map((h) => (
                          <SelectItem key={h} value={h}>{h}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <span className="text-zinc-300 dark:text-zinc-600 font-bold">:</span>
                  <div className="flex-1">
                    <Select value={minute} onValueChange={setMinute}>
                      <SelectTrigger className="h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-sm px-3">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-700">
                        {MINUTES.map((m) => (
                          <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Select value={ampm} onValueChange={setAmpm}>
                      <SelectTrigger className="h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-sm font-semibold px-3">
                        <SelectValue placeholder="AM/PM" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-700">
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Classes must be approved by an admin before they are visible to the public.
          </p>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl gap-2 font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all active:scale-[0.97] h-10 px-6"
          >
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {isSubmitting ? "Submitting..." : "Submit Class"}
          </Button>
        </div>
      </form>
    </div>
  );
}
