"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function Booth() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [timer, setTimer] = useState<{
    count: number;
    photoNumber: number;
  } | null>(null);
  const [captures, setCaptures] = useState<string[]>([]);
  const [showStrip, setShowStrip] = useState(false);
  const [showCamera] = useState(true);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && stream) {
      const canvas = document.createElement("canvas");
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;

      // Calculate dimensions for a square crop from the center
      const size = Math.min(videoWidth, videoHeight);
      canvas.width = 256;
      canvas.height = 256;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Add rounded corners with proper path
        ctx.beginPath();
        ctx.moveTo(20, 0);

        // Top right corner
        ctx.lineTo(236, 0);
        ctx.quadraticCurveTo(256, 0, 256, 20);

        // Bottom right corner
        ctx.lineTo(256, 236);
        ctx.quadraticCurveTo(256, 256, 236, 256);

        // Bottom left corner
        ctx.lineTo(20, 256);
        ctx.quadraticCurveTo(0, 256, 0, 236);

        // Top left corner
        ctx.lineTo(0, 20);
        ctx.quadraticCurveTo(0, 0, 20, 0);

        ctx.closePath();
        ctx.clip();

        // Calculate offset to center the crop
        const offsetX = (videoWidth - size) / 2;
        const offsetY = (videoHeight - size) / 2;

        // Draw only the square portion from the center of the video
        ctx.drawImage(
          videoRef.current,
          offsetX,
          offsetY,
          size,
          size,
          0,
          0,
          256,
          256
        );
      }
      return canvas.toDataURL("image/png");
    }
    return null;
  };

  const startPhotoSequence = async () => {
    setIsCapturing(true);
    setCaptures([]);
    setShowStrip(false);
    const newCaptures: string[] = [];

    for (let i = 1; i <= 3; i++) {
      // Changed loop to count up for clarity
      // Count down from 3 for each photo
      for (let j = 3; j > 0; j--) {
        setTimer({ count: j, photoNumber: i }); // Pass both countdown and photo number
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const photo = takePhoto();
      if (photo) {
        newCaptures.push(photo);
      }

      // Small pause between photos
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setCaptures(newCaptures);
    setIsCapturing(false);
    setTimer(null);
    setShowStrip(true);
  };

  const downloadPhotoStrip = () => {
    if (captures.length === 0) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set dimensions for the photo strip with borders
    const photoSize = 256; // Each photo is 256x256
    const borderWidth = 30; // Reduced border to match smaller photo size
    const spacing = 10; // Reduced spacing
    const headerHeight = 60; // Reduced header height

    canvas.width = photoSize + borderWidth * 2;
    canvas.height =
      photoSize * 3 + spacing * 2 + borderWidth * 2 + headerHeight;

    // Fill with white background (frame)
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add retro-style timestamp
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const retroTimestamp = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;

    ctx.fillStyle = "#444041";
    ctx.font = "bold 20px 'Courier New'"; // Using monospace font for retro look
    ctx.textAlign = "center";
    ctx.fillText("PITIK BOOTH", canvas.width / 2, borderWidth + 25);

    ctx.font = "16px 'Courier New'";
    ctx.fillText(retroTimestamp, canvas.width / 2, borderWidth + 50);

    // Load and draw each image
    const loadImages = captures.map((capture, index) => {
      return new Promise((resolve) => {
        const img = new (window.Image as { new (): HTMLImageElement })();
        img.onload = () => {
          // Calculate Y position for each photo including spacing
          const yPosition =
            borderWidth + headerHeight + index * (photoSize + spacing);
          ctx.drawImage(img, borderWidth, yPosition, photoSize, photoSize);

          // Add a subtle border around each photo
          ctx.strokeStyle = "#444041";
          ctx.lineWidth = 2;
          ctx.strokeRect(borderWidth, yPosition, photoSize, photoSize);

          resolve(null);
        };
        img.src = capture;
      });
    });

    Promise.all(loadImages).then(() => {
      // Add decorative corners to the frame
      const cornerSize = 15; // Reduced corner size
      const corners = [
        [0, 0, cornerSize, 0, cornerSize, cornerSize, 0, cornerSize], // Top left
        [
          canvas.width - cornerSize,
          0,
          canvas.width,
          0,
          canvas.width,
          cornerSize,
          canvas.width - cornerSize,
          cornerSize,
        ], // Top right
        [
          0,
          canvas.height - cornerSize,
          cornerSize,
          canvas.height - cornerSize,
          cornerSize,
          canvas.height,
          0,
          canvas.height,
        ], // Bottom left
        [
          canvas.width - cornerSize,
          canvas.height - cornerSize,
          canvas.width,
          canvas.height - cornerSize,
          canvas.width,
          canvas.height,
          canvas.width - cornerSize,
          canvas.height,
        ], // Bottom right
      ];

      ctx.fillStyle = "#385331";
      corners.forEach((corner) => {
        ctx.beginPath();
        ctx.moveTo(corner[0], corner[1]);
        ctx.lineTo(corner[2], corner[3]);
        ctx.lineTo(corner[4], corner[5]);
        ctx.lineTo(corner[6], corner[7]);
        ctx.closePath();
        ctx.fill();
      });

      const strip = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = strip;

      // Use same timestamp format for filename
      const timeString = `${hours}-${minutes}-${seconds}`;
      link.download = `pitik-booth-${timeString}.png`;
      link.click();
    });
  };

  // Add useEffect to start camera automatically
  useEffect(() => {
    startCamera();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-4xl p-8 rounded-3xl border-8 border-[#444041] bg-gradient-to-b from-white to-[#385331]/5">
        <h1 className="text-4xl font-bold text-[#444041] mb-8 text-center">
          Photo Booth
        </h1>

        {showCamera && (
          <div className="relative aspect-square mb-8">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover rounded-2xl border-4 border-[#444041]/20 shadow-lg"
            />
            {timer && (
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl">
                <span className="text-9xl font-bold text-white/20 drop-shadow-lg">
                  {timer.count}
                </span>
                <span className="text-3xl font-bold text-white/20 drop-shadow-lg mt-4">
                  Photo {timer.photoNumber} of 3
                </span>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={startPhotoSequence}
            disabled={isCapturing}
            className="px-8 py-3 text-lg font-medium rounded-full bg-[#385331]/50 text-white
                     transition-all duration-300 hover:bg-[#385331]/70 hover:shadow-lg
                     focus:outline-none focus:ring-2 focus:ring-[#385331]/50
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCapturing
              ? "Taking Photos..."
              : captures.length > 0
              ? "Retake"
              : "Start Photo Sequence"}
          </button>

          {showStrip && (
            <button
              onClick={downloadPhotoStrip}
              className="px-8 py-3 text-lg font-medium rounded-full bg-[#444041] text-white
                       transition-all duration-300 hover:bg-[#444041]/80 hover:shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-[#444041]/50"
            >
              Download Strip
            </button>
          )}
        </div>

        {showStrip && (
          <div className="mt-8 flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-[#444041] mb-2">
              Your Photo Strip
            </h2>
            <div className="flex flex-col gap-2 w-64">
              {captures.map((capture, index) => (
                <Image
                  key={index}
                  src={capture}
                  alt={`Photo ${index + 1}`}
                  width={256}
                  height={256}
                  className="w-full rounded-2xl border-2 border-[#444041]/20 shadow-sm"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
