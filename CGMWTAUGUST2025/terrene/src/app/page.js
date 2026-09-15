"use client";
import "./index.css";
import "./preloader.css";
import { useRef, useState, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import FeaturedProjects from "@/components/FeaturedProjects/FeaturedProjects";
import ClientReviews from "@/components/ClientReviews/ClientReviews";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import Spotlight from "@/components/Spotlight/Spotlight";
import Hero from "@/components/Hero/Hero";
let isInitialLoad = true;
gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function Home() {
  const tagsRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      if (loaderAnimating) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, loaderAnimating]);

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: {
        ease: "hop",
      },
    });

    if (showPreloader) {
      setLoaderAnimating(true);

      // Setup initial state
      gsap.set("#pt-1 > h1", { y: "120%", x: "0%" });
      gsap.set("#pt-2 > h1", { x: "120%", y: "0%" });
      gsap.set("#pt-3 > h1", { y: "-120%", x: "0%" });
      gsap.set("#pt-4 > .intro-logo", { x: "-120%", y: "0%" });
      
      // Sequence
      // 1. EDA made (Bottom to Top)
      tl.to("#pt-1 > h1", { y: "0%", duration: 0.4 })
        .to("#pt-1 > h1", { y: "-120%", duration: 0.3, delay: 0.15 });

      // 2. easy (Right to Left)
      tl.to("#pt-2 > h1", { x: "0%", duration: 0.4 }, "-=0.1")
        .to("#pt-2 > h1", { x: "-120%", duration: 0.3, delay: 0.15 });

      // 3. by (Top to Bottom)
      tl.to("#pt-3 > h1", { y: "0%", duration: 0.4 }, "-=0.1")
        .to("#pt-3 > h1", { y: "120%", duration: 0.3, delay: 0.15 });

      // 4. Logo (Left to Right)
      tl.to("#pt-4 > .intro-logo", { x: "0%", duration: 0.5 }, "-=0.1")
        .to("#pt-4 > .intro-logo", { x: "120%", duration: 0.4, delay: 0.3 });

      // Reveal site
      tl.to(
        ".block",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          stagger: 0.1,
          onStart: () => {
            gsap.to(".hero-img", { scale: 1, duration: 2, ease: "hop" });
          },
          onComplete: () => {
            gsap.set(".loader", { pointerEvents: "none" });
            setLoaderAnimating(false);
          },
        },
        "-=0.2"
      );
    }
  }, [showPreloader]);

  useGSAP(
    () => {
      if (!tagsRef.current) return;

      const tags = tagsRef.current.querySelectorAll(".what-we-do-tag");
      gsap.set(tags, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: tagsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(tags, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: tagsRef }
  );

  return (
    <>
      {showPreloader && (
        <div className="loader">
          <div className="overlay">
            <div className="block"></div>
            <div className="block"></div>
          </div>
          <div className="preloader-text-wrapper">
            <div className="p-text-clip" id="pt-1">
              <h1>EDA made</h1>
            </div>
            <div className="p-text-clip" id="pt-2">
              <h1>easy</h1>
            </div>
            <div className="p-text-clip" id="pt-3">
              <h1>by</h1>
            </div>
            <div className="p-text-clip" id="pt-4">
              <div className="intro-logo">
                <img src="/home/image.png" alt="Conekt" className="preloader-logo-img" />
              </div>
            </div>
          </div>
        </div>
      )}
      <Nav />
      <Hero />

      {/* Stats Section - Hidden as requested
      <section className="hero-stats-section">
        <div className="container">
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.1}>
                  <h2>225+</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.15}>
                  <p>Completed PCB Tape-Outs</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.2}>
                  <h2>10x</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.25}>
                  <p>Faster Routing Iterations</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.3}>
                  <h2>100k+</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.35}>
                  <p>Verified AI Component Models</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.4}>
                  <h2>99.4%</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.45}>
                  <p>First-Pass Fabrication Success</p>
                </Copy>
              </div>
            </div>
          </div>
      </section>
      */}
      <section className="what-we-do">
        <div className="container">
          <div className="what-we-do-header">
            <Copy delay={0.1}>
              <h1>
                <span className="spacer">&nbsp;</span>
                At Conekt, we build with intelligence and precision, providing an AI EDA
                that reduces design complications to absolute zero.
              </h1>
            </Copy>
          </div>
          <div className="what-we-do-content">
            <div className="what-we-do-col">
              <Copy delay={0.1}>
                <p>How we work</p>
              </Copy>

              <Copy delay={0.15}>
                <p className="lg">
                  We approach each circuit with an AI-first mindset. Every board is
                  shaped through intelligent automation, seamless routing, and deep analysis. What
                  remains is an optimized PCB, designed to perform and built to scale.
                </p>
              </Copy>
            </div>
            <div className="what-we-do-col">
              <div className="what-we-do-tags" ref={tagsRef}>
                <div className="what-we-do-tag">
                  <h3>AI-Powered</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Automated</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Intuitive</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Precision</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Fast Routing</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Low Complexity</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Spotlight />
      {/* 
      <section className="featured-projects-container">
        <div className="container">
          <div className="featured-projects-header-callout">
            <Copy delay={0.1}>
              <p>Featured work</p>
            </Copy>
          </div>
          <div className="featured-projects-header">
            <Copy delay={0.15}>
              <h2>A selection of recent studies and completed spaces</h2>
            </Copy>
          </div>
        </div>
        <FeaturedProjects />
      </section>
      */}
      <section className="client-reviews-container">
        <div className="container">
          <div className="client-reviews-header-callout">
            <p>Voices from Hardware Engineers</p>
          </div>
          <ClientReviews />
        </div>
      </section>
      <section className="gallery-callout">
        <div className="container">
          <div className="gallery-callout-col">
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-1">
                <img src="/spotlight/4.jpg.jpeg" alt="" />
              </div>
              <div className="gallery-callout-img gallery-callout-img-2">
                <img src="/spotlight/8.jpg.jpeg" alt="" />
                <div className="gallery-callout-img-content">
                  <h3>800+</h3>
                  <p>PCB Layouts</p>
                </div>
              </div>
            </div>
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-3">
                <img src="/spotlight/5.jpg.jpeg" alt="" />
              </div>
              <div className="gallery-callout-img gallery-callout-img-4">
                <img src="/spotlight/6.jpg.jpeg" alt="" />
              </div>
            </div>
          </div>
          <div className="gallery-callout-col">
            <div className="gallery-callout-copy">
              <Copy delay={0.1}>
                <h3>
                  Secure your spot in the future of hardware engineering. Join our exclusive waitlist today to be among the first to experience our revolutionary AI-powered PCB design platform.
                </h3>
              </Copy>
              <AnimatedButton label="Join Waitlist" onClick={() => window.dispatchEvent(new Event("openWaitlist"))} />
            </div>
          </div>
        </div>
      </section>
      <CTAWindow
        img="/spotlight/8.jpg.jpeg"
        buttonLabel="Join Waitlist"
        onButtonClick={() => window.dispatchEvent(new Event("openWaitlist"))}
        callout="PCBs designed in record time"
        description="Our approach is guided by intelligent automation and precision, allowing every engineer to build hardware with zero friction."
      />
      <ConditionalFooter />
    </>
  );
}
