
import React, { useEffect, useRef } from 'react';

interface ExperienceItem {
  id: number;
  date: string;
  title: string;
  company: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    date: "2023 - Present",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Ltd",
    description: "Leading development of interactive web applications with a focus on performance and animation.",
    responsibilities: [
      "Architected and implemented scalable frontend solutions",
      "Mentored junior developers and conducted code reviews",
      "Optimized application performance and accessibility"
    ],
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"]
  },
  {
    id: 2,
    date: "2020 - 2023",
    title: "UI/UX Developer",
    company: "Creative Solutions Inc",
    description: "Designed and built responsive interfaces for clients across various industries.",
    responsibilities: [
      "Created pixel-perfect, responsive web interfaces",
      "Collaborated with design team on UX improvements",
      "Implemented complex animations and interactions"
    ],
    technologies: ["Vue.js", "SCSS", "Figma", "Framer Motion", "Jest"]
  },
  {
    id: 3,
    date: "2018 - 2020",
    title: "Web Developer",
    company: "Digital Agency",
    description: "Created dynamic websites and implemented animations for enhanced user experiences.",
    responsibilities: [
      "Developed custom WordPress themes and plugins",
      "Integrated third-party APIs and services",
      "Improved site performance and SEO"
    ],
    technologies: ["PHP", "WordPress", "JavaScript", "MySQL", "AWS"]
  },
  {
    id: 4,
    date: "2016 - 2018",
    title: "Frontend Intern",
    company: "StartUp Hub",
    description: "Assisted in building UI components and learned modern web technologies.",
    responsibilities: [
      "Built reusable UI components",
      "Fixed bugs and improved existing features",
      "Participated in daily stand-ups and code reviews"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "jQuery"]
  }
];

const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Set up intersection observer for the timeline connector
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (timelineRef.current) {
            timelineRef.current.classList.add('after:animate-timeline-grow');
          }
        }
      },
      { threshold: 0.1 }
    );
    
    if (timelineRef.current) {
      timelineObserver.observe(timelineRef.current);
    }
    
    // Set up intersection observer for individual timeline items
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            const isEven = index % 2 === 0;
            
            // Apply different animations based on whether the item is on the left or right
            entry.target.classList.remove('opacity-0');
            entry.target.classList.add(
              isEven ? 'animate-slide-in-right' : 'animate-slide-in-left'
            );
            
            // Stop observing after animation is applied
            itemObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px 0px' }
    );
    
    // Start observing each timeline item
    itemRefs.current.forEach((ref) => {
      if (ref) itemObserver.observe(ref);
    });
    
    // Cleanup
    return () => {
      timelineObserver.disconnect();
      itemObserver.disconnect();
    };
  }, []);
  
  return (
    <section id="experience" className="py-24 px-4 md:px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Experience</h2>
        
        <div 
          ref={timelineRef}
          className="timeline-container relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:w-0.5 after:bg-primary/50 after:h-0 after:top-0 after:transition-all after:duration-1500"
        >
          {experiences.map((exp, index) => (
            <div key={exp.id} className={`timeline-item mb-24 last:mb-0 relative flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
              <div className="timeline-dot absolute left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-lg z-10"></div>
              <div 
                ref={el => itemRefs.current[index] = el}
                data-index={index}
                className={`timeline-content opacity-0 w-[calc(50%-3rem)] p-6 rounded-lg bg-card border shadow-md transition-all duration-500 hover:shadow-lg ${index % 2 === 0 ? 'mr-12' : 'ml-12'}`}
              >
                <span className="text-sm text-muted-foreground block mb-2">{exp.date}</span>
                <h3 className="font-bold text-xl mb-1">{exp.title}</h3>
                <p className="text-primary font-medium mb-3">{exp.company}</p>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
