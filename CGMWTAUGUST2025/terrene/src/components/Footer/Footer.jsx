"use client";
import "./Footer.css";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useViewTransition } from "@/hooks/useViewTransition";
import Copy from "../Copy/Copy";

import { RiLinkedinBoxLine } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { RiDribbbleLine } from "react-icons/ri";
import { RiYoutubeLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { navigateWithTransition } = useViewTransition();
  const socialIconsRef = useRef(null);

  useGSAP(
    () => {
      if (!socialIconsRef.current) return;

      const icons = socialIconsRef.current.querySelectorAll(".icon");
      gsap.set(icons, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: socialIconsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(icons, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: -0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: socialIconsRef }
  );

  return (
    <div className="footer">
      <div className="footer-meta">
        <div className="container footer-meta-header">
          <div className="footer-meta-col">
            <div className="footer-meta-block">
              {/* Logo removed as requested */}
              <Copy delay={0.2}>
                <h2>Hardware design made intelligent, seamless, and precise.</h2>
              </Copy>
            </div>
          </div>
          <div className="footer-meta-col">
            <div className="footer-nav-links">
              <Copy delay={0.1}>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/");
                  }}
                >
                  <h3>Index</h3>
                </a>
                <a
                  href="/studio"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/studio");
                  }}
                >
                  <h3>About</h3>
                </a>
                {/* 
                <a
                  href="/spaces"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/spaces");
                  }}
                  style={{ display: 'none' }}
                >
                  <h3>Designs</h3>
                </a>
                <a
                  href="/sample-space"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/sample-space");
                  }}
                  style={{ display: 'none' }}
                >
                  <h3>Case Study</h3>
                </a>
                <a
                  href="/blueprints"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/blueprints");
                  }}
                  style={{ display: 'none' }}
                >
                  <h3>Gallery</h3>
                </a>
                */}
                <a
                  href="/connect"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/connect");
                  }}
                >
                  <h3>Connect</h3>
                </a>
              </Copy>
            </div>
          </div>
        </div>
        <div className="container footer-socials">
          <div className="footer-meta-col">
            {/* 
            <div className="footer-socials-wrapper" ref={socialIconsRef}>
              <div className="icon">
                <RiLinkedinBoxLine />
              </div>
              <div className="icon">
                <RiInstagramLine />
              </div>
              <div className="icon">
                <RiDribbbleLine />
              </div>
              <div className="icon">
                <RiYoutubeLine />
              </div>
            </div>
            */}
          </div>
          <div className="footer-meta-col">
            <Copy delay={0.1}>
              <p>
                We believe the future of electronics lies in intelligent automation,
                empowering engineers to design and scale next-generation hardware without friction.
              </p>
            </Copy>
          </div>
        </div>
      </div>
      <div className="footer-outro">
        <div className="container">
          <div className="footer-header">
            <img src="/home/image.png" alt="Conekt Logo" />
          </div>
          <div className="footer-copyright">
            <p>
              Proudly made in India — <span>Conekt</span>
            </p>
            <p>Empowering PCB Engineering with AI.</p>
            <p>All rights reserved &copy; 2026 Conekt AI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
