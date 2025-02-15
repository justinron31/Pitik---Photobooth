// components/CameraView.tsx

import { TimerState } from "@/hooks/usePhotoCapture";

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  timer: TimerState | null;
}

export const CameraView = ({ videoRef, timer }: CameraViewProps) => (
  <div className="relative w-full aspect-square max-w-[350px] max-h-[350px] mx-auto">
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="w-full h-full object-cover rounded-3xl border-2 border-gray-200/10 shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800"
    />
    {timer && (
      <>
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-2">
            <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-white/90">
                Photo {timer.photoNumber}/3
              </span>
            </div>
            <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-3xl font-bold text-white drop-shadow-lg">
                {timer.count}
              </span>
            </div>
          </div>
        </div>
        {timer.count === 0 && (
          <div className="absolute inset-0 bg-white animate-flash rounded-3xl" />
        )}
      </>
    )}
  </div>
);
