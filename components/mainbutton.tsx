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
          className="my-10 inline-flex items-center rounded-md bg-[#444041] px-4 py-2 text-sm text-white transition-all duration-300 hover:bg-zinc-100 hover:text-[#385331]/50 dark:bg-transparent dark:text-zinc-50 dark:hover:bg-zinc-600"
        >
          <span className="tracking-widest">{text}</span>
        </button>
      </Link>
    </>
  );
}

export default MainButton;
