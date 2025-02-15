// utils/photoUtils.ts
export const capturePhoto = (
  videoElement: HTMLVideoElement | null
): string | null => {
  if (!videoElement) return null;

  const canvas = document.createElement("canvas");
  const videoWidth = videoElement.videoWidth;
  const videoHeight = videoElement.videoHeight;

  const size = Math.min(videoWidth, videoHeight);
  canvas.width = 256;
  canvas.height = 256;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Add rounded corners
  ctx.beginPath();
  ctx.moveTo(20, 0);
  ctx.lineTo(236, 0);
  ctx.quadraticCurveTo(256, 0, 256, 20);
  ctx.lineTo(256, 236);
  ctx.quadraticCurveTo(256, 256, 236, 256);
  ctx.lineTo(20, 256);
  ctx.quadraticCurveTo(0, 256, 0, 236);
  ctx.lineTo(0, 20);
  ctx.quadraticCurveTo(0, 0, 20, 0);
  ctx.closePath();
  ctx.clip();

  const offsetX = (videoWidth - size) / 2;
  const offsetY = (videoHeight - size) / 2;

  ctx.drawImage(videoElement, offsetX, offsetY, size, size, 0, 0, 256, 256);

  return canvas.toDataURL("image/png");
};
