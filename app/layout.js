// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// MONGODB INTEGRATION: Import AuthProvider to wrap the app with authentication context
import { AuthProvider } from "../contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ticket Wales - Your Travel Partner",
  description: "Book flights, hotels, buses, and more with Ticket Wales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* MONGODB INTEGRATION: Wrap app with AuthProvider for global authentication state */}
        <AuthProvider>
          {children}
          {/* ✅ This renders content from app/page.js */}
        </AuthProvider>
      </body>
    </html>
  );
}
