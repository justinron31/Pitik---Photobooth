"use client";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useRef, useState, useEffect, useId } from "react";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

export default function Popover() {
  const uniqueId = useId();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="relative flex items-center justify-center">
        <motion.button
          key="button"
          layoutId={`popover-${uniqueId}`}
          className="px-4 py-2 text-sm font-lato font-black text-[#444041]
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
          onClick={openMenu}
        >
          <motion.span
            layoutId={`popover-label-${uniqueId}`}
            className="tracking-widest"
          >
            ?
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={formContainerRef}
              layoutId={`popover-${uniqueId}`}
              className="absolute h-[200px] w-[364px] overflow-hidden bg-[#DBDBDB] border-4 border-[#444041]"
            >
              <div className="flex h-full flex-col p-4">
                <motion.h3
                  layoutId={`popover-label-${uniqueId}`}
                  className="mb-2 text-sm font-black  tracking-widest text-[#444041]"
                >
                  Pitik Booth Instructions
                </motion.h3>
                <div className="text-sm text-[#444041] space-y-2 font-bold font-lato">
                  <p>1. Select your preferred layout</p>
                  <p>2. Take your photo</p>
                  <p>3. Customize your design</p>
                  <p>4. Download your creation</p>
                </div>
                <div className="mt-auto flex justify-end">
                  <button
                    type="button"
                    className="px-2 py-1 text-sm font-lato font-black text-[#444041]
                             relative overflow-hidden bg-[#DBDBDB]
                             border-2 border-[#444041]
                             before:absolute before:inset-0 before:bg-black/5
                             hover:bg-[#CECECE]
                             hover:shadow-[inset_0_4px_0_rgba(0,0,0,0.2),inset_-2px_-2px_0_rgba(255,255,255,0.3),inset_2px_2px_0_rgba(0,0,0,0.15)]
                             active:translate-y-1
                             active:shadow-[inset_0_4px_0_rgba(0,0,0,0.3),inset_-3px_-3px_0_rgba(255,255,255,0.2),inset_3px_3px_0_rgba(0,0,0,0.2)]
                             active:bg-[#BEBEBE]"
                    onClick={closeMenu}
                  >
                    Aight!
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
