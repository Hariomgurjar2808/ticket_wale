// "use client";
// import React, { useState } from "react";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

// import LoginIcon from "@mui/icons-material/Login";
// import HowToRegIcon from "@mui/icons-material/HowToReg";
// import MenuIcon from "@mui/icons-material/Menu";
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   IconButton,
//   Avatar,
//   Box,
//   Menu,
//   MenuItem,
//   Typography,
//   TextField,
//   Autocomplete,
//   InputAdornment,
//   FormControl,
//   Select,
// } from "@mui/material";

// import { useRouter } from "next/navigation";
// import { FaGooglePlay, FaApple } from "react-icons/fa";
// import {
//   FaFacebook,
//   FaInstagram,
//   FaLinkedin,
//   FaGithub,
//   FaTwitter,
// } from "react-icons/fa";

// import Link from "next/link";
// import { FaMapMarkerAlt } from "react-icons/fa";
// // import { useRouter } from "next/navigation"; // for App Router (use "next/router" if you're in Pages Router)

// // Transport options
// const transportButtons = [
//   { title: "Flight", image: "/flighte.jpeg", href: "/flight" },
//   { title: "Hotel", image: "/hootel.jpg", href: "/hotel" },
//   { title: "Bus", image: "/bos.jpeg", href: "/bus" },
//   { title: "Auto", image: "/auto.webp", href: "/auto" },
//   { title: "Bike", image: "/bike.jpeg", href: "/bike" },
//   { title: "Parcel", image: "/parcel.jpeg", href: "/parcel" },
// ];

// const descriptionMap = {
//   Flight: "Book domestic and international flights at great prices.",
//   Hotel: "Find affordable and luxury hotels tailored to your needs.",
//   Bus: "Enjoy comfortable bus journeys across multiple cities.",
//   Auto: "Quick and easy auto-rickshaw booking from your location.",
//   Bike: "Affordable and eco-friendly bike rentals for quick city travel.",
//   Parcel: "Fast and secure parcel delivery to your desired destination.",
// };

// const cities = [
//   { label: "New York, USA" },
//   { label: "London, UK" },
//   { label: "Tokyo, Japan" },
//   { label: "Delhi, India" },
//   { label: "Paris, France" },
//   { label: "Sydney, Australia" },
//   { label: "Dubai, UAE" },
//   { label: "Berlin, Germany" },
//   { label: "Toronto, Canada" },
// ];

