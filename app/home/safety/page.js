import { Box } from "@mui/material";
import { Button } from "antd";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

export default function Page() {
  return (
    <div className="bg-white">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      {/* === Fixed Main Header === */}
      <header
        className="bg-[#5b5ea6] text-white p-4 sm:p-5 lg:p-6 text-center fixed top-0 left-0 right-0 z-50"
      >
        <div className="flex justify-between items-center px-2 sm:px-4 lg:px-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-mono text-yellow-400">Ticket_Wale</h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl hidden sm:block">Safety</h2>
          <Button
            className="text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
            style={{
              textTransform: "none",
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              border: "none",
              fontSize: "12px",
            }}
          >
            <span className="hidden sm:inline">Download App</span>
            <span className="sm:hidden">App</span>
          </Button>
        </div>
      </header>

      

      {/* === Main Content Section === */}
      <main className="pt-32 sm:pt-36 lg:pt-44 px-4 sm:px-6 lg:px-8">
        {/* === Unified Safety Section Frame === */}
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12">
            
            {/* Main Title */}
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-purple-800 mb-4">
                Our Safety Commitment
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto">
                At <span className="font-bold text-purple-700">Ticket_Wale</span>, 
                safety is our top priority for everyone in our community
              </p>
            </div>

            {/* Three Safety Cards in Same Frame */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Safety for All Card */}
              <div id="overview" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-purple-800 mb-4">
                    Safety for All
                  </h2>
                  <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
                    Your safety is our promise. We maintain a secure, clean, and reliable travel experience with real-time tracking, verified profiles, and 24/7 support.
                  </p>
                </div>
                
                {/* Image Grid for Safety for All */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <img
                    src="https://media.istockphoto.com/id/1485324074/photo/happy-couple-using-mobile-phone-while-getting-of-a-bus-at-the-station.jpg?s=612x612&w=0&k=20&c=ZYWx9jKZC2tia0tU2pUH1nwZxIoHDwEgBtcLu01H5XA="
                    alt="Happy couple at bus station"
                    className="w-full h-20 sm:h-24 lg:h-28 object-cover rounded-lg shadow transition-transform hover:scale-105"
                  />
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKspWleOKMW5KQ622soYDtqaFXLPzSZp2AEwJcRXJrcPCHjOS6hyM20vdfXpBoR-UjbR0&usqp=CAU"
                    alt="Passengers boarding"
                    className="w-full h-20 sm:h-24 lg:h-28 object-cover rounded-lg shadow transition-transform hover:scale-105"
                  />
                  <img
                    src="https://i2-prod.mirror.co.uk/article14151691.ece/ALTERNATES/s1200b/1_EMB-Britains-youngest-licensed-pilot-London-17th-March-2019.jpg"
                    alt="Smiling student"
                    className="w-full h-20 sm:h-24 lg:h-28 object-cover rounded-lg shadow transition-transform hover:scale-105"
                  />
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlAPqQJXq3CYzAzDEl0amqWWrkViW9B7TpVQ&s"
                    alt="Bus service traveler"
                    className="w-full h-20 sm:h-24 lg:h-28 object-cover rounded-lg shadow transition-transform hover:scale-105"
                  />
                </div>
                
                <Button
                  className="w-full px-4 py-2 text-sm font-bold transition-transform hover:scale-105"
                  style={{
                    backgroundColor: "#5b5ea6",
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                  }}
                >
                  Learn More
                </Button>
              </div>

              {/* Safety for Customers Card */}
              <div id="customer" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-purple-800 mb-4">
                    Safety for Customers
                  </h2>
                  <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
                    We ensure a trusted experience with verified captain profiles, real-time tracking, SOS support, and dedicated helpdesk assistance.
                  </p>
                </div>
                
                {/* Customer Safety Image */}
                <div className="flex justify-center mb-6">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS_M9eoyOT0NppNWfxOOe-E3ICx8Oabk3I8w&s"
                    alt="Customer safety features"
                    className="w-full h-32 sm:h-36 lg:h-40 object-cover rounded-lg shadow transition-transform hover:scale-105"
                  />
                </div>
                
                <Button
                  className="w-full px-4 py-2 text-sm font-bold transition-transform hover:scale-105"
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                  }}
                >
                  Customer Safety
                </Button>
              </div>

              {/* Safety for Captains Card */}
              <div id="captain" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧑‍✈️</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-purple-800 mb-4">
                    Safety for Captains
                  </h2>
                  <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
                    We prioritize captain well-being with mandatory safety gear, regular training, emergency support, and comprehensive health checks.
                  </p>
                </div>
                
                {/* Captain Safety Image */}
                <div className="flex justify-center mb-6">
                  <img
                    src="https://staticimg.amarujala.com/assets/images/2025/06/11/bike-gears_c692b4f026941ae0f51c9058392b0756.jpeg?w=414&dpr=1.0&q=80"
                    alt="Captain safety gear"
                    className="w-full h-32 sm:h-36 lg:h-40 object-cover rounded-lg shadow transition-transform hover:scale-105"
                  />
                </div>
                
                <Button
                  className="w-full px-4 py-2 text-sm font-bold transition-transform hover:scale-105"
                  style={{
                    backgroundColor: "#10b981",
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                  }}
                >
                  Captain Safety
                </Button>
              </div>
            </div>

            {/* Bottom CTA Section */}
            <div className="text-center mt-12 lg:mt-16">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-purple-800 mb-4">
                Join Our Safe Community
              </h3>
              <p className="text-lg sm:text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
                Experience the peace of mind that comes with our comprehensive safety measures
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="px-8 py-3 text-lg font-bold transition-transform hover:scale-105"
                  style={{
                    backgroundColor: "#5b5ea6",
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                  }}
                >
                  Download Customer App
                </Button>
                <Button
                  className="px-8 py-3 text-lg font-bold transition-transform hover:scale-105"
                  style={{
                    backgroundColor: "white",
                    color: "#5b5ea6",
                    fontWeight: "bold",
                    border: "2px solid #5b5ea6",
                  }}
                >
                  Join as Captain
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* === Footer === */}
      <footer>
        <div className="bg-black py-8 sm:py-10 lg:py-12 px-4 sm:px-6 text-white mt-12 sm:mt-16 lg:mt-20">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            className="gap-6 sm:gap-8 lg:gap-10"
          >
            {/* App download */}
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

          {/* Links */}
          <Box className="mt-8 sm:mt-10 lg:mt-12">
            <div className="flex flex-col sm:flex-row justify-center items-center sm:items-center gap-8 sm:gap-16 md:gap-24 lg:gap-32 xl:gap-60">
              <ul className="space-y-1 text-sm sm:text-base text-center sm:text-left">
                <li className="font-semibold text-base sm:text-lg mb-2">Company</li>
                <li className="hover:text-yellow-300 cursor-pointer transition-colors">Home</li>
                <li className="hover:text-yellow-300 cursor-pointer transition-colors">About</li>
                <li className="hover:text-yellow-300 cursor-pointer transition-colors">Safety</li>
                <li className="hover:text-yellow-300 cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-yellow-300 cursor-pointer transition-colors">Privacy Policy</li>
              </ul>
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

          {/* Social */}
          <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6">Follow Us</h2>
            <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8 text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="hover:text-pink-500 transition-all duration-300 transform hover:scale-110"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="hover:text-blue-500 transition-all duration-300 transform hover:scale-110"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                className="hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                className="hover:text-gray-400 transition-all duration-300 transform hover:scale-110"
              >
                <FaGithub />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                className="hover:text-blue-300 transition-all duration-300 transform hover:scale-110"
              >
                <FaTwitter />
              </a>
            </div>
            <p className="text-base sm:text-lg lg:text-xl">© 2025 Ticket Wales Technologies Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
