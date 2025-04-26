
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SkillNode {
  id: string;
  name: string;
  image: string;
  category: string;
}

interface SkillLink {
  source: string;
  target: string;
  value: number;
}

const SkillsMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const skillsData: SkillNode[] = [
    { id: "skills", name: "Skills", image: "", category: "center" },
    { id: "react", name: "React", image: "/icons/react.svg", category: "frontend" },
    { id: "next", name: "Next.js", image: "/icons/nextjs.svg", category: "frontend" },
    { id: "ts", name: "TypeScript", image: "/icons/typescript.svg", category: "language" },
    { id: "js", name: "JavaScript", image: "/icons/javascript.svg", category: "language" },
    { id: "html", name: "HTML5", image: "/icons/html5.svg", category: "frontend" },
    { id: "css", name: "CSS3", image: "/icons/css3.svg", category: "frontend" },
    { id: "flutter", name: "Flutter", image: "/icons/flutter.svg", category: "mobile" },
    { id: "tailwind", name: "Tailwind", image: "/icons/tailwind.svg", category: "css" },
  ];

  const linksData: SkillLink[] = [
    { source: "skills", target: "react", value: 5 },
    { source: "skills", target: "next", value: 5 },
    { source: "skills", target: "ts", value: 4 },
    { source: "skills", target: "js", value: 5 },
    { source: "skills", target: "html", value: 3 },
    { source: "skills", target: "css", value: 3 },
    { source: "skills", target: "flutter", value: 3 },
    { source: "skills", target: "tailwind", value: 4 },
  ];

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();
    
    const width = containerRef.current.clientWidth;
    const height = 500;
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
      
    // Create a force simulation
    const simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2));
    
    // Define gradient
    const defs = svg.append("defs");
    
    const gradient = defs.append("linearGradient")
      .attr("id", "link-gradient")
      .attr("gradientUnits", "userSpaceOnUse");
    
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ffffff")
      .attr("stop-opacity", 0.2);
      
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "hsl(var(--primary))")
      .attr("stop-opacity", 0.7);
    
    // Create links
    const link = svg.append("g")
      .selectAll("line")
      .data(linksData)
      .join("line")
      .attr("stroke", "url(#link-gradient)")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.value) * 2);
    
    // Create nodes
    const node = svg.append("g")
      .selectAll(".node")
      .data(skillsData)
      .join("g")
      .attr("class", "node")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
    
    // Add circles to nodes
    node.append("circle")
      .attr("r", (d) => d.id === "skills" ? 60 : 30)
      .attr("fill", (d) => d.id === "skills" ? "#1a1a1a" : "#2a2a2a")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 2);
    
    // Add labels
    node.append("text")
      .text((d) => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", (d) => d.id === "skills" ? "0.3em" : "3em")
      .attr("fill", "white")
      .style("font-size", (d) => d.id === "skills" ? "24px" : "14px")
      .style("font-weight", (d) => d.id === "skills" ? "bold" : "normal");
    
    // Create placeholder circles for skill icons
    node.filter(d => d.id !== "skills")
      .append("circle")
      .attr("r", 25)
      .attr("fill", "white")
      .attr("opacity", 0.9);
    
    // Add icons (would be replaced with actual icons in a real implementation)
    node.filter(d => d.id !== "skills")
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .attr("fill", "black")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text(d => d.id.charAt(0).toUpperCase());
    
    // Set up hover effects
    node
      .on("mouseover", function() {
        d3.select(this).select("circle")
          .transition()
          .duration(300)
          .attr("r", (d: any) => d.id === "skills" ? 65 : 35);
      })
      .on("mouseout", function() {
        d3.select(this).select("circle")
          .transition()
          .duration(300)
          .attr("r", (d: any) => d.id === "skills" ? 60 : 30);
      });
    
    // Setup simulation
    simulation
      .nodes(skillsData as any)
      .on("tick", ticked);
    
    (simulation.force("link") as d3.ForceLink<any, any>)
      .links(linksData);
    
    // Add flowing particles along links
    const particlesGroup = svg.append("g")
      .attr("class", "particles");
    
    linksData.forEach(link => {
      const source = skillsData.find(node => node.id === link.source) as SkillNode;
      const target = skillsData.find(node => node.id === link.target) as SkillNode;
      
      if (source && target) {
        createParticles(source, target, particlesGroup);
      }
    });
    
    function ticked() {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      
      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
      
      updateParticles();
    }
    
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    
    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    
    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    
    // Particle system
    const particles: any[] = [];
    
    function createParticles(source: SkillNode, target: SkillNode, container: d3.Selection<SVGGElement, unknown, null, undefined>) {
      const numParticles = 3;
      
      for (let i = 0; i < numParticles; i++) {
        const particle = container.append("circle")
          .attr("r", 3)
          .attr("fill", "hsl(var(--primary))")
          .attr("opacity", 0.7);
        
        particles.push({
          element: particle,
          source: source,
          target: target,
          speed: Math.random() * 0.01 + 0.005,
          progress: Math.random(),
        });
      }
    }
    
    function updateParticles() {
      particles.forEach(particle => {
        // Update progress
        particle.progress += particle.speed;
        if (particle.progress >= 1) {
          particle.progress = 0;
        }
        
        const sourceNode = particle.source as any;
        const targetNode = particle.target as any;
        
        if (sourceNode.x && targetNode.x) {
          // Calculate position along path
          const x = sourceNode.x + (targetNode.x - sourceNode.x) * particle.progress;
          const y = sourceNode.y + (targetNode.y - sourceNode.y) * particle.progress;
          
          // Move particle
          particle.element
            .attr("cx", x)
            .attr("cy", y);
        }
      });
    }
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      svg.attr("width", width);
      
      simulation.force("center", d3.forceCenter(width / 2, height / 2));
      simulation.alpha(0.3).restart();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="skills" className="py-24 px-4 md:px-6 bg-black text-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">My Skills</h2>
        <div 
          ref={containerRef} 
          className="overflow-hidden bg-black/50 rounded-xl border border-white/10 p-4"
        >
          <svg ref={svgRef}></svg>
        </div>
      </div>
    </section>
  );
};

export default SkillsMap;
