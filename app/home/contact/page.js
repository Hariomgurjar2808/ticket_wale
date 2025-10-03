"use client";
import React from "react";
import { Box } from "@mui/material";
import { Button, Select } from "antd";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaGoogle,
} from "react-icons/fa";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-white flex flex-col">
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#5b5ea6] shadow-md px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-mono text-yellow-400">Ticket_Wale</h1>
        </div>
        <ul className="flex space-x-4 sm:space-x-6 font-medium text-white">
          <li className="text-lg sm:text-2xl lg:text-3xl cursor-pointer">Contact</li>
        </ul>
        <Button
          className="text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
          style={{
            textTransform: "none",
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
          }}
          variant="contained"
        >
          <span className="hidden sm:inline">Download App</span>
          <span className="sm:hidden">App</span>
        </Button>
      </nav>

      {/* Contact Form */}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 mt-16 sm:mt-20 lg:mt-24 max-w-7xl mx-auto">
        {/* Contact Form */}
        <Box
          className="w-full max-w-lg lg:max-w-lg xl:max-w-xl flex-1"
          sx={{
            backgroundColor: "white",
            padding: { xs: 3, sm: 4, lg: 5 },
            borderRadius: 4,
            boxShadow: 3,
            minHeight: { xs: "auto", lg: "600px" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center text-black mb-4 sm:mb-6">
            Get in Touch
          </h1>

          <div className="flex flex-col gap-3 sm:gap-4 text-black flex-grow">
            <div>
              <label className="block text-gray-700 mb-1 text-sm sm:text-base">Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                style={{ color: "black" }}
                className="w-full p-2 sm:p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 text-sm sm:text-base">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                style={{ color: "black" }}
                className="w-full p-2 sm:p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 text-sm sm:text-base">Mobile</label>
              <input
                type="tel"
                placeholder="Enter Your Mobile Number"
                style={{ color: "black" }}
                className="w-full p-2 sm:p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 text-sm sm:text-base">User Type</label>
              <Select
                defaultValue="Select"
                style={{ width: "100%", height: "40px" }}
                onChange={handleChange}
                options={[
                  { value: "Captain", label: "Captain" },
                  { value: "customer", label: "Customer" },
                ]}
              />
            </div>

            <div className="flex-grow">
              <label className="block text-gray-700 mb-1 text-sm sm:text-base">Message</label>
              <textarea
                placeholder="Your Message"
                rows={4}
                style={{ borderRadius: "15px", color: "black" }}
                className="w-full h-24 sm:h-32 lg:h-40 px-3 sm:px-4 py-2 bg-gray-50 border border-gray-300 resize-none outline-none focus:ring-2 focus:ring-purple-500 hover:shadow-md transition duration-200 text-sm sm:text-base"
              />
            </div>

            <div className="mt-auto">
              <Button
                style={{ backgroundColor: "#5b5ea6", color: "white" }}
                type="primary"
                className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold transition-transform hover:scale-105"
              >
                Send Message
              </Button>
            </div>
          </div>
        </Box>

        {/* Address Section */}
        <Box
          className="w-full max-w-lg lg:max-w-lg xl:max-w-xl flex-1"
          sx={{
            backgroundColor: "white",
            padding: { xs: 3, sm: 4, lg: 5 },
            borderRadius: 4,
            boxShadow: 3,
            minHeight: { xs: "auto", lg: "600px" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center text-black mb-4 sm:mb-6">
            Where to Find Us
          </h1>
          
          <div className="flex-grow space-y-4 sm:space-y-6 text-gray-800">
            {/* Registered Office */}
            <div className="p-3 sm:p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-purple-800 flex items-center">
                <span className="mr-2">🏢</span>
                Registered Office
              </h3>
              <p className="text-sm sm:text-base leading-relaxed">
                Roppen Transportation Services Pvt. Ltd., 2nd Floor, Fortune
                Aura Complex, Zone-I, Maharana Pratap Nagar, Near DB Mall,
                Bhopal, Madhya Pradesh – 462011, India.
              </p>
              <p className="mt-2 text-xs sm:text-sm text-gray-600">
                CIN: U52210MP2015PTC097115
              </p>
            </div>

            {/* City Office */}
            <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-800 flex items-center">
                <span className="mr-2">🏘️</span>
                City Office
              </h3>
              <p className="text-sm sm:text-base leading-relaxed">
                Roppen Transportation Services Pvt. Ltd., #21, 2nd Floor,
                Classic Tower, Zone-II, M.P. Nagar, Near Pragati Petrol Pump,
                Bhopal, Madhya Pradesh – 462011.
              </p>
            </div>

            {/* Corporate Office */}
            <div className="p-3 sm:p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-green-800 flex items-center">
                <span className="mr-2">🏙️</span>
                Corporate Office
              </h3>
              <p className="text-sm sm:text-base leading-relaxed">
                Roppen Transportation Services Pvt. Ltd., Tower A, Spatium
                Building, Plot No. A-51, Sector 62, Near Fortis Hospital, Noida,
                Gautam Buddha Nagar, Uttar Pradesh – 201309.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="p-3 sm:p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500 mt-auto">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-yellow-800 flex items-center">
                <span className="mr-2">📞</span>
                Get In Touch
              </h3>
              <div className="space-y-1 text-sm sm:text-base">
                <p>📧 Email: support@ticketwale.com</p>
                <p>📱 Phone: +91 75529 85299</p>
                <p>🕒 Hours: Mon-Fri 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </Box>
      </div>

      {/* Footer Section */}
      <footer className="bg-black text-white py-8 sm:py-10 lg:py-12 px-4 sm:px-6">
        <Box display="flex" flexDirection="column" alignItems="center" className="gap-6 sm:gap-8">
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
        </Box>

        {/* Footer Links */}
        <Box className="mt-8 sm:mt-10 lg:mt-12">
          <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-8 sm:gap-16 md:gap-20 lg:gap-32 text-center sm:text-left">
            {/* Company Links */}
            <ul className="space-y-1 text-sm sm:text-base">
              <li className="font-semibold text-base sm:text-lg mb-2">Company</li>
              <li className="hover:text-yellow-300 cursor-pointer transition-colors">Home</li>
              <li className="hover:text-yellow-300 cursor-pointer transition-colors">About</li>
              <li className="hover:text-yellow-300 cursor-pointer transition-colors">Safety</li>
              <li className="hover:text-yellow-300 cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-yellow-300 cursor-pointer transition-colors">Privacy Policy</li>
            </ul>

            {/* Services Links */}
            <ul className="space-y-1 text-sm sm:text-base">
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
          <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8 text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6">
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
            
           <a href="https://google.com/" target="_blank" rel="noopener noreferrer">
                       <FaGoogle className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: 'white' }} />
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
          <p className="text-base sm:text-lg lg:text-xl mb-2">© 2025 Ticket Wales Technologies Inc.</p>
        </div>
      </footer>
    </div>
  );
}
