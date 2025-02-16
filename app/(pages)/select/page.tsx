"use client";
import MainButton from "@/components/mainbutton";
import { useState } from "react";

export default function Select() {
  const [selectedLayout, setSelectedLayout] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E3E3E3] p-4 overflow-hidden">
      <div className="w-full max-w-5xl animate__animated animate__bounceIn">
        <div
          className="bg-[#385331]/50 rounded-none border-8 border-[#444041] shadow-lg p-4 sm:p-6 md:p-10
                       relative before:absolute before:inset-0 before:border-4 before:border-[#2F2F2F]/20"
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center mb-8 font-gloock tracking-tight text-[#2F2F2F]">
              Select your layout
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Layout 1 */}
            <button
              onClick={() => setSelectedLayout(2)}
              className={`group flex flex-col items-center p-4
                         relative overflow-hidden
                         ${
                           selectedLayout === 2
                             ? "bg-[#BEBEBE] scale-105 shadow-xl transform ring-4 ring-[#385331] ring-offset-2"
                             : "bg-[#DBDBDB]"
                         }
                         border-4
                         ${
                           selectedLayout === 2
                             ? "border-[#385331] border-opacity-100"
                             : "border-[#444041] border-opacity-50"
                         }
                         before:absolute before:inset-0 before:bg-black/5
                         hover:bg-[#CECECE]
                         hover:shadow-[inset_0_4px_0_rgba(0,0,0,0.2),inset_-2px_-2px_0_rgba(255,255,255,0.3),inset_2px_2px_0_rgba(0,0,0,0.15)]
                         active:translate-y-1
                         active:shadow-[inset_0_4px_0_rgba(0,0,0,0.3),inset_-3px_-3px_0_rgba(255,255,255,0.2),inset_3px_3px_0_rgba(0,0,0,0.2)]
                         active:bg-[#BEBEBE]
                         transition-all duration-150`}
            >
              <span
                className={` font-black tracking-widest mb-4
                               ${
                                 selectedLayout === 2
                                   ? "text-[#385331] scale-110"
                                   : "text-[#444041]"
                               }`}
              >
                2 SHOTS
              </span>
              <div className="flex justify-center flex-col items-center bg-[#444041] w-fit p-1 gap-1 pb-4">
                <div className="w-10 h-10 bg-white"></div>
                <div className="w-10 h-10 bg-white"></div>
              </div>
            </button>

            {/* Layout 2 */}
            <button
              onClick={() => setSelectedLayout(3)}
              className={`group flex flex-col items-center p-4
                         relative overflow-hidden
                         ${
                           selectedLayout === 3
                             ? "bg-[#BEBEBE] scale-105 shadow-xl transform ring-4 ring-[#385331] ring-offset-2"
                             : "bg-[#DBDBDB]"
                         }
                         border-4
                         ${
                           selectedLayout === 3
                             ? "border-[#385331] border-opacity-100"
                             : "border-[#444041] border-opacity-50"
                         }
                         before:absolute before:inset-0 before:bg-black/5
                         hover:bg-[#CECECE]
                         hover:shadow-[inset_0_4px_0_rgba(0,0,0,0.2),inset_-2px_-2px_0_rgba(255,255,255,0.3),inset_2px_2px_0_rgba(0,0,0,0.15)]
                         active:translate-y-1
                         active:shadow-[inset_0_4px_0_rgba(0,0,0,0.3),inset_-3px_-3px_0_rgba(255,255,255,0.2),inset_3px_3px_0_rgba(0,0,0,0.2)]
                         active:bg-[#BEBEBE]
                         transition-all duration-150`}
            >
              <span
                className={` font-black tracking-widest mb-4
                               ${
                                 selectedLayout === 3
                                   ? "text-[#385331] scale-110"
                                   : "text-[#444041]"
                               }`}
              >
                3 SHOTS
              </span>
              <div className="flex justify-center flex-col items-center bg-[#444041] w-fit p-1 gap-1 pb-4">
                <div className="w-10 h-10 bg-white"></div>
                <div className="w-10 h-10 bg-white"></div>
                <div className="w-10 h-10 bg-white"></div>
              </div>
            </button>

            {/* Layout 3 */}
            <button
              onClick={() => setSelectedLayout(4)}
              className={`group flex flex-col items-center p-4
                         relative overflow-hidden
                         ${
                           selectedLayout === 4
                             ? "bg-[#BEBEBE] scale-105 shadow-xl transform ring-4 ring-[#385331] ring-offset-2"
                             : "bg-[#DBDBDB]"
                         }
                         border-4
                         ${
                           selectedLayout === 4
                             ? "border-[#385331] border-opacity-100"
                             : "border-[#444041] border-opacity-50"
                         }
                         before:absolute before:inset-0 before:bg-black/5
                         hover:bg-[#CECECE]
                         hover:shadow-[inset_0_4px_0_rgba(0,0,0,0.2),inset_-2px_-2px_0_rgba(255,255,255,0.3),inset_2px_2px_0_rgba(0,0,0,0.15)]
                         active:translate-y-1
                         active:shadow-[inset_0_4px_0_rgba(0,0,0,0.3),inset_-3px_-3px_0_rgba(255,255,255,0.2),inset_3px_3px_0_rgba(0,0,0,0.2)]
                         active:bg-[#BEBEBE]
                         transition-all duration-150`}
            >
              <span
                className={` font-black tracking-widest mb-4
                               ${
                                 selectedLayout === 4
                                   ? "text-[#385331] scale-110"
                                   : "text-[#444041]"
                               }`}
              >
                4 SHOTS
              </span>
              <div className="flex justify-center flex-col items-center bg-[#444041] w-fit p-1 gap-1 pb-4">
                <div className="w-10 h-10 bg-white"></div>
                <div className="w-10 h-10 bg-white"></div>
                <div className="w-10 h-10 bg-white"></div>
                <div className="w-10 h-10 bg-white"></div>
              </div>
            </button>

            {/* Layout 4 */}
            <button
              onClick={() => setSelectedLayout(6)}
              className={`group flex flex-col items-center p-4
                         relative overflow-hidden
                         ${
                           selectedLayout === 6
                             ? "bg-[#BEBEBE] scale-105 shadow-xl transform ring-4 ring-[#385331] ring-offset-2"
                             : "bg-[#DBDBDB]"
                         }
                         border-4
                         ${
                           selectedLayout === 6
                             ? "border-[#385331] border-opacity-100"
                             : "border-[#444041] border-opacity-50"
                         }
                         before:absolute before:inset-0 before:bg-black/5
                         hover:bg-[#CECECE]
                         hover:shadow-[inset_0_4px_0_rgba(0,0,0,0.2),inset_-2px_-2px_0_rgba(255,255,255,0.3),inset_2px_2px_0_rgba(0,0,0,0.15)]
                         active:translate-y-1
                         active:shadow-[inset_0_4px_0_rgba(0,0,0,0.3),inset_-3px_-3px_0_rgba(255,255,255,0.2),inset_3px_3px_0_rgba(0,0,0,0.2)]
                         active:bg-[#BEBEBE]
                         transition-all duration-150`}
            >
              <span
                className={` font-black tracking-widest mb-4
                               ${
                                 selectedLayout === 6
                                   ? "text-[#385331] scale-110"
                                   : "text-[#444041]"
                               }`}
              >
                6 SHOTS
              </span>
              <div className="grid grid-cols-2 justify-center items-center bg-[#444041] w-fit p-1 gap-1 pb-4">
                <div className="w-10 h-10 bg-white"></div>
                <div className="w-10 h-10 bg-white"></div>
                <div className="w-10 h-10 bg-white"></div>
                <div className="w-10 h-10 bg-white"></div>
                <div className="w-10 h-10 bg-white"></div>
                <div className="w-10 h-10 bg-white"></div>
              </div>
            </button>
          </div>

          {/* Next Button */}
          <div className="mt-8 flex justify-center">
            {selectedLayout ? (
              <MainButton
                text="Proceed"
                href={`/capture?layout=${selectedLayout}`}
              />
            ) : (
              <button
                disabled
                className="px-8 py-4 text-xl font-lato font-black text-[#DBDBDB] tracking-widest
                         bg-[#444041] border-4 border-[#2F2F2F]
                         opacity-50 cursor-not-allowed
                         transition-all duration-75"
              >
                Proceed
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
