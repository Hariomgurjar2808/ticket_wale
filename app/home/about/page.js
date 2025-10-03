"use client";

import { Box, Button } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

export default function Page() {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push("/explore");
  };

  return (
    <div className="bg-[#FFFBEF]">
      {/* 🔹 Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#5b5ea6] shadow-md px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-mono text-yellow-400">Ticket_Wale</h1>
        <ul className="hidden md:flex space-x-4 lg:space-x-6 font-medium text-white">
          <li className="cursor-pointer text-3xl transition-colors">About</li>
        </ul>
        <Button
          className="text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2"
          style={{
            textTransform: "none",
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            fontSize: "12px",
          }}
          variant="contained"
        >
          <span className="hidden sm:inline">Download App</span>
          <span className="sm:hidden">App</span>
        </Button>
      </nav>

      {/* 🔹 Main Content with padding to avoid overlap with navbar */}
      <div className="pt-20 sm:pt-24 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-12 py-8 sm:py-12 text-white gap-8 lg:gap-12">
        {/* Left Content */}
        <Box className="w-full lg:max-w-xl text-gray-800 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
            Transport in India
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6 text-gray-700">
            Taxi, Bike, Bus Services
          </h2>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-800 max-w-2xl mx-auto lg:mx-0">
            <strong>Ticket_Wale</strong> is your all-in-one travel companion.
            Whether you're booking buses, trains, or flights — we provide a
            fast, secure, and hassle-free ticketing experience so you can focus
            on your journey.
          </p>
        </Box>

        {/* Right Image Grid */}
        <Box className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl flex flex-row gap-2 sm:gap-3 lg:gap-4">
          {/* Column 1 */}
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4 w-1/2">
            <img
              src="https://img.freepik.com/free-photo/front-view-young-female-sitting-bike-prayer-pose-white-background-woman-vacation-motorcycle-city-color-vehicle-road_179666-39277.jpg?semt=ais_hybrid&w=740"
              alt="Female on bike"
              className="w-full h-32 sm:h-40 lg:h-48 xl:h-56 object-cover shadow-lg transition-transform hover:scale-105 duration-300"
              style={{
                borderTopRightRadius: "30px",
                borderBottomLeftRadius: "30px",
              }}
            />
            <img
              src="https://img.freepik.com/premium-photo/yamaha-riders-stylish-couple-blue-superbike-city_1300520-1749.jpg"
              alt="Yamaha riders"
              className="w-full h-32 sm:h-40 lg:h-48 xl:h-56 object-cover shadow-lg transition-transform hover:scale-105 duration-300"
              style={{
                borderTopRightRadius: "30px",
                borderBottomLeftRadius: "30px",
              }}
            />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4 w-1/2">
            <img
              src="https://i.pinimg.com/736x/3a/9e/8f/3a9e8f5039cd3f83768e9791c2b01ed4.jpg"
              alt="Stylish couple"
              className="w-full h-32 sm:h-40 lg:h-48 xl:h-56 object-cover shadow-lg transition-transform hover:scale-105 duration-300"
              style={{
                borderTopRightRadius: "30px",
                borderBottomLeftRadius: "30px",
              }}
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zZf9Ig6WosUZyxhgjeQ1-4-m2YBtHP5uQg&s"
              alt="Bike rider"
              className="w-full h-32 sm:h-40 lg:h-48 xl:h-56 object-cover shadow-lg transition-transform hover:scale-105 duration-300"
              style={{
                borderTopRightRadius: "30px",
                borderBottomLeftRadius: "30px",
              }}
            />
          </div>
        </Box>
      </div>

      {/* 🔹 Video Section */}
      <div className="relative h-[60vh] sm:h-[70vh] lg:h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          src="https://cdn.dribbble.com/userupload/44078251/file/original-ea1ad5269676af39e887482aaa000e91.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

        {/* Content on Video */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white drop-shadow-lg leading-tight">
            About <span className="text-yellow-300">Ticket_Wale</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 font-bold mt-3 sm:mt-4 lg:mt-6 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl drop-shadow-sm leading-relaxed">
            <strong>Ticket_Wale</strong> is your all-in-one travel companion.
            Whether you're booking buses, trains, or flights — we provide a
            fast, secure, and hassle-free ticketing experience so you can focus
            on your journey.
          </p>

          <button
            onClick={handleExploreClick}
            className="mt-6 sm:mt-8 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-yellow-300 text-black font-semibold text-sm sm:text-base lg:text-lg rounded-full shadow-lg hover:bg-yellow-400 transition duration-300 transform hover:scale-105"
          >
            Explore Services
          </button>
        </div>
      </div>

      <div className="bg-black py-8 sm:py-10 lg:py-12 px-4 sm:px-6 text-white">
        {/* App Badges */}
        <Box display="flex" flexDirection="column" alignItems="center" className="gap-6 sm:gap-8 lg:gap-10">
          {/* Customer App Section */}
          <div className="text-center">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">Customer App</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 items-center justify-center">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-10 sm:h-12 lg:h-14"
                />
              </a>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-10 sm:h-12 lg:h-14"
                />
              </a>
            </div>
          </div>

          {/* Captain App Section */}
          <div className="text-center">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">Captain App</p>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105 inline-block"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10 sm:h-12 lg:h-14"
              />
            </a>
          </div>
        </Box>

        {/* Footer Links */}
        <Box className="mt-8 sm:mt-10 lg:mt-12">
          <div className="flex flex-col sm:flex-row justify-center items-center sm:items-center gap-8 sm:gap-16 md:gap-24 lg:gap-32 xl:gap-60">
            {/* Company Links */}
            <ul className="space-y-1 text-sm sm:text-base text-center sm:text-left">
              <li className="font-semibold text-base sm:text-lg mb-2">Company</li>
              <li className="hover:text-yellow-300 cursor-pointer transition-colors">Home</li>
              <li className="hover:text-yellow-300 cursor-pointer transition-colors">About</li>
              <li className="hover:text-yellow-300 cursor-pointer transition-colors">Safety</li>
              <li className="hover:text-yellow-300 cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-yellow-300 cursor-pointer transition-colors">Privacy Policy</li>
            </ul>

            {/* Services Links */}
            <ul className="space-y-1 text-sm sm:text-base text-center sm:text-left">
              <li className="font-semibold text-base sm:text-lg mb-2">Services</li>
              <li className="hover:text-yellow-300 cursor-pointer transition-colors">Flight</li>
              <li className="hover:text-yellow-300 cursor-pointer transition-colors">Hotel</li>
              <li className="hover:text-yellow-300 cursor-pointer transition-colors">Bus</li>
              <li className="hover:text-yellow-300 cursor-pointer transition-colors">Auto</li>
              <li className="hover:text-yellow-300 cursor-pointer transition-colors">Bike</li>
              <li className="hover:text-yellow-300 cursor-pointer transition-colors">Parcel</li>
            </ul>
          </div>
        </Box>

        {/* Social Icons */}
        <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6">Follow Us</h1>
          <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8 text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-all duration-300 transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-all duration-300 transform hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-all duration-300 transform hover:scale-110"
            >
              <FaGithub />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-all duration-300 transform hover:scale-110"
            >
              <FaTwitter />
            </a>
          </div>
          <p className="text-base sm:text-lg lg:text-xl">© 2025 Ticket Wales Technologies Inc.</p>
        </div>
      </div>
    </div>
  );
}
