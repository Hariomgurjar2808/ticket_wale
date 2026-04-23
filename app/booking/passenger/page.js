"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function PassengerDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from") || "-";
  const to = searchParams.get("to") || "-";
  const date = searchParams.get("date") || "-";
  const busName = searchParams.get("busName") || "-";
  const startTime = searchParams.get("startTime") || "-";
  const reachTime = searchParams.get("reachTime") || "-";
  const seats = searchParams.get("seats") || "-";
  const seatCount = Number(searchParams.get("seatCount") || "0");
  const fare = searchParams.get("fare") || "0";

  const initialPassengers = useMemo(
    () =>
      Array.from({ length: seatCount }, (_, index) => ({
        seatLabel:
          seats !== "-" ? seats.split(",")[index]?.trim() || `${index + 1}` : `${index + 1}`,
        name: "",
        age: "",
      })),
    [seatCount, seats]
  );

  const [passengers, setPassengers] = useState(initialPassengers);
  const [submitMessage, setSubmitMessage] = useState("");

  const handlePassengerChange = (index, field, value) => {
    setPassengers((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        [field]: value,
      };
      return next;
    });
    setSubmitMessage("");
  };

  const isPassengerDetailsComplete =
    passengers.length > 0 &&
    passengers.every(
      (passenger) =>
        passenger.name.trim().length > 0 &&
        passenger.age !== "" &&
        Number(passenger.age) > 0
    );

  const handleContinueToPayment = () => {
    if (!isPassengerDetailsComplete) {
      setSubmitMessage("Please fill passenger name and age for all selected seats.");
      return;
    }

    const query = new URLSearchParams({
      from,
      to,
      date,
      busName,
      startTime,
      reachTime,
      seats,
      seatCount: String(seatCount),
      fare: String(fare),
      passengers: JSON.stringify(passengers),
    }).toString();

    router.push(`/booking/payment?${query}`);
  };

  return (
    <Box
      className="min-h-screen px-4 py-10 md:px-8"
      sx={{
        background:
          "linear-gradient(180deg, #f7f4ff 0%, #fff8ea 42%, #fffdf7 100%)",
      }}
    >
      <Box className="mx-auto w-full max-w-6xl">
        <Box
          className="mb-6 overflow-hidden rounded-[28px] p-6 md:p-8"
          sx={{
            background: "linear-gradient(135deg, #292c6d 0%, #5b5ea6 55%, #8ea7e9 100%)",
            color: "white",
            boxShadow: "0 24px 60px rgba(41, 44, 109, 0.22)",
          }}
        >
          <Typography
            variant="overline"
            sx={{ letterSpacing: "0.18em", opacity: 0.85 }}
          >
            Step 2 Of 3
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 1.5, fontSize: { xs: "2rem", md: "2.6rem" } }}>
            Add Passenger Details
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 720, opacity: 0.92, fontSize: { xs: "1rem", md: "1.05rem" } }}>
            Enter the name and age for each selected seat before moving to payment.
            Your trip summary is shown alongside the form for quick review.
          </Typography>
        </Box>

        <Box className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Box
            className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur md:p-7"
          >
            <Box className="mb-5 flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827" }}>
                  Passenger Information
                </Typography>
                <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.5 }}>
                  {seatCount} {seatCount === 1 ? "traveller" : "travellers"} need details.
                </Typography>
              </Box>
              <Box
                sx={{
                  borderRadius: "999px",
                  backgroundColor: "#eef2ff",
                  color: "#4338ca",
                  px: 2,
                  py: 0.8,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                }}
              >
                Seats: {seats}
              </Box>
            </Box>

            <Box sx={{ mt: 1 }} className="space-y-4">
              {passengers.map((passenger, index) => (
                <Box
                  key={`${passenger.seatLabel}-${index}`}
                  className="rounded-[24px] border p-4 md:p-5"
                  sx={{
                    borderColor: "#e5e7eb",
                    background:
                      "linear-gradient(180deg, rgba(250,250,255,1) 0%, rgba(245,247,255,1) 100%)",
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
                  }}
                >
                  <Box className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 800, color: "#111827" }}>
                        Passenger {index + 1}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6b7280" }}>
                        Assigned seat: {passenger.seatLabel}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        alignSelf: "flex-start",
                        borderRadius: "999px",
                        backgroundColor: "#fff7ed",
                        color: "#c2410c",
                        px: 1.75,
                        py: 0.7,
                        fontWeight: 700,
                        fontSize: "0.8rem",
                      }}
                    >
                      Required
                    </Box>
                  </Box>

                  <Box className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <TextField
                      label="Passenger Name"
                      placeholder="Enter full name"
                      value={passenger.name}
                      onChange={(event) => handlePassengerChange(index, "name", event.target.value)}
                      fullWidth
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "16px",
                          backgroundColor: "white",
                        },
                      }}
                    />
                    <TextField
                      label="Passenger Age"
                      type="number"
                      placeholder="Enter age"
                      value={passenger.age}
                      onChange={(event) => handlePassengerChange(index, "age", event.target.value)}
                      fullWidth
                      required
                      inputProps={{ min: 1 }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "16px",
                          backgroundColor: "white",
                        },
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>

            {submitMessage && (
              <Typography
                variant="body2"
                sx={{
                  mt: 3,
                  borderRadius: "14px",
                  backgroundColor: "#fef2f2",
                  color: "#b91c1c",
                  px: 2,
                  py: 1.25,
                  fontWeight: 600,
                }}
              >
                {submitMessage}
              </Typography>
            )}

            <Button
              variant="contained"
              onClick={handleContinueToPayment}
              disabled={!isPassengerDetailsComplete}
              sx={{
                mt: 4,
                minHeight: 54,
                borderRadius: "16px",
                px: 3,
                textTransform: "none",
                fontWeight: 800,
                fontSize: "1rem",
                background: "linear-gradient(135deg, #5b5ea6 0%, #292c6d 100%)",
                boxShadow: "0 14px 30px rgba(91, 94, 166, 0.28)",
                "&:hover": {
                  background: "linear-gradient(135deg, #4a4d8f 0%, #20235a 100%)",
                },
                "&.Mui-disabled": { background: "#c7c9de", color: "white" },
              }}
            >
              Continue To Payment
            </Button>
          </Box>

          <Box className="space-y-6">
            <Box
              className="rounded-[28px] border border-[#e8eafc] p-5 md:p-6"
              sx={{
                background: "linear-gradient(180deg, #ffffff 0%, #f8faff 100%)",
                boxShadow: "0 18px 40px rgba(15, 23, 42, 0.07)",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 2 }}>
                Trip Summary
              </Typography>

              <Box
                className="mb-4 rounded-[22px] p-4"
                sx={{ background: "linear-gradient(135deg, #eef2ff 0%, #fff7ed 100%)" }}
              >
                <Typography variant="body2" sx={{ color: "#6b7280", mb: 1 }}>
                  Route
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#1f2937" }}>
                  {from} to {to}
                </Typography>
              </Box>

              <Box className="space-y-3">
                <Box className="flex items-center justify-between gap-4">
                  <Typography variant="body2" sx={{ color: "#6b7280" }}>Travel Date</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: "#111827" }}>{date}</Typography>
                </Box>
                <Box className="flex items-center justify-between gap-4">
                  <Typography variant="body2" sx={{ color: "#6b7280" }}>Bus</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: "#111827", textAlign: "right" }}>{busName}</Typography>
                </Box>
                <Box className="flex items-center justify-between gap-4">
                  <Typography variant="body2" sx={{ color: "#6b7280" }}>Timing</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: "#111827" }}>{startTime} to {reachTime}</Typography>
                </Box>
                <Box className="flex items-center justify-between gap-4">
                  <Typography variant="body2" sx={{ color: "#6b7280" }}>Seats</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: "#111827" }}>{seats}</Typography>
                </Box>
                <Box className="flex items-center justify-between gap-4">
                  <Typography variant="body2" sx={{ color: "#6b7280" }}>Travellers</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: "#111827" }}>{seatCount}</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              className="rounded-[28px] p-5 md:p-6"
              sx={{
                background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
                color: "white",
                boxShadow: "0 22px 48px rgba(17, 24, 39, 0.22)",
              }}
            >
              <Typography variant="body2" sx={{ opacity: 0.72, mb: 1 }}>
                Fare Summary
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, fontSize: { xs: "2rem", md: "2.4rem" } }}>
                Rs {fare}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.78, mb: 3 }}>
                Total amount for {seatCount} {seatCount === 1 ? "seat" : "seats"}.
              </Typography>
              <Box
                sx={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  px: 2,
                  py: 1.5,
                }}
              >
                <Typography variant="body2" sx={{ opacity: 0.82 }}>
                  Review each passenger carefully. The payment page will open once all details are completed.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}