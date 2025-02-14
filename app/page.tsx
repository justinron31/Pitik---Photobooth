import { TextLoop } from "@/components/ui/text-loop";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-8xl md:text-9xl lg:text-10xl font-bold">
          P<span className="text-red-500/40">i</span>T
          <span className="text-red-500/40">i</span>k
        </h1>

        <TextLoop>
          <div>
            <p>Snap instantly.</p>
          </div>
          <div>
            <p>Choose a frame.</p>
          </div>
          <div>
            <p>Download right away.</p>
          </div>
          <div>
            <p>Share with friends.</p>
          </div>
          <div>
            <p>No signup needed.</p>
          </div>
        </TextLoop>
      </div>
    </>
  );
}
