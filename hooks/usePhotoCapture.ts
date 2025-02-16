// hooks/usePhotoCapture.ts
import { useState, useRef, useCallback, useEffect } from "react";

import { getRequiredShots } from "@/utils/layoutUtils";

export interface TimerState {
  count: number;
  photoNumber: number;
}

export function usePhotoCapture(
  videoRef: React.RefObject<HTMLVideoElement>,
  layout?: string
) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [timer, setTimer] = useState<TimerState | null>(null);
  const [captures, setCaptures] = useState<string[]>([]);
  const [showStrip, setShowStrip] = useState(false);
  const audioRef = useRef(new Audio("/assets/camera.mp3"));
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const captureTimeRef = useRef<number>(0);

  const requiredShots = getRequiredShots(layout);

  const takePhoto = useCallback(() => {
    const currentTime = Date.now();
    if (currentTime - captureTimeRef.current < 500) {
      return;
    }

    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Always mirror to match preview
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);

        // Calculate dimensions to fill the canvas while maintaining aspect ratio
        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;
        const scale = Math.max(256 / videoWidth, 256 / videoHeight);
        const width = videoWidth * scale;
        const height = videoHeight * scale;
        const x = (256 - width) / 2;
        const y = (256 - height) / 2;

        ctx.drawImage(videoRef.current, x, y, width, height);

        const photo = canvas.toDataURL("image/jpeg");

        captureTimeRef.current = currentTime;
        setCaptures((prev) => {
          if (prev.includes(photo)) return prev;
          if (prev.length >= requiredShots) return prev;
          return [...prev, photo];
        });
        playShutterSound();
      }
    }
  }, [requiredShots]);

  const playShutterSound = () => {
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .catch((err) => console.log("Audio play failed:", err));
  };

  const startPhotoSequence = useCallback(() => {
    setCaptures([]); // Reset captures array
    setIsCapturing(true);
    setTimer({ count: 5, photoNumber: 1 });
    captureTimeRef.current = 0; // Reset capture time

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (!prev) return null;

        if (prev.count === 0) {
          takePhoto();

          const nextPhotoNumber = prev.photoNumber + 1;
          if (nextPhotoNumber > requiredShots) {
            clearInterval(intervalRef.current);
            setIsCapturing(false);
            setShowStrip(true);
            return null;
          }

          return {
            count: 5,
            photoNumber: nextPhotoNumber,
          };
        }

        return {
          ...prev,
          count: prev.count - 1,
        };
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [requiredShots, takePhoto]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    isCapturing,
    timer,
    captures,
    showStrip,
    startPhotoSequence,
  };
}
