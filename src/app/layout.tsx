import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "./components/Navbar";
import Footer from "./components/footer"; // Ensure you have this component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "thirdweb SDK + Next starter",
  description: "Starter template for using thirdweb SDK with Next.js App Router",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-700 flex flex-col min-h-screen">
        <ThirdwebProvider>
          <Navbar />
          <main className="flex-grow">{children}</main> {/* Pushes footer to bottom */}
          <Footer /> {/* Stays at the bottom */}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
