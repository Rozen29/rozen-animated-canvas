
import React, { useEffect, useRef } from 'react';

interface ExperienceItem {
  id: number;
  date: string;
  title: string;
  company: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    date: "2023 - Present",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Ltd",
    description: "Leading development of interactive web applications with a focus on performance and animation."
  },
  {
    id: 2,
    date: "2020 - 2023",
    title: "UI/UX Developer",
    company: "Creative Solutions Inc",
    description: "Designed and built responsive interfaces for clients across various industries."
  },
  {
    id: 3,
    date: "2018 - 2020",
    title: "Web Developer",
    company: "Digital Agency",
    description: "Created dynamic websites and implemented animations for enhanced user experiences."
  },
  {
    id: 4,
    date: "2016 - 2018",
    title: "Frontend Intern",
    company: "StartUp Hub",
    description: "Assisted in building UI components and learned modern web technologies."
  }
];

const Experience = () => {
  const observerRefs = useRef<HTMLDivElement[]>([]);

  // Setup intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const isEven = Number(entry.target.getAttribute('data-index')) % 2 === 0;
            entry.target.classList.add(isEven ? 'animate-slide-in-right' : 'animate-slide-in-left');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observerRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  return (
    <section id="experience" className="py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Experience</h2>
        
        <div className="timeline-container">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-dot"></div>
              <div 
                ref={el => el && (observerRefs.current[index] = el)}
                data-index={index}
                className="timeline-content opacity-0"
              >
                <span className="text-sm text-muted-foreground block mb-2">{exp.date}</span>
                <h3 className="font-bold text-lg">{exp.title}</h3>
                <p className="text-primary font-medium">{exp.company}</p>
                <p className="mt-2 text-sm">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
