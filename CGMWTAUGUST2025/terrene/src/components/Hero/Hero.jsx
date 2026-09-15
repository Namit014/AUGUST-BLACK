import React, { useRef } from 'react';
import './Hero.css';
import AnimatedButton from '../AnimatedButton/AnimatedButton';
import PhoneMockupBasic from '../ui/phone-mockups-1';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".hero-anim", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2
    });
  }, { scope: containerRef });

  return (
    <section className="bank-hero" ref={containerRef}>
      <div className="bank-hero-content">

        <h1 className="bank-title hero-anim">
          <span className="title-line">
            Bring intelligence to your 
            <span className="green-pill">
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
            </span> 
            EDA workflow.
          </span>
          <span className="title-line">
            Conekt, a smarter way to 
            <span className="avatars-inline">
              <div className="avatar a1"></div>
              <div className="avatar a2"></div>
              <div className="avatar a3"></div>
            </span>
            design hardware.
          </span>
        </h1>

        <p className="bank-subtitle hero-anim">
          Automated schematic capture, intelligent component routing, and verified hardware models all in one AI-driven EDA workspace.
        </p>

        <div className="join-waitlist-wrapper hero-anim" style={{ position: "relative", zIndex: 30 }}>
          <AnimatedButton 
            label="Join Waitlist" 
            animate={false} 
            onClick={() => window.dispatchEvent(new Event("openWaitlist"))} 
          />
        </div>

        <div style={{ position: "relative", width: "100%", zIndex: 10, marginTop: "80px", marginBottom: "-130px" }}>
          <PhoneMockupBasic />
        </div>

      </div>

      <div className="bank-ticker">
        <div className="ticker-content">
          <div className="ticker-group">
            <span>AI PCB Routing</span>
            <span className="sun-icon">✹</span>
            <span>Intelligent EDA</span>
            <span className="sun-icon">✹</span>
            <span>Automated Schematics</span>
            <span className="sun-icon">✹</span>
            <span>Component Discovery</span>
            <span className="sun-icon">✹</span>
            <span>First-Pass Success</span>
            <span className="sun-icon">✹</span>
          </div>
          <div className="ticker-group">
            <span>AI PCB Routing</span>
            <span className="sun-icon">✹</span>
            <span>Intelligent EDA</span>
            <span className="sun-icon">✹</span>
            <span>Automated Schematics</span>
            <span className="sun-icon">✹</span>
            <span>Component Discovery</span>
            <span className="sun-icon">✹</span>
            <span>First-Pass Success</span>
            <span className="sun-icon">✹</span>
          </div>
          <div className="ticker-group">
            <span>AI PCB Routing</span>
            <span className="sun-icon">✹</span>
            <span>Intelligent EDA</span>
            <span className="sun-icon">✹</span>
            <span>Automated Schematics</span>
            <span className="sun-icon">✹</span>
            <span>Component Discovery</span>
            <span className="sun-icon">✹</span>
            <span>First-Pass Success</span>
            <span className="sun-icon">✹</span>
          </div>
          <div className="ticker-group">
            <span>AI PCB Routing</span>
            <span className="sun-icon">✹</span>
            <span>Intelligent EDA</span>
            <span className="sun-icon">✹</span>
            <span>Automated Schematics</span>
            <span className="sun-icon">✹</span>
            <span>Component Discovery</span>
            <span className="sun-icon">✹</span>
            <span>First-Pass Success</span>
            <span className="sun-icon">✹</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
