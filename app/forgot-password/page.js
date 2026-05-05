"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function ForgotPasswordPage() {
  const [contactMethod, setContactMethod] = useState("email"); // "email" or "phone"
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [buttonAnimate, setButtonAnimate] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonAnimate(true);
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (contactMethod === "email") {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
      if (!emailRegex.test(contact)) {
        setError("Please provide a valid email address");
        setLoading(false);
        return;
      }
    } else {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(contact)) {
        setError("Phone number must be exactly 10 digits");
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [contactMethod]: contact,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Reset code sent to your ${contactMethod}. Redirecting...`);
        // Redirect to reset password page
        setTimeout(() => {
          router.push(`/reset-password?method=${contactMethod}&contact=${encodeURIComponent(contact)}`);
        }, 2000);
      } else {
        setError(data.error || "Failed to process request");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!buttonAnimate) return;
    const timer = window.setTimeout(() => {
      setButtonAnimate(false);
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [buttonAnimate]);

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
                Reset Password
              </h1>
              <p className="max-w-md text-sm leading-6 text-cyan-100/80">
                Enter your email or phone number to receive a password reset code.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/15 bg-slate-950/30 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-2xl">
              <div className="mb-6 flex items-center justify-between gap-3 text-sm text-slate-300">
                <div>
                  <p className="font-medium text-white">Recover Account</p>
                  <p className="text-slate-400">Choose how to verify your identity</p>
                </div>
              </div>

              {error && (
                <div className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200 mb-4">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-2xl bg-green-500/10 px-4 py-3 text-sm text-green-200 mb-4">
                  {success}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-200">Recovery Method</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setContactMethod("email")}
                      className={`flex-1 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        contactMethod === "email"
                          ? "bg-cyan-500/20 border border-cyan-400 text-cyan-100"
                          : "bg-white/10 border border-white/15 text-slate-300 hover:bg-white/15"
                      }`}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod("phone")}
                      className={`flex-1 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        contactMethod === "phone"
                          ? "bg-cyan-500/20 border border-cyan-400 text-cyan-100"
                          : "bg-white/10 border border-white/15 text-slate-300 hover:bg-white/15"
                      }`}
                    >
                      Phone
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">
                    {contactMethod === "email" ? "Email Address" : "Phone Number (10 digits)"}
                  </label>
                  <input
                    type={contactMethod === "email" ? "email" : "tel"}
                    value={contact}
                    onChange={(e) => setContact(contactMethod === "phone" ? e.target.value.replace(/\D/g, "").slice(0, 10) : e.target.value)}
                    placeholder={contactMethod === "email" ? "Enter your email" : "Enter 10-digit phone number"}
                    maxLength={contactMethod === "phone" ? "10" : undefined}
                    inputMode={contactMethod === "phone" ? "numeric" : "email"}
                    className="w-full rounded-3xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300 focus:bg-white/15 focus:ring-2 focus:ring-cyan-300/20"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`travel-cta relative overflow-hidden w-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 ${buttonAnimate ? "bus-running" : ""}`}
                >
                  <img
                    src="https://img.icons8.com/ios-filled/50/ffffff/bus.png"
                    alt="bus"
                    className="bus-runner absolute left-3 top-1/2 h-6 w-auto -translate-y-1/2 opacity-0"
                  />
                  <span className="relative z-10">
                    {loading ? "Sending Reset Code..." : "Send Reset Code"}
                  </span>
                </button>
              </form>

              <div className="mt-4 flex items-center justify-between">
                <Link href="/login" className="flex items-center gap-2 text-sm text-cyan-200 hover:text-cyan-100 transition">
                  <ArrowLeftOutlined className="text-xs" />
                  Back to Login
                </Link>
              </div>

              <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                Don't have an account?{" "}
                <Link href="/signup" className="text-cyan-200 font-medium hover:text-cyan-100">
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
