import type { Metadata } from "next";
import Footer from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pitik – Capture, Customize & Share Instantly",
  description:
    "Experience a hassle-free virtual photobooth. No sign-up required! Capture stunning photos, choose stylish frames, download instantly, and share with friends.",
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
