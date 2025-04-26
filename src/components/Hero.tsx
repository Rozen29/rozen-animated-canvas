
import React, { useEffect, useRef, useState } from 'react';
import TypedHeading from './TypedHeading';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Hero = () => {
  const [activeHighlight, setActiveHighlight] = useState(-1);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
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
      if (profileRef.current) {
        profileRef.current.classList.add('opacity-100', 'scale-100');
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
    <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4 md:px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <TypedHeading 
              text="AFRIZAL MUFRIZ FOUJI" 
              className="text-4xl md:text-5xl lg:text-6xl mb-4 font-bold" 
              typeSpeed={80}
            />
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              FRONTEND DEVELOPER
            </h1>
            
            <div className="flex items-center mb-8">
              <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-sm">Located in Bandung, Indonesia</span>
              </div>
            </div>
            
            <p 
              ref={subHeadingRef} 
              className="text-lg md:text-xl mb-8 transition-all duration-500 opacity-0 translate-y-4 transform"
            >
              Hi there!👋 I'm Afrizal Mufriz Fouji, I'm currently living in Bandung, Indonesia. I bring over 3 years of experience as a versatile Frontend Developer, I'm skilled at creating, developing, and managing complex websites, with a specialization in ReactJS and NextJS.
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
          
          <div 
            ref={profileRef}
            className="order-1 md:order-2 flex justify-center opacity-0 scale-90 transition-all duration-700"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full border-4 border-primary/50 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full border-2 border-primary/30"></div>
              <Avatar className="w-full h-full">
                <AvatarImage src="/lovable-uploads/972cfec1-4991-4bf5-8a0d-1fdaea6a2f48.png" alt="Afrizal Mufriz Fouji" className="object-cover" />
                <AvatarFallback>AMF</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        
        <div 
          ref={bioRef} 
          className="bg-card border border-white/10 rounded-lg p-6 mt-16 transition-all duration-500 opacity-0 translate-y-4 transform shadow-md"
        >
          <p className="text-muted-foreground mb-4">
            As a self-taught developer, I am driven by a passion for creating engaging and interactive websites. I am not just a coder but also a creative thinker, problem solver, and a perpetual learner, always eager to explore new technologies. Embracing a non-traditional path, I chose hands-on learning and real-world applications over the traditional university route, which has cultivated resilience and adaptability in my approach.
          </p>
          <p className="text-muted-foreground">
            I'm also a content creator on Tiktok and Instagram soon on Youtube, where I share my knowledge and experience in web development. I'm currently working as a Front-end Developer at PT Pemuda Inovasi Teknologi (Chatbiz) until now. I'm always open to new opportunities and collaborations, so feel free to reach out to me!🚀
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
