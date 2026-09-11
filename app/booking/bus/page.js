import React, { Suspense } from "react";
import BusSelectionClient from "./BusSelectionClient";

export default function BusSelectionPage() {
  return (
    <Suspense fallback={<div>Loading bus selection...</div>}>
      <BusSelectionClient />
    </Suspense>
  );
}
