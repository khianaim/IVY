import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "IVY: Interview AI Coach",
  description: "Practice for job interviews in real time and receive instant feedback! IVY - Built for victory.",
  creator: "K.Mannix"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=National+Park&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-national antialiased pattern">
        <Navbar />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

