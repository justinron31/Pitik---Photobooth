import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { Magnetic } from "@/components/ui/magnetic";
import MainButton from "@/components/mainbutton";
import Link from "next/link";

import "animate.css";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen border-8 border-[#444041] overflow-hidden">
      <h1 className="text-8xl font-bold">
        4<span className="text-[#385331]/50">0</span>4
      </h1>

      <div className="my-6">
        <TextShimmerWave as="h2">Page Not Found</TextShimmerWave>
      </div>

      <div className="text-center mb-8">
        <TextShimmerWave as="p">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </TextShimmerWave>
      </div>

      <div className="animate__animated animate__bounceInUp">
        <Link href="/">
          <Magnetic>
            <MainButton text="Go Back" href="/" />
          </Magnetic>
        </Link>
      </div>
    </div>
  );
}
