"use client";

import { useCamera } from "@/hooks/useCamera";
import { usePhotoCapture } from "@/hooks/usePhotoCapture";
import { getRequiredShots } from "@/utils/layoutUtils";
import { CameraView } from "@/components/CameraView";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import Link from "next/link";

function BoothContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const layout = searchParams.get("layout");
  const requiredShots = getRequiredShots(layout || "");

  const { videoRef, isReady } = useCamera();
  const {
    isCapturing,
    timer,
    captures: allCaptures,
    showStrip,
    startPhotoSequence,
  } = usePhotoCapture(
    videoRef as React.RefObject<HTMLVideoElement>,
    layout || ""
  );

  // Only use the required number of captures
  const captures = allCaptures.slice(0, requiredShots);

  useEffect(() => {
    console.log(
      "Number of captured images:",
      captures.length,
      "Required shots:",
      requiredShots,
      "Current captures:",
      captures
    );
  }, [captures, requiredShots]);

  useEffect(() => {
    if (showStrip && captures.length === requiredShots) {
      // Store captures in localStorage instead of URL
      localStorage.setItem(
        "photoStrip",
        JSON.stringify({
          captures,
          layout,
        })
      );
      // Redirect to share page without the captures data in URL
      router.push("/share");
    }
  }, [showStrip, captures, requiredShots, layout, router]);

  if (!layout) {
    router.push("/select");
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E3E3E3] p-4">
      <div className="w-full flex justify-center max-w-5xl animate__animated animate__bounceIn">
        <div
          className="bg-[#DBDBDB] flex flex-col items-center  w-fit rounded-none border-8 border-[#444041] shadow-lg p-4 sm:p-6 md:p-10
                     relative before:absolute before:inset-0 before:border-4 before:border-[#2F2F2F]/20"
        >
          <div className="mb-4 text-[#444041]  text-5xl font-gloock tracking-tighter text-center font-bold">
            P<span className="text-[#385331]/50">i</span>t
            <span className="text-[#385331]/50">i</span>k Booth
          </div>
          <div
            className="bg-[#385331]/50 p-3 sm:p-4 md:p-6 rounded-none mb-6 md:mb-8 flex justify-center
                        border-4 border-[#444041] relative w-fit"
          >
            <div className="w-full max-w-[400px]">
              <CameraView
                videoRef={videoRef as React.RefObject<HTMLVideoElement>}
                timer={timer}
                requiredShots={requiredShots}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-6 md:mb-8">
            <Link
              href="/select"
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
              <span className="relative z-10">CHANGE LAYOUT</span>
            </Link>
            <button
              onClick={startPhotoSequence}
              disabled={isCapturing || !isReady}
              className="px-6 sm:px-8 md:px-10 py-3 md:py-4 text-sm font-lato font-black text-[#e3e3e3]
                       relative overflow-hidden bg-[#808d7e]
                       border-4 border-[#444041]
                       before:absolute before:inset-0 before:bg-black/5
                       hover:bg-[#2A3F25]
                       hover:shadow-[inset_0_4px_0_rgba(0,0,0,0.2),inset_-2px_-2px_0_rgba(255,255,255,0.3),inset_2px_2px_0_rgba(0,0,0,0.15)]
                       active:translate-y-1
                       active:shadow-[inset_0_4px_0_rgba(0,0,0,0.3),inset_-3px_-3px_0_rgba(255,255,255,0.2),inset_3px_3px_0_rgba(0,0,0,0.2)]
                       active:bg-[#223219]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-75
                       flex-1 sm:flex-initial"
            >
              <span className="relative z-10">
                {!isReady
                  ? "WAITING FOR CAMERA..."
                  : isCapturing
                  ? "CAPTURING..."
                  : captures.length > 0
                  ? "RETAKE"
                  : `START (${requiredShots} SHOTS)`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Booth() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BoothContent />
    </Suspense>
  );
}
