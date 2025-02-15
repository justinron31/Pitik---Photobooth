// components/PhotoStrip.tsx
import Image from "next/image";
import { getLayoutInfo } from "@/utils/layoutUtils";

interface PhotoStripProps {
  captures: string[];
  layout?: string;
}

export const PhotoStrip = ({ captures, layout }: PhotoStripProps) => {
  const layoutInfo = getLayoutInfo(layout);
  const requiredShots = layoutInfo.shots;

  const uniqueCaptures = [...new Set(captures)].slice(0, requiredShots);
  console.log("Unique captures:", {
    uniqueCount: uniqueCaptures.length,
    originalCount: captures.length,
    requiredShots,
    isEnough: uniqueCaptures.length === requiredShots,
  });

  return (
    <div className="mt-8 flex flex-col items-center">
      <h2 className="text-5xl font-bold text-[#2F2F2F] mb-4 text-center tracking-tight">
        P<span className="text-[#385331]/50">i</span>t
        <span className="text-[#385331]/50">i</span>k Strip
      </h2>
      <div className="bg-[#385331]/50 p-4 border-4 border-[#2F2F2F]">
        <div className={`${layoutInfo.gridLayout} gap-3 w-64`}>
          {uniqueCaptures.map((capture, index) => (
            <div key={`photo-${index}`} className="relative">
              <Image
                src={capture}
                alt={`Photo ${index + 1}`}
                width={256}
                height={256}
                className="w-full h-full object-cover rounded-2xl bg-black"
              />
              <div
                className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm
                            px-2 py-1 rounded-full"
              >
                <span className="text-xs font-medium text-white/90">
                  #{index + 1}/{requiredShots}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
