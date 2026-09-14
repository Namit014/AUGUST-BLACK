"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./StheroHero.css";

export default function StheroHero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const headerRef = useRef(null);
  const heroImgRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext("2d");

    const setCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      context.scale(pixelRatio, pixelRatio);
    };
    
    setCanvasSize();

    const frameCount = 207;
    const currentFrame = (index) =>
      `/sthero/frames/frame_${(index + 1).toString().padStart(4, "0")}.jpg`;

    let images = [];
    let videoFrames = { frame: 0 };
    let imagesToLoad = frameCount;

    const render = () => {
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      context.clearRect(0, 0, canvasWidth, canvasHeight);

      const img = images[videoFrames.frame];
      if (img && img.complete && img.naturalWidth > 0) {
        const imageAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, drawX, drawY;

        if (imageAspect > canvasAspect) {
          drawHeight = canvasHeight;
          drawWidth = drawHeight * imageAspect;
          drawX = (canvasWidth - drawWidth) / 2;
          drawY = 0;
        } else {
          drawWidth = canvasWidth;
          drawHeight = drawWidth / imageAspect;
          drawX = 0;
          drawY = (canvasHeight - drawHeight) / 2;
        }

        context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      }
    };

    const onLoad = () => {
      imagesToLoad--;
      if (!imagesToLoad) {
        render();
        setupScrollTrigger();
      }
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = function () {
        onLoad.call(this);
      };
      img.src = currentFrame(i);
      images.push(img);
    }

    const setupScrollTrigger = () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 7}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          const animationProgress = Math.min(progress / 0.9, 1);
          const targetFrame = Math.round(animationProgress * (frameCount - 1));
          videoFrames.frame = targetFrame;
          render();
          
          if (progress <= 0.25) {
            const zProgress = progress / 0.25;
            const translateZ = zProgress * -500;

            let opacity = 1;
            if (progress >= 0.2) {
              const fadeProgress = Math.min((progress - 0.2) / (0.25 - 0.2), 1);
              opacity = 1 - fadeProgress;
            }

            gsap.set(headerRef.current, {
              transform: `translate(-50%, -50%) translateZ(${translateZ}px)`,
              opacity,
            });
          } else {
            gsap.set(headerRef.current, { opacity: 0 });
          }

          if (progress < 0.6) {
            gsap.set(heroImgRef.current, {
              transform: "translateZ(1000px)",
              opacity: 0,
            });
          } else if (progress >= 0.6 && progress <= 0.9) {
            const imgProgress = (progress - 0.6) / (0.9 - 0.6);
            const translateZ = 1000 - imgProgress * 1000;

            let opacity = 0;
            if (progress <= 0.8) {
              const opacityProgress = (progress - 0.6) / (0.8 - 0.6);
              opacity = opacityProgress;
            } else {
              opacity = 1;
            }

            gsap.set(heroImgRef.current, {
              transform: `translateZ(${translateZ}px)`,
              opacity,
            });
          } else {
            gsap.set(heroImgRef.current, {
              transform: "translateZ(0px)",
              opacity: 1,
            });
          }
        },
      });
    };

    const handleResize = () => {
      setCanvasSize();
      render();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, { scope: containerRef });

  return (
    <section className="sthero-hero" ref={containerRef}>
      <canvas ref={canvasRef}></canvas>

      <div className="hero-content">
        <div className="header" ref={headerRef}>
          <h1>From idea to hardware, in one place.</h1>
          <p>Trusted by hardware engineers</p>
          <div className="client-logos">
            <div className="client-logo">
              <img src="/sthero/client-logo-1.png" alt="" />
            </div>
            <div className="client-logo">
              <img src="/sthero/client-logo-2.png" alt="" />
            </div>
            <div className="client-logo">
              <img src="/sthero/client-logo-3.png" alt="" />
            </div>
            <div className="client-logo">
              <img src="/sthero/client-logo-4.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-img-container">
        <div className="hero-img" ref={heroImgRef}>
          <img src="/sthero/dashboard.png" alt="Conekt Dashboard" />
        </div>
      </div>
    </section>
  );
}
