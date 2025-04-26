
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import projects from '../data/projects';

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (headingRef.current) {
            headingRef.current.classList.add('animate-fade-in');
            headingRef.current.classList.remove('opacity-0');
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
          {projects.map((project, index) => (
            <div key={project.id} className="project-wrapper opacity-0">
              <Link to={`/project/${project.slug}`}>
                <ProjectCard 
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
