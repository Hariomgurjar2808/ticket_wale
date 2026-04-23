"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Chip, Divider, MenuItem, TextField, Typography } from "@mui/material";

const STORAGE_KEY = "ticket_wales_bus_inventory";

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

const isSleeperType = (busType = "") => busType.toLowerCase().includes("sleeper");

const defaultBusCatalog = defaultBuses.reduce((acc, bus) => {
  acc[bus.id] = bus;
  return acc;
}, {});

const amenityColorMap = {
  "Wi-Fi": { bg: "#dbeafe", color: "#1d4ed8" },
  Charging: { bg: "#dcfce7", color: "#166534" },
  Blanket: { bg: "#ede9fe", color: "#6d28d9" },
  Snacks: { bg: "#ffedd5", color: "#9a3412" },
  CCTV: { bg: "#fee2e2", color: "#b91c1c" },
  Recliner: { bg: "#fef3c7", color: "#92400e" },
  "Live Tracking": { bg: "#ccfbf1", color: "#0f766e" },
  "Water Bottle": { bg: "#e0f2fe", color: "#0369a1" },
};

const getAmenityChipSx = (amenity) => {
  const color = amenityColorMap[amenity] || { bg: "#f3f4f6", color: "#374151" };
  return {
    backgroundColor: color.bg,
    color: color.color,
    fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.55)",
  };
};

const pickPreferredString = (value, fallback, placeholders = []) => {
  if (typeof value !== "string") {
    return fallback || "";
  }

  const trimmed = value.trim();
  if (!trimmed || placeholders.includes(trimmed)) {
    return fallback || trimmed || "";
  }

  return trimmed;
};

const pickPreferredAmenities = (value, fallback) => {
  const placeholderOnlyLiveTracking =
    Array.isArray(value) && value.length === 1 && value[0] === "Live Tracking";

  if (!Array.isArray(value) || value.length === 0 || placeholderOnlyLiveTracking) {
    return Array.isArray(fallback) && fallback.length > 0 ? fallback : ["Live Tracking"];
  }

  return value;
};

