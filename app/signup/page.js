"use client";
// MONGODB INTEGRATION: Added useState and useRouter for form handling and navigation
import { useState } from "react";
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
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  
  // MONGODB INTEGRATION: Get login function from AuthContext
  const { login } = useAuth();

  // MONGODB INTEGRATION: Added function to handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  // MONGODB INTEGRATION: Added function to handle form submission and API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // MONGODB INTEGRATION: Auto-login user after successful registration
        login(data.user, data.token);
        setSuccess("Account created successfully! Redirecting to home...");
        
        // Redirect to home page after successful registration
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br animate-fadeIn bg-[#FFFBEB]  ">
      <div className="flex flex-row  min-h-screen bg-gradient-to-br  animate-fadeIn  ">
        {/* <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-rose-500 to-pink-500 tracking-wider drop-shadow-md flex justify-self-start ">
          Ticket_Wale
        </h1> */}
        <div className="bg-[#FFFBEB] w-full flex justify-center items-center overflow-hidden px-4 py-8">
          <div className=" p-5 shadow-md w-full max-w-sm rounded-2xl flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-center text-gray-800">
              Create Account
            </h1>

            <Link
              href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?access_type=offline&client_id=32073492121-s6ur8ti01mh34gq2bpbufb8ujdfrpn4v.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdribbble.com%2Fauth%2Fgoogle_signup%2Fcallback&response_type=code&scope=email%20profile&state=d9cac1c0dd7cde9e808d45428ec9f4e5f4d00e2e4619cf6f&service=lso&o2v=1&flowName=GeneralOAuthFlow"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                style={{
                  borderRadius: "30px",
                  height: 38,
                  fontSize: "14px",
                }}
                className="flex items-center justify-center gap-2 text-gray-700 bg-white border border-gray-300 hover:border-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 w-full shadow-sm"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                  alt="Google Logo"
                  className="h-5 w-auto"
                />
                Continue with Google
              </Button>
            </Link>

            <p className="text-black text-center text-sm">or</p>

            {/* MONGODB INTEGRATION: Added success and error message display */}
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-500 text-sm text-center bg-green-50 p-2 rounded">
                {success}
              </div>
            )}

            {/* MONGODB INTEGRATION: Updated form to handle submission and connect to MongoDB API */}
            <form className="space-y-3 text-sm" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 text-xs">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full h-[34px] px-3 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-xs">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email"
                  className="w-full h-[34px] px-3 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-xs">Phone (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  className="w-full h-[34px] px-3 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-gray-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password (min 6 characters)"
                    className="w-full px-3 py-1.5 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-gray-700 pr-10"
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[50%] translate-y-[-50%] text-gray-600 text-lg"
                  >
                    {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </button>
                </div>
              </div>

              {/* MONGODB INTEGRATION: Updated button to show loading state and handle form submission */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[34px] bg-black text-white text-xs rounded-full hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center mt-3 text-[11px] text-gray-600 leading-snug">
              By continuing, you agree to our{" "}
              <Link href="/privacy" className="text-black font-semibold underline">
                terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-black font-semibold underline">
                privacy policy
              </Link>
              .
            </p>

            <p className="text-center mt-3 text-[11px] text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-black font-semibold underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div>
          <video
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQyXmEaYyZI8v8jfob8kgwwdmZ-CXgtHDoww&s"
            src="https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949"
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="w-[700px] h-full rounded-xl"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </div>
  );
}
