// components/CameraView.tsx

import { TimerState } from "@/hooks/usePhotoCapture";

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  timer: TimerState | null;
  requiredShots: number;
}

export const CameraView = ({
  videoRef,
  timer,
  requiredShots,
}: CameraViewProps) => (
  <div className="relative w-full aspect-square max-w-[350px] max-h-[350px] mx-auto">
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="w-full h-full object-cover border-4 border-[#444041] shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800"
    />
    {timer && (
      <>
        <div className="absolute inset-0 flex items-center justify-center">
          {timer.count > 0 && (
            <div className="relative opacity-30">
              {/* Outer circle animation */}
              <div className="absolute -inset-2 rounded-full bg-[#385331]/20 animate-pulse" />
              {/* Timer display */}
              <div
                className="bg-[#385331] text-white w-20 h-20 rounded-full flex items-center justify-center
                            border-4 border-[#2F2F2F] shadow-lg"
              >
                <span className="text-4xl font-bold">{timer.count}</span>
              </div>
            </div>
          )}
        </div>

        {/* Shot counter */}
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#2F2F2F]/80 backdrop-blur-sm
                      px-4 py-2 rounded-full border-2 border-white/10"
        >
          <div className="flex items-center gap-2">
            {[...Array(requiredShots)].map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < timer.photoNumber - 1 ? "bg-[#385331]" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {timer.count === 0 && (
          <div className="absolute inset-0 bg-white animate-flash" />
        )}
      </>
    )}
  </div>
);
