// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Box, Button, Chip, MenuItem, TextField, Typography } from "@mui/material";

// const defaultBuses = [
//   {
//     id: "bus-1",
//     name: "Sahu Express",
//     operator: "TicketWale Travels",
//     startTime: "07:30 AM",
//     reachTime: "12:10 PM",
//     duration: "4h 40m",
//     rating: 4.6,
//     price: 550,
//     busType: "AC Sleeper",
//     amenities: ["Charging", "Wi-Fi", "Live Tracking"],
//     totalSeats: 40,
//     bookedSeats: [1, 5, 9, 12, 18, 23, 27, 31],
//   },
//   {
//     id: "bus-2",
//     name: "City Deluxe",
//     operator: "Cityline Mobility",
//     startTime: "10:15 AM",
//     reachTime: "03:20 PM",
//     duration: "5h 05m",
//     rating: 4.3,
//     price: 480,
//     busType: "Non AC Seater",
//     amenities: ["Water Bottle", "Blanket"],
//     totalSeats: 40,
//     bookedSeats: [2, 3, 7, 8, 13, 16, 29],
//   },
//   {
//     id: "bus-3",
//     name: "Star Travels",
//     operator: "NightStar Fleet",
//     startTime: "09:45 PM",
//     reachTime: "05:30 AM",
//     duration: "7h 45m",
//     rating: 4.8,
//     price: 620,
//     busType: "AC Sleeper",
//     amenities: ["Charging", "Blanket", "CCTV"],
//     totalSeats: 40,
//     bookedSeats: [4, 6, 10, 11, 14, 15, 17, 20, 24],
//   },
//   {
//     id: "bus-4",
//     name: "Volvo Travel",
//     operator: "Skyline Intercity",
//     startTime: "06:10 AM",
//     reachTime: "11:00 AM",
//     duration: "4h 50m",
//     rating: 4.5,
//     price: 590,
//     busType: "Volvo AC",
//     amenities: ["Wi-Fi", "Live Tracking", "Snacks"],
//     totalSeats: 40,
//     bookedSeats: [8, 19, 21, 25, 28, 34],
//   },
//   {
//     id: "bus-5",
//     name: "Chouhan Travels",
//     operator: "Rapid Transit Co.",
//     startTime: "01:30 PM",
//     reachTime: "06:40 PM",
//     duration: "5h 10m",
//     rating: 4.1,
//     price: 450,
//     busType: "AC Seater",
//     amenities: ["Charging", "Water Bottle"],
//     totalSeats: 42,
//     bookedSeats: [1, 2, 3, 5, 7, 13, 30],
//   },
//   {
//     id: "bus-6",
//     name: "Royal Elite",
//     operator: "Royal Group",
//     startTime: "04:20 PM",
//     reachTime: "10:05 PM",
//     duration: "5h 45m",
//     rating: 4.7,
//     price: 670,
//     busType: "Luxury Sleeper",
//     amenities: ["Wi-Fi", "Blanket", "Recliner"],
//     totalSeats: 36,
//     bookedSeats: [9, 11, 12, 16, 17, 22],
//   },
//   {
//     id: "bus-7",
//     name: "NeoGo Express",
//     operator: "GreenLine Mobility",
//     startTime: "08:05 PM",
//     reachTime: "01:40 AM",
//     duration: "5h 35m",
//     rating: 4.2,
//     price: 520,
//     busType: "AC Seater",
//     amenities: ["Charging", "Live Tracking"],
//     totalSeats: 40,
//     bookedSeats: [6, 10, 14, 15, 26, 29, 38],
//   },
//   {
//     id: "bus-8",
//     name: "Yadav Bus",
//     operator: "Metro Fleet",
//     startTime: "11:50 PM",
//     reachTime: "05:20 AM",
//     duration: "5h 30m",
//     rating: 4.4,
//     price: 560,
//     busType: "AC Sleeper",
//     amenities: ["Blanket", "CCTV", "Wi-Fi"],
//     totalSeats: 38,
//     bookedSeats: [2, 4, 18, 20, 24, 31],
//   },
// ];

