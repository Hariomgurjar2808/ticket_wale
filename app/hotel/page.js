"use client"; // Use this directive for client-side rendering

import React from "react";
import { useRouter } from "next/navigation"; // Correct import
import { Button } from "antd";
import "./hotel.css"; // Ensure this file exists and styles correctly

export default function HotelManagement() {
  const router = useRouter();

  const handleExploreClick = () => {
    // Navigate to the seehotels page
    router.push("/seehotels"); // Navigate to /seehotels
  };

  return (
    <div>
      {/* Section 1: Cards with background */}
      <div className="hotel-background">
        <h1 className="text-5xl font-bold mb-6 text-white">Hotel Management</h1>

        <div className="overlay">
          <div className="cards">
            {/* Card 1: Room Booking */}
            <div className="card">
              <img
                className="card-img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsZz85ouYaugQpExC1G38AZ94kp4t2wdfI6xTgv0dw1uGiuP8fQSOnb3l5LAErAU8THVM&usqp=CAU"
                alt="Room Booking"
              />
              <h2>Room Booking</h2>
              <p>Manage room availability and guest bookings easily.</p>
            </div>

            {/* Card 2: Staff Management */}
            <div className="card">
              <img
                className="card-img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiaqbIhbfvptRgLEO2JYFsAufsQU8DXeKsCA&s"
                alt="Staff Management"
              />
              <h2>Staff Management</h2>
              <p>Track schedules, roles, and attendance of staff.</p>
            </div>

            {/* Card 3: Facilities */}
            <div className="card">
              <img
                className="card-img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrMJmYleL7eE_T5RLsr2oaBN_CL-WWVnJo6g&s"
                alt="Facilities"
              />
              <h2>Facilities</h2>
              <p>WiFi, meals, cleaning and other amenities.</p>
            </div>

            {/* Card 4: Hotel Overview */}
            <div className="card">
              <img
                className="card-img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvBv-bm00fxxlw-iOyQexiAvaiS3WByvzx0g&s"
                alt="Hotel Overview"
              />
              <h2>Hotel Overview</h2>
              <p>Explore hotel features and overall guest experience.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Fullscreen banner */}
      <div
        style={{
          backgroundImage: `url("/balkani.webp")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "2rem",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "10px 20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          Welcome to Our Hotel
        </h1>

        <Button
          onClick={handleExploreClick}
          type="primary"
          style={{
            backgroundColor: "#FCD34D", // Color of the button
            color: "#000", // Text color
            border: "none", // Remove border
            padding: "10px 20px", // Padding inside the button
            fontWeight: "bold", // Text boldness
            borderRadius: "9999px", // Fully rounded edges
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // Shadow for 3D effect
            transition: "background-color 0.3s", // Smooth background color change
          }}
        >
          See hotel details
        </Button>
      </div>
    </div>
  );
}
