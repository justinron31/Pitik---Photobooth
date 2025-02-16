// hooks/useCamera.ts
import { useRef, useState, useEffect } from "react";

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);

  const setupCamera = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const constraints = {
        video: {
          width: { ideal: 256 },
          height: { ideal: 256 },
        },
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.style.transform = "scaleX(-1)";
        videoRef.current.style.objectFit = "cover";

        videoRef.current.width = 256;
        videoRef.current.height = 256;

        videoRef.current.onloadedmetadata = () => {
          setIsReady(true);
        };
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  useEffect(() => {
    setupCamera();
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return {
    videoRef,
    stream,
    isReady,
  };
}
