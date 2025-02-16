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
  const [showTimestamp, setShowTimestamp] = useState(true);

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
        currentBackground.isImage,
        showTimestamp
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
            showTimestamp={showTimestamp}
            onTimestampChange={setShowTimestamp}
          />

          <div className="flex flex-col items-center gap-6 mt-8">
            <div className="bg-[#E3E3E3] p-6 rounded-none border-4 border-[#444041] w-full">
              <div className="flex justify-center gap-6">
                <Link href={`/capture?layout=${photoData.layout}`}>
                  <button
                    className="px-6 sm:px-8 md:px-10 py-3 md:py-4 text-sm font-lato font-black text-[#444041]
                       relative overflow-hidden bg-[#DBDBDB]
                       border-4 border-[#444041]
                       before:absolute before:inset-0 before:bg-black/5
                       hover:bg-[#CECECE]
                       hover:shadow-[inset_0_4px_0_rgba(0,0,0,0.2),inset_-2px_-2px_0_rgba(255,255,255,0.3),inset_2px_2px_0_rgba(0,0,0,0.15)]
                       active:translate-y-1
                       active:shadow-[inset_0_4px_0_rgba(0,0,0,0.3),inset_-3px_-3px_0_rgba(255,255,255,0.2),inset_3px_3px_0_rgba(0,0,0,0.2)]
                       active:bg-[#BEBEBE]
                       transition-all duration-75
                       flex items-center justify-center"
                  >
                    RETAKE
                  </button>
                </Link>

                <button
                  onClick={handleDownload}
                  className="px-6 sm:px-8 md:px-10 py-3 md:py-4 text-sm font-lato font-black text-[#444041]
                       relative overflow-hidden bg-[#DBDBDB]
                       border-4 border-[#444041]
                       before:absolute before:inset-0 before:bg-black/5
                       hover:bg-[#CECECE]
                       hover:shadow-[inset_0_4px_0_rgba(0,0,0,0.2),inset_-2px_-2px_0_rgba(255,255,255,0.3),inset_2px_2px_0_rgba(0,0,0,0.15)]
                       active:translate-y-1
                       active:shadow-[inset_0_4px_0_rgba(0,0,0,0.3),inset_-3px_-3px_0_rgba(255,255,255,0.2),inset_3px_3px_0_rgba(0,0,0,0.2)]
                       active:bg-[#BEBEBE]
                       transition-all duration-75
                       flex items-center justify-center"
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
