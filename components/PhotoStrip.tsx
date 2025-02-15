// components/PhotoStrip.tsx
import Image from "next/image";

interface PhotoStripProps {
  captures: string[];
}

export const PhotoStrip = ({ captures }: PhotoStripProps) => (
  <div className="mt-8 flex flex-col items-center">
    <h2 className="text-2xl font-bold text-[#2F2F2F] mb-4 text-center tracking-tight">
      P<span className="text-[#385331]/50">i</span>t
      <span className="text-[#385331]/50">i</span>k Strip
    </h2>

    <div className="bg-[#385331]/50 p-4  border-4 border-[#2F2F2F]">
      <div className="flex flex-col gap-3 w-64">
        {captures.map((capture, index) => (
          <div key={index} className="relative">
            <Image
              src={capture}
              alt={`Photo ${index + 1}`}
              width={256}
              height={256}
              className="w-full shadow-md
                         transition-transform duration-300 hover:scale-[1.02]
                         border-2 border-[#2F2F2F]"
            />
            <div
              className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm
                            px-2 py-1 rounded-full"
            >
              <span className="text-xs font-medium text-white/90">
                #{index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
