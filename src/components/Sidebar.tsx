
import React from 'react';
import { X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Close on outside click
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('.sidebar')) {
        onClose();
      }
    };

    if (isOpen) {
      setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
      }, 10);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <div 
        className={`sidebar fixed top-0 left-0 h-full w-72 bg-background dark:bg-background border-r z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <h2 className="font-semibold">Menu</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-md hover:bg-muted/50 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="py-6 px-4 flex-grow">
            <ul className="space-y-2">
              <li>
                <a 
                  href="#about"
                  onClick={onClose} 
                  className="block px-2 py-3 rounded-md hover:bg-muted transition-colors duration-150"
                >
                  About Me
                </a>
              </li>
              <li>
                <a 
                  href="#experience"
                  onClick={onClose}
                  className="block px-2 py-3 rounded-md hover:bg-muted transition-colors duration-150"
                >
                  Experience
                </a>
              </li>
              <li>
                <a 
                  href="#projects"
                  onClick={onClose}
                  className="block px-2 py-3 rounded-md hover:bg-muted transition-colors duration-150"
                >
                  Recent Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact"
                  onClick={onClose}
                  className="block px-2 py-3 rounded-md hover:bg-muted transition-colors duration-150"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Toggle theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
