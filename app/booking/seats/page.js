import React, { Suspense } from "react";
import SeatSelectionClient from "./SeatSelectionClient";

export default function SeatSelectionPage() {
  return (
    <Suspense fallback={<div>Loading seat selection...</div>}>
      <SeatSelectionClient />
    </Suspense>
  );
}
