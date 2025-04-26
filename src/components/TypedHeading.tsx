
import React, { useEffect, useRef, useState } from 'react';

interface TypedHeadingProps {
  text: string;
  className?: string;
  typeSpeed?: number;
  startDelay?: number;
}

const TypedHeading = ({ 
  text, 
  className = "", 
  typeSpeed = 100, 
  startDelay = 500 
}: TypedHeadingProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  // Reference to the component
  const elementRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          setTimeout(() => {
            setIsTyping(true);
          }, startDelay);
        }
      },
      { threshold: 0.5 }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasStarted, startDelay]);
  
  useEffect(() => {
    if (!isTyping) return;
    
    let currentText = "";
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        currentText += text[currentIndex];
        setDisplayText(currentText);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typeSpeed);
    
    return () => clearInterval(typingInterval);
  }, [isTyping, text, typeSpeed]);
  
  return (
    <h2 
      ref={elementRef}
      className={`typing-container font-bold ${className}`}
      aria-label={text}
    >
      <span className={`typing-text ${displayText ? 'border-r-4' : ''}`}>
        {displayText}
      </span>
    </h2>
  );
};

export default TypedHeading;
