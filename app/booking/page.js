import { redirect } from "next/navigation";

export default function Page({ searchParams }) {
  const queryString = Object.keys(searchParams || {}).length
    ? new URLSearchParams(searchParams).toString()
    : "";

  redirect(`/booking/bus${queryString ? `?${queryString}` : ""}`);
}
