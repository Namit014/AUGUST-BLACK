import React from "react";
import { PhoneCarousel } from "@/components/ui/phone-mockups-1-utils/phone-carousel";

const exampleImages = [
  {
    src: "/mockup-2.jpg",
    alt: "Find all useful tools to make PCB on conekt",
  },
  {
    src: "/mockup-1.jpg",
    alt: "PCB Made 10x Faster",
  },
  {
    src: "/conekt-hero-center.jpg",
    alt: "Conekt - Design PCB never before",
    objectPosition: "bottom",
  },
];

export default function PhoneMockupBasic() {
  return <PhoneCarousel images={exampleImages} />;
}
