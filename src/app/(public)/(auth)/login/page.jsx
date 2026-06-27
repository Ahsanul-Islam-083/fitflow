"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Dumbbell,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/components/shared/Logo";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { useEffect } from "react";

const initialForm = {
  email: "",
  password: "",
};

const validateForm = (form) => {
  const nextErrors = {};
  const trimmedEmail = form.email.trim();

  if (!trimmedEmail) {
    nextErrors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!form.password) {
    nextErrors.password = "Password is required.";
  }

  return nextErrors;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const redirect = searchParams.get("redirect");
    if (redirect) {
      setRedirectUrl(`?redirect=${encodeURIComponent(redirect)}`);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => {
        const nextErrors = { ...currentErrors };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);

    const nextErrors = validateForm(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await signIn.email({
        email: form.email.trim().toLowerCase(),
        password: form.password,
        rememberMe: true,
      });

      if (response?.error) {
        setStatus({
          type: "error",
          text:
            response.error.message ||
            "Login failed. Please check your credentials and try again.",
        });
        return;
      }

      setForm(initialForm);
      setErrors({});
      setStatus({
        type: "success",
        text: "Login successful. Redirecting...",
      });
      setTimeout(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const redirectPath = searchParams.get("redirect") || "/dashboard";
        window.location.href = redirectPath;
      }, 1500);
    } catch (error) {
      setStatus({
        type: "error",
        text:
          error?.message ||
          "Login failed. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setStatus(null);
    setIsGoogleSubmitting(true);
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const redirect = searchParams.get("redirect");
      
      const response = await signIn.social({
        provider: "google",
        callbackURL: redirect || "/dashboard",
      });
      if (response?.error) {
        setStatus({
          type: "error",
          text:
            response.error.message ||
            "Google login failed. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        text:
          error?.message ||
          "Google login failed. Please check your connection and try again.",
      });
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-50 dark:bg-zinc-950 py-8 flex items-center justify-center">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="flex w-full bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border-0 shadow-sm min-h-[700px]">
          {/* Left side - Decorative & Brand */}
          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-zinc-900">
            <div className="absolute inset-0 select-none pointer-events-none">
              <Image
                src="/images/sporty.jpg"
                alt=""
                fill
                priority
                className="object-cover object-center opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-zinc-900/10" />
            </div>

            <div className="relative z-10 flex flex-col justify-between w-full p-10 lg:p-14 h-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link href="/" className="flex items-center w-fit">
                  <Logo className="h-9 w-auto brightness-0 invert" />
                </Link>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={fadeInUp} className="space-y-3">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    Ready to pick up <br />
                    <span className="text-blue-400">where you left off</span>?
                  </h1>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
                    Sign in to manage your bookings, track progress, and stay connected with your fitness community.
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="grid grid-cols-2 gap-3 pt-6 border-t border-zinc-800"
                >
                  <div className="p-3.5 rounded-xl bg-white/5 border border-zinc-800">
                    <div className="bg-blue-500/15 size-10 rounded-lg flex items-center justify-center mb-3">
                      <Dumbbell className="size-5 text-blue-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-0.5">Track Progress</h3>
                    <p className="text-xs text-zinc-400">View your session history and stats.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-zinc-800">
                    <div className="bg-blue-500/15 size-10 rounded-lg flex items-center justify-center mb-3">
                      <Calendar className="size-5 text-blue-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-0.5">Quick Booking</h3>
                    <p className="text-xs text-zinc-400">Reserve classes in seconds.</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-3 text-xs text-zinc-500"
              >
                <div className="flex -space-x-2.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="size-7 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center">
                      <User className="size-3.5 text-zinc-400" />
                    </div>
                  ))}
                </div>
                <p>Join <span className="text-zinc-300 font-semibold">10,000+</span> members</p>
              </motion.div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
            <div className="w-full max-w-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/" className="flex lg:hidden items-center mb-8">
                  <Logo className="h-7 w-auto" />
                </Link>

                <div className="mb-7 space-y-1.5">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Sign in</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Enter your credentials to access your account.</p>
                </div>

                <AnimatePresence mode="wait">
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className={`overflow-hidden rounded-lg border ${
                        status.type === "error"
                          ? "border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400"
                          : "border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 p-3 text-sm font-medium">
                        {status.type === "error" ? (
                          <AlertCircle className="size-4 shrink-0" />
                        ) : (
                          <CheckCircle2 className="size-4 shrink-0" />
                        )}
                        <p>{status.text}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isGoogleSubmitting}
                  className="w-full h-11 text-sm font-medium bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2.5 mb-5"
                >
                  {isGoogleSubmitting ? (
                    <div className="size-4 border-2 border-zinc-300 dark:border-zinc-600 border-t-zinc-700 dark:border-t-zinc-300 rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Continue with Google
                    </>
                  )}
                </Button>

                <div className="relative mb-5">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-400 dark:text-zinc-500">Or continue with</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="space-y-3.5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300" htmlFor="email">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
                          <Mail className="size-4" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          className={`h-10 w-full rounded-lg border bg-zinc-50 dark:bg-zinc-800/50 pl-9 pr-3.5 text-sm outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 ${
                            errors.email ? "border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-zinc-200 dark:border-zinc-700"
                          }`}
                          placeholder="john@example.com"
                          aria-invalid={Boolean(errors.email)}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-xs text-red-500 mt-1">{errors.email}</motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300" htmlFor="password">Password</label>
                        <Link href="/forgot-password" className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">Forgot password?</Link>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
                          <Lock className="size-4" />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={form.password}
                          onChange={handleChange}
                          className={`h-10 w-full rounded-lg border bg-zinc-50 dark:bg-zinc-800/50 pl-9 pr-10 text-sm outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 ${
                            errors.password ? "border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-zinc-200 dark:border-zinc-700"
                          }`}
                          placeholder="Enter your password"
                          aria-invalid={Boolean(errors.password)}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300" tabIndex={-1}>
                          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                      <AnimatePresence>
                        {errors.password && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-xs text-red-500 mt-1">{errors.password}</motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-10 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm mt-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Sign In
                        <ArrowRight className="size-4" />
                      </span>
                    )}
                  </Button>
                </form>

                <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
                  Don&apos;t have an account?{" "}
                  <Link href={`/register${redirectUrl}`} className="font-semibold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Create account
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
