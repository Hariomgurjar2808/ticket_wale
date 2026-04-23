// "use client";

// import React, { useMemo, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Box, Button, Typography } from "@mui/material";
// import { useAuth } from "@/contexts/AuthContext";

// export default function PaymentPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { user, isAuthenticated, authenticatedFetch, loading } = useAuth();

//   const from = searchParams.get("from") || "-";
//   const to = searchParams.get("to") || "-";
//   const date = searchParams.get("date") || "-";
//   const busName = searchParams.get("busName") || "-";
//   const startTime = searchParams.get("startTime") || "-";
//   const reachTime = searchParams.get("reachTime") || "-";
//   const seats = searchParams.get("seats") || "-";
//   const seatCount = Number(searchParams.get("seatCount") || "0");
//   const fare = searchParams.get("fare") || "0";

//   const passengers = useMemo(() => {
//     const rawPassengers = searchParams.get("passengers");

//     if (!rawPassengers) {
//       return [];
//     }

//     try {
//       const parsedPassengers = JSON.parse(rawPassengers);
//       return Array.isArray(parsedPassengers) ? parsedPassengers : [];
//     } catch (error) {
//       console.error("Failed to parse passenger details", error);
//       return [];
//     }
//   }, [searchParams]);

//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
//   const [submitMessage, setSubmitMessage] = useState("");
//   const [isPaying, setIsPaying] = useState(false);

//   const paymentMethods = [
//     { id: "upi", label: "UPI Payment", note: "Instant transfer using any UPI app" },
//     { id: "card", label: "Credit / Debit Card", note: "Visa, Mastercard and RuPay supported" },
//     { id: "netbanking", label: "Net Banking", note: "Pay securely with your bank account" },
//     { id: "wallet", label: "Wallet", note: "Fast checkout with saved balance" },
//   ];

//   const selectedPaymentLabel =
//     paymentMethods.find((method) => method.id === selectedPaymentMethod)?.label || "";

//   const handlePayNow = async () => {
//     if (!isAuthenticated()) {
//       setSubmitMessage("Please login before completing payment.");
//       return;
//     }

//     if (!selectedPaymentMethod) {
//       setSubmitMessage("Please select a payment option.");
//       return;
//     }

//     try {
//       setIsPaying(true);
//       setSubmitMessage("");

//       const response = await authenticatedFetch('/api/bookings', {
//         method: 'POST',
//         body: JSON.stringify({
//           serviceType: 'bus',
//           from,
//           to,
//           departureDate: date,
//           price: Number(fare),
//           passengers: seatCount,
//           passengerDetails: passengers,
//           busName,
//           startTime,
//           reachTime,
//           seatNumbers: seats.split(',').map((seat) => seat.trim()).filter(Boolean),
//           paymentMethod: selectedPaymentLabel,
//           contact: {
//             email: user?.email || '',
//           },
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setSubmitMessage(data.error || 'Payment failed. Please try again.');
//         return;
//       }

//       setSubmitMessage('Payment successful');
//       setTimeout(() => {
//         router.push('/');
//       }, 1200);
//     } catch (error) {
//       setSubmitMessage('Payment failed. Please try again.');
//     } finally {
//       setIsPaying(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Box className="min-h-screen flex items-center justify-center bg-[#FFFBEF] px-4">
//         <Typography variant="h6" sx={{ color: "#292c6d", fontWeight: 700 }}>
//           Loading payment details...
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       className="min-h-screen px-4 py-10 md:px-8"
//       sx={{
//         background:
//           "linear-gradient(180deg, #f4f0ff 0%, #fef7ea 45%, #fffdf7 100%)",
//       }}
//     >
//       <Box className="mx-auto w-full max-w-6xl">
//         <Box
//           className="mb-6 overflow-hidden rounded-[28px] p-6 md:p-8"
//           sx={{
//             background: "linear-gradient(135deg, #111827 0%, #292c6d 50%, #5b5ea6 100%)",
//             color: "white",
//             boxShadow: "0 28px 60px rgba(17, 24, 39, 0.22)",
//           }}
//         >
//           <Typography variant="overline" sx={{ letterSpacing: "0.18em", opacity: 0.8 }}>
//             Step 3 Of 3
//           </Typography>
//           <Typography variant="h3" sx={{ fontWeight: 900, mt: 1, mb: 1.5, fontSize: { xs: "2rem", md: "2.7rem" } }}>
//             Complete Your Payment
//           </Typography>
//           <Typography variant="body1" sx={{ maxWidth: 740, opacity: 0.92 }}>
//             Review your trip, confirm passenger details, choose a payment method, and finish the booking.
//           </Typography>
//         </Box>

