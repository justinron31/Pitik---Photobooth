import type { Metadata } from "next";
import Footer from "@/components/footer";
import "./globals.css";
import "animate.css";

export const metadata: Metadata = {
  title: "Pitik – Virtual Photobooth",
  description:
    "Experience a hassle-free virtual photobooth. No sign-up required! Capture stunning photos, choose stylish frames, and download instantly.",
  keywords: [
    "pitik photobooth",
    "virtual photobooth",
    "online photobooth",
    "photo capture",
    "selfie booth",
    "instant download photos",
  ],
  authors: [{ name: "K1dla", url: "https://justinron.vercel.app/" }],
  metadataBase: new URL("https://pitikbooth.vercel.app/"),
  openGraph: {
    title: "Pitik – Virtual Photobooth",
    description:
      "Capture stunning photos with our hassle-free virtual photobooth. No sign-up required, just snap, style, and download!",
    url: "https://pitikbooth.vercel.app/",
    siteName: "Pitik Photobooth",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pitik Photobooth Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pitik – Virtual Photobooth",
    description:
      "Capture stunning photos with our hassle-free virtual photobooth. No sign-up required, just snap, style, and download!",
    images: ["/og-image.png"],
  },
  robots: "index, follow",
  verification: {
    google: "mc58E6vUIuCWjFQBHsBQ_OLgjBYjWFQkx4yX2suhLLA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
