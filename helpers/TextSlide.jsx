"use client"
import React, { useRef, useState, useEffect } from 'react';

export default function TextSlide({ text, cn, cnParent, color }) {
  const divRef = useRef(null);  // Create a ref for the div
  const [inView, setInView] = useState(false);  // State to track if the section is in view

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting) setInView(entry.isIntersecting); 
        });
      },
      { threshold: 0.5 }  // Trigger when 50% of the element is in view
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  return (
    <div ref={divRef} className={`${cnParent} relative overflow-hidden transition-all duration-1000 after:absolute after:top-0 after:left-0 
      ${color ? "after:bg-white" : "after:bg-[#111]"} after:h-full after:w-full after:duration-1000 
      ${inView ? "after:!h-0" : "after:!h-full"}`}>
      <span className={`${cn}  opacity-0`}>{text}</span>
      <span className={`absolute transition-all duration-1000 top-[100%] 
        ${inView ? "!top-0" : "top-[100%]"} left-0 ${cn}`}>
        {text}
      </span>
    </div>
  );
}
