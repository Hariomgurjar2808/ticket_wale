"use client";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// MONGODB INTEGRATION: Import LogoutIcon and PersonIcon for user menu
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import { useRouter } from "next/navigation";
import {
  FaFacebook,
  FaInstagram,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";

import Link from "next/link";
// MONGODB INTEGRATION: Import useAuth hook for authentication state
import { useAuth } from "../contexts/AuthContext";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

// Transport options
const transportButtons = [
  { title: "Flight", image: "/flighte.jpeg", href: "/flight" },
  { title: "Hotel", image: "/hootel.jpg", href: "/hotel" },
  { title: "Bus", image: "/bos.jpeg", href: "/bus" },
  { title: "Auto", image: "/auto.webp", href: "/auto" },
  { title: "Bike", image: "/bike.jpeg", href: "/bike" },
  { title: "Parcel", image: "/parcel.jpeg", href: "/parcel" },
];

export default function Page() {
  const [anchorEl, setAnchorEl] = useState(null);
  // MONGODB INTEGRATION: Added user menu state for authenticated users
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [fromCity, setFromCity] = useState(null);
  const [toCity, setToCity] = useState(null);
  const [travelDate, setTravelDate] = useState("");
  const router = useRouter();

  // MONGODB INTEGRATION: Get authentication state and functions
  const { user, logout, isAuthenticated, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#FFFBEF",
        }}
      >
        <Typography variant="h6" sx={{ color: '#5b5ea6' }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // MONGODB INTEGRATION: Handle user menu for authenticated users
  const handleUserMenu = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  // MONGODB INTEGRATION: Handle logout functionality
  const handleLogout = () => {
    logout();
    handleUserMenuClose();
  };

  const isBookingFormComplete = Boolean(
    fromCity?.label && toCity?.label && travelDate
  );

  // MONGODB INTEGRATION: Handle Book Ride button click
  const handleBookRide = () => {
    if (!isBookingFormComplete) {
      return;
    }

    const bookingQuery = new URLSearchParams({
      from: fromCity.label,
      to: toCity.label,
      date: travelDate,
    }).toString();

    router.push(`/booking?${bookingQuery}`);
  };

  // MONGODB INTEGRATION: Dynamic auth buttons based on authentication state
  const authButtons = isAuthenticated() ? [
    {
      label: user?.name || "User",
      onClick: handleUserMenu,
      icon: <PersonIcon />,
    }
  ] : [
    {
      label: "Login",
      path: "/login",
      icon: <LoginIcon />,
    },
    {
      label: "Signup",
      path: "/signup",
      icon: <HowToRegIcon />,
    },
  ];

  const cities = [
    { label: "Indore" },
    { label: "Raipur" },
    { label: "Pune" },
    { label: "Delhi" },
    { label: "Patna" },
    { label: "Mumbai" },
    { label: "Chennai" },
    { label: "Kolkata" },
    { label: "Lucknow" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        backgroundColor: "#FFFBEF",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          height: "70px",
          backgroundColor: "#5b5ea6",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          px: 2,
        }}
      >
        <Toolbar className="flex justify-between items-center w-full px-2 sm:px-4 lg:px-8 min-h-[70px]">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Responsive navigation menu */}
            <div className="block lg:hidden">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {[
                  { key: "about", label: "About" },
                  { key: "contact", label: "Contact" },
                  { key: "safety", label: "Safety" }
                ].map((item) => (
                  <MenuItem key={item.key} onClick={handleClose}>
                    <Link
                      href={`/home/${item.key}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%'
                      }}
                    >
                      {item.label}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </div>

            {/* Desktop navigation - visible on large screens */}
            <div className="hidden lg:flex gap-3 items-center">
              {[
                { key: "about", label: "About" },
                { key: "contact", label: "Contact" },
                { key: "safety", label: "Safety" }
              ].map((item) => (
                <Button
                  key={item.key}
                  component={Link}
                  href={`/home/${item.key}`}
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    textTransform: "none",
                    fontSize: "18px",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* MONGODB INTEGRATION: Dynamic auth buttons based on authentication state */}
            {authButtons.map((item) => (
              item.path ? (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.path}
                  className="text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
                  sx={{
                    height: { xs: "32px", sm: "36px" },
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "black",
                    backgroundColor: "white",
                  }}
                  startIcon={item.icon}
                >
                  {item.label}
                </Button>
              ) : (
                <Button
                  key={item.label}
                  onClick={item.onClick}
                  className="text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
                  sx={{
                    height: { xs: "32px", sm: "36px" },
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "black",
                    backgroundColor: "white",
                  }}
                  startIcon={item.icon}
                >
                  {item.label}
                </Button>
              )
            ))}

            {/* MONGODB INTEGRATION: User menu for authenticated users */}
            <Menu
              anchorEl={userMenuAnchorEl}
              open={Boolean(userMenuAnchorEl)}
              onClose={handleUserMenuClose}
            >
              <MenuItem onClick={handleUserMenuClose}>
                <PersonIcon sx={{ mr: 1 }} />
                Profile
              </MenuItem>
              <MenuItem onClick={handleUserMenuClose}>
                <Link href="/bookings" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                  My Bookings
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box className="mt-20 px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center gap-4 sm:gap-6">
        {/* MONGODB INTEGRATION: Show welcome message for authenticated users */}
        {isAuthenticated() && (
          <Typography
            variant="h4"
            className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 text-center"
            sx={{ color: '#5b5ea6' }}
          >
            Welcome back, {user?.name}!
          </Typography>
        )}

        <Typography
          variant="h2"
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 text-center font-bold"
          sx={{ color: '#333' }}
        >
          Ticket Wales
        </Typography>
        <Typography
          variant="h6"
          className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-center max-w-2xl px-4"
          sx={{ color: '#666' }}
        >
          Your trusted travel partner for flights, hotels, buses, and more!
        </Typography>

        <Box
          className="w-full max-w-md sm:max-w-lg lg:max-w-2xl px-4"
          sx={{
            borderRadius: "24px",
            p: { xs: 2.5, sm: 3, md: 4 },
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(246,245,255,0.98) 100%)",
            border: "1px solid #e7e8fb",
            boxShadow: "0 20px 44px rgba(61, 70, 125, 0.12)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#292c6d",
              fontWeight: 800,
              mb: 2.5,
              textAlign: "center",
            }}
          >
            Plan Your Next Ride
          </Typography>

          <Box className="flex flex-col gap-4 sm:gap-5">
            <Autocomplete
              options={cities}
              value={fromCity}
              onChange={(_, newValue) => setFromCity(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="From"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon sx={{ color: "#5b5ea6" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                      backgroundColor: "#ffffff",
                    },
                  }}
                />
              )}
            />

            <Autocomplete
              options={cities}
              value={toCity}
              onChange={(_, newValue) => setToCity(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="To"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon sx={{ color: "#5b5ea6" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                      backgroundColor: "#ffffff",
                    },
                  }}
                />
              )}
            />

            <TextField
              label="Travel Date"
              type="date"
              value={travelDate}
              onChange={(event) => setTravelDate(event.target.value)}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon sx={{ color: "#5b5ea6" }} />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                min: new Date().toISOString().split("T")[0],
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  backgroundColor: "#ffffff",
                },
              }}
            />

            <Button
              variant="contained"
              onClick={handleBookRide}
              disabled={!isBookingFormComplete}
              className="w-full px-6 py-3 sm:py-4 text-lg sm:text-xl font-medium"
              sx={{
                background: "linear-gradient(135deg, #5b5ea6 0%, #292c6d 100%)",
                textTransform: "none",
                borderRadius: "14px",
                minHeight: "54px",
                fontWeight: "bold",
                fontSize: { xs: '17px', sm: '19px', md: '20px' },
                boxShadow: "0 14px 28px rgba(91,94,166,0.28)",
                "&:hover": {
                  background: "linear-gradient(135deg, #4a4d8f 0%, #20235a 100%)",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#b9bacc",
                  color: "white",
                },
              }}
            >
              Book Ride
            </Button>

            {!isBookingFormComplete && (
              <Typography
                variant="body2"
                sx={{ color: "#63647f", textAlign: "center", fontWeight: 500 }}
              >
                Select your pickup city, destination, and travel date to continue.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>


      {/* Transport Cards */}

      <Box className="flex justify-center mt-8 sm:mt-12 px-4 py-6">
        <Box className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 max-w-7xl">
          {transportButtons.map((option) => (
            <Link
              key={option.title}
              href={option.href}
              style={{ textDecoration: "none" }}
            >
              <Box
                className="w-full h-40 sm:h-48 lg:h-52 p-4 sm:p-6 flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: 3,
                  boxShadow: 4,
                }}
              >
                <Avatar
                  alt={option.title}
                  src={option.image}
                  className="w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-3 "
                  variant="rounded"
                />
                <Typography
                  variant="h6"
                  className="text-sm sm:text-base lg:text-lg font-bold text-center"
                >
                  {option.title}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>

      {/* Promotional Section */}
      <div className="flex flex-col lg:flex-row items-center justify-around bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 rounded-xl sm:rounded-2xl shadow-sm mx-4 sm:mx-6 lg:mx-8 my-6 sm:my-8 lg:my-12">
        {/* Left Section */}
        <div className="max-w-sm sm:max-w-md lg:max-w-lg text-center lg:text-left mb-6 lg:mb-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-4">
            Get Quick Rides,
            <br />
            Low Fares
          </h1>
          <div className="h-1 w-8 sm:w-10 lg:w-12 bg-yellow-400 my-3 sm:my-4 mx-auto lg:mx-0"></div>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl mb-4 sm:mb-6 leading-relaxed">
            In Ticket Wale we ensure our customers get rides quickly at the most
            affordable prices.
          </p>
          <button className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base md:text-lg font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center mx-auto lg:mx-0 transform hover:scale-105">
            Book a ride <span className="ml-2">→</span>
          </button>
        </div>

        {/* Right Section - Images */}
        <div className="flex justify-center lg:justify-end lg:ml-6 xl:ml-10">
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <img
              src="https://rapido-app-assets-staging.storage.googleapis.com/7bfb291ed6fd8fef3949b695f66f0441_1738146457741.webp"
              alt="Rapido ride promo"
              className="rounded-xl sm:rounded-2xl w-48 sm:w-56 md:w-64 lg:w-72 xl:w-100 h-auto object-cover shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>


 <div className="flex flex-col lg:flex-row items-center justify-around bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 rounded-xl sm:rounded-2xl shadow-sm mx-4 sm:mx-6 lg:mx-8 my-6 sm:my-8 lg:my-12">
       
        {/* Right Section - Images */}
        <div className="flex justify-center lg:justify-end lg:ml-6 xl:ml-10">
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <img
              src="https://rapido-app-assets-staging.storage.googleapis.com/c1ec7791629614c8c040a2a8c68bbc79_1738146545252.webp"
              alt="Rapido ride promo"
              className="rounded-xl sm:rounded-2xl w-48 sm:w-56 md:w-64 lg:w-72 xl:w-100 h-auto object-cover shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
        {/* Left Section */}
        <div className="max-w-sm sm:max-w-md lg:max-w-lg text-center lg:text-left mb-6 lg:mb-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-4">
            Flexible Hours & 
            <br />
           High Earnings
          </h1>
          <div className="h-1 w-8 sm:w-10 lg:w-12 bg-yellow-400 my-3 sm:my-4 mx-auto lg:mx-0"></div>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl mb-4 sm:mb-6 leading-relaxed">
           Join as a Ticket Wale captain and earn on your own terms. Driver whenever you want.
          </p>
          <button className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base md:text-lg font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center mx-auto lg:mx-0 transform hover:scale-105">
           Start Earning <span className="ml-2">→</span>
          </button>
        </div>
      </div>

<div className="flex flex-col lg:flex-row items-center justify-around bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 rounded-xl sm:rounded-2xl shadow-sm mx-4 sm:mx-6 lg:mx-8 my-6 sm:my-8 lg:my-12">
        {/* Left Section */}
        <div className="max-w-sm sm:max-w-md lg:max-w-lg text-center lg:text-left mb-6 lg:mb-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-4">
            Safety for all
          </h1>
          <div className="h-1 w-8 sm:w-10 lg:w-12 bg-yellow-400 my-3 sm:my-4 mx-auto lg:mx-0"></div>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl mb-4 sm:mb-6 leading-relaxed">
            At Ticket Wale, your safety is our priority. We’re dedicated to making every ride safe and comfortable.
          </p>
          <button className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base md:text-lg font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center mx-auto lg:mx-0 transform hover:scale-105">
           Know More <span className="ml-2">→</span>
          </button>
        </div>

        {/* Right Section - Images */}
        <div className="flex justify-center lg:justify-end lg:ml-6 xl:ml-10">
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <img
              src="https://rapido-app-assets-staging.storage.googleapis.com/fc70552b297693e48cef580e9f9c50c3_1738574004491.webp"
              alt="Rapido ride promo"
              className="rounded-xl sm:rounded-2xl w-48 sm:w-56 md:w-64 lg:w-72 xl:w-100 h-auto object-cover shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>

<section className="bg-black text-white py-16 px-6 text-center">
<h2 className="text-4xl md:text-5xl font-extrabold mb-4">Download Now</h2>
<div className="h-1 w-12 bg-yellow-400 mx-auto mb-10"></div>


<div className="flex flex-col md:flex-row items-center justify-center gap-12">
{/* TicketWale User App */}
<div className="flex flex-col items-center">
<div className="bg-yellow-400 rounded-xl p-6 flex items-center justify-center w-24 h-24 shadow-lg">
<img
src="/mnt/data/b459b40e-83c6-4212-8270-14e79eaf51c7.png"
alt="TicketWale User App"
className="w-16 h-16 object-contain"
/>
</div>
<p className="mt-6 text-xl md:text-2xl font-medium leading-tight">
TicketWale: Book & Travel
</p>
</div>


{/* TicketWale Partner App */}
<div className="flex flex-col items-center">
<div className="bg-white rounded-xl p-6 flex items-center justify-center w-24 h-24 shadow-lg">
<img
src="/mnt/data/b459b40e-83c6-4212-8270-14e79eaf51c7.png"
alt="TicketWale Partner App"
className="w-16 h-16 object-contain"
/>
</div>
<p className="mt-6 text-xl md:text-2xl font-medium leading-tight">
TicketWale Partner: Drive & Earn
</p>
</div>
</div>
</section>
      {/* Footer */}
      <Box component="footer" className="mt-auto bg-black text-white py-6 sm:py-8 text-center px-4">
        <Typography variant="h6" className="text-lg sm:text-xl mb-3 sm:mb-4 py-2">Follow Us</Typography>
        <Box className="flex justify-center gap-4 sm:gap-6 mb-3 sm:mb-4">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: 'white' }} />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: 'white' }} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: 'white' }} />
          </a>
          <a href="https://google.com/" target="_blank" rel="noopener noreferrer">
            <FaGoogle className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: 'white' }} />
          </a>
        </Box>
        <Typography variant="body2" className="text-sm sm:text-base">
          © 2025 Ticket Wales Technologies Inc.
        </Typography>
      </Box>
    </Box>
  );
}
