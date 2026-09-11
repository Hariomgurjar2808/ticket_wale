"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Chip, Divider, Typography } from "@mui/material";

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

const isSleeperType = (busType = "") => busType.toLowerCase().includes("sleeper");

const getAvailableSeats = (bus) => bus.totalSeats - bus.bookedSeats.length;

export default function SeatSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from") || "Indore";
  const to = searchParams.get("to") || "Pune";
  const date = searchParams.get("date") || "";
  const busId = searchParams.get("busId") || defaultBuses[0].id;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const selectedBus = useMemo(
    () => defaultBuses.find((bus) => bus.id === busId) || defaultBuses[0],
    [busId]
  );

  const bookedSeatSet = useMemo(
    () => new Set(selectedBus?.bookedSeats || []),
    [selectedBus]
  );

  const availableSeatNumbers = useMemo(() => {
    const numbers = [];
    for (let seatNumber = 1; seatNumber <= selectedBus.totalSeats; seatNumber += 1) {
      if (!bookedSeatSet.has(seatNumber)) {
        numbers.push(seatNumber);
      }
    }
    return numbers;
  }, [selectedBus, bookedSeatSet]);

  const seatLayoutRows = useMemo(() => {
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
        const currentSeat = { type: "seat", number: seatNumber, key: `seat-${seatNumber}` };
        seatNumber += 1;
        return currentSeat;
      });
      rows.push(rowSeats);
    }

    return rows;
  }, [selectedBus]);

  const totalFare = selectedBus.price * selectedSeats.length;

  const handleSeatToggle = (seatNumber) => {
    if (bookedSeatSet.has(seatNumber)) {
      return;
    }
    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((seat) => seat !== seatNumber);
      }
      return [...prev, seatNumber].sort((a, b) => a - b);
    });
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      return;
    }
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
    <Box className="min-h-screen px-4 py-8 md:px-8" sx={{ background: "linear-gradient(180deg, #f4f0ff 0%, #fff6e8 40%, #fffdf7 100%)" }}>
      <Box className="mx-auto w-full max-w-6xl">
        <Box className="mb-6 overflow-hidden rounded-[28px] p-6 md:p-8" sx={{ background: "linear-gradient(135deg, #111827 0%, #292c6d 45%, #5b5ea6 100%)", color: "white", boxShadow: "0 22px 56px rgba(17, 24, 39, 0.2)" }}>
          <Typography variant="overline" sx={{ letterSpacing: "0.16em", opacity: 0.8 }}>
            Step 2 of 3
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, mt: 1, mb: 1.5, fontSize: { xs: "2rem", md: "2.6rem" } }}>
            Select Your Seats
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.92, mb: 3 }}>
            {date ? `Travel date: ${date}` : "Choose your seats on the selected bus."}
          </Typography>
          <Box className="flex flex-wrap gap-2">
            <Chip label={`Bus selected: ${selectedBus.name}`} sx={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700 }} />
            <Chip label={`Route: ${from} → ${to}`} sx={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700 }} />
          </Box>
        </Box>

        <Box className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            {selectedBus.name} • {selectedBus.operator}
          </Typography>
          <Box className="mb-4 rounded-2xl bg-[#eef2ff] p-4" sx={{ border: "1px solid #dbeafe" }}>
            <Typography variant="body2" sx={{ color: "#111827", fontWeight: 700, mb: 1 }}>
              {selectedBus.busType} • Rs {selectedBus.price}/seat
            </Typography>
            <Typography variant="body2" sx={{ color: "#4b5563" }}>
              {selectedBus.startTime} to {selectedBus.reachTime} • Duration {selectedBus.duration}
            </Typography>
          </Box>

          <Box className="mb-3 flex flex-wrap gap-2">
            <Chip label="Available" size="small" sx={{ backgroundColor: "#dbeafe", color: "#1e40af", fontWeight: 700 }} />
            <Chip label="Selected" size="small" sx={{ backgroundColor: "#ede9fe", color: "#5b21b6", fontWeight: 700 }} />
            <Chip label="Booked" size="small" sx={{ backgroundColor: "#fecaca", color: "#991b1b", fontWeight: 700 }} />
          </Box>

          <Box className="mb-4 rounded-xl border border-dashed border-slate-300 p-3" sx={{ background: "linear-gradient(180deg, #ffffff 0%, #f5f7ff 100%)" }}>
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
                      return <Box key={item.key} sx={{ width: isSleeperType(selectedBus.busType) ? 54 : 44 }} />;
                    }
                    const isBooked = bookedSeatSet.has(item.number);
                    const isSelected = selectedSeats.includes(item.number);

                    return (
                      <Button
                        key={item.key}
                        onClick={() => handleSeatToggle(item.number)}
                        disabled={isBooked}
                        sx={{
                          minWidth: isSleeperType(selectedBus.busType) ? 54 : 44,
                          height: isSleeperType(selectedBus.busType) ? 34 : 38,
                          px: 0,
                          fontSize: "0.72rem",
                          borderRadius: isSleeperType(selectedBus.busType) ? "8px" : "10px",
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
                          "&.Mui-disabled": { color: "#fff", background: "#ef4444", opacity: 1 },
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
            Remaining Seats: {availableSeatNumbers.length}
          </Typography>
          <Typography variant="body1" sx={{ color: "#111827", mb: 3 }}>
            Total Fare: Rs {totalFare}
          </Typography>

          <Button
            variant="contained"
            disabled={selectedSeats.length === 0}
            onClick={handleProceed}
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
