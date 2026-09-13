"use client";
import "./WaitlistModal.css";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { IoMdClose } from "react-icons/io";
import AnimatedButton from "../AnimatedButton/AnimatedButton";

const WaitlistModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profession: "",
  });

  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("openWaitlist", handleOpen);
    return () => window.removeEventListener("openWaitlist", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(modalRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.2)",
        delay: 0.1,
      });
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(modalRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      
      // Reset form after close animation
      if (isSubmitted) {
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", email: "", profession: "" });
        }, 300);
      }
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <div 
      className={`waitlist-modal-overlay ${isOpen ? "open" : ""}`} 
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) setIsOpen(false);
      }}
    >
      <div className="waitlist-modal" ref={modalRef} style={{ opacity: 0 }}>
        <button 
          className="waitlist-modal-close" 
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        >
          <IoMdClose />
        </button>

        {!isSubmitted ? (
          <>
            <h2>Join the Waitlist</h2>
            <p>Be the first to experience the future of PCB design.</p>
            
            <form className="waitlist-form" onSubmit={handleSubmit}>
              <div className="waitlist-form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Jane Doe" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="waitlist-form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="jane@example.com" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="waitlist-form-group">
                <label htmlFor="profession">Profession (Optional)</label>
                <input 
                  type="text" 
                  id="profession" 
                  name="profession" 
                  placeholder="Hardware Engineer" 
                  value={formData.profession}
                  onChange={handleChange}
                />
              </div>

              <div className="waitlist-submit">
                <AnimatedButton 
                  label="Join Now" 
                  animate={false} 
                  onClick={handleSubmit} 
                />
              </div>
            </form>
          </>
        ) : (
          <div className="waitlist-success">
            <h2>Success!</h2>
            <p>You have registered successfully!</p>
            <p>We will send you an email when we launch.</p>
            
            <div className="waitlist-submit" style={{ marginTop: '2rem' }}>
              <AnimatedButton 
                label="Close" 
                animate={false} 
                onClick={() => setIsOpen(false)} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistModal;
