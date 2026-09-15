"use client";

import HoverStack from "@/components/ui/hover-stack";

export default function HoverStackDemo() {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-[4vw] overflow-hidden bg-[#fff9ec] px-4">
      <div className="flex w-full flex-col items-center text-center text-[#1a1a1a]">
        <h1
          style={{ fontWeight: 300 }}
          className="text-[5.5vw] tracking-tight max-[1025px]:text-[7vw] max-md:text-[9vw]"
        >
          Hover Stack Cards
        </h1>
      </div>

      <HoverStack />
    </section>
  );
}
