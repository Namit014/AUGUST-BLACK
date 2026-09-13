"use client";
import "./sample-space.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page sample-space">
        <section className="sample-space-hero">
          <div className="sample-space-hero-img">
            <img src="/spotlight/9.jpg.jpeg" alt="TensorCore AI Compute PCB" />
          </div>
          <div className="sample-space-hero-overlay"></div>
          <div className="container">
            <div className="sample-space-hero-header">
              <Copy delay={1} animateOnScroll={false}>
                <h1>TensorCore Carrier</h1>
              </Copy>
            </div>
            <div className="sample-space-content">
              <div className="sample-space-col">
                <Copy delay={1.05} animateOnScroll={false}>
                  <p>16-Layer HDI Architecture</p>
                </Copy>
              </div>
              <div className="sample-space-col">
                <div className="sample-space-content-wrapper">
                  <Copy delay={1.1} animateOnScroll={false}>
                    <p>Edge AI Computing</p>
                  </Copy>
                </div>
                <div className="sample-space-content-wrapper">
                  <Copy delay={1.15} animateOnScroll={false}>
                    <h3>
                      TensorCore Carrier is a flagship 16-layer high-density interconnect
                      PCB engineered for ultra-low latency edge AI acceleration and high-throughput inference.
                    </h3>
                    <h3>
                      Designed with Conekt's AI Copilot, the layout features automated
                      2500-pin BGA breakout, length-matched PCIe Gen 5 lanes, and an optimized
                      power distribution network with zero thermal hotspots.
                    </h3>
                  </Copy>
                </div>
                <div className="sample-space-content-wrapper sample-space-meta">
                  <div className="sample-space-hero-row">
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.2}>
                        <p>Tape-Out Date</p>
                        <p>Q2 2025</p>
                      </Copy>
                    </div>
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.2}>
                        <p>Board Classification</p>
                        <p>16-Layer HDI / Blind &amp; Buried Vias</p>
                        <p>High-Speed Digital &amp; RF</p>
                      </Copy>
                    </div>
                  </div>
                </div>
                <div className="sample-space-content-wrapper sample-space-meta">
                  <div className="sample-space-hero-row">
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.35}>
                        <p>Collaborators</p>
                        <p>Aeroflux Robotics</p>
                        <p>Synapse Silicon Labs</p>
                        <p>Conekt EDA Core</p>
                      </Copy>
                    </div>
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.35}>
                        <p>Verification</p>
                        <p>100% DRC Clean</p>
                        <p>0.2dB Loss @ 28GHz</p>
                      </Copy>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="sample-space-details sample-space-details-1">
          <div className="container">
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <p>Engineering Architecture</p>
              </Copy>
            </div>
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <h3>
                  Routing 64 high-speed differential channels under tight physical
                  constraints traditionally requires weeks of manual tuning.
                  Conekt's AI routing engine resolved pin escapes, matched phase delays,
                  and maintained target 85-ohm differential impedance autonomously.
                </h3>

                <h3>
                  Advanced thermal via arrays and multi-layer copper pours were
                  synthesized directly beneath the primary SoC package, keeping junction
                  temperatures 18°C lower under sustained full-load computing cycles.
                </h3>
              </Copy>
              <div className="sample-space-details-img">
                <img src="/spotlight/6.jpg.jpeg" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="sample-space-details sample-space-details-2">
          <div className="container">
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <p>Technical Specifications</p>
              </Copy>
            </div>
            <div className="sample-space-col">
              <div className="sample-space-content-wrapper sample-space-meta">
                <div className="sample-space-hero-row">
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.1}>
                      <p>Signal Integrity</p>
                      <p>PCIe Gen 5 (32 GT/s)</p>
                      <p>Sub-ps Lane Skew</p>
                      <p>Low Crosstalk &lt; -45dB</p>
                    </Copy>
                  </div>
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.1}>
                      <p>Substrate &amp; Stackup</p>
                      <p>16-Layer Megtron 6</p>
                      <p>Any-Layer Microvia (ALIVH)</p>
                      <p>Controlled Impedance &plusmn;5%</p>
                    </Copy>
                  </div>
                </div>
              </div>
              <div className="sample-space-content-wrapper sample-space-meta">
                <div className="sample-space-hero-row">
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.2}>
                      <p>Power Delivery</p>
                      <p>Multi-Phase Digital VRM</p>
                      <p>0.8V @ 120A Peak Output</p>
                      <p>Ultra-Low ESR Decoupling</p>
                    </Copy>
                  </div>
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.2}>
                      <p>Compliance</p>
                      <p>IPC-6012 Class 3</p>
                      <p>RoHS / REACH Compliant</p>
                      <p>Zero DRC Violations</p>
                    </Copy>
                  </div>
                </div>
              </div>
              <div className="sample-space-details-img">
                <img
                  src="/spotlight/10.jpg.jpeg"
                  alt="TensorCore PCB Microvia Routing Detail"
                />
              </div>
              <Copy delay={0.2}>
                <h3>
                  Every trace, via, and copper plane on the TensorCore carrier
                  was validated through integrated AI simulations before fabrication,
                  ensuring a 100% first-pass prototype yield and flawless hardware reliability.
                </h3>
              </Copy>
            </div>
          </div>
        </section>
        <CTAWindow
          img="/spotlight/9.jpg.jpeg"
          header="Next Design"
          callout="Accelerate your PCB engineering with Conekt"
          description="Build multi-layer, high-speed, and RF boards faster with AI-assisted routing, automatic component search, and instant DRC checks."
        />
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
