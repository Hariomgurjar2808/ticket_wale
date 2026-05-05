import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";

export const metadata = {
  title: "Ticket Wales - Your Travel Partner",
  description: "Book flights, hotels, buses, and more with Ticket Wales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}