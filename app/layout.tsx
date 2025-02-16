import type { Metadata } from "next";
import Footer from "@/components/footer";
import "./globals.css";
import "animate.css";
export const metadata: Metadata = {
  title: "Pitik – Photobooth",
  description:
    "Experience a hassle-free virtual photobooth. No sign-up required! Capture stunning photos, choose stylish frames, and download instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