// // Translations
// const languageLabels = {
//   en: {
//     about: "About",
//     contact: "Contact",
//     safety: "Safety ",
//     login: "Login",
//     signup: "Signup",
//     flight: "Flight",
//     hotel: "Hotel",
//     bus: "Bus",
//     auto: "Auto",
//     bike: "Bike",
//     parcel: "Parcel",
//   },
//   hi: {
//     about: "परिचय",
//     contact: "संपर्क करें",
//     safety: "यात्रा सुरक्षा",
//     login: "लॉग इन करें",
//     signup: "साइन अप करें",
//     flight: "उड़ान",
//     hotel: "होटल",
//     bus: "बस",
//     auto: "ऑटो",
//     bike: "बाइक",
//     parcel: "पार्सल",
//   },
//   mr: {
//     about: "परिचय",
//     contact: "संपर्क",
//     safety: "प्रवास सुरक्षित",
//     login: "लॉगिन",
//     signup: "नोंदणी",
//     flight: "फ्लाइट",
//     hotel: "हॉटेल",
//     bus: "बस",
//     auto: "ऑटो",
//     bike: "बाईक",
//     parcel: "पार्सल",
//   },
//   es: {
//     about: "Acerca de",
//     contact: "Contacto",
//     safety: "Seguridad en el viaje",
//     login: "Iniciar sesión",
//     signup: "Registrarse",
//     flight: "Vuelo",
//     hotel: "Hotel",
//     bus: "Autobús",
//     auto: "Auto",
//     bike: "Bicicleta",
//     parcel: "Paquete",
//   },
//   zh: {
//     about: "关于",
//     contact: "联系",
//     safety: "旅行安全",
//     login: "登录",
//     signup: "注册",
//     flight: "航班",
//     hotel: "酒店",
//     bus: "公交车",
//     auto: "自动",
//     bike: "自行车",
//     parcel: "包裹",
//   },
//   fr: {
//     about: "À propos",
//     contact: "Contact",
//     safety: "Sécurité de voyage",
//     login: "Connexion",
//     signup: "Inscription",
//     flight: "Vol",
//     hotel: "Hôtel",
//     bus: "Bus",
//     auto: "Auto",
//     bike: "Vélo",
//     parcel: "Colis",
//   },
//   de: {
//     about: "Über uns",
//     contact: "Kontakt",
//     safety: "Reisesicherheit",
//     login: "Anmelden",
//     signup: "Registrieren",
//     flight: "Flug",
//     hotel: "Hotel",
//     bus: "Bus",
//     auto: "Auto",
//     bike: "Fahrrad",
//     parcel: "Paket",
//   },
//   ar: {
//     about: "معلومات عنا",
//     contact: "اتصل",
//     safety: "سلامة السفر",
//     login: "تسجيل الدخول",
//     signup: "اشتراك",
//     flight: "رحلة طيران",
//     hotel: "فندق",
//     bus: "حافلة",
//     auto: "تلقائي",
//     bike: "دراجة",
//     parcel: "طرد",
//   },
//   ja: {
//     about: "約",
//     contact: "連絡先",
//     safety: "旅行の安全",
//     login: "ログイン",
//     signup: "サインアップ",
//     flight: "フライト",
//     hotel: "ホテル",
//     bus: "バス",
//     auto: "オート",
//     bike: "バイク",
//     parcel: "小包",
//   },
//   ru: {
//     about: "О нас",
//     contact: "Контакт",
//     safety: "Безопасность путешествия",
//     login: "Войти",
//     signup: "Зарегистрироваться",
//     flight: "Рейс",
//     hotel: "Отель",
//     bus: "Автобус",
//     auto: "Авто",
//     bike: "Велосипед",
//     parcel: "Посылка",
//   },
// };

// export default function Page() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [language, setLanguage] = useState("en");
//   const router = useRouter();