// const getAvailableSeats = (bus) => bus.totalSeats - bus.bookedSeats.length;

// export default function BusSelectionClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const from = searchParams.get("from") || "Indore";
//   const to = searchParams.get("to") || "Pune";
//   const date = searchParams.get("date") || "";

//   const [selectedBusId, setSelectedBusId] = useState(defaultBuses[0].id);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("recommended");

//   const selectedBus = useMemo(
//     () => defaultBuses.find((bus) => bus.id === selectedBusId) || defaultBuses[0],
//     [selectedBusId]
//   );

//   useEffect(() => {
//     if (!selectedBusId) {
//       setSelectedBusId(defaultBuses[0].id);
//     }
//   }, [selectedBusId]);

//   const displayBuses = useMemo(() => {
//     const filtered = defaultBuses.filter((bus) => {
//       const query = searchTerm.trim().toLowerCase();
//       if (!query) {
//         return true;
//       }
//       return (
//         bus.name.toLowerCase().includes(query) ||
//         bus.operator.toLowerCase().includes(query) ||
//         bus.busType.toLowerCase().includes(query)
//       );
//     });

//     const sorted = [...filtered];
//     if (sortBy === "price-low") {
//       sorted.sort((a, b) => a.price - b.price);
//     } else if (sortBy === "price-high") {
//       sorted.sort((a, b) => b.price - a.price);
//     } else if (sortBy === "rating") {
//       sorted.sort((a, b) => b.rating - a.rating);
//     } else {
//       sorted.sort((a, b) => getAvailableSeats(b) - getAvailableSeats(a));
//     }

//     return sorted;
//   }, [searchTerm, sortBy]);

//   const handleProceed = () => {
//     const query = new URLSearchParams({
//       from,
//       to,
//       date,
//       busId: selectedBus.id,
//     }).toString();

//     router.push(`/booking/seats?${query}`);
//   };

//   const handleSelectBusDirect = (busId) => {
//     setSelectedBusId(busId);

//     const query = new URLSearchParams({
//       from,
//       to,
//       date,
//       busId,
//     }).toString();

//     router.push(`/booking/seats?${query}`);
//   };

//   return (
//     <Box className="min-h-screen px-4 py-8 md:px-8" sx={{ background: "linear-gradient(180deg, #f4f0ff 0%, #fff6e8 40%, #fffdf7 100%)" }}>
//       <Box className="mx-auto w-full max-w-6xl ">
//         <Box className="mb-6 overflow-hidden rounded-[28px] p-6 md:p-8" sx={{ background: "linear-gradient(135deg, #111827 0%, #292c6d 45%, #5b5ea6 100%)", color: "white", boxShadow: "0 22px 56px rgba(17, 24, 39, 0.2)" }}>
//           <Typography variant="overline" sx={{ letterSpacing: "0.16em", opacity: 0.8 }}>
//             Step 1 of 3
//           </Typography>
//           <Typography variant="h3" sx={{ fontWeight: 900, mt: 1, mb: 1.5, fontSize: { xs: "2rem", md: "2.6rem" } }}>
//             Choose Your Bus
//           </Typography>
//           <Typography variant="body1" sx={{ opacity: 0.92, mb: 3 }}>
//             {date ? `Travel date: ${date}` : "Select your preferred bus and continue to seat booking."}
//           </Typography>
//           <Box className="flex flex-wrap gap-2">
//             <Chip label={`${defaultBuses.length} buses available`} sx={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700 }} />
//             <Chip label="Instant booking" sx={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700 }} />
//             <Chip label="Verified operators" sx={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700 }} />
//           </Box>
//         </Box>

