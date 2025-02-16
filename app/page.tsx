import { TextLoop } from "@/components/ui/text-loop";
import { TextRoll } from "@/components/ui/text-roll";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { Magnetic } from "@/components/ui/magnetic";
import MainButton from "@/components/mainbutton";
import Popover from "@/components/ui/popover";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen border-[20px] border-[#444041] overflow-hidden">
      <div className="mb-20 md:mb-50 animate__animated animate__bounceInDown animate__delay-1s">
        <Popover />
      </div>
      <TextRoll>
        P<span className="text-[#385331]/50">i</span>t
        <span className="text-[#385331]/50">i</span>k
      </TextRoll>

      <TextLoop>
        <div>
          <TextShimmerWave as="span">Pick your perfect layout.</TextShimmerWave>
        </div>
        <div>
          <TextShimmerWave as="span">Snap in an instant.</TextShimmerWave>
        </div>
        <div>
          <TextShimmerWave as="span">Make it uniquely yours.</TextShimmerWave>
        </div>
        <div>
          <TextShimmerWave as="span">Download with one click.</TextShimmerWave>
        </div>
        <div>
          <TextShimmerWave as="span">No signup, no hassle.</TextShimmerWave>
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
