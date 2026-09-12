"use client";
// MONGODB INTEGRATION: Added useState and useRouter for form handling and navigation
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// MONGODB INTEGRATION: Import useAuth hook for authentication state management
import { useAuth } from "../../contexts/AuthContext";

import { BorderColor } from "@mui/icons-material";
import { Button } from "antd";
import Link from "next/link";
import React from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  
  // MONGODB INTEGRATION: Added state management for form inputs and loading/error states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  // MONGODB INTEGRATION: Get login function from AuthContext
  const { login } = useAuth();

  // MONGODB INTEGRATION: Added function to handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  // MONGODB INTEGRATION: Added function to handle form submission and API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // MONGODB INTEGRATION: Use AuthContext login function instead of manual localStorage
        login(data.user, data.token);
        
        // Redirect to home page after successful login
        router.push("/");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen login-background text-white overflow-hidden">
      <div className="relative flex h-full items-center justify-center px-4 py-6 lg:px-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_34%)]" />
        <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.22),_transparent_60%)]" />
        <div className="pointer-events-none absolute left-0 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(14,165,233,0.25),_transparent_52%)] blur-3xl" />

        <div className="relative flex h-full w-full max-w-4xl flex-col gap-6 rounded-[40px] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-slate-900/40 backdrop-blur-3xl ring-1 ring-white/10 lg:flex-row lg:p-8">
          <div className="flex w-full flex-col justify-center gap-6 lg:w-1/2">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Ticket Wales</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Book your next trip faster
              </h1>
              <p className="max-w-md text-sm leading-6 text-cyan-100/80">
                Sign in to manage bookings, discover offers, and keep your travel plans ready from anywhere.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/15 bg-slate-950/30 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-2xl">
              <div className="mb-6 flex items-center justify-between gap-3 text-sm text-slate-300">
                <div>
                  <p className="font-medium text-white">Welcome Back</p>
                  <p className="text-slate-400">Sign in to continue to your account</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.24em] text-cyan-100/90">
                  Secure
                </span>
              </div>

              <Link
                href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?access_type=offline&client_id=32073492121-s6ur8ti01mh34gq2bpbufb8ujdfrpn4v.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdribbble.com%2Fauth%2Fgoogle_signup%2Fcallback&response_type=code&scope=email%20profile&state=d9cac1c0dd7cde9e808d45428ec9f4e5f4d00e2e4619cf6f&service=lso&o2v=1&flowName=GeneralOAuthFlow"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 block"
              >
                <Button
                  style={{
                    borderRadius: "999px",
                    height: 44,
                    fontSize: "14px",
                  }}
                  className="flex w-full items-center justify-center gap-2 border border-white/15 bg-white/10 px-4 text-sm text-white transition duration-200 hover:bg-white/20"
                  variant="outlined"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                    alt="Google Logo"
                    className="h-5 w-auto"
                  />
                  <span className="hidden sm:inline">Continue with Google</span>
                </Button>
              </Link>

              <div className="mb-6 flex items-center justify-center gap-3 text-xs text-slate-400 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
                <span>or continue with email</span>
              </div>

              {error && (
                <div className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full rounded-3xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300 focus:bg-white/15 focus:ring-2 focus:ring-cyan-300/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="w-full rounded-3xl border border-white/15 bg-white/10 px-4 py-3 pr-12 text-sm text-white outline-none transition focus:border-cyan-300 focus:bg-white/15 focus:ring-2 focus:ring-cyan-300/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 transition hover:text-white"
                    >
                      {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="travel-cta relative overflow-hidden w-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {loading ? "Logging in..." : "Login & Explore"}
                  </span>
                </button>
              </form>

              <p className="mt-4 text-center text-sm">
                <Link href="/forgot-password" className="text-cyan-200 font-medium hover:text-cyan-100 transition">
                  Forgot Password?
                </Link>
              </p>

              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                By continuing, you agree to our{" "}
                <Link href="/privacy" className="text-cyan-200 font-medium">
                  terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-cyan-200 font-medium">
                  privacy policy
                </Link>
                .
              </p>

              <p className="text-center text-sm text-slate-300">
                Don't have an account?{" "}
                <Link href="/signup" className="font-semibold text-white">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center">
            <div className="relative h-full w-full max-w-lg overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_26%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(192,132,252,0.16),_transparent_30%)]" />
              <video
                src="https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949"
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="relative h-full w-full rounded-[32px]"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