//         <Box className="mb-6 grid grid-cols-1 gap-3 rounded-2xl border border-[#e5e7eb] bg-white/85 p-4 md:grid-cols-[1fr_220px] md:p-5">
//           <TextField
//             label="Search bus, operator, or type"
//             value={searchTerm}
//             onChange={(event) => setSearchTerm(event.target.value)}
//             fullWidth
//             sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px", backgroundColor: "white" } }}
//           />
//           <TextField
//             select
//             label="Sort by"
//             value={sortBy}
//             onChange={(event) => setSortBy(event.target.value)}
//             fullWidth
//             sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px", backgroundColor: "white" } }}
//           >
//             <MenuItem value="recommended">Recommended</MenuItem>
//             <MenuItem value="price-low">Price: Low to High</MenuItem>
//             <MenuItem value="price-high">Price: High to Low</MenuItem>
//             <MenuItem value="rating">Top Rated</MenuItem>
//           </TextField>
//         </Box>

//         <Box className="grid grid-cols-1 gap-4">
//           {displayBuses.map((bus) => {
//             const isSelected = selectedBusId === bus.id;
//             return (
//               <Box
//                 key={bus.id}
//                 className="mb-4 rounded-[30px] bg-[#f8fbff] p-6 shadow-[0_16px_45px_rgba(59,130,246,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(59,130,246,0.16)]"
//                 sx={{
//                   border: `1px solid ${isSelected ? '#3b82f6' : '#dbeafe'}`,
//                   borderLeft: `8px solid ${isSelected ? '#2563eb' : '#bfdbfe'}`,
//                 }}
//               >
//                 <Box className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
//                   <Box>
//                     <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a' }}>
//                       {bus.name}
//                     </Typography>
//                     <Typography variant="body2" sx={{ color: '#475569', mt: 0.5 }}>
//                       {bus.operator}
//                     </Typography>
//                   </Box>
//                   <Box className="flex flex-wrap items-center gap-2">
//                     <Chip label={`${bus.rating} ★`} size="small" sx={{ backgroundColor: '#eff6ff', color: '#1d4ed8', fontWeight: 700 }} />
//                     <Chip label={`${getAvailableSeats(bus)} left`} size="small" sx={{ backgroundColor: '#ecfeff', color: '#0f766e', fontWeight: 700 }} />
//                   </Box>
//                 </Box>

//                 <Box className="mt-5 grid gap-4 md:grid-cols-[1.4fr_0.9fr]">
//                   <Box className="rounded-[24px] bg-white p-4 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">
//                     <Box className="flex flex-wrap items-center gap-4">
//                       <Box>
//                         <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>Departure</Typography>
//                         <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>{bus.startTime}</Typography>
//                       </Box>
//                       <Typography variant="h6" sx={{ color: '#60a5fa', fontWeight: 900 }}>→</Typography>
//                       <Box>
//                         <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>Arrival</Typography>
//                         <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>{bus.reachTime}</Typography>
//                       </Box>
//                     </Box>
//                     <Box className="mt-4 flex flex-wrap gap-3 text-sm" sx={{ color: '#475569' }}>
//                       <Typography>{bus.duration}</Typography>
//                       <Typography>{bus.busType}</Typography>
//                     </Box>
//                   </Box>
//                   <Box className="rounded-[24px] bg-gradient-to-br from-[#ede9fe] to-[#eef2ff] p-4">
//                     <Typography variant="caption" sx={{ color: '#4338ca', fontWeight: 700 }}>Starting fare</Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', mt: 1 }}>Rs {bus.price}</Typography>
//                     <Typography variant="body2" sx={{ color: '#475569', mt: 1 }}>Modern seating with trusted service.</Typography>
//                   </Box>
//                 </Box>

//                 <Box className="mt-5 flex flex-wrap gap-2">
//                   {bus.amenities.map((amenity) => (
//                     <Chip
//                       key={amenity}
//                       label={amenity}
//                       size="small"
//                       sx={{ backgroundColor: '#eef2ff', color: '#1e40af', fontWeight: 700 }}
//                     />
//                   ))}
//                 </Box>

