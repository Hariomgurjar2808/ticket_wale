"use client"; // must be the first line

import React from "react";
import { Box } from "@mui/material";
import { Button, Typography } from "antd";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import wirld from "../images/wirld.jpg";

const Navbar = () => {
  const testimonialData = [
    {
      text: "“I was able to list within 15 minutes, and no more than two hours later, I had my first booking.”",
      name: "Parley Rose",
      title: "UK-based host",
      img: "https://xx.bstatic.com/xdata/e/xphoto/max1024x100/Ukyc4Gwipc8i5A_1fBPHdxgI7Yu5yIKj7ShaZze2j_QHDEvQlQrUm_ZXUHgsDGecDmjBfbptfqP5pihKsEhz26lCZI7nnEP0kH1pmN7i.jpg",
    },
    {
      text: "“Booking.com is the most straightforward OTA to work with. Everything is clear, it's easy. And it frees us up to focus on the aspects where we can really add value, like the guest experience.”",
      name: "Martin Fieldman",
      title: "Managing Director, Abodebed",
      img: "https://xx.bstatic.com/xdata/e/xphoto/max600x120/Ukuc4Gwipc8i5CH5gAVsSjtWdunQi9-51tJLCwQPf2PGW_xGqh1WC9mkm4DI40UmWrOqC3iaI-WDrY8mGyL2ApuMLznWMrGdV4lNb18=.jpg",
    },
    {
      text: "“Booking.com accounts for our largest share of guests and helped us get where we are today.”",
      name: "Michel and Asja",
      title: "Owners of La Maison de Souhey",
      img: "https://xx.bstatic.com/xdata/e/xphoto/max600x120/UktFsp563N_OGPALUNtthVGWa-r1FwOhH-BJbJAJmx7L1SLmPJZGoQ8uBrkYVkhwyFMUf7CEvE_3BJ1pS80Ny3rpE1jC2f6P2ek_r4I=.jpg",
    },
    {
      text: "Travel Booking.com is an all-in-one travel booking platform designed to simplify your travel planning experience...",
      name: "Louis Gonzalez",
      title: "Charming Lofts, Los Angeles",
      img: "https://xx.bstatic.com/xdata/e/xphoto/max600x120/Ukuc4Gwipc8i5MpkasdbWZXwRW2b-NKOV1BoXXjrUFjSx_oyNFEkzze_bg6haOnPb0kCxtdGSoKDXFMNyBw0pUgNt-L4ge4hSRhYuKg=.jpg",
    },
    {
      text: "📝 Leave a Review: Share your experience to help future travelers and improve services.",
      name: "Zoey Berghoff",
      title: "US-based host",
      img: "https://xx.bstatic.com/xdata/e/xphoto/max600x120/Ukuc4Gwipc8i5Lz1EpeaLFAoRVrkjWkJuqInmhVXyBn1VIJmr0kwpen5i0mwkkTrdi1mmdTA5YgA1GojSo7bbef9Axi9afPN815cWl0=.jpg",
    },
    {
      text: "“Getting started with Booking.com was super simple and took no time at all.”",
      name: "Shawn Ritzenthaler",
      title: "Owner of The Hollywood Hills Mansion",
      img: "https://xx.bstatic.com/xdata/e/xphoto/max600x120/Ukuc4Gwipc8i5GMsGtAVVjxhdtTmFe3tRNWntQU0Skp4BuJQ1Cm_cQ7Qjq9zZPKYsb0DDiJCLVSkGoKQwqTXNJyePN0tX4xeNJNzd6E=.jpg",
    },
  ];

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 text-white bg-black shadow-md">
        <div className="text-xl font-bold">Booking.com</div>
        <div className="space-x-6">
          <a href="#" className="hover:text-gray-300">
            Home
          </a>
          {/* import {Link} from 'react-router-dom'; // Inside your component */}
          <Link href="/login" className="hover:text-gray-300">
            Sign in
          </Link>
          <a href="#" className="hover:text-gray-300">
            Help
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-black text-white px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between">
        {/* Left Content */}
        <div className="max-w-xl ml-14">
          <h1 className="text-4xl font-bold mb-4">List your</h1>
          <h1 className="text-4xl font-bold mb-4 text-yellow-300">
            <Typewriter
              words={[
                "Hotels",
                "Trains",
                "Apartments",
                "Buses",
                "Flights",
                "Tours",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={70}
              delaySpeed={1000}
            />
          </h1>
          <h1 className="text-4xl font-bold mb-4">on Booking.com</h1>
          <p className="text-xl mt-4">
            List on one of the world’s most downloaded travel apps to earn more,
            faster and expand into new markets.
          </p>
        </div>

        {/* Right Content */}
        <Box className="bg-white text-black rounded-lg p-6 w-full md:w-96 shadow-md mr-14 border-[4px] border-yellow-400">
          <h2 className="text-xl font-semibold mb-4">Register for free</h2>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>45% of hosts get their first booking within a week</li>
            <li>Choose instant bookings or Request to Book</li>
            <li>We'll facilitate payments for you</li>
          </ul>
          <hr className="my-4" />
          <Button
            type="primary"
            block
            style={{
              height: "48px",
              fontSize: "16px",
              borderRadius: "8px",
              backgroundColor: "black",
            }}
          >
            Get Started Now <ArrowRightAltIcon />
          </Button>

          <div className="mt-6">
            <h1 className="text-base font-medium">
              Already started a registration?
            </h1>
            <p className="text-sm text-gray-700">
              <Link href="/register" className="text-blue-600 hover:underline">
                Continue your registration
              </Link>
            </p>
          </div>
        </Box>
      </div>

      <div className="bg-[#FFFBEB]  px-6 py-12">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-black">
            Host worry-free. We’ve got your back
          </h1>
        </div>

        {/* Feature Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Feature 1 */}
          <Box className=" shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Your rental, your rules
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <p className="flex gap-2">
                <ArrowForwardIcon />
                Accept or decline bookings with Request to Book
              </p>
              <p className="flex gap-2">
                <ArrowForwardIcon />
                Manage your guests' expectations by setting up clear house
                rules.
              </p>
            </ul>
          </Box>

          {/* Feature 2 */}
          <Box className=" shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Get to know your guests
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <p className="flex gap-2">
                <ArrowForwardIcon />
                Chat with your guests before accepting their stay with
                pre-booking messaging.*
              </p>
              <p className="flex gap-2">
                <ArrowForwardIcon />
                Access guest travel history insights.
              </p>
            </ul>
          </Box>

          {/* Feature 3 */}
          <Box className=" shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Stay protected
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <p className="flex gap-2">
                <ArrowForwardIcon />
                Protection against liability claims from guests and neighbours
                up to €/$/£1,000,000 for every reservation.
              </p>
              <p className="flex gap-2">
                <ArrowForwardIcon />
                Selection of damage protection options for you to choose.
              </p>
            </ul>
          </Box>
        </div>

        {/* Call to Action Button */}
        <div className="flex flex-col gap-5">
          <div>
            <Button
              type="primary"
              style={{
                height: "48px",
                fontSize: "16px",
                borderRadius: "8px",
                padding: "0 24px",
                backgroundColor: "black",
              }}
            >
              Host with us today
            </Button>
          </div>

          <p className="text-gray-800">
            *Currently available for guest bookings made via iOS.
          </p>
        </div>
      </div>

      <div className="bg-[#F9FAFB] px-6 py-12">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-black">
            Manage your earnings effortlessly with Booking.com Payments
          </h1>
        </div>

        {/* Payment Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-12 py-10">
          {/* Left Column */}
          <Box className="bg-white w-full max-w-xl p-6 rounded-lg shadow-md space-y-6 mx-auto">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Simplified Payments
              </h2>
              <p className="text-gray-700 mt-1 flex items-start gap-2">
                <ArrowForwardIcon className="mt-1" />
                We facilitate the payment process for you, freeing up your time
                to grow your business.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Secure and Stable Payouts
              </h2>
              <p className="text-gray-700 mt-1 flex items-start gap-2">
                <ArrowForwardIcon className="mt-1" />
                Whenever guests complete prepaid reservations at your property
                and pay online, you are guaranteed payment.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Better Management of Your Cash Flow
              </h2>
              <p className="text-gray-700 mt-1 flex items-start gap-2">
                <ArrowForwardIcon className="mt-1" />
                Choose your payout method and timing based on regional
                availability.
              </p>
            </div>
          </Box>

          {/* Right Column */}
          <Box className="bg-white w-full max-w-xl p-6 rounded-lg shadow-md space-y-6 mx-auto">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Daily Payment Releases in Select Areas
              </h2>
              <p className="text-gray-700 mt-1 flex items-start gap-2">
                <ArrowForwardIcon className="mt-1" />
                Get payouts faster! We’ll send your payouts 24 hours after guest
                checkout.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Manage All Your Listings in One Place
              </h2>
              <p className="text-gray-700 mt-1 flex items-start gap-2">
                <ArrowForwardIcon className="mt-1" />
                Save time managing finances with group invoicing and
                reconciliation.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Improved Risk Protection
              </h2>
              <p className="text-gray-700 mt-1 flex items-start gap-2">
                <ArrowForwardIcon className="mt-1" />
                We help you stay compliant with regulatory changes and reduce
                the risk of fraud and chargebacks.
              </p>
            </div>
          </Box>
        </div>
      </div>

      <div className="bg-[#FFFBEB] px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-black">
            Get started quickly and keep progressing
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Card 1 */}
          <Box className="bg-white rounded-lg shadow-md p-6 text-center">
            <img
              src="https://t-cf.bstatic.com/design-assets/assets/v3.155.1/illustrations-partner-thumbnails/Review@2x.png"
              alt="Import property"
              className="w-24 h-24 mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Import your property details
            </h2>
            <p className="text-gray-700">
              Seamlessly import your property information from other travel
              websites and avoid overbooking with calendar sync.
            </p>
          </Box>

          {/* Card 2 */}
          <Box className="bg-white rounded-lg shadow-md p-6 text-center">
            <img
              src="https://t-cf.bstatic.com/design-assets/assets/v3.155.1/illustrations-partner-thumbnails/Puzzle@2x.png"
              alt="Review scores"
              className="w-24 h-24 mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Start fast with review scores
            </h2>
            <p className="text-gray-700">
              Your review scores on other travel websites are converted and
              displayed on your property page before your first Booking.com
              guests leave their reviews.
            </p>
          </Box>

          {/* Card 3 */}
          <Box className="bg-white rounded-lg shadow-md p-6 text-center">
            <img
              src="https://t-cf.bstatic.com/design-assets/assets/v3.155.1/illustrations-partner-thumbnails/Search@2x.png"
              alt="Stand out"
              className="w-24 h-24 mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Stand out in the market
            </h2>
            <p className="text-gray-700">
              The "New to Booking.com" label helps you stand out in our search
              results.
            </p>
          </Box>
        </div>

        <div className="text-left">
          <Link href="/login">
            <Button
              type="primary"
              className="px-6 py-2 text-lg font-medium rounded-md"
              style={{
                backgroundColor: "black",
                borderColor: "#1890ff",
                fontSize: "18px",
                height: "50px",
              }}
            >
              Get started today
            </Button>
          </Link>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url("/wirld.jpg")`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          padding: "4rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{ fontSize: "2.5rem", fontWeight: "bold", color: "black" }}
          >
            Reach a unique global customer base
          </h1>
        </div>

        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Box className=" text-black bg-opacity-60 p-6 rounded-md min-w-[250px]">
            <h1 className="text-4xl font-bold">1.8+ billion</h1>
            <p className="text-xl">holiday rental guests since 2010.</p>
          </Box>

          <Box className=" text-black bg-opacity-60 p-6 rounded-md min-w-[250px]">
            <h1 className="text-4xl font-bold">1 in every 3</h1>
            <p className="text-xl">
              room nights booked in 2024 was a holiday rental.
            </p>
          </Box>

          <Box className=" text-black bg-opacity-60 p-6 rounded-md min-w-[250px]">
            <h1 className="text-4xl font-bold">48% of nights</h1>
            <p className="text-xl">
              booked were for international stays at the end of 2023.
            </p>
          </Box>
        </div>

        <div className="mt-8">
          <Link href="/signup">
            <Button
              type="primary"
              style={{
                height: "50px",
                padding: "12px 24px",
                fontSize: "20px",
                borderRadius: "8px",
                backgroundColor: "black",
              }}
            >
              Reach new guests today
            </Button>
          </Link>
        </div>
      </div>

      <Box sx={{ px: 4, py: 6, backgroundColor: "white" }}>
        <Typography variant="h4" fontWeight="bold" className="text-center mb-8">
          What hosts like you say
        </Typography>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={4}
          sx={{ maxWidth: "1200px", mx: "auto" }}
        >
          {testimonialData.map((testimonial, idx) => (
            <Box
              key={idx}
              sx={{
                bgcolor: "#f9f9f9",
                p: 3,
                borderRadius: 2,
                width: 300,
                height: 300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "2px solid #b58900",
              }}
            >
              <Typography sx={{ fontSize: "0.95rem" }}>
                {testimonial.text}
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Box>
                  <Typography fontWeight="bold">{testimonial.name}</Typography>
                  <Typography variant="body2">{testimonial.title}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box display="flex" mt={5}>
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              height: "50px",
              fontSize: "20px",
            }}
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              height: 50,
              px: 4,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
            className="ml-24"
          >
            Join hosts like you
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Navbar;
