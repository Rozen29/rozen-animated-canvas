
import React, { useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (headingRef.current) {
            headingRef.current.classList.add('animate-fade-in');
          }
          
          if (projectsRef.current) {
            const projects = projectsRef.current.querySelectorAll('.project-wrapper');
            projects.forEach((project, index) => {
              setTimeout(() => {
                project.classList.add('animate-scale-in');
                project.classList.remove('opacity-0');
              }, 100 * (index + 1));
            });
          }
          
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-20 px-4 md:px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold mb-12 text-center opacity-0"
        >
          Recent Projects
        </h2>
        
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="project-wrapper opacity-0">
            <ProjectCard 
              title="Interactive Data Dashboard"
              description="Real-time data visualization with dynamic updates and interactive charts."
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              tags={["React", "D3.js", "TypeScript"]}
            />
          </div>
          
          <div className="project-wrapper opacity-0">
            <ProjectCard 
              title="3D Product Showcase"
              description="An interactive 3D product viewer with customization options and animations."
              image="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              tags={["Three.js", "WebGL", "GSAP"]}
            />
          </div>
          
          <div className="project-wrapper opacity-0">
            <ProjectCard 
              title="AI-Powered Chatbot Demo"
              description="Conversational AI interface with natural language processing capabilities."
              image="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              tags={["Next.js", "TensorFlow.js", "NLP"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
