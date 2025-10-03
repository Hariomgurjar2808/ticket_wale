"use client";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MenuIcon from "@mui/icons-material/Menu";
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
  FaMapMarkerAlt,
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

  // MONGODB INTEGRATION: Handle Book Ride button click
  const handleBookRide = () => {
    if (isAuthenticated()) {
      // User is logged in, proceed with booking
      router.push('/booking');
    } else {
      // User is not logged in, redirect to login page
      router.push('/login');
    }
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

        <Box className="w-full max-w-md sm:max-w-lg lg:max-w-xl flex flex-col gap-4 sm:gap-6 px-4">
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


          <Button
            variant="contained"
            onClick={handleBookRide}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-medium"
            sx={{
              backgroundColor: "#5b5ea6",
              textTransform: "none",
              borderRadius: "10px",
              minHeight: "50px",
              fontWeight: "bold",
              fontSize: { xs: '16px', sm: '18px', md: '20px' },
              "&:hover": {
                backgroundColor: "#4a4d8f",
              },
            }}
          >
            Book Ride
          </Button>
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
                  className="w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-3"
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
