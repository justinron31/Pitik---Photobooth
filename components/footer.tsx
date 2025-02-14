import React from "react";

import { TextShimmerWave } from "./ui/text-shimmer-wave";

function footer() {
  return (
    <>
      <footer className="w-full bg-[#385331]/50 text-[#444041] text-center py-4 text-sm">
        <p className="font-lato font-light italic">
          &copy; {new Date().getFullYear()} P1T1k v1. All rights reserved.{" "}
          <br />
          Created by{" "}
          <a
            href="https://github.com/justinron31"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:underline"
          >
            <TextShimmerWave>K1dla</TextShimmerWave>
          </a>
          .
        </p>
      </footer>
    </>
  );
}

export default footer;
