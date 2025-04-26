
import React, { useEffect, useRef, useState } from 'react';
import TypedHeading from './TypedHeading';

const Hero = () => {
  const [activeHighlight, setActiveHighlight] = useState(-1);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const highlightedTexts = useRef<(HTMLSpanElement | null)[]>([]);
  
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

    // Animate bio section after another delay
    const timer3 = setTimeout(() => {
      if (bioRef.current) {
        bioRef.current.classList.add('opacity-100', 'translate-y-0');
      }
    }, 3000);
    
    // Set up intersection observer for scrolling highlights
    const highlightObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index') || 0);
            setActiveHighlight(index);
          }
        });
      },
      { threshold: 1, rootMargin: "-100px 0px -100px 0px" }
    );
    
    // Observe highlighted texts
    highlightedTexts.current.forEach((el) => {
      if (el) highlightObserver.observe(el);
    });
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      highlightObserver.disconnect();
    };
  }, []);

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <TypedHeading 
          text="About Me" 
          className="text-4xl md:text-5xl lg:text-6xl mb-8 text-center" 
          typeSpeed={80}
        />
        
        <p 
          ref={subHeadingRef} 
          className="text-lg md:text-xl mb-8 transition-all duration-500 opacity-0 translate-y-4 transform text-center"
        >
          I'm a <span 
            ref={(el) => highlightedTexts.current[0] = el} 
            data-index={0}
            className={`${activeHighlight >= 0 ? 'highlight-text' : ''} transition-all duration-300`}
          >creative developer</span> with a passion for building 
          <span 
            ref={(el) => highlightedTexts.current[1] = el} 
            data-index={1}
            className={`${activeHighlight >= 1 ? 'highlight-text' : ''} ml-2 transition-all duration-300`}
          >immersive digital experiences</span> that combine 
          technical precision with stunning visual design.
        </p>
        
        <div 
          ref={bioRef} 
          className="bg-card border rounded-lg p-6 mb-8 transition-all duration-500 opacity-0 translate-y-4 transform shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3">Who I Am</h3>
              <p className="text-muted-foreground mb-4">
                A passionate developer with over 7 years of experience specializing in creating 
                <span 
                  ref={(el) => highlightedTexts.current[2] = el} 
                  data-index={2}
                  className={`${activeHighlight >= 2 ? 'highlight-text' : ''} mx-1 transition-all duration-300`}
                >interactive web applications</span> 
                and <span 
                  ref={(el) => highlightedTexts.current[3] = el} 
                  data-index={3}
                  className={`${activeHighlight >= 3 ? 'highlight-text' : ''} transition-all duration-300`}
                >beautiful user interfaces</span>.
              </p>
              <p className="text-muted-foreground">
                Based in New York, I collaborate with clients worldwide to bring their visions to life through code and design.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">My Expertise</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Frontend Development (React, Vue, Next.js)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Animation & Interaction Design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Performance Optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Responsive UI/UX Implementation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div 
          ref={ctaRef} 
          className="transition-all duration-500 opacity-0 translate-y-4 transform text-center"
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
