import { TextLoop } from "@/components/ui/text-loop";
import { TextRoll } from "@/components/ui/text-roll";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { Magnetic } from "@/components/ui/magnetic";
import MainButton from "@/components/mainbutton";

import "animate.css";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen border-8 border-[#444041] overflow-hidden">
      <TextRoll>
        P<span className="text-[#385331]/50">i</span>t
        <span className="text-[#385331]/50">i</span>k
      </TextRoll>

      <TextLoop>
        <div>
          <TextShimmerWave as="span">Snap instantly.</TextShimmerWave>
        </div>
        <div>
          <TextShimmerWave as="span">Choose a frame.</TextShimmerWave>
        </div>
        <div>
          <TextShimmerWave as="span">Download right away.</TextShimmerWave>
        </div>
        <div>
          <TextShimmerWave as="span">Share with friends.</TextShimmerWave>
        </div>
        <div>
          <TextShimmerWave as="span">No signup needed.</TextShimmerWave>
        </div>
      </TextLoop>

      <div className="animate__animated animate__bounceInUp animate__delay-3s">
        <Magnetic>
          <MainButton text="Early Access" href="/select" />
        </Magnetic>
      </div>
    </div>
  );
}
