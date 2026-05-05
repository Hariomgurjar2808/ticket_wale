import React from 'react';
import { Box, Skeleton, Grid, Typography } from '@mui/material';

const HomeSkeleton = () => {
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
      {/* Header Skeleton */}
      <Box
        sx={{
          height: "70px",
          backgroundColor: "#5b5ea6",
          px: 2,
        }}
      >
        <Skeleton variant="rectangular" height={70} />
      </Box>

      {/* Main Content Skeleton */}
      <Box
        sx={{
          px: { xs: 2, sm: 3, lg: 4 },
          py: 25,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/bgimage.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Skeleton variant="text" width={300} height={60} sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
        <Skeleton variant="text" width={400} height={40} sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
        <Skeleton variant="text" width={500} height={30} sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />

        {/* Form Skeleton */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "md",
            borderRadius: "24px",
            p: 4,
            background: "rgba(255,255,255,0.9)",
            border: "1px solid #e7e8fb",
            boxShadow: "0 20px 44px rgba(61, 70, 125, 0.12)",
          }}
        >
          <Skeleton variant="text" width={200} height={30} sx={{ mb: 3, mx: 'auto' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Skeleton variant="rectangular" height={56} />
            <Skeleton variant="rectangular" height={56} />
            <Skeleton variant="rectangular" height={56} />
            <Skeleton variant="rectangular" height={54} />
          </Box>
        </Box>
      </Box>

      {/* Transport Cards Skeleton */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8, px: 4, py: 6 }}>
        <Grid container spacing={4} sx={{ maxWidth: "7xl", width: "100%" }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} lg={4} xl={2} key={index}>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Promotional Sections Skeleton */}
      {Array.from({ length: 3 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "grey.50",
            p: { xs: 4, sm: 6, md: 8, lg: 12, xl: 16 },
            borderRadius: { xs: "xl", sm: "2xl" },
            boxShadow: "sm",
            mx: { xs: 4, sm: 6, lg: 8 },
            my: { xs: 6, sm: 8, lg: 12 },
          }}
        >
          <Box sx={{ maxWidth: { xs: "sm", sm: "md", lg: "lg" }, textAlign: { xs: "center", lg: "left" }, mb: { xs: 6, lg: 0 } }}>
            <Skeleton variant="text" width={300} height={50} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width={50} height={4} sx={{ mb: 3, mx: { xs: 'auto', lg: 0 } }} />
            <Skeleton variant="text" width={400} height={20} sx={{ mb: 2 }} />
            <Skeleton variant="text" width={350} height={20} sx={{ mb: 4 }} />
            <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 20, mx: { xs: 'auto', lg: 0 } }} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: { xs: "center", lg: "flex-end" }, ml: { lg: 6, xl: 10 } }}>
            <Skeleton variant="rectangular" width={300} height={200} sx={{ borderRadius: 3 }} />
          </Box>
        </Box>
      ))}

      {/* Download Section Skeleton */}
      <Box sx={{ backgroundColor: "black", color: "white", py: 16, px: 6, textAlign: "center" }}>
        <Skeleton variant="text" width={300} height={50} sx={{ bgcolor: 'rgba(255,255,255,0.2)', mx: 'auto', mb: 4 }} />
        <Skeleton variant="rectangular" width={50} height={4} sx={{ bgcolor: 'yellow.400', mx: 'auto', mb: 10 }} />
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "center", gap: 12 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Skeleton variant="circular" width={96} height={96} sx={{ mb: 6 }} />
            <Skeleton variant="text" width={200} height={30} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Skeleton variant="circular" width={96} height={96} sx={{ mb: 6 }} />
            <Skeleton variant="text" width={200} height={30} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
          </Box>
        </Box>
      </Box>

      {/* Footer Skeleton */}
      <Box component="footer" sx={{ mt: "auto", backgroundColor: "black", color: "white", py: { xs: 6, sm: 8 }, textAlign: "center", px: 4 }}>
        <Skeleton variant="text" width={150} height={30} sx={{ bgcolor: 'rgba(255,255,255,0.2)', mb: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 3 }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} variant="circular" width={32} height={32} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
          ))}
        </Box>
        <Skeleton variant="text" width={250} height={20} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
      </Box>
    </Box>
  );
};

export default HomeSkeleton;