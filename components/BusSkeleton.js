import React from 'react';
import { Box, Skeleton, Typography, Chip } from '@mui/material';

const BusSkeleton = () => {
  return (
    <Box
      className="min-h-screen px-4 py-8 md:px-8"
      sx={{
        background: "linear-gradient(180deg, #f4f0ff 0%, #fff6e8 40%, #fffdf7 100%)",
      }}
    >
      <Box className="mx-auto w-full max-w-6xl">
        {/* Header Skeleton */}
        <Box
          className="relative mb-6 overflow-hidden rounded-[28px] p-6 md:p-8"
          sx={{
            background: "linear-gradient(135deg, #111827 0%, #292c6d 45%, #5b5ea6 100%)",
            color: "white",
            boxShadow: "0 22px 56px rgba(17, 24, 39, 0.2)",
          }}
        >
          <Skeleton variant="text" width={200} height={20} sx={{ bgcolor: 'rgba(255,255,255,0.3)', mb: 2 }} />
          <Skeleton variant="text" width={300} height={40} sx={{ bgcolor: 'rgba(255,255,255,0.3)', mb: 2 }} />
          <Skeleton variant="text" width={400} height={20} sx={{ bgcolor: 'rgba(255,255,255,0.3)', mb: 3 }} />
          <Box className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" width={100} height={24} sx={{ bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 12 }} />
            ))}
          </Box>
        </Box>

        {/* Search/Filter Skeleton */}
        <Box className="mb-6 grid grid-cols-1 gap-3 rounded-2xl border border-[#e5e7eb] bg-white/85 p-4 md:grid-cols-[1fr_220px] md:p-5">
          <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 2 }} />
          <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 2 }} />
        </Box>

        {/* Bus List Skeletons */}
        <Box className="grid grid-cols-1 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Box
              key={index}
              className="rounded-2xl border bg-white p-4 shadow-sm md:p-5"
              sx={{ borderColor: "#e5e7eb" }}
            >
              <Box className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width={200} height={28} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width={250} height={20} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width={300} height={20} sx={{ mb: 2 }} />
                  <Box className="mb-2 flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} variant="rectangular" width={80} height={24} sx={{ borderRadius: 12 }} />
                    ))}
                  </Box>
                  <Skeleton variant="text" width={150} height={20} />
                </Box>
                <Box className="flex flex-col items-start gap-2 md:items-end">
                  <Skeleton variant="text" width={100} height={32} />
                  <Skeleton variant="text" width={60} height={16} />
                  <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 2, mt: 1 }} />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Seat Selection Skeleton */}
        <Box className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <Skeleton variant="text" width={200} height={24} sx={{ mb: 2 }} />

          <Box
            className="mb-4 rounded-2xl p-4"
            sx={{
              background: "linear-gradient(135deg, #eef2ff 0%, #fff7ed 100%)",
              border: "1px solid #dbeafe",
            }}
          >
            <Skeleton variant="text" width={250} height={24} sx={{ mb: 1 }} />
            <Box className="mb-1 flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} variant="rectangular" width={100} height={24} sx={{ borderRadius: 12 }} />
              ))}
            </Box>
            <Skeleton variant="text" width={150} height={20} sx={{ mb: 1 }} />
            <Box className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} variant="rectangular" width={80} height={24} sx={{ borderRadius: 12 }} />
              ))}
            </Box>
          </Box>

          <Box className="mb-3 flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" width={80} height={24} sx={{ borderRadius: 12 }} />
            ))}
          </Box>

          <Box
            className="mb-4 rounded-xl border border-dashed border-slate-300 p-3"
            sx={{ background: "linear-gradient(180deg, #ffffff 0%, #f5f7ff 100%)" }}
          >
            <Box className="mb-2 flex items-center justify-between">
              <Skeleton variant="text" width={100} height={16} />
              <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 12 }} />
            </Box>

            <Box className="flex flex-col gap-2">
              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <Box key={rowIndex} className="flex items-center gap-2">
                  <Skeleton variant="text" width={26} height={16} />
                  {Array.from({ length: 5 }).map((_, colIndex) => (
                    <Skeleton key={colIndex} variant="rectangular" width={44} height={38} sx={{ borderRadius: 1 }} />
                  ))}
                </Box>
              ))}
            </Box>
          </Box>

          <Skeleton variant="text" width={200} height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width={150} height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width={120} height={20} sx={{ mb: 3 }} />

          <Skeleton variant="rectangular" width={200} height={36} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default BusSkeleton;