//                 <Box className="mt-6 flex flex-wrap items-center justify-between gap-3">
//                   <Typography variant="body2" sx={{ color: '#64748b' }}>
//                     {bus.busType} • {getAvailableSeats(bus)} seats available
//                   </Typography>
//                   <Button
//                     onClick={() => handleSelectBusDirect(bus.id)}
//                     variant={isSelected ? 'contained' : 'outlined'}
//                     sx={{
//                       borderRadius: '16px',
//                       px: 4,
//                       py: 1.4,
//                       minWidth: 150,
//                       textTransform: 'none',
//                       fontWeight: 700,
//                       color: isSelected ? 'white' : '#2563eb',
//                       backgroundColor: isSelected ? '#2563eb' : 'transparent',
//                       borderColor: '#2563eb',
//                       '&:hover': {
//                         backgroundColor: isSelected ? '#1d4ed8' : 'rgba(37,99,235,0.08)',
//                       },
//                     }}
//                   >
//                     {isSelected ? 'Selected' : 'Select Bus'}
//                   </Button>
//                 </Box>
//               </Box>
//             );
//           })}
//         </Box>
//       </Box>
//     </Box>
//   );
// }




"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const defaultBuses = [
  {
    id: "bus-1",
    name: "Sahu Express",
    operator: "TicketWale Travels",
    startTime: "07:30 AM",
    reachTime: "12:10 PM",
    duration: "4h 40m",
    rating: 4.6,
    price: 550,
    busType: "AC Sleeper",
    amenities: ["Charging", "Wi-Fi", "Live Tracking"],
    totalSeats: 40,
    bookedSeats: [1, 5, 9, 12, 18, 23, 27, 31],
  },
  {
    id: "bus-2",
    name: "City Deluxe",
    operator: "Cityline Mobility",
    startTime: "10:15 AM",
    reachTime: "03:20 PM",
    duration: "5h 05m",
    rating: 4.3,
    price: 480,
    busType: "Non AC Seater",
    amenities: ["Water Bottle", "Blanket"],
    totalSeats: 40,
    bookedSeats: [2, 3, 7, 8, 13, 16, 29],
  },
  {
    id: "bus-3",
    name: "Star Travels",
    operator: "NightStar Fleet",
    startTime: "09:45 PM",
    reachTime: "05:30 AM",
    duration: "7h 45m",
    rating: 4.8,
    price: 620,
    busType: "AC Sleeper",
    amenities: ["Charging", "Blanket", "CCTV"],
    totalSeats: 40,
    bookedSeats: [4, 6, 10, 11, 14, 15, 17, 20, 24],
  },
  {
    id: "bus-4",
    name: "Volvo Travel",
    operator: "Skyline Intercity",
    startTime: "06:10 AM",
    reachTime: "11:00 AM",
    duration: "4h 50m",
    rating: 4.5,
    price: 590,
    busType: "Volvo AC",
    amenities: ["Wi-Fi", "Live Tracking", "Snacks"],
    totalSeats: 40,
    bookedSeats: [8, 19, 21, 25, 28, 34],
  },
  {
    id: "bus-5",
    name: "Chouhan Travels",
    operator: "Rapid Transit Co.",
    startTime: "01:30 PM",
    reachTime: "06:40 PM",
    duration: "5h 10m",
    rating: 4.1,
    price: 450,
    busType: "AC Seater",
    amenities: ["Charging", "Water Bottle"],
    totalSeats: 42,
    bookedSeats: [1, 2, 3, 5, 7, 13, 30],
  },
  {
    id: "bus-6",
    name: "Royal Elite",
    operator: "Royal Group",
    startTime: "04:20 PM",
    reachTime: "10:05 PM",
    duration: "5h 45m",
    rating: 4.7,
    price: 670,
    busType: "Luxury Sleeper",
    amenities: ["Wi-Fi", "Blanket", "Recliner"],
    totalSeats: 36,
    bookedSeats: [9, 11, 12, 16, 17, 22],
  },
  {
    id: "bus-7",
    name: "NeoGo Express",
    operator: "GreenLine Mobility",
    startTime: "08:05 PM",
    reachTime: "01:40 AM",
    duration: "5h 35m",
    rating: 4.2,
    price: 520,
    busType: "AC Seater",
    amenities: ["Charging", "Live Tracking"],
    totalSeats: 40,
    bookedSeats: [6, 10, 14, 15, 26, 29, 38],
  },
  {
    id: "bus-8",
    name: "Yadav Bus",
    operator: "Metro Fleet",
    startTime: "11:50 PM",
    reachTime: "05:20 AM",
    duration: "5h 30m",
    rating: 4.4,
    price: 560,
    busType: "AC Sleeper",
    amenities: ["Blanket", "CCTV", "Wi-Fi"],
    totalSeats: 38,
    bookedSeats: [2, 4, 18, 20, 24, 31],
  },
];