//   const labels = languageLabels[language];

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLanguageChange = (e) => {
//     setLanguage(e.target.value);
//   };

//   const authButtons = [
//     {
//       label: labels.login,
//       path: "/login",
//       icon: <LoginIcon />,
//     },
//     {
//       label: labels.signup,
//       path: "/signup",
//       icon: <HowToRegIcon />,
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100%",
//         margin: 0,
//         padding: 0,
//         backgroundColor: "#FFFBEF",
//       }}
//     >
//       <AppBar
//         position="fixed"
//         sx={{
//           height: "70px",
//           backgroundColor: "#5b5ea6",
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//           px: 2,
//         }}
//       >
//         <Toolbar className="flex justify-between items-center w-full px-8 ">
//           <div className="flex justify-end gap-3 items-center">
//             <IconButton
//               size="large"
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               onClick={handleMenu}
//             >
//               <MenuIcon />
//             </IconButton>

//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//             >
//               {transportButtons.map((item) => (
//                 <Button
//                   key={item.title}
//                   component={Link}
//                   href={item.href}
//                   sx={{
//                     height: "36px",
//                     textTransform: "none",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                     color: "black",
//                     backgroundColor: "white",
//                     borderRadius: 2,
//                     px: 2,
//                   }}
//                 >
//                   <Avatar
//                     src={item.image}
//                     alt={item.title}
//                     sx={{ width: 24, height: 24 }}
//                   />
//                   {labels[item.title.toLowerCase()] || item.title}
//                 </Button>
//               ))}
//             </Menu>

//             {["about", "contact", "safety"].map((item) => (
//               <Button
//                 key={item}
//                 component="a"
//                 href={`/home/${item}`}
//                 style={{
//                   textDecoration: "none",
//                   color: "inherit",
//                   textTransform: "none",
//                   fontSize: "20px",
//                 }}
//               >
//                 {labels[item]}
//               </Button>
//             ))}
//           </div>

//           <div className="flex items-center gap-3 ml-5 ">
//             {authButtons.map((item) => (
//               <Button
//                 key={item.label}
//                 component={Link}
//                 href={item.path}
//                 sx={{
//                   height: "36px",
//                   textTransform: "none",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   color: "black",
//                   backgroundColor: "white",
//                 }}
//                 startIcon={item.icon}
//               >
//                 {item.label}
//               </Button>
//             ))}

//             <FormControl
//               size="small"
//               sx={{ backgroundColor: "white", borderRadius: 1 }}
//             >
//               <Select
//                 value={language}
//                 onChange={handleLanguageChange}
//                 sx={{ height: "36px" }}
//               >
//                 <MenuItem value="en">English</MenuItem>
//                 <MenuItem value="hi">हिन्दी</MenuItem>
//                 <MenuItem value="mr">मराठी</MenuItem>
//                 <MenuItem value="es">Español</MenuItem>
//                 <MenuItem value="zh">中文</MenuItem>
//                 <MenuItem value="fr">Français</MenuItem>
//                 <MenuItem value="de">Deutsch</MenuItem>
//                 <MenuItem value="ar">العربية</MenuItem>
//                 <MenuItem value="ja">日本語</MenuItem>
//                 <MenuItem value="ru">Русский</MenuItem>
//               </Select>
//             </FormControl>
//           </div>
//         </Toolbar>
//       </AppBar>
//       {/* Booking Form Section */}
//       <Box sx={{ backgroundColor: "#FFFBEF", pt: 12 }}>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 4,
//             px: 2,
//           }}
//         >
//           <Box
//             sx={{
//               height: 300,
//               width: 400,
//               backgroundColor: "#5b5ea6",
//               color: "white",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               textAlign: "center",
//               padding: 4,
//               borderRadius: 5,
//               boxShadow: 3,
//               marginTop: "100px",
//               gap: 2,
//             }}
//           >
//             <Typography sx={{ fontSize: 20, fontWeight: 900, lineHeight: 1.5 }}>
//               {/* There is a issue on the h1 tag */}
//               <h1 className="text-4xl">Booking</h1>
//               PLEASE ALL OF YOU SHARE THE JOURNEY FROM STARTING TILL END
//             </Typography>

//             <Link href="/booking" passHref>
//               <Button
//                 sx={{
//                   backgroundColor: "white",
//                   color: "black",
//                   fontWeight: "bold",
//                   mt: 2,
//                   textTransform: "none",
//                 }}
//                 variant="contained"
//               >
//                 Go to Booking
//               </Button>
//             </Link>
//           </Box>

//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//               width: 300,
//             }}
//           >
//             <Autocomplete
//               options={cities}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="From"
//                   variant="outlined"
//                   fullWidth
//                   InputProps={{
//                     ...params.InputProps,
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <FaMapMarkerAlt style={{ color: "black" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               )}
//             />
//             <Autocomplete
//               options={cities}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="To"
//                   variant="outlined"
//                   fullWidth
//                   InputProps={{
//                     ...params.InputProps,
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <FaMapMarkerAlt style={{ color: "black" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               )}
//             />
//           </Box>

//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#5b5ea6",
//               textTransform: "none",
//               fontSize: "20px",
//               borderRadius: "10px",
//               height: "50px",
//               width: "150px",
//             }}
//           >
//             Ride Book
//           </Button>
//         </Box>
//       </Box>
//       {/* Transport Cards */}
//       <Box sx={{ backgroundColor: "#FFFBEF", py: 6, px: 2 }}>
//         <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
//           {transportButtons.map((option) => (
//             <Link
//               key={option.title}
//               href={option.href}
//               style={{ textDecoration: "none" }}
//             >
//               <Box
//                 sx={{
//                   backgroundColor: "white",
//                   color: "black",
//                   p: 3,
//                   borderRadius: 3,
//                   boxShadow: 4,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   width: 300,
//                   minHeight: 300,
//                   cursor: "pointer",
//                   transition: "transform 0.2s",
//                   "&:hover": {
//                     transform: "scale(1.03)",
//                   },
//                 }}
//               >
//                 <Avatar
//                   alt={option.title}
//                   src={option.image}
//                   sx={{ width: 96, height: 96 }}
//                   variant="rounded"
//                 />
//                 <Typography
//                   variant="h5"
//                   fontWeight="bold"
//                   align="center"
//                   sx={{ mt: 2 }}
//                 >
//                   {labels[option.title.toLowerCase()] || option.title}
//                 </Typography>
//                 <Typography align="center" sx={{ mt: 2 }}>
//                   {descriptionMap[option.title]}
//                 </Typography>

//                 {/* Detail Button */}
//                 <Box sx={{ mt: 3, alignSelf: "flex-start" }}>
//                   <Link href="/login" passHref>
//                     <Button
//                       component="a"
//                       variant="contained"
//                       sx={{
//                         backgroundColor: "#5b5ea6",
//                         textTransform: "none",
//                       }}
//                     >
//                       Details
//                     </Button>
//                   </Link>
//                 </Box>
//               </Box>
//             </Link>
//           ))}
//         </Box>
//       </Box>

//       <Box sx={{ p: 4, backgroundColor: "#FFFBEF" }}>
//         <div className="flex flex-col md:flex-row justify-center items-center p-6 gap-8">
//           {/* Left Section - Text */}
//           <Box
//             sx={{
//               maxWidth: 500,
//               display: "flex",
//               flexDirection: "column",
//               gap: 3,
//             }}
//           >
//             <Typography variant="h3" component="h1" gutterBottom color="black">
//               Quick Rides. Low Fares. Only on Ticket Wale.
//             </Typography>
//             <Typography variant="h6" color="black">
//               At Ticket Wale, we ensure our customers get rides quickly at the
//               most affordable prices.
//             </Typography>
//             <div>
//               <Button
//                 style={{
//                   backgroundColor: "#5b5ea6",
//                   textTransform: "none",
//                   boxShadow: "5px",
//                 }}
//                 className="bg-black"
//                 variant="contained"
//               >
//                 Book Ride
//               </Button>
//             </div>
//           </Box>

//           {/* Right Section - Image Card */}
//           <Box
//             sx={{
//               textAlign: "center",
//               backgroundColor: "#fff",
//               p: 4,
//               borderRadius: 2,
//               boxShadow: 3,
//               maxWidth: 400,
//             }}
//           >
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcFC7vf_J1R1s0J4bIAACUDU-cuPF0J4QGDA&s"
//               alt="Flight"
//               style={{
//                 width: "100%",
//                 height: "auto",
//                 borderRadius: "8px",
//                 marginBottom: "20px",
//               }}
//             />
//           </Box>
//         </div>
//       </Box>

//       <Box
//         sx={{
//           backgroundColor: "#FFFBEF",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           p: 4,
//           color: "#fff",
//         }}
//       >
//         {/* Heading */}
//         <Typography variant="h3" component="h1" gutterBottom>
//           Buses
//         </Typography>

//         {/* Description, Button and Image Row */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 4,
//             mt: 4,
//             textAlign: { xs: "center", md: "left" },
//           }}
//         >
//           {/* Text + Button Group */}
//           <Box
//             sx={{
//               maxWidth: 500,
//               display: "flex",
//               flexDirection: "column",
//               gap: 3,
//             }}
//           >
//             <Typography variant="h3" component="h1" gutterBottom color="black">
//               Flexible Gigs, Real, Income
//             </Typography>
//             <Typography variant="h6" color="black">
//               At Ticket Wale, we provide reliable and affordable bus travel
//               options to get you where you need to go — comfortably and on time.
//             </Typography>
//             <div>
//               <Button
//                 variant="contained"
//                 sx={{
//                   backgroundColor: "#5b5ea6",
//                   textTransform: "none",
//                   boxShadow: 2,
//                 }}
//               >
//                 Book Ride
//               </Button>
//             </div>
//           </Box>

//           {/* Image */}
//           <Box
//             sx={{
//               textAlign: "center",
//               backgroundColor: "#fff",
//               p: 4,
//               borderRadius: 2,
//               boxShadow: 3,
//               maxWidth: 400,
//             }}
//           >
//             {" "}
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqe5mo-WZ7u-WsLX72NnY9kgd7_KscG4RKYw&s"
//               alt="Bus"
//               style={{
//                 width: "100%",
//                 height: "auto",
//                 borderRadius: "8px",
//                 // boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
//               }}
//             />
//           </Box>
//         </Box>
//       </Box>

//       <div className="bg-black py-10 px-4 text-white">
//         {/* App Badges */}
//         <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
//           {/* Customer App Section */}
//           <div className="text-center">
//             <p className="text-2xl font-semibold mb-4">Customer App</p>
//             <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
//               <a
//                 href="https://play.google.com/store"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <img
//                   src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
//                   alt="Get it on Google Play"
//                   className="h-12"
//                 />
//               </a>
//               <a
//                 href="https://www.apple.com/app-store/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <img
//                   src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//                   alt="Download on the App Store"
//                   className="h-12"
//                 />
//               </a>
//             </div>
//           </div>

//           {/* Captain App Section */}
//           <div className="text-center">
//             <p className="text-2xl font-semibold mb-4">Captain App</p>
//             <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
//               <a
//                 href="https://play.google.com/store"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <img
//                   src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
//                   alt="Get it on Google Play"
//                   className="h-12"
//                 />
//               </a>
//               <a
//                 href="https://www.apple.com/app-store/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <img
//                   src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//                   alt="Download on the App Store"
//                   className="h-12"
//                 />
//               </a>
//             </div>
//           </div>
//         </Box>

//         {/* Footer Links */}
//         <Box className="mt-10">
//           <div className="  flex justify-center gap-60">
//             {/* Company Links */}
//             <ul className="space-y-1 text-sm">
//               <li className="font-semibold text-base mb-1">Company</li>
//               <li>Home</li>
//               <li>About</li>
//               <li>Safety</li>
//               <li>Careers</li>
//               <li>Privacy Policy</li>
//             </ul>

//             {/* Services Links */}
//             <ul className="space-y-1 text-sm">
//               <li className="font-semibold text-base mb-1">Services</li>
//               <li>Flight</li>
//               <li>Hotel</li>
//               <li>Bus</li>
//               <li>Auto</li>
//               <li>Bike</li>
//               <li>Parcel</li>
//             </ul>
//           </div>
//         </Box>

//         {/* Social Icons */}
//         <div className="mt-12 text-center">
//           <h1 className="text-2xl font-semibold mb-6">Follow Us</h1>
//           <div className="flex justify-center gap-6 text-3xl h-[50px] ">
//             <a
//               href="https://www.instagram.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-pink-500 transition-colors duration-300"
//             >
//               <FaInstagram />
//             </a>
//             <a
//               href="https://www.facebook.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-blue-500 transition-colors duration-300"
//             >
//               <FaFacebook />
//             </a>
//             <a
//               href="https://www.linkedin.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-blue-400 transition-colors duration-300"
//             >
//               <FaLinkedin />
//             </a>
//             <a
//               href="https://github.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-gray-400 transition-colors duration-300"
//             >
//               <FaGithub />
//             </a>
//             <a
//               href="https://twitter.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-blue-300 transition-colors duration-300"
//             >
//               <FaTwitter />
//             </a>
//           </div>
//           <div>
//             <p className="text-lg">© 2025 Uber Technologies Inc.</p>
//             <p className="text-lg flex items-center justify-end">
//               <LocationOnIcon className=" mr-1" />
//               <a
//                 href="https://www.google.com/maps/place/Bhopal,+Madhya+Pradesh"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="Shover:underline"
//               >
//                 Bhopal
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </Box>
//   );
// }