//         <Box className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
//           <Box className="space-y-6">
//             <Box
//               className="rounded-[28px] border border-[#e8eafc] p-5 md:p-6"
//               sx={{
//                 background: "linear-gradient(180deg, #ffffff 0%, #f8faff 100%)",
//                 boxShadow: "0 18px 40px rgba(15, 23, 42, 0.07)",
//               }}
//             >
//               <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 2 }}>
//                 Trip Summary
//               </Typography>

//               <Box
//                 className="mb-4 rounded-[22px] p-4"
//                 sx={{ background: "linear-gradient(135deg, #eef2ff 0%, #fff7ed 100%)" }}
//               >
//                 <Typography variant="body2" sx={{ color: "#6b7280", mb: 1 }}>
//                   Journey
//                 </Typography>
//                 <Typography variant="h5" sx={{ fontWeight: 800, color: "#1f2937" }}>
//                   {from} to {to}
//                 </Typography>
//               </Box>

//               <Box className="space-y-3">
//                 <Box className="flex items-center justify-between gap-4">
//                   <Typography variant="body2" sx={{ color: "#6b7280" }}>Travel Date</Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 700, color: "#111827" }}>{date}</Typography>
//                 </Box>
//                 <Box className="flex items-center justify-between gap-4">
//                   <Typography variant="body2" sx={{ color: "#6b7280" }}>Bus</Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 700, color: "#111827", textAlign: "right" }}>{busName}</Typography>
//                 </Box>
//                 <Box className="flex items-center justify-between gap-4">
//                   <Typography variant="body2" sx={{ color: "#6b7280" }}>Timing</Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 700, color: "#111827" }}>{startTime} to {reachTime}</Typography>
//                 </Box>
//                 <Box className="flex items-center justify-between gap-4">
//                   <Typography variant="body2" sx={{ color: "#6b7280" }}>Seats</Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 700, color: "#111827" }}>{seats}</Typography>
//                 </Box>
//                 <Box className="flex items-center justify-between gap-4">
//                   <Typography variant="body2" sx={{ color: "#6b7280" }}>Passengers</Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 700, color: "#111827" }}>{seatCount}</Typography>
//                 </Box>
//               </Box>
//             </Box>

//             <Box
//               className="rounded-[28px] p-5 md:p-6"
//               sx={{
//                 background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
//                 color: "white",
//                 boxShadow: "0 22px 48px rgba(17, 24, 39, 0.22)",
//               }}
//             >
//               <Typography variant="body2" sx={{ opacity: 0.72, mb: 1 }}>
//                 Total Payable
//               </Typography>
//               <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, fontSize: { xs: "2rem", md: "2.5rem" } }}>
//                 Rs {fare}
//               </Typography>
//               <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
//                 Includes all selected seats for this trip.
//               </Typography>
//               <Box
//                 sx={{
//                   borderRadius: "18px",
//                   backgroundColor: "rgba(255,255,255,0.08)",
//                   px: 2,
//                   py: 1.5,
//                 }}
//               >
//                 <Typography variant="body2" sx={{ opacity: 0.82 }}>
//                   Selected method: {selectedPaymentLabel || "Choose a payment option below"}
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>

//           <Box
//             className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur md:p-7"
//           >
//             <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}>
//               Payment Details
//             </Typography>
//             <Typography variant="body2" sx={{ color: "#6b7280", mb: 4 }}>
//               Confirm who is travelling and select the payment method you want to use.
//             </Typography>

//             <Box sx={{ mb: 4 }}>
//               <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 2 }}>
//                 Passenger Summary
//               </Typography>

//               <Box className="space-y-4">
//                 {passengers.map((passenger, index) => (
//                   <Box
//                     key={`${passenger.seatLabel}-${index}`}
//                     className="rounded-[22px] border p-4"
//                     sx={{
//                       borderColor: "#e5e7eb",
//                       background:
//                         "linear-gradient(180deg, rgba(250,250,255,1) 0%, rgba(245,247,255,1) 100%)",
//                       boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
//                     }}
//                   >
//                     <Box className="mb-2 flex items-center justify-between gap-4">
//                       <Typography variant="body1" sx={{ fontWeight: 800, color: "#111827" }}>
//                         Passenger {index + 1}
//                       </Typography>
//                       <Box
//                         sx={{
//                           borderRadius: "999px",
//                           backgroundColor: "#eef2ff",
//                           color: "#4338ca",
//                           px: 1.5,
//                           py: 0.6,
//                           fontWeight: 700,
//                           fontSize: "0.8rem",
//                         }}
//                       >
//                         Seat {passenger.seatLabel}
//                       </Box>
//                     </Box>
//                     <Typography variant="body2" sx={{ color: "#374151", mb: 0.5 }}>
//                       <strong>Name:</strong> {passenger.name}
//                     </Typography>
//                     <Typography variant="body2" sx={{ color: "#374151" }}>
//                       <strong>Age:</strong> {passenger.age}
//                     </Typography>
//                   </Box>
//                 ))}
//               </Box>
//             </Box>

