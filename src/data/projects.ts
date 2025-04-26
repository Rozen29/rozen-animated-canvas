
export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  features: string[];
  demoUrl?: string;
  repoUrl?: string;
  dateCompleted: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Interactive Data Dashboard",
    slug: "interactive-data-dashboard",
    description: "Real-time data visualization with dynamic updates and interactive charts.",
    fullDescription: "A comprehensive dashboard that showcases real-time data visualization capabilities. Built with React and D3.js, this application provides users with interactive charts and graphs that update in real-time as new data becomes available. The dashboard includes features like filtering, sorting, and customizable views to enhance user experience.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    tags: ["React", "D3.js", "TypeScript"],
    features: [
      "Real-time data updates",
      "Interactive charts and graphs",
      "Customizable dashboard layout",
      "Data filtering and sorting",
      "Export functionality for reports"
    ],
    demoUrl: "https://dashboard-demo.example.com",
    repoUrl: "https://github.com/rozen/interactive-dashboard",
    dateCompleted: "2023-06-15"
  },
  {
    id: 2,
    title: "3D Product Showcase",
    slug: "3d-product-showcase",
    description: "An interactive 3D product viewer with customization options and animations.",
    fullDescription: "This project allows users to interact with 3D product models in real-time. Using Three.js and WebGL, the application renders high-quality 3D models that users can rotate, zoom, and customize. Features include material and color changes, animation sequences, and detailed product information overlays.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["Three.js", "WebGL", "GSAP"],
    features: [
      "360-degree product rotation",
      "Zoom and pan controls",
      "Material and color customization",
      "Animated product demonstrations",
      "Cross-browser compatibility"
    ],
    demoUrl: "https://product-showcase.example.com",
    repoUrl: "https://github.com/rozen/3d-product-showcase",
    dateCompleted: "2023-04-10"
  },
  {
    id: 3,
    title: "AI-Powered Chatbot Demo",
    slug: "ai-powered-chatbot",
    description: "Conversational AI interface with natural language processing capabilities.",
    fullDescription: "An AI-powered chatbot application that leverages natural language processing to provide intelligent responses to user queries. Built with Next.js and TensorFlow.js, the chatbot can understand context, learn from interactions, and provide personalized assistance. The interface is designed to be intuitive and responsive, making it accessible for users of all technical backgrounds.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    tags: ["Next.js", "TensorFlow.js", "NLP"],
    features: [
      "Natural language understanding",
      "Context-aware conversations",
      "Sentiment analysis",
      "Multi-language support",
      "Customizable responses"
    ],
    demoUrl: "https://chatbot-demo.example.com",
    repoUrl: "https://github.com/rozen/ai-chatbot",
    dateCompleted: "2023-08-22"
  }
];

export default projects;