const normalizeBus = (bus, index = 0) => ({
  ...(() => {
    const id = bus.id || `bus-${index + 1}`;
    const base = defaultBusCatalog[id] || {};

    return {
      id,
      name: pickPreferredString(bus.name, base.name || `Bus ${index + 1}`),
      operator: pickPreferredString(bus.operator, base.operator || "TicketWale Partner", ["TicketWale Partner"]),
      startTime: pickPreferredString(bus.startTime, base.startTime || "--:--", ["--:--"]),
      reachTime: pickPreferredString(bus.reachTime, base.reachTime || "--:--", ["--:--"]),
      duration: pickPreferredString(bus.duration, base.duration || "--", ["--"]),
      rating: Number(bus.rating ?? base.rating ?? 4),
      price: Number(bus.price ?? base.price ?? 0),
      busType: pickPreferredString(bus.busType, base.busType || "Seater", ["Seater"]),
      amenities: pickPreferredAmenities(bus.amenities, base.amenities),
      totalSeats: Number(bus.totalSeats ?? base.totalSeats ?? 40),
      bookedSeats: Array.isArray(bus.bookedSeats)
        ? bus.bookedSeats
        : Array.isArray(base.bookedSeats)
          ? base.bookedSeats
          : [],
    };
  })(),
});

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from") || "Indore";
  const to = searchParams.get("to") || "Pune";
  const date = searchParams.get("date") || "";

  const [buses, setBuses] = useState(defaultBuses);
  const [selectedBusId, setSelectedBusId] = useState(defaultBuses[0].id);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalized = parsed.map((bus, index) => normalizeBus(bus, index));
          setBuses(normalized);
          setSelectedBusId(normalized[0].id);
        }
      } catch (error) {
        console.error("Failed to parse saved bus inventory", error);
      }
    } else {
      setBuses(defaultBuses.map((bus, index) => normalizeBus(bus, index)));
      setSelectedBusId(defaultBuses[0].id);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(buses));
  }, [buses]);

  const selectedBus = useMemo(
    () => buses.find((bus) => bus.id === selectedBusId) || null,
    [buses, selectedBusId]
  );

  const bookedSeatSet = useMemo(
    () => new Set(selectedBus?.bookedSeats || []),
    [selectedBus]
  );

  const displayBuses = useMemo(() => {
    const filtered = buses.filter((bus) => {
      const query = searchTerm.trim().toLowerCase();
      if (!query) {
        return true;
      }

      return (
        bus.name.toLowerCase().includes(query) ||
        bus.operator.toLowerCase().includes(query) ||
        bus.busType.toLowerCase().includes(query)
      );
    });

    const sorted = [...filtered];
    if (sortBy === "price-low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else {
      sorted.sort((a, b) => getAvailableSeats(b) - getAvailableSeats(a));
    }

    return sorted;
  }, [buses, searchTerm, sortBy]);

  const availableSeatNumbers = useMemo(() => {
    if (!selectedBus) {
      return [];
    }

    const booked = new Set(selectedBus.bookedSeats);
    const numbers = [];

    for (let seatNumber = 1; seatNumber <= selectedBus.totalSeats; seatNumber += 1) {
      if (!booked.has(seatNumber)) {
        numbers.push(seatNumber);
      }
    }

    return numbers;
  }, [selectedBus]);

  const seatLayoutRows = useMemo(() => {
    if (!selectedBus) {
      return [];
    }

    const sleeper = isSleeperType(selectedBus.busType);
    const columns = sleeper ? ["L1", "L2", "AISLE", "R1"] : ["L1", "L2", "AISLE", "R1", "R2"];
    const rows = [];
    let seatNumber = 1;

    while (seatNumber <= selectedBus.totalSeats) {
      const rowSeats = columns.map((column) => {
        if (column === "AISLE") {
          return { type: "aisle", key: `aisle-${rows.length}` };
        }

        if (seatNumber > selectedBus.totalSeats) {
          return { type: "empty", key: `empty-${rows.length}-${column}` };
        }

        const currentSeat = {
          type: "seat",
          number: seatNumber,
          key: `seat-${seatNumber}`,
        };

        seatNumber += 1;
        return currentSeat;
      });

      rows.push(rowSeats);
    }

    return rows;
  }, [selectedBus]);

  const totalFare = selectedBus ? selectedSeats.length * selectedBus.price : 0;

  const handleSeatToggle = (seatNumber) => {
    if (!selectedBus || bookedSeatSet.has(seatNumber)) {
      return;
    }

    setSelectedSeats((prevSeats) => {
      if (prevSeats.includes(seatNumber)) {
        return prevSeats.filter((seat) => seat !== seatNumber);
      }
      return [...prevSeats, seatNumber].sort((a, b) => a - b);
    });
  };

  const handleSelectBus = (busId) => {
    setSelectedBusId(busId);
    setSelectedSeats([]);
  };

  const handleProceedToPayment = () => {
    if (!selectedBus || selectedSeats.length === 0) {
      return;
    }

    const updatedBuses = buses.map((bus) => {
      if (bus.id !== selectedBus.id) {
        return bus;
      }

      return {
        ...bus,
        bookedSeats: [...bus.bookedSeats, ...selectedSeats],
      };
    });

    setBuses(updatedBuses);

    const query = new URLSearchParams({
      from,
      to,
      date,
      busName: selectedBus.name,
      startTime: selectedBus.startTime,
      reachTime: selectedBus.reachTime,
      seats: selectedSeats.join(","),
      seatCount: String(selectedSeats.length),
      fare: String(totalFare),
    }).toString();

    router.push(`/booking/passenger?${query}`);
  };

  return (
    <Box
      className="min-h-screen px-4 py-8 md:px-8"
      sx={{
        background:
          "linear-gradient(180deg, #f4f0ff 0%, #fff6e8 40%, #fffdf7 100%)",
      }}
    >
      <Box className="mx-auto w-full max-w-6xl">
        <Box
          className="relative mb-6 overflow-hidden rounded-[28px] p-6 md:p-8"
          sx={{
            background: "linear-gradient(135deg, #111827 0%, #292c6d 45%, #5b5ea6 100%)",
            color: "white",
            boxShadow: "0 22px 56px rgba(17, 24, 39, 0.2)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              right: -40,
              top: -36,
              width: 180,
              height: 180,
              borderRadius: "999px",
              background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.01) 70%)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              left: -28,
              bottom: -36,
              width: 140,
              height: 140,
              borderRadius: "999px",
              background: "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.01) 70%)",
            }}
          />
          <Typography variant="overline" sx={{ letterSpacing: "0.16em", opacity: 0.8 }}>
            Bus Search Results
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, mt: 1, mb: 1.5, fontSize: { xs: "2rem", md: "2.6rem" } }}>
            {from} to {to}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.92, mb: 3 }}>
            {date ? `Travel date: ${date}` : "Select your preferred bus and seats to continue."}
          </Typography>
          <Box className="flex flex-wrap gap-2">
            <Chip label={`${buses.length} Buses Available`} sx={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700 }} />
            <Chip label="Instant Booking" sx={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700 }} />
            <Chip label="Live Seat Inventory" sx={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700 }} />
            <Chip label="Verified Operators" sx={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700 }} />
          </Box>
        </Box>

        <Box className="mb-6 grid grid-cols-1 gap-3 rounded-2xl border border-[#e5e7eb] bg-white/85 p-4 md:grid-cols-[1fr_220px] md:p-5">
          <TextField
            label="Search bus, operator, or type"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            fullWidth
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px", backgroundColor: "white" } }}
          />
          <TextField
            select
            label="Sort by"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            fullWidth
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px", backgroundColor: "white" } }}
          >
            <MenuItem value="recommended">Recommended</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="rating">Top Rated</MenuItem>
          </TextField>
        </Box>

        <Box className="grid grid-cols-1 gap-4">
          {displayBuses.map((bus) => {
            const isSelected = selectedBusId === bus.id;
            return (
              <Box
                key={bus.id}
                className="rounded-2xl border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl md:p-5"
                sx={{
                  borderColor: isSelected ? "#818cf8" : "#e5e7eb",
                  boxShadow: isSelected
                    ? "0 16px 28px rgba(99, 102, 241, 0.18)"
                    : "0 8px 18px rgba(15, 23, 42, 0.05)",
                }}
              >
                <Box className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: "#111827" }}>
                      {bus.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#4b5563", mb: 0.5 }}>
                      {bus.operator} | {bus.busType}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#4b5563", mb: 1 }}>
                      Departure: {bus.startTime} | Arrival: {bus.reachTime} | Duration: {bus.duration}
                    </Typography>

                    <Box className="mb-2 flex flex-wrap gap-2">
                      {bus.amenities.map((amenity) => (
                        <Chip
                          key={`${bus.id}-${amenity}`}
                          label={amenity}
                          size="small"
                          sx={getAmenityChipSx(amenity)}
                        />
                      ))}
                    </Box>

                    <Typography variant="body2" sx={{ color: "#4b5563" }}>
                      Rating: <strong>{bus.rating}</strong> | Seats Left: <strong>{getAvailableSeats(bus)}</strong>
                    </Typography>
                  </Box>

                  <Box className="flex flex-col items-start gap-2 md:items-end">
                    <Typography variant="h5" sx={{ fontWeight: 900, color: "#111827" }}>
                      Rs {bus.price}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#6b7280" }}>
                      per seat
                    </Typography>

                    <Button
                      variant={isSelected ? "contained" : "outlined"}
                      onClick={() => handleSelectBus(bus.id)}
                      sx={{
                        mt: 1,
                        textTransform: "none",
                        minWidth: 152,
                        borderRadius: "12px",
                        fontWeight: 700,
                        background: isSelected
                          ? "linear-gradient(135deg, #5b5ea6 0%, #292c6d 100%)"
                          : "transparent",
                        borderColor: "#5b5ea6",
                        color: isSelected ? "#fff" : "#5b5ea6",
                        "&:hover": {
                          background: isSelected
                            ? "linear-gradient(135deg, #4a4d8f 0%, #20235a 100%)"
                            : "rgba(91, 94, 166, 0.08)",
                          borderColor: "#5b5ea6",
                        },
                      }}
                    >
                      {isSelected ? "Selected" : "Select Bus"}
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        {displayBuses.length === 0 && (
          <Box className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", mb: 1 }}>
              No buses found
            </Typography>
            <Typography variant="body2" sx={{ color: "#6b7280" }}>
              Try another search keyword or change sort options.
            </Typography>
          </Box>
        )}

        <Box className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Select Seats {selectedBus ? `- ${selectedBus.name}` : ""}
          </Typography>

          {selectedBus && (
            <Box
              className="mb-4 rounded-2xl p-4"
              sx={{
                background: "linear-gradient(135deg, #eef2ff 0%, #fff7ed 100%)",
                border: "1px solid #dbeafe",
              }}
            >
              <Typography variant="subtitle1" sx={{ color: "#111827", fontWeight: 800, mb: 1 }}>
                {selectedBus.name} | {selectedBus.operator}
              </Typography>
              <Box className="mb-1 flex flex-wrap gap-2">
                <Chip label={`Bus Type: ${selectedBus.busType}`} size="small" sx={{ backgroundColor: "#e0e7ff", color: "#312e81", fontWeight: 700 }} />
                <Chip label={`Duration: ${selectedBus.duration}`} size="small" sx={{ backgroundColor: "#ffedd5", color: "#9a3412", fontWeight: 700 }} />
                <Chip label={`Fare: Rs ${selectedBus.price}/seat`} size="small" sx={{ backgroundColor: "#dcfce7", color: "#166534", fontWeight: 700 }} />
              </Box>
              <Typography variant="body2" sx={{ color: "#4b5563", mb: 1 }}>
                {selectedBus.startTime} to {selectedBus.reachTime}
              </Typography>
              <Box className="flex flex-wrap gap-2">
                {selectedBus.amenities.map((amenity) => (
                  <Chip
                    key={`selected-${amenity}`}
                    label={amenity}
                    size="small"
                    sx={{ backgroundColor: "#ffffff", color: "#374151", fontWeight: 600, border: "1px solid #e5e7eb" }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Box className="mb-3 flex flex-wrap gap-2">
            <Chip label="Available" size="small" sx={{ backgroundColor: "#dbeafe", color: "#1e40af", fontWeight: 700 }} />
            <Chip label="Selected" size="small" sx={{ backgroundColor: "#ede9fe", color: "#5b21b6", fontWeight: 700 }} />
            <Chip label="Booked" size="small" sx={{ backgroundColor: "#fecaca", color: "#991b1b", fontWeight: 700 }} />
          </Box>

          <Box
            className="mb-4 rounded-xl border border-dashed border-slate-300 p-3"
            sx={{ background: "linear-gradient(180deg, #ffffff 0%, #f5f7ff 100%)" }}
          >
            <Box className="mb-2 flex items-center justify-between">
              <Typography variant="caption" sx={{ color: "#6b7280", display: "block" }}>
                Front of Bus
              </Typography>
              <Chip label="Driver" size="small" sx={{ backgroundColor: "#111827", color: "#fff" }} />
            </Box>

            <Box className="flex flex-col gap-2">
              {seatLayoutRows.map((row, rowIndex) => (
                <Box key={`row-${rowIndex}`} className="flex items-center gap-2">
                  <Typography variant="caption" sx={{ width: 26, color: "#6b7280" }}>
                    {rowIndex + 1}
                  </Typography>

                  {row.map((item) => {
                    if (item.type === "aisle") {
                      return <Box key={item.key} sx={{ width: 22 }} />;
                    }

                    if (item.type === "empty") {
                      return <Box key={item.key} sx={{ width: isSleeperType(selectedBus?.busType) ? 54 : 44 }} />;
                    }

                    const isBooked = bookedSeatSet.has(item.number);
                    const isSelected = selectedSeats.includes(item.number);

                    return (
                      <Button
                        key={item.key}
                        onClick={() => handleSeatToggle(item.number)}
                        disabled={isBooked}
                        sx={{
                          minWidth: isSleeperType(selectedBus?.busType) ? 54 : 44,
                          height: isSleeperType(selectedBus?.busType) ? 34 : 38,
                          px: 0,
                          fontSize: "0.72rem",
                          borderRadius: isSleeperType(selectedBus?.busType) ? "8px" : "10px",
                          border: "1px solid #d1d5db",
                          color: isSelected ? "#fff" : "#111827",
                          background: isBooked
                            ? "#ef4444"
                            : isSelected
                              ? "linear-gradient(135deg, #5b5ea6 0%, #292c6d 100%)"
                              : "linear-gradient(180deg, #ffffff 0%, #e2e8f0 100%)",
                          "&:hover": {
                            background: isBooked
                              ? "#ef4444"
                              : isSelected
                                ? "linear-gradient(135deg, #4a4d8f 0%, #20235a 100%)"
                                : "linear-gradient(180deg, #f8fafc 0%, #dbeafe 100%)",
                          },
                          "&.Mui-disabled": {
                            color: "#fff",
                            background: "#ef4444",
                            opacity: 1,
                          },
                        }}
                      >
                        {`S${item.number}`}
                      </Button>
                    );
                  })}
                </Box>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" sx={{ color: "#111827", mb: 1 }}>
            Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
          </Typography>
          <Typography variant="body2" sx={{ color: "#4b5563", mb: 1 }}>
            Available Seats: {availableSeatNumbers.length}
          </Typography>
          <Typography variant="body1" sx={{ color: "#111827", mb: 3 }}>
            Total Fare: Rs {totalFare}
          </Typography>

          <Button
            variant="contained"
            disabled={!selectedBus || selectedSeats.length === 0}
            onClick={handleProceedToPayment}
            sx={{
              textTransform: "none",
              backgroundColor: "#5b5ea6",
              "&:hover": { backgroundColor: "#4a4d8f" },
              "&.Mui-disabled": { backgroundColor: "#c7c9de", color: "white" },
            }}
          >
            Next: Passenger Details
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
