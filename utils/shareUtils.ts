import { createPhotoStrip } from "./downloadUtils";

export const downloadPhotoStrip = async (captures: string[]) => {
  if (captures.length === 0) return;

  const strip = await createPhotoStrip(captures);
  const link = document.createElement("a");
  link.href = strip;
  const timeString = new Date().toISOString().slice(11, 19).replace(/:/g, "-");
  link.download = `pitik-booth-${timeString}.png`;
  link.click();
};
