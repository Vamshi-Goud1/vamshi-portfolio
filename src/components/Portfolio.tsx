
import React, { useState, useRef, useEffect } from 'react';
import AnimatedText from './AnimatedText';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Code, Zap, Database, Bot, Settings, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  demoUrl: string;
  githubUrl: string;
  details: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index, isVisible]);

  return (
    <div 
      ref={cardRef}
      className={`opacity-0 group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20 ${
        isVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'
      }`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative">
        {/* Project Image */}
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Project Icon Overlay */}
          <div className="absolute top-4 right-4 p-3 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 backdrop-blur-sm rounded-xl border border-violet-400/30 group-hover:scale-110 transition-transform duration-300">
            <project.icon size={24} className={project.color} />
          </div>
        </div>
        
        {/* Project Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/20">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Title and Description */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-200 transition-colors">
            {project.title}
          </h3>
          <p className="text-white/80 mb-4 leading-relaxed">
            {project.description}
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            {project.details}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="px-6 pb-6 flex gap-3">
          <Button asChild variant="outline" size="sm" className="flex-1 border-white/20 hover:bg-white/10 text-white hover:text-white">
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              <Github size={16} className="mr-2" />
              Code
            </a>
          </Button>
          <Button asChild size="sm" className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white">
            <a href={project.demoUrl} target="_blank" rel="noreferrer">
              <ExternalLink size={16} className="mr-2" />
              Demo
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'AI-Powered Student Career Assistant',
      description: 'AI-based web app for college students seeking career guidance with roadmap generation and resume optimization.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      tags: ['Gemini 2.0 Flash', 'Firebase', 'Vercel', 'AI'],
      category: 'AI Projects',
      demoUrl: 'https://roadmap-generator-ykxd.vercel.app',
      githubUrl: '#',
      details: 'Integrated Google Gemini LLM for career guidance with roadmap generator and resume keyword extractor functionality.',
      icon: Bot,
      color: 'text-cyan-400',
      bgColor: 'from-cyan-500/20 to-blue-500/10'
    },
    {
      id: 2,
      title: 'Reccopilot - AI Recruitment Platform',
      description: 'Scalable recruitment platform with AI-driven task orchestration and job board integrations.',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2026&q=80',
      tags: ['C#', 'ASP.NET', 'OpenAI', 'REST APIs'],
      category: 'Professional',
      demoUrl: '#',
      githubUrl: '#',
      details: 'Developed RESTful APIs and AI orchestration for automated recruiter workflows with job board integrations (Dice, Monster, TechFetch).',
      icon: Code,
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-indigo-500/10'
    },
    {
      id: 3,
      title: 'OnBlick HRMS Platform',
      description: 'HRMS Immigration SaaS platform with microservices architecture and U.S. onboarding workflows.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      tags: ['C#', '.NET MVC', 'Microservices', 'APIs'],
      category: 'Professional',
      demoUrl: '#',
      githubUrl: '#',
      details: 'Enhanced OBMS (Onboarding Microservice) with Document Collection APIs and optimized backend performance through logic refinement.',
      icon: Settings,
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-cyan-500/10'
    },
    {
      id: 4,
      title: 'REST API Performance Optimization',
      description: 'Backend optimization project focusing on reducing database calls and improving API response times.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2008&q=80',
      tags: ['ASP.NET', 'Performance', 'MongoDB', 'Redis'],
      category: 'Backend',
      demoUrl: '#',
      githubUrl: '#',
      details: 'Optimized business logic and minimized redundant API/database calls resulting in significant performance improvements.',
      icon: Zap,
      color: 'text-yellow-400',
      bgColor: 'from-yellow-500/20 to-orange-500/10'
    },
    {
      id: 5,
      title: 'LLM Workflow Orchestration',
      description: 'AI task automation system using prompt engineering and vector databases for intelligent workflows.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2032&q=80',
      tags: ['OpenAI', 'Weaviate', 'Prompt Engineering', 'AI'],
      category: 'AI Projects',
      demoUrl: '#',
      githubUrl: '#',
      details: 'Designed AI-driven task orchestration using LLMs and vector databases for automated business process workflows.',
      icon: Database,
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-emerald-500/10'
    },
    {
      id: 6,
      title: 'Unit Testing Framework',
      description: 'Comprehensive testing implementation using NUnit for controllers and service layers.',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2028&q=80',
      tags: ['NUnit', 'C#', 'Testing', 'Quality Assurance'],
      category: 'Backend',
      demoUrl: '#',
      githubUrl: '#',
      details: 'Implemented comprehensive unit test coverage using NUnit framework ensuring high code quality and regression safety.',
      icon: Wrench,
      color: 'text-red-400',
      bgColor: 'from-red-500/20 to-pink-500/10'
    },
  ];
  
  const categories = ['All', 'Professional', 'AI Projects', 'Backend'];
  
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="relative min-h-screen bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0a0a1f] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-500/5 to-indigo-500/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <AnimatedText 
              text="Projects & Experience"
              tag="h2"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              variant="gradient"
            />
            
            <AnimatedText 
              text="Explore my professional projects, AI integrations, and backend development work"
              tag="p"
              className="max-w-4xl mx-auto text-lg sm:text-xl text-white/70 mt-6"
              delay={200}
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex justify-center mb-12 overflow-x-auto scrollbar-none pb-4">
            <div className="flex gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={cn(
                    "min-w-[120px] rounded-full px-6 py-3 transition-all duration-300",
                    activeCategory === category 
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg" 
                      : "border-white/20 hover:bg-white/10 text-white/70 hover:text-white"
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
