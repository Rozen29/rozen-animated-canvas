
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, ArrowRight, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from "@/hooks/use-toast";

// Types
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Check if API key exists in localStorage on component mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('gemini-api-key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setHasApiKey(true);
    }
  }, []);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSaveApiKey = () => {
    if (apiKey && apiKey.startsWith('AI')) {
      localStorage.setItem('gemini-api-key', apiKey);
      setHasApiKey(true);
      setShowApiKeyInput(false);
      toast({
        title: "API Key Saved",
        description: "Your Gemini API key has been saved successfully.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid API Key",
        description: "Please enter a valid Gemini API key starting with 'AI'."
      });
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    if (!hasApiKey) {
      setShowApiKeyInput(true);
      return;
    }

    const newUserMessage: Message = { role: 'user', content: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      // Construct context about the portfolio owner
      const systemPrompt = `
        You are an AI assistant for Rozen's portfolio website. Answer questions about Rozen based on this context:
        - Rozen is a skilled web developer specializing in React, TypeScript, and modern web technologies
        - Has experience in building responsive, performant web applications
        - Currently available for freelance work
        - Based in New York
        - Contact: contact@rozen.dev, +1 (555) 123-4567
        - If users ask questions unrelated to Rozen's professional profile, politely explain that you can only answer questions about Rozen's work, skills, and professional information.
      `;

      // Here we would integrate with Gemini API
      // For now simulating the response with a timeout
      
      let response;
      
      // Check if the question is relevant to the portfolio context
      const isRelevantQuestion = /skills|work|experience|project|contact|education|background|portfolio|web|developer|hire|freelance|availability/i.test(userInput);
      
      if (isRelevantQuestion) {
        // Simulate API call to Gemini
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        response = {
          role: 'assistant',
          content: `Based on Rozen's portfolio, I can tell you that ${getRelevantResponse(userInput)}`
        };
      } else {
        // Out of context response
        response = {
          role: 'assistant',
          content: "I'm sorry, but I can only answer questions related to Rozen's professional work, skills, and portfolio. If you have any questions about Rozen's web development experience, projects, or how to contact them, I'd be happy to help!"
        };
      }
      
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response from the assistant."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to generate relevant responses based on keywords
  const getRelevantResponse = (input: string): string => {
    if (input.toLowerCase().includes('skill')) {
      return "Rozen is proficient in React, TypeScript, JavaScript, HTML, CSS, Node.js, and various modern web frameworks.";
    } else if (input.toLowerCase().includes('contact') || input.toLowerCase().includes('hire')) {
      return "you can contact Rozen via email at contact@rozen.dev or by phone at +1 (555) 123-4567 for work inquiries.";
    } else if (input.toLowerCase().includes('project')) {
      return "Rozen has worked on various web development projects, which you can find in the Projects section of this portfolio.";
    } else if (input.toLowerCase().includes('experience')) {
      return "Rozen has extensive experience in web development, having worked with various technologies and frameworks as detailed in the Experience section.";
    } else {
      return "Rozen is a skilled web developer based in New York, currently available for freelance work.";
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Assistant button */}
        <button 
          onClick={toggleAssistant}
          className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300"
          aria-label="Open AI Assistant"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>

        {/* Assistant panel */}
        <div 
          className={`absolute bottom-16 right-0 w-80 md:w-96 bg-card shadow-lg rounded-lg transition-all duration-300 transform ${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
          }`}
        >
          <div className="p-4 bg-primary text-white rounded-t-lg">
            <h3 className="text-lg font-medium">Ask me anything about Rozen</h3>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 bg-card">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Info className="mb-2" />
                <p>Ask me anything about Rozen's skills, experience, or projects!</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-4 ${
                    msg.role === 'user' ? 'ml-auto text-right' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-200"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 border-t flex items-center gap-2">
            <Input
              type="text"
              placeholder="Type your question..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-grow"
              disabled={isLoading}
            />
            <Button 
              size="icon" 
              onClick={sendMessage} 
              disabled={isLoading}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showApiKeyInput} onOpenChange={setShowApiKeyInput}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter Gemini API Key</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              To use the AI assistant, please enter your Gemini API key. It will be saved in your browser.
            </p>
            <Input
              type="password"
              placeholder="Enter your Gemini API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <div className="flex justify-end">
              <Button onClick={handleSaveApiKey}>Save API Key</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIAssistant;
