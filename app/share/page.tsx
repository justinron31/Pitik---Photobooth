"use client";

import { PhotoStrip } from "@/components/PhotoStrip";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPhotoStrip } from "@/utils/downloadUtils";

export default function SharePage() {
  const [photoData, setPhotoData] = useState<{
    captures: string[];
    layout: string;
  } | null>(null);

  const [currentFilter, setCurrentFilter] = useState("");
  const [currentBackground, setCurrentBackground] = useState<{
    color: string;
    isImage: boolean;
  }>({ color: "#FFFFFF", isImage: false });

  useEffect(() => {
    const stored = localStorage.getItem("photoStrip");
    if (stored) {
      setPhotoData(JSON.parse(stored));
    }
  }, []);

  const handleDownload = async () => {
    if (!photoData) return;

    try {
      const dataUrl = await createPhotoStrip(
        photoData.captures,
        photoData.layout,
        currentFilter,
        currentBackground.color,
        currentBackground.isImage
      );

      const link = document.createElement("a");
      link.download = `pitik-strip-${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error creating photo strip:", error);
    }
  };

  if (!photoData || !photoData.captures.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#E3E3E3] p-4 animate__animated animate__bounceIn">
        <div className="text-[#2F2F2F] mb-4">No photos to display</div>
        <Link
          href="/capture"
          className="px-6 py-3 text-sm font-lato font-black text-[#2F2F2F]
                   bg-[#DBDBDB] border-4 border-[#2F2F2F] hover:bg-[#CECECE]"
        >
          Take Photos
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E3E3E3] p-4">
      <div className="w-full max-w-5xl animate__animated animate__bounceIn">
        <div className="bg-[#DBDBDB] rounded-none border-8 border-[#444041] shadow-lg p-4 sm:p-6 md:p-10">
          <PhotoStrip
            captures={photoData.captures}
            layout={photoData.layout}
            onFilterChange={setCurrentFilter}
            onBackgroundChange={setCurrentBackground}
          />

          <div className="flex flex-col items-center gap-6 mt-8">
            <div className="bg-[#E3E3E3] p-6 rounded-none border-4 border-[#444041] w-full">
              <div className="flex justify-center gap-6">
                <Link
                  href={`/capture?layout=${photoData.layout}`}
                  className="px-8 py-4 text-sm font-lato font-black text-[#444041]
                           bg-[#DBDBDB] border-4 border-[#444041] hover:bg-[#CECECE]
                           hover:scale-105 hover:shadow-md relative
                           transition-all duration-150
                           after:absolute after:content-[''] after:bg-[#444041]
                           after:h-1 after:w-full after:left-0 after:bottom-0
                           hover:after:h-2"
                >
                  RETAKE
                </Link>

                <button
                  onClick={handleDownload}
                  className="px-8 py-4 text-sm font-lato font-black text-[#444041]
                           bg-[#DBDBDB] border-4 border-[#444041] hover:bg-[#CECECE]
                           hover:scale-105 hover:shadow-md relative
                           transition-all duration-150
                           after:absolute after:content-[''] after:bg-[#444041]
                           after:h-1 after:w-full after:left-0 after:bottom-0
                           hover:after:h-2"
                >
                  DOWNLOAD
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
