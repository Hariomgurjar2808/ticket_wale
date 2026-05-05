"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { ArrowLeftOutlined } from "@ant-design/icons";

function ResetPasswordContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [buttonAnimate, setButtonAnimate] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const contactMethod = searchParams.get("method") || "email";
  const contact = searchParams.get("contact") || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonAnimate(true);
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate reset code
    if (!resetCode.trim()) {
      setError("Reset code is required");
      setLoading(false);
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      setLoading(false);
      return;
    }

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [contactMethod]: contact,
          resetCode,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.error || "Failed to reset password");
      }
    } catch (error) {
      console.error("Reset password error:", error);
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
                Set New Password
              </h1>
              <p className="max-w-md text-sm leading-6 text-cyan-100/80">
                Enter the reset code you received and create a new password.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/15 bg-slate-950/30 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-2xl">
              <div className="mb-6 flex items-center justify-between gap-3 text-sm text-slate-300">
                <div>
                  <p className="font-medium text-white">Verify & Reset</p>
                  <p className="text-slate-400">Enter code and set your new password</p>
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
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">Reset Code</label>
                  <input
                    type="text"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    placeholder="Enter the 6-digit code sent to your email/phone"
                    className="w-full rounded-3xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300 focus:bg-white/15 focus:ring-2 focus:ring-cyan-300/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter your new password"
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
                  <p className="text-xs text-slate-400">At least 8 characters with uppercase, lowercase, number, and special character</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full rounded-3xl border border-white/15 bg-white/10 px-4 py-3 pr-12 text-sm text-white outline-none transition focus:border-cyan-300 focus:bg-white/15 focus:ring-2 focus:ring-cyan-300/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 transition hover:text-white"
                    >
                      {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </button>
                  </div>
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
                    {loading ? "Resetting Password..." : "Reset Password"}
                  </span>
                </button>
              </form>

              <div className="mt-4">
                <Link href="/forgot-password" className="flex items-center gap-2 text-sm text-cyan-200 hover:text-cyan-100 transition">
                  <ArrowLeftOutlined className="text-xs" />
                  Back to Forgot Password
                </Link>
              </div>

              <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                Remember your password?{" "}
                <Link href="/login" className="text-cyan-200 font-medium hover:text-cyan-100">
                  Sign In
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
