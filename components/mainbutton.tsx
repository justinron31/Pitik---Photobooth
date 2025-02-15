import React from "react";
import Link from "next/link";

interface MainButtonProps {
  text: string;
  href: string;
}

function MainButton({ text, href }: MainButtonProps) {
  return (
    <>
      <Link href={href}>
        <button
          type="button"
          className="px-6 sm:px-8 md:px-10 py-3 md:py-4 text-sm font-lato font-black text-[#444041] my-5
                       relative overflow-hidden bg-[#DBDBDB]
                       border-4 border-[#444041]
                       before:absolute before:inset-0 before:bg-black/5
                       hover:bg-[#CECECE]
                       hover:shadow-[inset_0_4px_0_rgba(0,0,0,0.2),inset_-2px_-2px_0_rgba(255,255,255,0.3),inset_2px_2px_0_rgba(0,0,0,0.15)]
                       active:translate-y-1
                       active:shadow-[inset_0_4px_0_rgba(0,0,0,0.3),inset_-3px_-3px_0_rgba(255,255,255,0.2),inset_3px_3px_0_rgba(0,0,0,0.2)]
                       active:bg-[#BEBEBE]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-75"
        >
          <span className="tracking-widest">{text}</span>
        </button>
      </Link>
    </>
  );
}

export default MainButton;
