
import React, { useEffect, useRef } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';

const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const lanyardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === contactRef.current) {
              entry.target.classList.add('animate-fade-in');
            } else if (entry.target === lanyardRef.current) {
              entry.target.classList.add('animate-slide-in-left');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (contactRef.current) observer.observe(contactRef.current);
    if (lanyardRef.current) observer.observe(lanyardRef.current);

    return () => {
      if (contactRef.current) observer.unobserve(contactRef.current);
      if (lanyardRef.current) observer.unobserve(lanyardRef.current);
    };
  }, []);

  return (
    <section id="contact" className="py-24 px-4 md:px-6 bg-background relative overflow-hidden">
      {/* Lanyard element */}
      <div
        ref={lanyardRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 transform -translate-x-full"
        style={{ zIndex: 1 }}
      >
        <div className="bg-primary py-2 px-4 text-primary-foreground rounded-r-md shadow-lg rotate-90 origin-top-left translate-x-8 -translate-y-8">
          <span className="text-sm font-medium tracking-wider">GET IN TOUCH</span>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Contact Me
        </h2>

        <div 
          ref={contactRef} 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-0"
        >
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
            <p className="text-muted-foreground mb-6">
              I'm currently available for freelance work. If you have a project that needs attention or just want to say hi, feel free to reach out!
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-primary" />
                <span>contact@rozen.dev</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-primary" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-border rounded-md bg-background"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-border rounded-md bg-background"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-2 border border-border rounded-md bg-background resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
