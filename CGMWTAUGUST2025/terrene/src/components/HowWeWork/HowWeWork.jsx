"use client";
import "./HowWeWork.css";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Copy from "../Copy/Copy";

gsap.registerPlugin(ScrollTrigger);

const HowWeWork = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const stepsRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggersRef = useRef([]);

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useGSAP(
    () => {
      if (!stepsRef.current) return;

      const steps = stepsRef.current.querySelectorAll(".how-we-work-step");
      gsap.set(steps, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: stepsRef.current,
        start: "top 75%",
        once: true,
        animation: gsap.to(steps, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: -0.1,
          ease: "none",
        }),
      });
    },
    { scope: stepsRef }
  );

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!container || !header || !cards) return;

    if (!isMobile) {
      const mainTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        endTrigger: cards,
        end: "bottom bottom",
        pin: header,
        pinSpacing: false,
      });
      scrollTriggersRef.current.push(mainTrigger);

      const cardElements = cards.querySelectorAll(".how-we-work-card");

      cardElements.forEach((card, index) => {
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
          onLeave: () => {
            if (index < cardElements.length - 1) {
              setActiveStep(index + 1);
            }
          },
          onLeaveBack: () => {
            if (index > 0) {
              setActiveStep(index - 1);
            }
          },
        });
        scrollTriggersRef.current.push(cardTrigger);
      });
    }

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [isMobile]);

  return (
    <div className="how-we-work" ref={containerRef}>
      <div className="how-we-work-col how-we-work-header" ref={headerRef}>
        <div className="container">
          <div className="how-we-work-header-content">
            <div className="how-we-work-header-callout">
              <Copy delay={0.1}>
                <p>About Founders</p>
              </Copy>
            </div>
            <Copy delay={0.15}>
              <h3>
                Meet the minds behind Conekt, bridging engineering and education 
                to revolutionize physical product creation.
              </h3>
            </Copy>
            <div className="how-we-work-steps" ref={stepsRef}>
              <div
                className={`how-we-work-step ${
                  activeStep === 0 ? "active" : ""
                }`}
              >
                <p className="how-we-work-step-index">Er. Anjum</p>
              </div>
              <div
                className={`how-we-work-step ${
                  activeStep === 1 ? "active" : ""
                }`}
              >
                <p className="how-we-work-step-index">Namit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="how-we-work-col how-we-work-cards" ref={cardsRef}>
        <div className="how-we-work-card">
          <div className="how-we-work-card-img">
            <img src="/spotlight/8.jpg.jpeg" alt="Er. Anjum Mujawar" />
          </div>
          <div className="how-we-work-card-copy">
            <div className="how-we-work-card-index-label">
              <h3>Er. Anjum Mujawar</h3>
            </div>
            <p className="md">
              Er. Anjum Mujawar brings over 20 years of expertise in Embedded Systems, AI, and IoT. As an educator, technologist, and CTO at Vidyalankar Polytechnic, he bridges the gap between academia and industry innovation.
              <br /><br />
              With a strong focus on hands-on product development, he actively mentors startups and drives applied AI research in healthcare.
              <br /><br />
              Contact: <a href="mailto:anjum.mujawar@vpt.edu.in" style={{textDecoration: 'underline'}}>anjum.mujawar@vpt.edu.in</a><br />
              LinkedIn: <a href="https://linkedin.com/in/anjum-mujawar" target="_blank" rel="noreferrer" style={{textDecoration: 'underline'}}>linkedin.com/in/anjum-mujawar</a>
            </p>
          </div>
        </div>
        <div className="how-we-work-card">
          <div className="how-we-work-card-img">
            <img src="/spotlight/8.jpg.jpeg" alt="Namit Jadhav" />
          </div>
          <div className="how-we-work-card-copy">
            <div className="how-we-work-card-index-label">
              <h3>Namit Jadhav</h3>
            </div>
            <p className="md">
              Namit Jadhav is a tech entrepreneur and engineering student passionate about building scalable products. By combining engineering, design, and business strategy, he turns ambitious ideas into real-world solutions.
              <br /><br />
              Namit has collaborated with diverse organizations like YANTRAA and Colab.tech to deliver practical, impactful technology that solves meaningful problems.
              <br /><br />
              Contact: <a href="mailto:contact@namit.engineer" style={{textDecoration: 'underline'}}>contact@namit.engineer</a><br />
              LinkedIn: <a href="https://www.linkedin.com/in/namitjadhav/" target="_blank" rel="noreferrer" style={{textDecoration: 'underline'}}>linkedin.com/in/namitjadhav</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;
