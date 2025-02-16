// utils/downloadUtils.ts
import { getLayoutInfo } from "@/utils/layoutUtils";

export const createPhotoStrip = (
  captures: string[],
  layout?: string,
  filter?: string,
  backgroundColor?: string,
  isImageBackground?: boolean,
  showTimestamp: boolean = true
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
      const footerMargin = 20;
      // Dynamically set headerHeight based on timestamp
      const headerHeight = showTimestamp ? 100 : 70; // Smaller height when no timestamp

      const columns = isDoubleColumn ? 2 : 1;
      const rows = Math.ceil(captures.length / columns);

      canvas.width =
        photoSize * columns + spacing * (columns - 1) + borderWidth * 2;
      canvas.height =
        photoSize * rows +
        spacing * (rows - 1) +
        borderWidth * 2 +
        footerMargin +
        headerHeight;

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
              ctx.strokeStyle = "#444041";
              ctx.lineWidth = 2;
              ctx.strokeRect(xPosition, yPosition, photoSize, photoSize);

              resolve();
            };
            img.src = capture;
          });
        });

        Promise.all(loadImages).then(() => {
          const titleFont = "bold 40px 'Gloock'";

          ctx.font = titleFont;
          const titleMetrics = ctx.measureText("Pitik Strip");

          const padding = {
            x: 16, // px-4 equivalent
            y: 8, // py-2 equivalent
          };
          const footerWidth = titleMetrics.width + padding.x * 2;
          const footerHeight = showTimestamp
            ? 85 + padding.y * 2
            : 55 + padding.y * 2;

          // Draw white background for footer
          ctx.fillStyle = "#FFFFFF";
          const footerX = (canvas.width - footerWidth) / 2;
          const footerY =
            borderWidth +
            (photoSize * rows + spacing * (rows - 1)) +
            footerMargin;

          // Draw rounded rectangle with border
          ctx.beginPath();
          const radius = 4;
          ctx.roundRect(footerX, footerY, footerWidth, footerHeight, radius);
          ctx.fill();

          // Add border
          ctx.strokeStyle = "#444041";
          ctx.lineWidth = 2;
          ctx.stroke();

          const textX = footerX + footerWidth / 2;
          const titleY = footerY + padding.y + 40;

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

          if (showTimestamp) {
            const timestampY = titleY + 30;
            const now = new Date();
            const timestamp = `${now
              .toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit",
              })
              .split("/")
              .slice(0, 2)
              .join(" ")} '${now.getFullYear().toString().slice(2)}`;

            ctx.fillStyle = "#7a7a7a";
            ctx.font = "18px 'Gloock'";
            ctx.textAlign = "center";
            ctx.fillText(timestamp, textX, timestampY);
          }

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