const getAvailableSeats = (bus) => bus.totalSeats - bus.bookedSeats.length;

const amenityIcons = {
  "Charging": "⚡",
  "Wi-Fi": "📶",
  "Live Tracking": "📍",
  "Water Bottle": "💧",
  "Blanket": "🛏️",
  "CCTV": "📷",
  "Snacks": "🍿",
  "Recliner": "💺",
};

const busTypeColors = {
  "AC Sleeper": { bg: "#e8f4fd", text: "#1a6fa8", dot: "#3b9edd" },
  "Non AC Seater": { bg: "#fdf4e8", text: "#a86e1a", dot: "#e8961a" },
  "Volvo AC": { bg: "#e8fdf0", text: "#1a8a4a", dot: "#25b564" },
  "AC Seater": { bg: "#f0e8fd", text: "#6a1ab8", dot: "#9b4de8" },
  "Luxury Sleeper": { bg: "#fde8f4", text: "#b81a6a", dot: "#e84db0" },
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .bus-page {
    min-height: 100vh;
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f0f4ff;
    position: relative;
    overflow-x: hidden;
  }

  .bus-page::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 380px;
    background: linear-gradient(135deg, #0f0c29 0%, #1a1060 40%, #24243e 100%);
    z-index: 0;
  }

  .bg-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }
  .orb-1 { width: 400px; height: 400px; background: rgba(99,102,241,0.25); top: -100px; right: -80px; animation: floatOrb 8s ease-in-out infinite; }
  .orb-2 { width: 300px; height: 300px; background: rgba(236,72,153,0.15); top: 80px; left: -60px; animation: floatOrb 10s ease-in-out infinite reverse; }

  @keyframes floatOrb {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(30px) scale(1.05); }
  }

  .page-content {
    position: relative;
    z-index: 1;
    max-width: 860px;
    margin: 0 auto;
    padding: 32px 16px 60px;
  }

  /* HERO HEADER */
  .hero-header {
    margin-bottom: 28px;
    animation: slideDown 0.6s cubic-bezier(0.22,1,0.36,1) both;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .step-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 100px;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    letter-spacing: 0.05em;
    margin-bottom: 16px;
    backdrop-filter: blur(10px);
  }

  .step-dot {
    width: 6px; height: 6px;
    background: #818cf8;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  .hero-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2rem, 5vw, 2.8rem);
    font-weight: 700;
    color: #fff;
    line-height: 1.15;
    margin-bottom: 8px;
  }

  .hero-route {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .route-city {
    font-size: 15px;
    font-weight: 600;
    color: rgba(255,255,255,0.9);
  }

  .route-arrow {
    display: flex;
    align-items: center;
    gap: 4px;
    color: rgba(255,255,255,0.4);
  }
  .route-arrow span { font-size: 13px; }
  .route-line {
    width: 40px; height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,0.2), rgba(129,140,248,0.6), rgba(255,255,255,0.2));
  }

  .hero-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .hero-chip {
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 100px;
    padding: 5px 12px;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.8);
    backdrop-filter: blur(8px);
  }

  /* FILTER BAR */
  .filter-bar {
    background: #fff;
    border-radius: 20px;
    padding: 16px;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    box-shadow: 0 4px 24px rgba(15,10,60,0.08);
    animation: slideDown 0.6s 0.1s cubic-bezier(0.22,1,0.36,1) both;
  }

  .search-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    left: 14px;
    font-size: 16px;
    color: #9ca3af;
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    height: 44px;
    border: 1.5px solid #e5e7eb;
    border-radius: 12px;
    padding: 0 14px 0 40px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #111827;
    background: #f9fafb;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }

  .search-input::placeholder { color: #9ca3af; }
  .search-input:focus {
    border-color: #6366f1;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
  }

  .sort-select {
    height: 44px;
    border: 1.5px solid #e5e7eb;
    border-radius: 12px;
    padding: 0 14px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    background: #f9fafb;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
    white-space: nowrap;
  }

  .sort-select:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
  }

  /* BUS CARDS */
  .bus-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .bus-card {
    background: #fff;
    border-radius: 24px;
    overflow: hidden;
    border: 2px solid #e9ecf5;
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s, border-color 0.25s;
    animation: cardIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
    box-shadow: 0 2px 12px rgba(15,10,60,0.05);
  }

  .bus-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 48px rgba(15,10,60,0.12);
    border-color: #c7d2fe;
  }

  .bus-card.selected {
    border-color: #6366f1;
    box-shadow: 0 8px 32px rgba(99,102,241,0.18);
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .bus-card:nth-child(1) { animation-delay: 0.08s; }
  .bus-card:nth-child(2) { animation-delay: 0.14s; }
  .bus-card:nth-child(3) { animation-delay: 0.20s; }
  .bus-card:nth-child(4) { animation-delay: 0.26s; }
  .bus-card:nth-child(5) { animation-delay: 0.32s; }
  .bus-card:nth-child(6) { animation-delay: 0.38s; }
  .bus-card:nth-child(7) { animation-delay: 0.44s; }
  .bus-card:nth-child(8) { animation-delay: 0.50s; }

  /* TOP ACCENT */
  .card-accent {
    height: 4px;
    background: linear-gradient(90deg, #e5e7eb, #e5e7eb);
    transition: background 0.3s;
  }
  .bus-card.selected .card-accent {
    background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);
  }

  .card-body {
    padding: 20px 22px 0;
  }

  /* Card top row */
  .card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 18px;
  }

  .bus-name-block {}

  .bus-name {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 3px;
  }

  .bus-operator {
    font-size: 12.5px;
    font-weight: 500;
    color: #6b7280;
  }

  .card-badges {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 4px 10px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 700;
  }

  .badge-rating {
    background: #fefce8;
    color: #a16207;
  }

  .badge-seats {
    background: #f0fdf4;
    color: #166534;
  }

  .badge-type {
    border-radius: 8px;
    font-size: 11.5px;
    padding: 4px 9px;
  }

  /* Journey timeline */
  .journey-row {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 12px;
    background: #f8f9ff;
    border-radius: 16px;
    padding: 14px 18px;
    margin-bottom: 14px;
  }

  .time-block { }

  .time-label {
    font-size: 11px;
    font-weight: 600;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 3px;
  }

  .time-value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #111827;
    line-height: 1;
  }

  .time-block.end { text-align: right; }

  .journey-middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .duration-label {
    font-size: 11px;
    font-weight: 700;
    color: #6366f1;
    white-space: nowrap;
  }

  .journey-line {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .j-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #6366f1;
    flex-shrink: 0;
  }

  .j-dashes {
    display: flex;
    gap: 3px;
  }

  .j-dash {
    width: 8px; height: 2px;
    background: #c7d2fe;
    border-radius: 1px;
  }

  /* Bottom row */
  .card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding: 14px 22px 18px;
    border-top: 1px solid #f0f2f8;
  }

  .amenities-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    flex: 1;
    min-width: 0;
  }

  .amenity-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #f3f4f6;
    border-radius: 8px;
    padding: 4px 10px;
    font-size: 11.5px;
    font-weight: 600;
    color: #374151;
    transition: background 0.2s;
  }

  .bus-card.selected .amenity-pill {
    background: #eef2ff;
    color: #4338ca;
  }

  /* Price + Button */
  .price-action {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-shrink: 0;
  }

  .price-block { text-align: right; }

  .price-label {
    font-size: 10px;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1px;
  }

  .price-value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #111827;
    line-height: 1;
  }

  .price-currency {
    font-size: 13px;
    font-weight: 600;
    color: #6b7280;
    margin-right: 1px;
  }

  .select-btn {
    height: 42px;
    padding: 0 22px;
    border-radius: 12px;
    border: 2px solid #6366f1;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.22,1,0.36,1);
    white-space: nowrap;
    position: relative;
    overflow: hidden;
  }

  .select-btn.idle {
    background: #fff;
    color: #6366f1;
  }

  .select-btn.idle:hover {
    background: #6366f1;
    color: #fff;
    transform: scale(1.03);
    box-shadow: 0 6px 20px rgba(99,102,241,0.35);
  }

  .select-btn.active {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 4px 18px rgba(99,102,241,0.4);
  }

  .select-btn.active:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 24px rgba(99,102,241,0.5);
  }

  .checkmark {
    display: inline-block;
    margin-right: 5px;
    animation: popIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
  }

  @keyframes popIn {
    from { transform: scale(0) rotate(-30deg); opacity: 0; }
    to { transform: scale(1) rotate(0); opacity: 1; }
  }

  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #9ca3af;
  }

  .empty-icon { font-size: 48px; margin-bottom: 12px; }
  .empty-title { font-size: 17px; font-weight: 700; color: #374151; margin-bottom: 6px; }
  .empty-sub { font-size: 14px; }

  @media (max-width: 560px) {
    .filter-bar { grid-template-columns: 1fr; }
    .journey-row { padding: 12px 14px; }
    .time-value { font-size: 18px; }
    .j-dashes { display: none; }
    .card-bottom { flex-direction: column; align-items: flex-start; }
    .price-action { width: 100%; justify-content: space-between; }
  }
`;

export default function BusSelectionClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from") || "Indore";
  const to = searchParams.get("to") || "Pune";
  const date = searchParams.get("date") || "";

  const [selectedBusId, setSelectedBusId] = useState(defaultBuses[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  const selectedBus = useMemo(
    () => defaultBuses.find((bus) => bus.id === selectedBusId) || defaultBuses[0],
    [selectedBusId]
  );

  useEffect(() => {
    if (!selectedBusId) setSelectedBusId(defaultBuses[0].id);
  }, [selectedBusId]);

  const displayBuses = useMemo(() => {
    const filtered = defaultBuses.filter((bus) => {
      const query = searchTerm.trim().toLowerCase();
      if (!query) return true;
      return (
        bus.name.toLowerCase().includes(query) ||
        bus.operator.toLowerCase().includes(query) ||
        bus.busType.toLowerCase().includes(query)
      );
    });

    const sorted = [...filtered];
    if (sortBy === "price-low") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);
    else sorted.sort((a, b) => getAvailableSeats(b) - getAvailableSeats(a));

    return sorted;
  }, [searchTerm, sortBy]);

  const handleSelectBusDirect = (busId) => {
    setSelectedBusId(busId);
    const query = new URLSearchParams({ from, to, date, busId }).toString();
    router.push(`/booking/seats?${query}`);
  };

  const typeStyle = (busType) => busTypeColors[busType] || { bg: "#f3f4f6", text: "#374151", dot: "#9ca3af" };

  return (
    <>
      <style>{styles}</style>
      <div className="bus-page">
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />

        <div className="page-content">

          {/* HERO */}
          <div className="hero-header">
            {/* <div className="step-badge">
              <div className="step-dot" />
              Step 1 of 3 &nbsp;·&nbsp; Choose Bus
            </div> */}
            <h1 className="hero-title">Find Your Ride</h1>
            <div className="hero-route">
              <span className="route-city">{from}</span>
              <div className="route-arrow">
                <div className="route-line" />
                <span>✈</span>
                <div className="route-line" />
              </div>
              <span className="route-city">{to}</span>
              {date && (
                <>
                  <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 4px" }}>·</span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>{date}</span>
                </>
              )}
            </div>
            <div className="hero-chips">
              <div className="hero-chip">🚌 {defaultBuses.length} buses available</div>
              <div className="hero-chip">⚡ Instant booking</div>
              <div className="hero-chip">✅ Verified operators</div>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="filter-bar">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                type="text"
                placeholder="Search bus, operator, or type…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">✦ Recommended</option>
              <option value="price-low">↑ Price: Low to High</option>
              <option value="price-high">↓ Price: High to Low</option>
              <option value="rating">★ Top Rated</option>
            </select>
          </div>

          {/* BUS LIST */}
          <div className="bus-list">
            {displayBuses.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🚌</div>
                <div className="empty-title">No buses found</div>
                <div className="empty-sub">Try a different search term</div>
              </div>
            ) : (
              displayBuses.map((bus) => {
                const isSelected = selectedBusId === bus.id;
                const ts = typeStyle(bus.busType);
                const avail = getAvailableSeats(bus);

                return (
                  <div
                    key={bus.id}
                    className={`bus-card${isSelected ? " selected" : ""}`}
                  >
                    <div className="card-accent" />
                    <div className="card-body">
                      <div className="card-top">
                        <div className="bus-name-block">
                          <div className="bus-name">{bus.name}</div>
                          <div className="bus-operator">{bus.operator}</div>
                        </div>
                        <div className="card-badges">
                          <span className="badge badge-rating">⭐ {bus.rating}</span>
                          <span className="badge badge-seats">🪑 {avail} left</span>
                        </div>
                      </div>

                      {/* Type badge + journey */}
                      <div style={{ marginBottom: 14 }}>
                        <span
                          className="badge badge-type"
                          style={{ background: ts.bg, color: ts.text }}
                        >
                          <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: ts.dot, marginRight: 5 }} />
                          {bus.busType}
                        </span>
                      </div>

                      <div className="journey-row">
                        <div className="time-block">
                          <div className="time-label">Departure</div>
                          <div className="time-value">{bus.startTime}</div>
                        </div>
                        <div className="journey-middle">
                          <span className="duration-label">{bus.duration}</span>
                          <div className="journey-line">
                            <div className="j-dot" />
                            <div className="j-dashes">
                              {[...Array(5)].map((_, i) => <div key={i} className="j-dash" />)}
                            </div>
                            <div className="j-dot" />
                          </div>
                        </div>
                        <div className="time-block end">
                          <div className="time-label">Arrival</div>
                          <div className="time-value">{bus.reachTime}</div>
                        </div>
                      </div>
                    </div>

                    <div className="card-bottom">
                      <div className="amenities-row">
                        {bus.amenities.map((a) => (
                          <span key={a} className="amenity-pill">
                            <span>{amenityIcons[a] || "•"}</span>
                            {a}
                          </span>
                        ))}
                      </div>
                      <div className="price-action">
                        <div className="price-block">
                          <div className="price-label">From</div>
                          <div className="price-value">
                            <span className="price-currency">₹</span>{bus.price}
                          </div>
                        </div>
                        <button
                          className={`select-btn ${isSelected ? "active" : "idle"}`}
                          onClick={() => handleSelectBusDirect(bus.id)}
                        >
                          {isSelected ? (
                            <><span className="checkmark">✓</span>Selected</>
                          ) : (
                            "Select →"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}