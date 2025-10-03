// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { styled } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import NearMeIcon from "@mui/icons-material/NearMe";
// import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
// import InputAdornment from "@mui/material/InputAdornment";

// export default function Page() {
//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       <CssBaseline />

//       {/* AppBar */}
//       <AppBar position="fixed" sx={{ backgroundColor: "orange", zIndex: 1201 }}>
//         <Toolbar sx={{ display: "flex", gap: 2 }}>
//           {/* <ConfirmationNumberIcon sx={{ color: "white" }} />
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: "bold",
//               color: "white",
//               letterSpacing: 1,
//               textTransform: "uppercase",
//             }}
//           >
//             🎟️🚌 Ticket Wale
//           </Typography> */}

//           {["about", "contact", "safety"].map((path) => (
//             <Button
//               key={path}
//               sx={{ backgroundColor: "black", textTransform: "none" }}
//               variant="contained"
//             >
//               <Link
//                 href={`/${path}`}
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 {path === "safety"
//                   ? "Safety for Traveling"
//                   : path.charAt(0).toUpperCase() + path.slice(1)}
//               </Link>
//             </Button>
//           ))}

//           <Box sx={{ flexGrow: 1 }} />

//           <Button
//             sx={{ textTransform: "none", color: "white" }}
//             component={Link}
//             href="/login"
//           >
//             Log in
//           </Button>
//           <Button
//             sx={{ textTransform: "none", color: "white" }}
//             component={Link}
//             href="/signup"
//           >
//             Sign up
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {/* Main content */}
//       <Box
//         sx={{
//           backgroundColor: "rgb(255 251 235)", // same as bg-amber-50
//           flex: 1,
//           mt: 10, // AppBar height margin
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 4,
//           px: 2,
//         }}
//       >
//         {/* Info Box */}
//         <Box
//           sx={{
//             height: 300,
//             width: 400,
//             backgroundColor: "black",
//             color: "white",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             textAlign: "center",
//             padding: 4,
//             borderRadius: 5,
//             boxShadow: 3,
//           }}
//         >
//           <Typography sx={{ fontSize: 20, fontWeight: 900, lineHeight: 1.5 }}>
//             PLEASE ALL OF YOU SHARE THE JOURNEY FROM STARTING TILL END
//           </Typography>
//         </Box>

//         {/* Input Fields */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             width: 300,
//           }}
//         >
//           <TextField
//             id="start-location"
//             label="Start Location"
//             variant="outlined"
//             fullWidth
//             // InputProps={{
//             //   startAdornment: (
//             //     <InputAdornment position="start">
//             //       <NearMeIcon />
//             //     </InputAdornment>
//             //   ),
//             // }}
//           />

//           <TextField
//             id="end-destination"
//             label="End Destination"
//             variant="outlined"
//             fullWidth
//             // InputProps={{
//             //   startAdornment: (
//             //     <InputAdornment position="start">
//             //       <NearMeIcon />
//             //     </InputAdornment>
//             //   ),
//             // }}
//           />
//         </Box>
//         {/* Submit Button */}
//         <Button
//           variant="contained"
//           sx={{ backgroundColor: "black", textTransform: "none" }}
//         >
//           Ride Book
//         </Button>
//       </Box>

//       <Box>
//         <div className="bg-amber-700 h-screen">hello</div>
//       </Box>
//     </Box>
//   );
// }
