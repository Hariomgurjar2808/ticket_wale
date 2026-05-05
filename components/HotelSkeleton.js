import React from 'react';
import { Skeleton, Button } from 'antd';

const HotelSkeleton = () => {
  return (
    <div>
      {/* Section 1: Cards with background */}
      <div className="hotel-background">
        <Skeleton.Input style={{ width: 400, height: 50, marginBottom: 20 }} active />
        <div className="cards">
          {/* Card Skeletons */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="card" key={index}>
              <Skeleton.Image style={{ width: '100%', height: 150 }} active />
              <Skeleton.Input style={{ width: '80%', marginTop: 10 }} active />
              <Skeleton.Paragraph rows={2} active />
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Fullscreen banner */}
      <div
        style={{
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
        <Skeleton.Input style={{ width: 300, height: 40, marginBottom: 20 }} active />
        <Skeleton.Button active style={{ width: 200, height: 40 }} />
      </div>
    </div>
  );
};

export default HotelSkeleton;