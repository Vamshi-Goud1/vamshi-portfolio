
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Zap, Search, Briefcase, Code, Database, Brain, Terminal } from 'lucide-react';

interface AIProjectCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  delay: number;
}

const AIProjectCard: React.FC<AIProjectCardProps> = ({ title, description, icon: Icon, color, bgColor, delay }) => {
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
  }, [delay, isVisible]);

  return (
    <div
      ref={cardRef}
      className={`opacity-0 group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20 ${
        isVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative">
        <div className="flex items-start gap-6">
          <div className={`p-4 bg-gradient-to-br ${bgColor} rounded-xl border border-violet-400/30 group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={28} className={color} />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-200 transition-colors">
              {title}
            </h3>
            <p className="text-white/80 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CodeWindow: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const codeText = `// Candidate Matching Prompt Template
system: You are an expert recruiter assistant that evaluates

user: <job_description>
{{JOB_DESCRIPTION}}
</job_description>

<candidate_profile>
{{CANDIDATE_PROFILE}}
</candidate_profile>

Evaluate this candidate's fit for the position with the following:
1. Overall match score (0-100%)
2. Key strengths (3-5 bullet points)
3. Potential gaps (if any)
4. Recommended interview questions (3 questions)`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < codeText.length) {
        setTypedText(codeText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-sm text-white/60 font-mono">prompt-template.md</span>
        </div>
        <pre className="text-sm text-white/80 font-mono leading-relaxed overflow-hidden">
          <code>{typedText}</code>
          <span className="animate-pulse text-violet-400">|</span>
        </pre>
      </div>
    </div>
  );
};

const WorkflowSteps: React.FC = () => {
  const steps = [
    { number: 1, title: 'Input Processing', description: 'Process recruitment data efficiently', icon: Database },
    { number: 2, title: 'LLM Orchestration', description: 'Coordinate AI model workflows', icon: Brain },
    { number: 3, title: 'Response Handling', description: 'Deliver intelligent automation', icon: Zap }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map((step, index) => (
        <div key={step.number} className="group text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl mx-auto group-hover:scale-110 transition-transform duration-300">
              {step.number}
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <step.icon size={16} className="text-violet-400" />
            </div>
          </div>
          <h4 className="text-lg font-semibold mb-3 text-white group-hover:text-violet-200 transition-colors">{step.title}</h4>
          <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
        </div>
      ))}
    </div>
  );
};

const AIWork: React.FC = () => {
  const projects = [
    {
      title: 'LLM Prompt Engineering',
      description: 'Designed robust prompt templates for consistent AI responses in recruitment workflows.',
      icon: Terminal,
      color: 'text-cyan-400',
      bgColor: 'from-cyan-500/20 to-blue-500/10',
    },
    {
      title: 'AI Orchestration',
      description: 'Built systems to efficiently coordinate multiple LLM calls within complex business processes.',
      icon: Zap,
      color: 'text-yellow-400',
      bgColor: 'from-yellow-500/20 to-orange-500/10',
    },
    {
      title: 'Vector Database Integration',
      description: 'Implemented semantic search using vector embeddings for candidate-job matching.',
      icon: Search,
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-indigo-500/10',
    },
    {
      title: 'AI-Powered Interfaces',
      description: 'Created intuitive user interfaces for AI-assisted decision making in recruitment.',
      icon: Briefcase,
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-emerald-500/10',
    },
  ];

  return (
    <section id="ai-work" className="relative min-h-screen bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0a0a1f] overflow-hidden">
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
              text="AI Contributions"
              tag="h2"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              variant="gradient"
            />
          </div>

          {/* Intelligent Systems Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-6 text-white">Intelligent Systems</h3>
              <p className="text-lg sm:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
                I specialize in integrating AI capabilities into backend systems, with a focus 
                on Large Language Models (LLMs), prompt engineering, and AI orchestration flows.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {projects.map((project, index) => (
                <AIProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  icon={project.icon}
                  color={project.color}
                  bgColor={project.bgColor}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>

          {/* Featured AI Project Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-xl border border-violet-400/30 group-hover:scale-110 transition-transform duration-300">
                    <Bot size={24} className="text-violet-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-violet-200 transition-colors">Featured AI Project</h3>
                </div>
                <p className="text-white/80 mb-6 leading-relaxed">
                  The AI-Powered Student Career Assistant combines LLM workflows with 
                  personalized guidance to help students navigate career paths and skill development.
                </p>
                <a 
                  href="https://roadmap-generator-ykxd.vercel.app" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors font-semibold"
                >
                  Learn more about this project →
                </a>
              </div>
            </div>
            
            <div>
              <CodeWindow />
            </div>
          </div>

          {/* AI Workflow Architecture Section */}
          <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-violet-200 transition-colors">AI Workflow Architecture</h3>
                <p className="text-white/70 max-w-3xl mx-auto">
                  This AI workflow architecture enables efficient processing of recruitment data, 
                  reducing manual effort by 85% while maintaining decision quality.
                </p>
              </div>
              <WorkflowSteps />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIWork;
