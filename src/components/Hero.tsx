
import React, { useEffect, useRef } from 'react';
import TypedHeading from './TypedHeading';

const Hero = () => {
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate sub-heading after delay
    const timer1 = setTimeout(() => {
      if (subHeadingRef.current) {
        subHeadingRef.current.classList.add('opacity-100', 'translate-y-0');
      }
    }, 1800);
    
    // Animate CTA after another delay
    const timer2 = setTimeout(() => {
      if (ctaRef.current) {
        ctaRef.current.classList.add('opacity-100', 'translate-y-0');
      }
    }, 2400);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <TypedHeading 
          text="About Me" 
          className="text-4xl md:text-5xl lg:text-6xl mb-8" 
          typeSpeed={80}
        />
        
        <p 
          ref={subHeadingRef} 
          className="text-lg md:text-xl mb-8 transition-all duration-500 opacity-0 translate-y-4 transform"
        >
          I'm a <span className="highlight-text">creative developer</span> with a passion for building 
          <span className="highlight-text ml-2">immersive digital experiences</span> that combine 
          technical precision with stunning visual design.
        </p>
        
        <div 
          ref={ctaRef} 
          className="transition-all duration-500 opacity-0 translate-y-4 transform"
        >
          <a 
            href="#experience" 
            className="inline-block bg-primary text-white px-6 py-3 rounded-md transition-all duration-300 
            hover:bg-primary/80 hover:-translate-y-1"
          >
            Explore My Work
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
