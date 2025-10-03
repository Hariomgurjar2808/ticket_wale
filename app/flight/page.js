"use client";

import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  TextField,
  Autocomplete,
  Button,
  InputAdornment,
  Box,
} from "@mui/material";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

const cities = [
  { label: "New York, USA" },
  { label: "London, UK" },
  { label: "Tokyo, Japan" },
  { label: "Delhi, India" },
  { label: "Paris, France" },
  { label: "Sydney, Australia" },
  { label: "Dubai, UAE" },
  { label: "Berlin, Germany" },
  { label: "Toronto, Canada" },
];

export default function NavbarWithFooter() {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      {/* 🔹 Navbar */}
      <nav
        style={{ backgroundColor: "#5b5ea6" }}
        className="fixed top-0 left-0 w-full z-50 shadow-md px-6 py-4 flex justify-between items-center text-white"
      >
        <h1 className="text-3xl font-mono text-yellow-400">Ticket_Wale</h1>
        <p className="flex justify-center items-center">Flight</p>
      </nav>
      {/* 🔹 Main Content */}
      <main className="  h-screen flex-grow pt-24 px-8 flex flex-col md:flex-row justify-center items-center gap-24">
        {/* Left Section: Text & Form */}
        <div className="max-w-md w-full">
          <h2 className="text-4xl font-medium text-black mt-6 text-left">
            Airport rides are better with Ticket_wale ✈️
          </h2>
          <p className="text-gray-600 mt-2 mb-6 text-left text-xl">
            Book rides to over 700 airports worldwide with Ticket Wale. In most
            locations, you can also schedule your airport pickup or drop-off in
            advance for a smooth and timely experience.
          </p>

          {/* 🔽 From and To Inputs */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mb: 4,
            }}
          >
            <Autocomplete
              options={cities}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="From"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaMapMarkerAlt style={{ color: "black" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Autocomplete
              options={cities}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="To"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaMapMarkerAlt style={{ color: "black" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#5b5ea6",
              textTransform: "none",
              fontSize: "20px",
              borderRadius: "10px",
              height: "50px",
              width: "150px",
            }}
          >
            Ride Book
          </Button>
        </div>

        {/* Right Section: Image */}
        <div className="max-w-sm">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQgrW_syY40FVM4nEBVo2Dxp5V8ZQs4uPH9g&s"
            alt="Airport Ride"
            className="rounded-xl shadow-md w-full h-[320px] object-cover"
          />
        </div>
      </main>
      {/* 🔹 Image Gallery Section */}
      <div className="bg-white min-h-screen p-8">
        {/* First Row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginBottom: 4,
          }}
        >
          {[
            {
              src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Wym41pFeTtrDBHuIYhUYd8sYnGVpbFsJdg&s",
              alt: "airport1",
              description: "Departure Gate at the Airport",
            },
            {
              src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu3mVY6qoyAoOpWFpzz0REL9nZJkrGcfxwxw&s",
              alt: "airport2",
              description: "Modern Airport Terminal",
            },
            {
              src: "https://img.freepik.com/free-vector/customs-control-flat-composition-with-indoor-scenery-airport-terminal-with-line-passport-control-officer-vector-illustration_1284-78559.jpg",
              alt: "customs1",
              description: "Customs Clearance Area",
            },
          ].map((img, idx) => (
            <div key={idx} className="text-center max-w-[250px]">
              <img
                src={img.src}
                alt={img.alt}
                className="w-[250px] h-[250px] object-cover rounded-lg shadow"
              />
              <p className="mt-3 text-gray-800 text-lg font-medium">
                {img.description}
              </p>
            </div>
          ))}
        </Box>

        {/* Second Row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {[
            {
              src: "https://img.freepik.com/premium-vector/customs-officer-concept-passport-control-airport-security-checkpoint-registration-airport-metal-detector-safety-board-isolated-flat-vector-illustration_613284-1820.jpg",
              alt: "customs2",
              description: "Security Checkpoint",
            },
            {
              src: "https://c8.alamy.com/comp/2J9CBX6/people-in-airport-concept-with-happy-family-in-departure-lounge-before-boarding-on-flight-vector-illustration-2J9CBX6.jpg",
              alt: "family",
              description: "Family Waiting to Board",
            },
            {
              src: "https://c8.alamy.com/comp/2C7N1YD/cartoon-caucasian-couple-of-travelers-at-the-airport-taking-off-airplane-in-the-backgroundflat-vector-illustration-2C7N1YD.jpg",
              alt: "couple",
              description: "Travelers Ready for Vacation",
            },
          ].map((img, idx) => (
            <div key={idx} className="text-center">
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <p className="mt-2 text-gray-700 text-lg">{img.description}</p>
            </div>
          ))}
        </Box>
      </div>
      {/* 🔹 Footer */}
      <footer className="bg-black text-center p-4 mt-auto">
        <div className="bg-black py-10 px-4 text-white">
          {/* App Badges */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={8}
          >
            {/* Customer App Section */}
            <div className="text-center">
              <p className="text-2xl font-semibold mb-4">Customer App</p>
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-12"
                  />
                </a>
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className="h-12"
                  />
                </a>
              </div>
            </div>

            {/* Captain App Section */}
            <div className="text-center">
              <p className="text-2xl font-semibold mb-4">Captain App</p>
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-12"
                  />
                </a>
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className="h-12"
                  />
                </a>
              </div>
            </div>
          </Box>

          {/* Footer Links */}
          <Box className="mt-10">
            <div className="  flex justify-center gap-60">
              {/* Company Links */}
              <ul className="space-y-1 text-sm">
                <li className="font-semibold text-base mb-1">Company</li>
                <li>Home</li>
                <li>About</li>
                <li>Safety</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
              </ul>

              {/* Services Links */}
              <ul className="space-y-1 text-sm">
                <li className="font-semibold text-base mb-1">Services</li>
                <li>Flight</li>
                <li>Hotel</li>
                <li>Bus</li>
                <li>Auto</li>
                <li>Bike</li>
                <li>Parcel</li>
              </ul>
            </div>
          </Box>

          {/* Social Icons */}
          <div className="mt-12 text-center">
            <h1 className="text-2xl font-semibold mb-6">Follow Us</h1>
            <div className="flex justify-center gap-6 text-3xl h-[50px] ">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors duration-300"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-300"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                <FaGithub />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors duration-300"
              >
                <FaTwitter />
              </a>
            </div>
            <div>
              <p className="text-lg">© 2025 Uber Technologies Inc.</p>
              <p className="text-lg flex items-center justify-end">
                <LocationOnIcon className=" mr-1" />
                <a
                  href="https://www.google.com/maps/place/Bhopal,+Madhya+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="Shover:underline"
                >
                  Bhopal
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
