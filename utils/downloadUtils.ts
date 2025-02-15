// utils/downloadUtils.ts
import { getLayoutInfo } from "@/utils/layoutUtils";

export const createPhotoStrip = (
  captures: string[],
  layout?: string
): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      resolve("");
      return;
    }

    const layoutInfo = getLayoutInfo(layout);
    // Force 2 columns if there are 6 captures
    const isDoubleColumn =
      captures.length === 6 || layoutInfo.gridLayout.includes("grid-cols-2");

    const photoSize = 256;
    const borderWidth = 30;
    const spacing = 10;
    const headerHeight = 60;

    // Calculate dimensions based on layout
    const columns = isDoubleColumn ? 2 : 1;
    const rows = Math.ceil(captures.length / columns);

    canvas.width =
      photoSize * columns + spacing * (columns - 1) + borderWidth * 2;
    canvas.height =
      photoSize * rows + spacing * (rows - 1) + borderWidth * 2 + headerHeight;

    // Fill background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load and draw images
    const loadImages = captures.map((capture, index) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          // Calculate position based on grid
          const column = isDoubleColumn ? index % 2 : 0;
          const row = Math.floor(index / columns);

          const xPosition = borderWidth + column * (photoSize + spacing);
          const yPosition = borderWidth + row * (photoSize + spacing);

          ctx.drawImage(img, xPosition, yPosition, photoSize, photoSize);
          ctx.strokeStyle = "#444041";
          ctx.lineWidth = 2;
          ctx.strokeRect(xPosition, yPosition, photoSize, photoSize);
          resolve();
        };
        img.src = capture;
      });
    });

    Promise.all(loadImages).then(() => {
      // Add timestamp at the bottom
      const now = new Date();
      const timestamp = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
        .format(now)
        .replace(/[/]/g, ".");

      // Add header text at the bottom
      const footerY = canvas.height - borderWidth;
      ctx.fillStyle = "#444041";
      ctx.font = "bold 20px 'Courier New'";
      ctx.textAlign = "center";
      ctx.fillText("PITIK BOOTH", canvas.width / 2, footerY - 25);
      ctx.font = "16px 'Courier New'";
      ctx.fillText(timestamp, canvas.width / 2, footerY);

      // Add decorative corners
      const cornerSize = 15;
      const corners = [
        [0, 0, cornerSize, 0, cornerSize, cornerSize, 0, cornerSize],
        [
          canvas.width - cornerSize,
          0,
          canvas.width,
          0,
          canvas.width,
          cornerSize,
          canvas.width - cornerSize,
          cornerSize,
        ],
        [
          0,
          canvas.height - cornerSize,
          cornerSize,
          canvas.height - cornerSize,
          cornerSize,
          canvas.height,
          0,
          canvas.height,
        ],
        [
          canvas.width - cornerSize,
          canvas.height - cornerSize,
          canvas.width,
          canvas.height - cornerSize,
          canvas.width,
          canvas.height,
          canvas.width - cornerSize,
          canvas.height,
        ],
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

      resolve(canvas.toDataURL("image/png"));
    });
  });
};
