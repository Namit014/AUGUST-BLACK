"use client";

import { useState } from "react";
import "./HeroStage.css";

const LEFT_PEDESTALS = [
  {
    id: "pcb",
    position: "left-outer",
    title: "PCB DESIGN",
    subtitle: "Schematic to layout.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="12" x2="13" y2="12" />
        <line x1="9" y1="15" x2="11" y2="15" />
        <circle cx="15" cy="15" r="1.5" fill="currentColor" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="15" x2="4" y2="15" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="15" x2="23" y2="15" />
      </svg>
    ),
  },
  {
    id: "sim",
    position: "left-inner",
    title: "SIMULATION",
    subtitle: "Validate before you build.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

const RIGHT_PEDESTALS = [
  {
    id: "mfg",
    position: "right-inner",
    title: "MANUFACTURING",
    subtitle: "From design to real-world boards.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    id: "collab",
    position: "right-outer",
    title: "COLLABORATION",
    subtitle: "Build together. In real time.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function HeroStage() {
  const [activePedestal, setActivePedestal] = useState(null);

  return (
    <div className="hero-stage">
      {/* Ambient Floor Glow & Lighting Cone */}
      <div className="stage-light-cone" />
      <div className="stage-floor-grid" />

      {/* 5 Pedestals Stage: 2 Left, 1 Center (Our Logo), 2 Right */}
      <div className="stage-container">
        {/* Left Pedestals (2) */}
        <div className="stage-wing stage-wing-left">
          {LEFT_PEDESTALS.map((item) => (
            <div
              key={item.id}
              className={`stage-pedestal pedestal-${item.position} ${
                activePedestal === item.id ? "is-active" : ""
              }`}
              onMouseEnter={() => setActivePedestal(item.id)}
              onMouseLeave={() => setActivePedestal(null)}
            >
              <div className="pedestal-token-wrap">
                <div className="pedestal-token">
                  <div className="token-inner-glow" />
                  <div className="token-icon">{item.icon}</div>
                </div>
                <div className="token-shadow" />
              </div>

              <div className="pedestal-column">
                <div className="column-top">
                  <div className="column-top-ring" />
                </div>
                <div className="column-body" />
              </div>

              <div className="pedestal-info">
                <h4 className="pedestal-title">{item.title}</h4>
                <p className="pedestal-subtitle">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Center Main Elevated Podium with Conekt Logo */}
        <div className="stage-center-podium">
          <div className="center-token-wrapper">
            <div className="center-token-halo" />
            <div className="center-token">
              <div className="token-specular-top" />
              <div className="token-specular-rim" />
              <div className="conekt-emblem-svg">
                {/* Conekt Double-Circle Connected Emblem */}
                <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="conektGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a3e635" />
                      <stop offset="50%" stopColor="#4ade80" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                    <filter id="conektGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  {/* Connection Bar */}
                  <rect x="25" y="24" width="50" height="12" rx="6" fill="url(#conektGrad)" filter="url(#conektGlow)" />
                  {/* Left Circle */}
                  <circle cx="28" cy="30" r="18" fill="none" stroke="url(#conektGrad)" strokeWidth="10" filter="url(#conektGlow)" />
                  {/* Right Circle */}
                  <circle cx="72" cy="30" r="18" fill="none" stroke="url(#conektGrad)" strokeWidth="10" filter="url(#conektGlow)" />
                  {/* Center Cutout Holes */}
                  <circle cx="28" cy="30" r="9" fill="#0f1411" />
                  <circle cx="72" cy="30" r="9" fill="#0f1411" />
                </svg>
              </div>
            </div>
            <div className="center-token-shadow" />
          </div>

          <div className="center-podium-column">
            <div className="podium-top-deck">
              <div className="podium-ripple ripple-1" />
              <div className="podium-ripple ripple-2" />
              <div className="podium-ripple ripple-3" />
              <div className="podium-top-core" />
            </div>
            <div className="podium-body">
              <div className="podium-vertical-highlight" />
            </div>
          </div>
        </div>

        {/* Right Pedestals (2) */}
        <div className="stage-wing stage-wing-right">
          {RIGHT_PEDESTALS.map((item) => (
            <div
              key={item.id}
              className={`stage-pedestal pedestal-${item.position} ${
                activePedestal === item.id ? "is-active" : ""
              }`}
              onMouseEnter={() => setActivePedestal(item.id)}
              onMouseLeave={() => setActivePedestal(null)}
            >
              <div className="pedestal-token-wrap">
                <div className="pedestal-token">
                  <div className="token-inner-glow" />
                  <div className="token-icon">{item.icon}</div>
                </div>
                <div className="token-shadow" />
              </div>

              <div className="pedestal-column">
                <div className="column-top">
                  <div className="column-top-ring" />
                </div>
                <div className="column-body" />
              </div>

              <div className="pedestal-info">
                <h4 className="pedestal-title">{item.title}</h4>
                <p className="pedestal-subtitle">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Bottom Tagline */}
      <div className="stage-bottom-tagline">
        <p>BUILT FOR A MORE CONNECTED TOMORROW</p>
        <div className="stage-bottom-line" />
      </div>
    </div>
  );
}
