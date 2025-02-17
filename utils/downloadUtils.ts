// utils/downloadUtils.ts
import { getLayoutInfo } from "@/utils/layoutUtils";

export const createPhotoStrip = (
  captures: string[],
  layout?: string,
  filter?: string,
  backgroundColor?: string,
  isImageBackground?: boolean,
  showTimestamp: boolean = true,
  customPattern?: File
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
      const isHorizontalLayout = layout === "2A";

      const photoSize = 256;
      const borderWidth = 30;
      const spacing = 10;
      const footerMargin = 20;
      const headerHeight = showTimestamp ? 100 : 70;

      // Calculate rows and columns based on layout
      const columns = isHorizontalLayout ? 2 : isDoubleColumn ? 2 : 1;
      const rows = isHorizontalLayout
        ? 1
        : Math.ceil(captures.length / (isDoubleColumn ? 2 : 1));

      // Adjust canvas dimensions based on layout
      if (isHorizontalLayout) {
        canvas.width = photoSize * 2 + spacing + borderWidth * 2;
        canvas.height =
          photoSize + borderWidth * 2 + footerMargin + headerHeight;
      } else {
        canvas.width =
          photoSize * columns + spacing * (columns - 1) + borderWidth * 2;
        canvas.height =
          photoSize * rows +
          spacing * (rows - 1) +
          borderWidth * 2 +
          footerMargin +
          headerHeight;
      }

      // Fill background - now handling both custom patterns and preset backgrounds
      if (isImageBackground) {
        const bgImage = new Image();
        bgImage.onload = () => {
          // Use object-cover behavior for all image backgrounds
          const scale = Math.max(
            canvas.width / bgImage.width,
            canvas.height / bgImage.height
          );

          const newWidth = bgImage.width * scale;
          const newHeight = bgImage.height * scale;
          const x = (canvas.width - newWidth) / 2;
          const y = (canvas.height - newHeight) / 2;

          // Draw the image with object-cover behavior
          ctx.drawImage(bgImage, x, y, newWidth, newHeight);
          continueDrawing();
        };

        if (customPattern) {
          bgImage.src = URL.createObjectURL(customPattern);
        } else {
          bgImage.src = backgroundColor || "";
        }
      } else {
        // Handle solid colors
        ctx.fillStyle = backgroundColor || "#FFFFFF";
        if (
          !/^#[0-9A-F]{6}$/i.test(backgroundColor || "") &&
          !/^[a-zA-Z]+$/.test(backgroundColor || "")
        ) {
          ctx.fillStyle = "#FFFFFF"; // Fallback to white if invalid color
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        continueDrawing();
      }

      function continueDrawing() {
        const loadImages = captures.map((capture, index) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              let xPosition, yPosition;

              if (isHorizontalLayout) {
                // For 2A layout, place images side by side
                xPosition = borderWidth + index * (photoSize + spacing);
                yPosition = borderWidth;
              } else {
                // Original positioning for other layouts
                const column = isDoubleColumn ? index % 2 : 0;
                const row = Math.floor(index / (isDoubleColumn ? 2 : 1));
                xPosition = borderWidth + column * (photoSize + spacing);
                yPosition = borderWidth + row * (photoSize + spacing);
              }

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
