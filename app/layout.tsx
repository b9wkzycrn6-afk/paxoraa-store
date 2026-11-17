
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PAXORAA | Premium Streetwear",
  description: "Discover the latest PAXORAA collections."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