//             <Box>
//               <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 2 }}>
//                 Choose Payment Method
//               </Typography>

//               <Box className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//                 {paymentMethods.map((method) => {
//                   const isSelected = selectedPaymentMethod === method.id;
//                   return (
//                     <Button
//                       key={method.id}
//                       variant={isSelected ? "contained" : "outlined"}
//                       onClick={() => setSelectedPaymentMethod(method.id)}
//                       sx={{
//                         display: "flex",
//                         alignItems: "flex-start",
//                         justifyContent: "flex-start",
//                         minHeight: 96,
//                         borderRadius: "20px",
//                         px: 2.2,
//                         py: 2,
//                         textAlign: "left",
//                         textTransform: "none",
//                         borderColor: "#c7d2fe",
//                         color: isSelected ? "#fff" : "#312e81",
//                         background: isSelected
//                           ? "linear-gradient(135deg, #5b5ea6 0%, #292c6d 100%)"
//                           : "linear-gradient(180deg, #ffffff 0%, #f8faff 100%)",
//                         boxShadow: isSelected
//                           ? "0 14px 28px rgba(91, 94, 166, 0.24)"
//                           : "0 8px 18px rgba(15, 23, 42, 0.05)",
//                         "&:hover": {
//                           background: isSelected
//                             ? "linear-gradient(135deg, #4a4d8f 0%, #20235a 100%)"
//                             : "linear-gradient(180deg, #f8faff 0%, #eef2ff 100%)",
//                           borderColor: "#5b5ea6",
//                         },
//                       }}
//                     >
//                       <Box>
//                         <Typography variant="body1" sx={{ fontWeight: 800, mb: 0.5 }}>
//                           {method.label}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           sx={{ color: isSelected ? "rgba(255,255,255,0.82)" : "#6b7280" }}
//                         >
//                           {method.note}
//                         </Typography>
//                       </Box>
//                     </Button>
//                   );
//                 })}
//               </Box>
//             </Box>

//             {submitMessage && (
//               <Typography
//                 variant="body2"
//                 sx={{
//                   mt: 3,
//                   borderRadius: "14px",
//                   backgroundColor: submitMessage.toLowerCase().includes("missing:")
//                     ? "#fff7ed"
//                     : submitMessage.toLowerCase().includes("successful")
//                       ? "#ecfdf5"
//                       : "#fef2f2",
//                   color: submitMessage.toLowerCase().includes("missing:")
//                     ? "#c2410c"
//                     : submitMessage.toLowerCase().includes("successful")
//                       ? "#15803d"
//                       : "#b91c1c",
//                   px: 2,
//                   py: 1.25,
//                   fontWeight: 600,
//                 }}
//               >
//                 {submitMessage}
//               </Typography>
//             )}

//             {!isAuthenticated() && (
//               <Typography
//                 variant="body2"
//                 sx={{
//                   mt: 3,
//                   borderRadius: "14px",
//                   backgroundColor: "#fff7ed",
//                   color: "#c2410c",
//                   px: 2,
//                   py: 1.25,
//                   fontWeight: 600,
//                 }}
//               >
//                 Login is required to complete payment and send the booking details to your email.
//               </Typography>
//             )}

//             <Button
//               variant="contained"
//               onClick={handlePayNow}
//               disabled={!selectedPaymentMethod || !isAuthenticated() || isPaying}
//               sx={{
//                 mt: 4,
//                 minHeight: 56,
//                 borderRadius: "16px",
//                 px: 3,
//                 textTransform: "none",
//                 fontWeight: 800,
//                 fontSize: "1rem",
//                 background: "linear-gradient(135deg, #111827 0%, #2d3748 100%)",
//                 boxShadow: "0 16px 30px rgba(17, 24, 39, 0.22)",
//                 "&:hover": { background: "linear-gradient(135deg, #030712 0%, #1f2937 100%)" },
//                 "&.Mui-disabled": { background: "#d1d5db", color: "white" },
//               }}
//             >
//               {isPaying ? 'Processing Payment...' : 'Pay Now'}
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }





