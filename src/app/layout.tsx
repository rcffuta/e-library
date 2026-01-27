import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Use Inter for a clean, academic, legibile font
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "RCF FUTA E-Library",
    description:
        "Access past questions, lecture notes, and academic resources.",
    icons: {
        icon: "/favicon.ico", // Ensure you have an icon later
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body
                className={`${inter.variable} font-sans h-full antialiased bg-gray-50 text-gray-900`}
            >
                {/* Main Application Entry */}
                {children}

                {/* Toast Notifications Overlay */}
                <Toaster position="top-right" richColors closeButton />
            </body>
        </html>
    );
}
