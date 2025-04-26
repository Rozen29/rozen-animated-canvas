
import React, { useEffect, useRef } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from './ui/sonner';

// Define contact form schema
const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const lanyardRef = useRef<HTMLDivElement>(null);

  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log('Form submitted:', data);
    toast.success("Message sent successfully!", {
      description: "I'll get back to you as soon as possible.",
      duration: 5000,
    });
    form.reset();
  }

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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message here..." 
                          className="resize-none" 
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
