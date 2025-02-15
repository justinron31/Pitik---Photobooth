// hooks/usePhotoCapture.ts
import { useState, useRef } from "react";
import { capturePhoto } from "@/utils/photoUtils";

export interface TimerState {
  count: number;
  photoNumber: number;
}

export const usePhotoCapture = (
  videoRef: React.RefObject<HTMLVideoElement>
) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [timer, setTimer] = useState<TimerState | null>(null);
  const [captures, setCaptures] = useState<string[]>([]);
  const [showStrip, setShowStrip] = useState(false);
  const audioRef = useRef(new Audio("/assets/camera.mp3"));

  const playShutterSound = () => {
    audioRef.current.currentTime = 0; // Reset audio to start
    audioRef.current
      .play()
      .catch((err) => console.log("Audio play failed:", err));
  };

  const startPhotoSequence = async () => {
    setIsCapturing(true);
    setCaptures([]);
    setShowStrip(false);
    const newCaptures: string[] = [];

    for (let i = 1; i <= 3; i++) {
      for (let j = 3; j > 0; j--) {
        setTimer({ count: j, photoNumber: i });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Set count to 0 to trigger flash animation
      setTimer({ count: 0, photoNumber: i });
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Play shutter sound right before capturing
      playShutterSound();

      const photo = capturePhoto(videoRef.current);
      if (photo) {
        newCaptures.push(photo);
      }

      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    setCaptures(newCaptures);
    setIsCapturing(false);
    setTimer(null);
    setShowStrip(true);
  };

  return {
    isCapturing,
    timer,
    captures,
    showStrip,
    startPhotoSequence,
  };
};
