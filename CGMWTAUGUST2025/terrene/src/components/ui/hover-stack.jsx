"use client";

import { useEffect, useMemo, useState } from "react";

const PRESET_ROTATIONS = [-8, 4, -3, 5, -4, 6, 2];

const DEFAULT_CARDS = [
  { quote: "A must-have for anyone looking to save time and boost productivity.", tag: "Efficiency", bg: "#E4FF1A", accent: "text-[#1A1A1A]" },
  { quote: "This tech has completely streamlined my daily tasks.", tag: "Workflow", bg: "#DD1155", accent: "text-white" },
  { quote: "Innovative and powerful, yet so easy to use!", tag: "Simplicity", bg: "#FF5714", accent: "text-[#1A1A1A]" },
  { quote: "It made everything smoother. Highly recommend!", tag: "Reliability", bg: "#E980FC", accent: "text-[#1A1A1A]" },
  { quote: "Fast, reliable, and user-friendly. Exactly what I needed.", tag: "Speed", bg: "#67D6A3", accent: "text-[#1A1A1A]" },
  { quote: "I can't imagine my workflow without it now. Simply amazing!", tag: "Impact", bg: "#3454D1", accent: "text-white" },
  { quote: "Performance is a game changer. So much smoother now.", tag: "Performance", bg: "#B98CFF", accent: "text-[#1A1A1A]" },
];

function ArrowUpRight({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/** Shared card footer: divider + "explore" pill + index number. */
function CardFooter({ index }) {
  return (
    <div className="relative z-[2] flex flex-col gap-3.5 mt-auto">
      <div className="h-[1px] w-full bg-current opacity-20" />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
            <ArrowUpRight className="h-4 w-4" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
            EXPLORE
          </span>
        </div>
        <span className="text-[11px] font-semibold uppercase tabular-nums tracking-[0.16em] opacity-60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function HoverStack({
  cards = DEFAULT_CARDS,
  cardWidth = 255,
  cardHeight = 360,
  overlap = 88,
  hoverLift = 28,
  pushDistance = 200,
  spread = 22,
  rotation = 7,
  duration = 0.45,
  accentColor = "transparent",
  className = "",
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const onChange = (event) => {
        setReduceMotion(event.matches);
        if (event.matches) setActiveIndex(null);
      };
      setReduceMotion(mq.matches);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
  }, []);

  const preparedCards = useMemo(() => {
    const rotationScale = rotation / 7;

    return cards.map((card, index) => {
      const presetRotation =
        PRESET_ROTATIONS[index % PRESET_ROTATIONS.length];

      const baseX = index * overlap;

      return {
        ...card,
        _rotation: presetRotation * rotationScale,
        _baseX: baseX,
        _baseZ: index + 1,
      };
    });
  }, [cards, overlap, rotation]);

  const getCardStyle = (card, index) => {
    const isActive = activeIndex === index;
    const hasActive = activeIndex !== null;

    let x = card._baseX;
    let y = 0;
    let rotate = card._rotation;
    let zIndex = card._baseZ;
    let scale = 1;

    if (reduceMotion) {
      if (isActive) zIndex = 999;
      return {
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(1)`,
        zIndex,
        transition: "none",
        backgroundColor: card.bg,
      };
    }

    let boxShadow = "0 10px 28px rgba(0,0,0,0.18)";

    if (hasActive) {
      if (index < activeIndex) {
        x -= pushDistance;
        y -= spread * 0.35;
      } else if (index > activeIndex) {
        x += pushDistance;
        y += spread * 0.35;
      }

      if (isActive) {
        x = card._baseX;
        y = -hoverLift;
        rotate = 0;
        zIndex = 999;
        scale = 1.04;
        boxShadow = "0 24px 48px rgba(0,0,0,0.35)";
      }
    }

    const activeMs = Math.max(0, duration) * 1000;
    const transition = isActive
      ? `transform ${activeMs}ms cubic-bezier(0.22, 1.6, 0.32, 1), box-shadow ${activeMs * (900 / 700)}ms cubic-bezier(0.22, 1.6, 0.32, 1)`
      : hasActive
        ? `transform ${activeMs}ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow ${activeMs}ms cubic-bezier(0.22, 1, 0.36, 1)`
        : `transform ${activeMs * (480 / 700)}ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow ${activeMs * (380 / 700)}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    return {
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
      minWidth: `${cardWidth}px`,
      minHeight: `${cardHeight}px`,
      transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`,
      zIndex,
      transition,
      backgroundColor: card.bg,
      boxShadow,
    };
  };

  const totalWidth =
    preparedCards.length > 0
      ? preparedCards[preparedCards.length - 1]._baseX + cardWidth
      : cardWidth;

  if (!hasMounted) {
    return null;
  }

  return (
    <div className={`relative w-full flex justify-center items-center py-2 overflow-visible ${className}`}>
      <div
        className="relative"
        style={{
          width: `${totalWidth}px`,
          height: `${cardHeight + (reduceMotion ? 0 : hoverLift) + 16}px`,
          minHeight: `${cardHeight + 20}px`,
        }}
      >
        {preparedCards.map((card, index) => (
          <div
            key={card.id ?? index}
            className={`absolute left-0 top-0 flex flex-col justify-between origin-[center_center] cursor-pointer select-none rounded-[22px] border border-black/10 p-6 will-change-transform ${card.accent || ""}`}
            style={getCardStyle(card, index)}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div />

            <div className="relative z-[2] flex flex-1 items-center my-auto">
              <p className="m-0 max-w-[95%] text-[1.4rem] font-medium leading-[1.16] tracking-[-0.025em]">
                “{card.quote}”
              </p>
            </div>

            <CardFooter index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HoverStack;
