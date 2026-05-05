import React from 'react';
import { Box, Skeleton, TextField, Button } from '@mui/material';

const FlightSkeleton = () => {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      {/* Navbar Skeleton */}
      <nav
        style={{ backgroundColor: "#5b5ea6" }}
        className="fixed top-0 left-0 w-full z-50 shadow-md px-6 py-4 flex justify-between items-center text-white"
      >
        <Skeleton variant="text" width={150} height={32} sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
        <Skeleton variant="text" width={100} height={24} sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
      </nav>

      {/* Main Content Skeleton */}
      <main className="h-screen flex-grow pt-24 px-8 flex flex-col md:flex-row justify-center items-center gap-24">
        {/* Left Section: Text & Form */}
        <div className="max-w-md w-full">
          <Skeleton variant="text" width={400} height={48} sx={{ mb: 6 }} />
          <Skeleton variant="text" width={500} height={24} sx={{ mb: 2 }} />
          <Skeleton variant="text" width={450} height={24} sx={{ mb: 6 }} />

          {/* Form Skeleton */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
          </Box>

          <Skeleton variant="rectangular" width={150} height={50} sx={{ borderRadius: 2 }} />
        </div>

        {/* Right Section: Image Skeleton */}
        <div className="max-w-sm">
          <Skeleton variant="rectangular" width={320} height={320} sx={{ borderRadius: 3 }} />
        </div>
      </main>

      {/* Image Gallery Skeleton */}
      <div className="bg-white min-h-screen p-8">
        <Box sx={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 4 }}>
          <Box>
            <Skeleton variant="rectangular" width={300} height={200} sx={{ borderRadius: 3, mb: 2 }} />
            <Skeleton variant="text" width={200} height={20} />
          </Box>
          <Box>
            <Skeleton variant="rectangular" width={300} height={200} sx={{ borderRadius: 3, mb: 2 }} />
            <Skeleton variant="text" width={200} height={20} />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default FlightSkeleton;