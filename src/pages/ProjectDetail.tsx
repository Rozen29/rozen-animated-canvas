
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import projects from '../data/projects';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { ArrowUp } from 'lucide-react';

const ProjectDetail = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="mb-6">The project you're looking for doesn't exist.</p>
            <Link 
              to="/" 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
            >
              Return Home
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-grow pt-24">
        {/* Hero image */}
        <div className="w-full h-72 md:h-96 relative overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 flex items-end">
            <div className="container mx-auto p-6 max-w-6xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h1>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-primary/80 text-white text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto p-6 max-w-4xl">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-2">Completed on {project.dateCompleted}</p>
            <p className="text-lg md:text-xl mb-6">{project.description}</p>
            
            <div className="bg-card border rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Project Details</h2>
              <p className="mb-6">{project.fullDescription}</p>
              
              <h3 className="text-xl font-bold mb-3">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                {project.features.map((feature, index) => (
                  <li key={index} className="text-muted-foreground">{feature}</li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-4">
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-colors"
                  >
                    View Live Demo
                  </a>
                )}
                
                {project.repoUrl && (
                  <a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors"
                  >
                    View Source Code
                  </a>
                )}
              </div>
            </div>
            
            <Link 
              to="/" 
              className="inline-block border border-border px-4 py-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
        
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/80 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
