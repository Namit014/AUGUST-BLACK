"use client";

import React, { useState } from "react";
import { Iphone16ProDark } from "../iphone-16-pro-dark";

export function PhoneCarousel({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredPos, setHoveredPos] = useState(null);

  const total = images.length || 3;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const centerIndex = activeIndex % total;
  const leftIndex = (activeIndex - 1 + total) % total;
  const rightIndex = (activeIndex + 1) % total;

  const phoneConfigs = [
    {
      position: "left",
      index: leftIndex,
      isCenter: false,
      style: {
        position: "absolute",
        left: "50%",
        top: "55%",
        transform: hoveredPos === "left" 
          ? "translateX(calc(-50% - 120px)) translateY(-52%) scale(0.98)" 
          : "translateX(calc(-50% - 190px)) translateY(-50%) scale(0.88)",
        zIndex: hoveredPos === "left" ? 25 : 1,
        filter: hoveredPos === "left" ? "brightness(1)" : "brightness(0.4)",
        opacity: hoveredPos === "left" ? 1 : 0.85,
        cursor: "pointer",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      onMouseEnter: () => {
        setHoveredPos("left");
      },
      onMouseLeave: () => setHoveredPos(null),
      onClick: handlePrev,
    },
    {
      position: "right",
      index: rightIndex,
      isCenter: false,
      style: {
        position: "absolute",
        left: "50%",
        top: "55%",
        transform: hoveredPos === "right" 
          ? "translateX(calc(-50% + 120px)) translateY(-52%) scale(0.98)" 
          : "translateX(calc(-50% + 190px)) translateY(-50%) scale(0.88)",
        zIndex: hoveredPos === "right" ? 25 : 1,
        filter: hoveredPos === "right" ? "brightness(1)" : "brightness(0.4)",
        opacity: hoveredPos === "right" ? 1 : 0.85,
        cursor: "pointer",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      onMouseEnter: () => {
        setHoveredPos("right");
      },
      onMouseLeave: () => setHoveredPos(null),
      onClick: handleNext,
    },
    {
      position: "center",
      index: centerIndex,
      isCenter: true,
      style: {
        position: "absolute",
        left: "50%",
        top: "55%",
        transform: hoveredPos === "center" 
          ? "translateX(-50%) translateY(-53%) scale(1.025)" 
          : "translateX(-50%) translateY(-50%) scale(1)",
        zIndex: 20,
        filter: "brightness(1)",
        opacity: 1,
        cursor: "pointer",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      onMouseEnter: () => setHoveredPos("center"),
      onMouseLeave: () => setHoveredPos(null),
      onClick: () => { },
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "900px",
        height: "460px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        userSelect: "none",
      }}
    >
      {phoneConfigs.map(({ position, index, isCenter, style, onMouseEnter, onMouseLeave, onClick }) => {
        const item = images[index];
        const isHovered = hoveredPos === position;

        return (
          <div
            key={`${position}-${index}`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={style}
          >
            <div
              style={{
                width: "282px",
                height: "578px",
                position: "relative",
                transition: "transform 0.4s ease",
              }}
            >
              <div style={{ transform: "scale(0.736)", transformOrigin: "top left", filter: isCenter ? (isHovered ? "drop-shadow(0 35px 70px rgba(0, 0, 0, 0.98)) drop-shadow(0 0 35px rgba(204, 255, 0, 0.12))" : "drop-shadow(0 28px 60px rgba(0, 0, 0, 0.95))") : "drop-shadow(0 18px 45px rgba(0, 0, 0, 0.85))" }}>
                <Iphone16ProDark>
                  {item?.src && (
                    <img
                      src={item.src}
                      alt={item.alt || "Mockup"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: item.objectPosition || "center",
                        display: "block",
                      }}
                    />
                  )}
                </Iphone16ProDark>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
