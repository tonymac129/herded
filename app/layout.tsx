import type { Metadata } from "next";
import { Tilt_Neon } from "next/font/google";
import Nav from "@/components/layout/Nav";
import Animate from "@/components/layout/Animate";
import "./globals.css";

const tiltNeon = Tilt_Neon({
  variable: "--font-tilt-neon",
});

export const metadata: Metadata = {
  title: "Welcome to Herded",
  description:
    "Herded is a would you rather quiz platform where you can create custom interactive would you rather quizzes or take fun public quizzes other people created!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tiltNeon.variable} antialiased`}>
        <Nav />
        <Animate>{children}</Animate>
      </body>
    </html>
  );
}
