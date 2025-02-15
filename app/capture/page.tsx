"use client";

import { useCamera } from "@/hooks/useCamera";
import { usePhotoCapture } from "@/hooks/usePhotoCapture";
import { getRequiredShots } from "@/utils/layoutUtils";
import { CameraView } from "@/components/CameraView";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Booth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const layout = searchParams.get("layout");
  const requiredShots = getRequiredShots(layout || "");

  const { videoRef, isReady, switchCamera, hasMultipleCameras } = useCamera();
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
    return <div>Please select a layout first</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E3E3E3] p-4">
      <div className="w-full max-w-5xl animate__animated animate__bounceInUp">
        <div
          className="bg-[#DBDBDB] rounded-none border-8 border-[#2F2F2F] shadow-lg p-4 sm:p-6 md:p-10
                     relative before:absolute before:inset-0 before:border-4 before:border-[#2F2F2F]/20"
        >
          <div className="mb-4 text-[#2F2F2F] text-5xl font-gloock tracking-tighter text-center font-bold">
            P<span className="text-[#385331]/50">i</span>t
            <span className="text-[#385331]/50">i</span>k Booth
          </div>
          <div
            className="bg-[#385331]/50 p-3 sm:p-4 md:p-6 rounded-none mb-6 md:mb-8 flex justify-center
                        border-4 border-[#2F2F2F] relative"
          >
            <div className="w-full max-w-[350px]">
              <CameraView
                videoRef={videoRef as React.RefObject<HTMLVideoElement>}
                timer={timer}
                requiredShots={requiredShots}
              />
              {hasMultipleCameras && (
                <button
                  onClick={switchCamera}
                  className="absolute top-4 right-4 p-2 bg-[#2F2F2F]/80 rounded-full
                           text-white hover:bg-[#2F2F2F] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-6 md:mb-8">
            <Link
              href="/select"
              className="px-6 sm:px-8 md:px-10 py-3 md:py-4 text-sm font-lato font-black text-[#2F2F2F]
                       relative overflow-hidden bg-[#DBDBDB]
                       border-4 border-[#2F2F2F]
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
              className="px-6 sm:px-8 md:px-10 py-3 md:py-4 text-sm font-lato font-black text-white
                       relative overflow-hidden bg-[#385331]
                       border-4 border-[#2F2F2F]
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
