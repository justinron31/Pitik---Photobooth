// utils/downloadUtils.ts
import { getLayoutInfo } from "@/utils/layoutUtils";

export const createPhotoStrip = (
  captures: string[],
  layout?: string,
  filter?: string,
  backgroundColor?: string,
  isImageBackground?: boolean
): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      resolve("");
      return;
    }

    // Move all canvas operations into a separate function where ctx is guaranteed to exist
    const drawPhotoStrip = (ctx: CanvasRenderingContext2D) => {
      const layoutInfo = getLayoutInfo(layout);
      const isDoubleColumn =
        captures.length === 6 || layoutInfo.gridLayout.includes("grid-cols-2");

      const photoSize = 256;
      const borderWidth = 30;
      const spacing = 10;
      const headerHeight = 60;
      const footerMargin = 20;

      const columns = isDoubleColumn ? 2 : 1;
      const rows = Math.ceil(captures.length / columns);

      canvas.width =
        photoSize * columns + spacing * (columns - 1) + borderWidth * 2;
      canvas.height =
        photoSize * rows +
        spacing * (rows - 1) +
        borderWidth * 2 +
        headerHeight +
        footerMargin;

      // Fill background
      if (isImageBackground && backgroundColor) {
        const bgImage = new Image();
        bgImage.onload = () => {
          ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
          continueDrawing();
        };
        bgImage.src = backgroundColor;
      } else {
        ctx.fillStyle = backgroundColor || "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        continueDrawing();
      }

      function continueDrawing() {
        const loadImages = captures.map((capture, index) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              const column = isDoubleColumn ? index % 2 : 0;
              const row = Math.floor(index / columns);

              const xPosition = borderWidth + column * (photoSize + spacing);
              const yPosition = borderWidth + row * (photoSize + spacing);

              const tempCanvas = document.createElement("canvas");
              tempCanvas.width = photoSize;
              tempCanvas.height = photoSize;
              const tempCtx = tempCanvas.getContext("2d");

              if (!tempCtx) {
                resolve();
                return;
              }

              tempCtx.filter = filter || "none";
              tempCtx.drawImage(img, 0, 0, photoSize, photoSize);

              ctx.drawImage(
                tempCanvas,
                xPosition,
                yPosition,
                photoSize,
                photoSize
              );
              ctx.strokeStyle = "#2F2F2F";
              ctx.lineWidth = 2;
              ctx.strokeRect(xPosition, yPosition, photoSize, photoSize);

              resolve();
            };
            img.src = capture;
          });
        });

        Promise.all(loadImages).then(() => {
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

          const titleFont = "bold 40px 'Gloock'";
          const timestampFont = "16px 'Courier New'";

          ctx.font = titleFont;
          const titleMetrics = ctx.measureText("Pitik Strip");
          ctx.font = timestampFont;
          const timestampMetrics = ctx.measureText(timestamp);

          const padding = 8;
          const footerWidth =
            Math.max(titleMetrics.width, timestampMetrics.width) + padding * 2;
          const footerHeight = 85 + padding * 2;

          ctx.fillStyle = "#F1F5F9";
          const footerX = (canvas.width - footerWidth) / 2;
          const footerY = canvas.height - borderWidth - footerHeight - 10;

          ctx.beginPath();
          const radius = 4;
          ctx.roundRect(footerX, footerY, footerWidth, footerHeight, radius);
          ctx.fill();

          const textX = footerX + footerWidth / 2;
          const titleY = footerY + padding + 40;
          const timestampY = titleY + 30;

          ctx.textAlign = "center";
          ctx.font = titleFont;

          ctx.fillStyle = "#2F2F2F";
          ctx.fillText("P", textX - 80, titleY);

          ctx.fillStyle = "rgba(56, 83, 49, 0.5)";
          ctx.fillText("i", textX - 63, titleY);

          ctx.fillStyle = "#2F2F2F";
          ctx.fillText("t", textX - 50, titleY);

          ctx.fillStyle = "rgba(56, 83, 49, 0.5)";
          ctx.fillText("i", textX - 40, titleY);

          ctx.fillStyle = "#2F2F2F";
          ctx.fillText("k Strip", textX + 30, titleY);

          ctx.fillStyle = "#2F2F2F";
          ctx.font = timestampFont;
          ctx.fillText(timestamp, textX, timestampY);

          ctx.strokeStyle = "#2F2F2F";
          ctx.lineWidth = 12;
          ctx.strokeRect(0, 0, canvas.width, canvas.height);

          resolve(canvas.toDataURL("image/png"));
        });
      }
    };

    // Call the function with the confirmed non-null ctx
    drawPhotoStrip(ctx);
  });
};