"use client";

import React, { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";

function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, authenticatedFetch, loading } = useAuth();

  const from = searchParams.get("from") || "-";
  const to = searchParams.get("to") || "-";
  const date = searchParams.get("date") || "-";
  const busName = searchParams.get("busName") || "-";
  const startTime = searchParams.get("startTime") || "-";
  const reachTime = searchParams.get("reachTime") || "-";
  const seats = searchParams.get("seats") || "-";
  const seatCount = Number(searchParams.get("seatCount") || "0");
  const fare = searchParams.get("fare") || "0";

  const passengers = useMemo(() => {
    const rawPassengers = searchParams.get("passengers");

    if (!rawPassengers) {
      return [];
    }

    try {
      const parsedPassengers = JSON.parse(rawPassengers);
      return Array.isArray(parsedPassengers) ? parsedPassengers : [];
    } catch (error) {
      console.error("Failed to parse passenger details", error);
      return [];
    }
  }, [searchParams]);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  const paymentMethods = [
    { id: "upi", label: "UPI Payment", note: "Instant transfer using any UPI app" },
    { id: "card", label: "Credit / Debit Card", note: "Visa, Mastercard and RuPay supported" },
    { id: "netbanking", label: "Net Banking", note: "Pay securely with your bank account" },
    { id: "wallet", label: "Wallet", note: "Fast checkout with saved balance" },
  ];

  const selectedPaymentLabel =
    paymentMethods.find((method) => method.id === selectedPaymentMethod)?.label || "";

  const handlePayNow = async () => {
    if (!isAuthenticated()) {
      setSubmitMessage("Please login before completing payment.");
      return;
    }

    if (!selectedPaymentMethod) {
      setSubmitMessage("Please select a payment option.");
      return;
    }

    try {
      setIsPaying(true);
      setSubmitMessage("");

      const response = await authenticatedFetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          serviceType: "bus",
          from,
          to,
          departureDate: date,
          price: Number(fare),
          passengers: seatCount,
          passengerDetails: passengers,
          busName,
          startTime,
          reachTime,
          seatNumbers: seats.split(",").map((seat) => seat.trim()).filter(Boolean),
          paymentMethod: selectedPaymentLabel,
          contact: {
            email: user?.email || "",
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitMessage(data.error || "Payment failed. Please try again.");
        return;
      }

      setSubmitMessage("Payment successful");
      setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch (error) {
      setSubmitMessage("Payment failed. Please try again.");
    } finally {
      setIsPaying(false);
    }
  };

  if (loading) {
    return (
      <Box className="min-h-screen flex items-center justify-center bg-[#FFFBEF] px-4">
        <Typography variant="h6" sx={{ color: "#292c6d", fontWeight: 700 }}>
          Loading payment details...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      className="min-h-screen px-4 py-10 md:px-8"
      sx={{
        background:
          "linear-gradient(180deg, #f4f0ff 0%, #fef7ea 45%, #fffdf7 100%)",
      }}
    >
      <Box className="mx-auto w-full max-w-6xl">
        <Box
          className="mb-6 overflow-hidden rounded-[28px] p-6 md:p-8"
          sx={{
            background: "linear-gradient(135deg, #111827 0%, #292c6d 50%, #5b5ea6 100%)",
            color: "white",
            boxShadow: "0 28px 60px rgba(17, 24, 39, 0.22)",
          }}
        >
          <Typography variant="overline" sx={{ letterSpacing: "0.18em", opacity: 0.8 }}>
            Step 3 Of 3
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontWeight: 900, mt: 1, mb: 1.5, fontSize: { xs: "2rem", md: "2.7rem" } }}
          >
            Complete Your Payment
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 740, opacity: 0.92 }}>
            Review your trip, confirm passenger details, choose a payment method, and finish the booking.
          </Typography>
        </Box>

        <Box className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
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
                  Journey
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
                  <Typography variant="body2" sx={{ color: "#6b7280" }}>Passengers</Typography>
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
                Total Payable
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontWeight: 900, mb: 1, fontSize: { xs: "2rem", md: "2.5rem" } }}
              >
                Rs {fare}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
                Includes all selected seats for this trip.
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
                  Selected method: {selectedPaymentLabel || "Choose a payment option below"}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur md:p-7">
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}>
              Payment Details
            </Typography>
            <Typography variant="body2" sx={{ color: "#6b7280", mb: 4 }}>
              Confirm who is travelling and select the payment method you want to use.
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 2 }}>
                Passenger Summary
              </Typography>

              <Box className="space-y-4">
                {passengers.map((passenger, index) => (
                  <Box
                    key={`${passenger.seatLabel}-${index}`}
                    className="rounded-[22px] border p-4"
                    sx={{
                      borderColor: "#e5e7eb",
                      background:
                        "linear-gradient(180deg, rgba(250,250,255,1) 0%, rgba(245,247,255,1) 100%)",
                      boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
                    }}
                  >
                    <Box className="mb-2 flex items-center justify-between gap-4">
                      <Typography variant="body1" sx={{ fontWeight: 800, color: "#111827" }}>
                        Passenger {index + 1}
                      </Typography>
                      <Box
                        sx={{
                          borderRadius: "999px",
                          backgroundColor: "#eef2ff",
                          color: "#4338ca",
                          px: 1.5,
                          py: 0.6,
                          fontWeight: 700,
                          fontSize: "0.8rem",
                        }}
                      >
                        Seat {passenger.seatLabel}
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#374151", mb: 0.5 }}>
                      <strong>Name:</strong> {passenger.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#374151" }}>
                      <strong>Age:</strong> {passenger.age}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 2 }}>
                Choose Payment Method
              </Typography>

              <Box className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {paymentMethods.map((method) => {
                  const isSelected = selectedPaymentMethod === method.id;
                  return (
                    <Button
                      key={method.id}
                      variant={isSelected ? "contained" : "outlined"}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        minHeight: 96,
                        borderRadius: "20px",
                        px: 2.2,
                        py: 2,
                        textAlign: "left",
                        textTransform: "none",
                        borderColor: "#c7d2fe",
                        color: isSelected ? "#fff" : "#312e81",
                        background: isSelected
                          ? "linear-gradient(135deg, #5b5ea6 0%, #292c6d 100%)"
                          : "linear-gradient(180deg, #ffffff 0%, #f8faff 100%)",
                        boxShadow: isSelected
                          ? "0 14px 28px rgba(91, 94, 166, 0.24)"
                          : "0 8px 18px rgba(15, 23, 42, 0.05)",
                        "&:hover": {
                          background: isSelected
                            ? "linear-gradient(135deg, #4a4d8f 0%, #20235a 100%)"
                            : "linear-gradient(180deg, #f8faff 0%, #eef2ff 100%)",
                          borderColor: "#5b5ea6",
                        },
                      }}
                    >
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 800, mb: 0.5 }}>
                          {method.label}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: isSelected ? "rgba(255,255,255,0.82)" : "#6b7280" }}
                        >
                          {method.note}
                        </Typography>
                      </Box>
                    </Button>
                  );
                })}
              </Box>
            </Box>

            {submitMessage && (
              <Typography
                variant="body2"
                sx={{
                  mt: 3,
                  borderRadius: "14px",
                  backgroundColor: submitMessage.toLowerCase().includes("missing:")
                    ? "#fff7ed"
                    : submitMessage.toLowerCase().includes("successful")
                    ? "#ecfdf5"
                    : "#fef2f2",
                  color: submitMessage.toLowerCase().includes("missing:")
                    ? "#c2410c"
                    : submitMessage.toLowerCase().includes("successful")
                    ? "#15803d"
                    : "#b91c1c",
                  px: 2,
                  py: 1.25,
                  fontWeight: 600,
                }}
              >
                {submitMessage}
              </Typography>
            )}

            {!isAuthenticated() && (
              <Typography
                variant="body2"
                sx={{
                  mt: 3,
                  borderRadius: "14px",
                  backgroundColor: "#fff7ed",
                  color: "#c2410c",
                  px: 2,
                  py: 1.25,
                  fontWeight: 600,
                }}
              >
                Login is required to complete payment and send the booking details to your email.
              </Typography>
            )}

            <Button
              variant="contained"
              onClick={handlePayNow}
              disabled={!selectedPaymentMethod || !isAuthenticated() || isPaying}
              sx={{
                mt: 4,
                minHeight: 56,
                borderRadius: "16px",
                px: 3,
                textTransform: "none",
                fontWeight: 800,
                fontSize: "1rem",
                background: "linear-gradient(135deg, #111827 0%, #2d3748 100%)",
                boxShadow: "0 16px 30px rgba(17, 24, 39, 0.22)",
                "&:hover": { background: "linear-gradient(135deg, #030712 0%, #1f2937 100%)" },
                "&.Mui-disabled": { background: "#d1d5db", color: "white" },
              }}
            >
              {isPaying ? "Processing Payment..." : "Pay Now"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading payment page...</div>}>
      <PaymentPageContent />
    </Suspense>
  );
}