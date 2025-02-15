"use client";

import { PhotoStrip } from "@/components/PhotoStrip";
import Link from "next/link";
import { useEffect, useState } from "react";
import { downloadPhotoStrip } from "@/utils/shareUtils";

export default function SharePage() {
  const [photoData, setPhotoData] = useState<{
    captures: string[];
    layout: string;
  } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("photoStrip");
    if (stored) {
      setPhotoData(JSON.parse(stored));
    }
  }, []);

  if (!photoData || !photoData.captures.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#E3E3E3] p-4 animate__animated animate__bounceInUp">
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
      <div className="w-full max-w-5xl animate__animated animate__bounceInUp">
        <div className="bg-[#DBDBDB] rounded-none border-8 border-[#2F2F2F] shadow-lg p-4 sm:p-6 md:p-10">
          <PhotoStrip captures={photoData.captures} layout={photoData.layout} />

          <div className="flex justify-center gap-4 mt-8">
            <Link
              href={`/capture?layout=${photoData.layout}`}
              className="px-6 py-3 text-sm font-lato font-black text-[#2F2F2F]
                       bg-[#DBDBDB] border-4 border-[#2F2F2F] hover:bg-[#CECECE]
                       hover:scale-105 hover:shadow-md
                       transition-all duration-150"
            >
              RETAKE
            </Link>

            <button
              onClick={() => downloadPhotoStrip(photoData.captures)}
              className="px-6 py-3 text-sm font-lato font-black text-[#2F2F2F]
                       bg-[#DBDBDB] border-4 border-[#2F2F2F] hover:bg-[#CECECE]
                       hover:scale-105 hover:shadow-md
                       transition-all duration-150"
            >
              DOWNLOAD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
