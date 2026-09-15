"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

export default function BookingsPage() {
  const router = useRouter();
  const { authenticatedFetch, isAuthenticated, loading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [expandedBookingId, setExpandedBookingId] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    authenticatedFetch("/api/bookings")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to load bookings");
        setBookings(data.bookings || []);
      })
      .catch((requestError) => setError(requestError.message));
  }, [loading, router]);

  if (loading) {
    return <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ minHeight: "100vh", px: { xs: 2, md: 6 }, py: 10, background: "linear-gradient(180deg, #f4f0ff 0%, #fffdf7 100%)" }}>
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        <Typography variant="h3" sx={{ fontWeight: 900, color: "#292c6d", mb: 1 }}>My Bookings</Typography>
        <Typography sx={{ color: "#667085", mb: 4 }}>Your current bookings and complete booking history.</Typography>
        {error && <Typography sx={{ color: "#b42318", mb: 3 }}>{error}</Typography>}
        {!error && bookings.length === 0 && <Typography sx={{ color: "#667085" }}>No bookings found yet.</Typography>}
        <Box sx={{ display: "grid", gap: 2 }}>
          {bookings.map((booking) => (
            <Box
              key={booking._id}
              component="button"
              type="button"
              onClick={() => setExpandedBookingId((currentId) => currentId === booking._id ? null : booking._id)}
              sx={{ p: 3, borderRadius: 3, backgroundColor: "white", border: "1px solid #e5e7eb", boxShadow: "0 10px 24px rgba(15,23,42,0.06)", textAlign: "left", cursor: "pointer", width: "100%" }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>{booking.from} to {booking.to}</Typography>
                <Typography sx={{ color: "#166534", fontWeight: 700 }}>{booking.status || "confirmed"}</Typography>
              </Box>
              <Typography sx={{ color: "#475467" }}>Booking reference: {booking.bookingReference}</Typography>
              <Typography sx={{ color: "#475467" }}>Travel date: {new Date(booking.departureDate).toLocaleDateString("en-IN")}</Typography>
              <Typography sx={{ color: "#475467" }}>Passengers: {booking.passengers} | Seats: {booking.seatNumbers?.join(", ") || "-"}</Typography>
              <Typography sx={{ color: "#111827", fontWeight: 800, mt: 1 }}>Total: Rs {booking.price}</Typography>

              {expandedBookingId === booking._id && (
                <Box sx={{ mt: 3, pt: 3, borderTop: "1px solid #eaecf0", display: "grid", gap: 1 }}>
                  <Typography sx={{ fontWeight: 800, color: "#292c6d" }}>Complete trip details</Typography>
                  <Typography>Bus: {booking.busName || "-"}</Typography>
                  <Typography>Departure: {booking.startTime || "-"}</Typography>
                  <Typography>Arrival: {booking.reachTime || "-"}</Typography>
                  <Typography>Payment: {booking.paymentMethod || "-"} ({booking.paymentStatus || "-"})</Typography>
                  <Typography>Contact email: {booking.contact?.email || booking.user?.email || "-"}</Typography>
                  <Typography>Contact phone: {booking.contact?.phone || "-"}</Typography>
                  <Typography sx={{ fontWeight: 700, mt: 1 }}>Travellers</Typography>
                  {(booking.passengerDetails || []).map((passenger, index) => (
                    <Typography key={`${booking._id}-passenger-${index}`} sx={{ color: "#475467" }}>
                      {index + 1}. {passenger.name || "-"} | Age: {passenger.age || "-"} | Seat: {passenger.seatLabel || "-"}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}