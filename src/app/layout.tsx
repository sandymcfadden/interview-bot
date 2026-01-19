import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const firstName = process.env.NEXT_PUBLIC_FIRST_NAME || 'Your';
const lastName = process.env.NEXT_PUBLIC_LAST_NAME || 'Name';
const fullName = `${firstName} ${lastName}`;

export const metadata: Metadata = {
  title: `Interview Bot - ${fullName}`,
  description: `Ask questions about ${firstName}'s experience and background`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
