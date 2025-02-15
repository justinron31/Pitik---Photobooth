"use client";
import { useCamera } from "@/hooks/useCamera";
import { usePhotoCapture } from "@/hooks/usePhotoCapture";
import { createPhotoStrip } from "@/utils/downloadUtils";
import { CameraView } from "@/components/CameraView";
import { PhotoStrip } from "@/components/PhotoStrip";

export default function Booth() {
  const { videoRef } = useCamera();
  const { isCapturing, timer, captures, showStrip, startPhotoSequence } =
    usePhotoCapture(videoRef as React.RefObject<HTMLVideoElement>);

  const downloadPhotoStrip = async () => {
    if (captures.length === 0) return;

    const strip = await createPhotoStrip(captures);
    const link = document.createElement("a");
    link.href = strip;
    const timeString = new Date()
      .toISOString()
      .slice(11, 19)
      .replace(/:/g, "-");
    link.download = `pitik-booth-${timeString}.png`;
    link.click();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E3E3E3] p-4">
      <div className="w-full max-w-5xl">
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
                        border-4 border-[#2F2F2F]"
          >
            <div className="w-full max-w-[350px]">
              <CameraView
                videoRef={videoRef as React.RefObject<HTMLVideoElement>}
                timer={timer}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-6 md:mb-8">
            <button
              onClick={startPhotoSequence}
              disabled={isCapturing}
              className="px-6 sm:px-8 md:px-10 py-3 md:py-4 text-sm font-lato font-black text-[#2F2F2F]
                       relative overflow-hidden bg-[#DBDBDB]
                       border-4 border-[#2F2F2F]
                       before:absolute before:inset-0 before:bg-black/5
                       hover:bg-[#CECECE]
                       hover:shadow-[inset_0_4px_0_rgba(0,0,0,0.2),inset_-2px_-2px_0_rgba(255,255,255,0.3),inset_2px_2px_0_rgba(0,0,0,0.15)]
                       active:translate-y-1
                       active:shadow-[inset_0_4px_0_rgba(0,0,0,0.3),inset_-3px_-3px_0_rgba(255,255,255,0.2),inset_3px_3px_0_rgba(0,0,0,0.2)]
                       active:bg-[#BEBEBE]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-75"
            >
              <span className="relative z-10">
                {isCapturing
                  ? "CAPTURING..."
                  : captures.length > 0
                  ? "RETAKE"
                  : "START"}
              </span>
            </button>

            {showStrip && (
              <button
                onClick={downloadPhotoStrip}
                className="px-6 sm:px-8 md:px-10 py-3 md:py-4 text-sm font-lato font-black text-[#2F2F2F]
                       relative overflow-hidden bg-[#DBDBDB]
                       border-4 border-[#2F2F2F]
                       before:absolute before:inset-0 before:bg-black/5
                       hover:bg-[#CECECE]
                       hover:shadow-[inset_0_4px_0_rgba(0,0,0,0.2),inset_-2px_-2px_0_rgba(255,255,255,0.3),inset_2px_2px_0_rgba(0,0,0,0.15)]
                       active:translate-y-1
                       active:shadow-[inset_0_4px_0_rgba(0,0,0,0.3),inset_-3px_-3px_0_rgba(255,255,255,0.2),inset_3px_3px_0_rgba(0,0,0,0.2)]
                       active:bg-[#BEBEBE]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-75"
              >
                DOWNLOAD
              </button>
            )}
          </div>

          {showStrip && (
            <div className="bg-[#DBDBDB] p-3 sm:p-4 md:p-6 border-4 border-[#2F2F2F]">
              <PhotoStrip captures={captures} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
