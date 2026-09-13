"use client";
import "./studio.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page studio">
        <section className="studio-hero">
          <div className="container">
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <p>
                  We see circuit design as the bedrock of modern innovation.
                  Conekt bridges hardware engineering and artificial intelligence,
                  built to eliminate routing friction and accelerate physical invention.
                </p>
              </Copy>
            </div>
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <h2>
                  Our platform exists to empower engineering teams to create
                  complex, high-reliability PCBs with unprecedented velocity. Every board
                  begins with an idea and ends with flawless silicon execution.
                </h2>
              </Copy>
              <div className="studio-hero-hero-img">
                <img src="/studio/about-hero.png" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="more-facts">
          <div className="container">
            <div className="more-facts-items">
              <div className="fact">
                <Copy delay={0.1}>
                  <p>Traces Routed</p>
                  <h2>120k+</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.2}>
                  <p>Verified Parts</p>
                  <h2>500k+</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.3}>
                  <p>Routing Precision</p>
                  <h2>0.01mm</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.4}>
                  <p>DRC Pass Rate</p>
                  <h2>99.4%</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.5}>
                  <p>Faster Tape-Out</p>
                  <h2>10x</h2>
                </Copy>
              </div>
            </div>
          </div>
        </section>
        <section className="how-we-work-container">
          <div className="container">
            <HowWeWork />
          </div>
        </section>
        <CTAWindow
          img="/spotlight/9.jpg.jpeg"
          header="CONEKT AI"
          callout="Engineered for next-generation hardware"
          description="Explore how our intelligent EDA environment automates routing, placement, and validation for high-performance hardware teams."
        />
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
