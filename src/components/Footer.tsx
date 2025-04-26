
import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="py-12 px-4 md:px-6 border-t bg-gradient-to-t from-muted to-transparent">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">ROZEN</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Creative developer focused on building immersive, animated digital experiences
              with attention to detail and performance.
            </p>
          </div>
          
          <div className="md:flex md:justify-end">
            <div>
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-muted-foreground">Email:</span>
                  <a href="mailto:hello@rozen.dev" className="ml-2 animated-underline">
                    hello@rozen.dev
                  </a>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">LinkedIn:</span>
                  <a 
                    href="https://linkedin.com/in/rozen" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-2 animated-underline"
                  >
                    linkedin.com/in/rozen
                  </a>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">GitHub:</span>
                  <a 
                    href="https://github.com/rozen" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-2 animated-underline"
                  >
                    github.com/rozen
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} ROZEN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
