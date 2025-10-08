
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';
import { 
  Code, 
  Cpu, 
  Database, 
  Zap, 
  Award, 
  TrendingUp, 
  Users, 
  GitBranch,
  Terminal,
  Bot,
  Globe,
  Shield,
  Rocket,
  Star,
  ChevronRight,
  CheckCircle,
  Sparkles,
  User,
  Briefcase
} from 'lucide-react';

interface SkillItemProps {
  name: string;
  level: number;
  icon: React.ComponentType<any>;
  color: string;
  delay: number;
}

const SkillItem: React.FC<SkillItemProps> = ({ name, level, icon: Icon, color, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [delay]);

  return (
    <div ref={itemRef} className="group">
      <div className="flex items-center gap-3 mb-2">
        <Icon size={20} className={`${color} group-hover:scale-110 transition-transform duration-300`} />
        <span className="text-white/90 font-medium">{name}</span>
        <span className="text-white/60 text-sm ml-auto">{level}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ 
            width: isVisible ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}80)`
          }}
        />
      </div>
    </div>
  );
};

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  achievements: string[];
  technologies: string[];
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ 
  company, 
  role, 
  period, 
  achievements, 
  technologies, 
  index 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, index * 200);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{role}</h3>
            <p className="text-violet-400 font-semibold">{company}</p>
          </div>
          <span className="text-white/60 text-sm bg-white/10 px-3 py-1 rounded-full">
            {period}
          </span>
        </div>

        <div className="space-y-3 mb-4">
          {achievements.map((achievement, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle size={16} className="text-green-400 mt-1 flex-shrink-0" />
              <p className="text-white/70 text-sm">{achievement}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 bg-violet-500/20 text-violet-300 text-xs rounded-full border border-violet-500/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  const skills = [
    { name: 'C# & .NET', level: 95, icon: Code, color: 'text-blue-400' },
    { name: 'ASP.NET Core', level: 90, icon: Cpu, color: 'text-purple-400' },
    { name: 'REST APIs', level: 92, icon: Globe, color: 'text-green-400' },
    { name: 'MongoDB', level: 88, icon: Database, color: 'text-yellow-400' },
    { name: 'AI/LLM Integration', level: 85, icon: Bot, color: 'text-pink-400' },
    { name: 'Microservices', level: 87, icon: GitBranch, color: 'text-cyan-400' },
    { name: 'React.js', level: 80, icon: Zap, color: 'text-indigo-400' },
    { name: 'Docker', level: 82, icon: Shield, color: 'text-orange-400' }
  ];

  const experiences = [
    {
      company: 'Reccopilot',
      role: 'Software Engineer',
      period: 'Dec 2024 - Present',
      achievements: [
        'Engineered real-time ticketing integration with Ondesk platform using webhooks',
        'Architected comprehensive analytics dashboard for user engagement metrics',
        'Developed scalable RESTful APIs using C#, ASP.NET, and Microservices',
        'Designed AI-driven task orchestration using LLMs and prompt engineering',
        'Led integration of multiple external job boards (Dice, Monster, TechFetch)',
        'Resolved 70+ bugs and implemented 5+ user stories and 2 major features'
      ],
      technologies: ['C#', 'ASP.NET', 'MongoDB', 'OpenAI API', 'Webhooks', 'Microservices']
    },
    {
      company: 'OnBlick',
      role: 'Software Engineer (Full-time)',
      period: 'Sep 2023 - Nov 2024',
      achievements: [
        'Enhanced API performance by optimizing logic and minimizing database hits',
        'Worked on OBMS (Onboarding Microservice) for U.S. employee workflows',
        'Implemented Document Collection APIs and Column Setting configurations',
        'Wrote comprehensive unit test cases for functionality and regression safety',
        'Started as intern and progressed to full-time backend development role'
      ],
      technologies: ['C#', 'ASP.NET MVC', 'Microservices', 'Unit Testing', 'API Optimization']
    }
  ];

  const achievements = [
    { icon: Award, title: 'Employee of Quarter Q1 2025', description: 'Best Performer Award at Reccopilot' },
    { icon: Star, title: 'Employee of Quarter Q2 2024', description: 'Outstanding contributions and impact' },
    { icon: TrendingUp, title: '70+ Issues Resolved', description: 'High-quality bug fixes and improvements' },
    { icon: Rocket, title: '5+ Projects Built', description: 'From conception to deployment' }
  ];

  const projects = [
    {
      name: 'AI-Powered Student Career Assistant',
      tech: 'Gemini, Firebase, Vercel',
      description: 'AI web app for college students with roadmap generator and resume optimization',
      status: 'Live'
    },
    {
      name: 'NaturalLangMetrics API',
      tech: '.NET 9.0, Azure OpenAI, MongoDB',
      description: 'Natural language to MongoDB aggregation pipeline translator',
      status: 'Completed'
    },
    {
      name: 'FileStoreConnector API',
      tech: '.NET 9.0, OAuth2, Google Drive',
      description: 'Universal cloud storage management across multiple providers',
      status: 'Completed'
    }
  ];
  
  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0a0a1f] overflow-hidden">
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
            text="About Me"
            tag="h2"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            variant="gradient"
          />
          
          <AnimatedText 
              text="Passionate Software Engineer crafting scalable backend systems with AI integration"
            tag="p"
              className="max-w-4xl mx-auto text-lg sm:text-xl text-white/70 mt-6"
            delay={200}
          />
        </div>
        
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'skills', label: 'Skills', icon: Code },
              { id: 'projects', label: 'Projects', icon: Rocket }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="min-h-[600px]">
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="relative">
                    <div className="absolute -left-4 -top-4 w-24 h-24 bg-gradient-to-br from-violet-500/30 to-indigo-500/30 rounded-full blur-3xl"></div>
                    <h3 className="relative text-3xl sm:text-4xl font-bold text-white mb-6">
                      Building the Future with 
                      <span className="block text-gradient">Code & AI</span>
                    </h3>
                  </div>
            
            <div className="space-y-6">
                    <p className="text-lg text-white/70 leading-relaxed">
                      I'm a dedicated Software Engineer with <span className="text-violet-400 font-semibold">1.5+ years</span> of experience 
                      building robust backend systems and integrating cutting-edge AI technologies. My journey spans from 
                      mechanical engineering to software development, driven by passion for creating scalable solutions.
                    </p>
                    
                    <p className="text-lg text-white/70 leading-relaxed">
                      Currently at <span className="text-violet-400 font-semibold">Reccopilot</span>, I engineer AI-driven recruitment platforms, 
                      optimize API performance, and lead integrations with major job boards. My expertise in 
                      <span className="text-violet-400 font-semibold"> C#, ASP.NET, and LLM orchestration</span> has earned me 
                      recognition as "Best Performer" and "Employee of Quarter" awards.
                    </p>
                  </div>

                  {/* Achievement Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index}
                        className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 hover:scale-105 transition-all duration-300"
                      >
                        <achievement.icon className="text-violet-400 mb-2" size={24} />
                        <h4 className="text-white font-semibold text-sm mb-1">{achievement.title}</h4>
                        <p className="text-white/60 text-xs">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Software/Cursor Visual Element */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 relative overflow-hidden">
                    {/* Terminal-like interface */}
                    <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-white/60 ml-4">Terminal</span>
                      </div>
                      <div className="space-y-2">
                        <div className="text-green-400">
                          <span className="text-white/60">$</span> vamshi@portfolio:~$ 
                          <span className="animate-pulse">|</span>
                        </div>
                        <div className="text-blue-400">Building scalable APIs...</div>
                        <div className="text-purple-400">Integrating AI workflows...</div>
                        <div className="text-yellow-400">Optimizing performance...</div>
                        <div className="text-green-400">Deployment successful! 🚀</div>
                      </div>
                    </div>
                    
                    {/* Floating code elements */}
                    <div className="absolute top-4 right-4 text-violet-400/30">
                      <Code size={32} className="animate-bounce" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="absolute bottom-4 left-4 text-indigo-400/30">
                      <Terminal size={24} className="animate-bounce" style={{ animationDelay: '1s' }} />
                    </div>
                    <div className="absolute top-1/2 right-8 text-pink-400/30">
                      <Bot size={20} className="animate-bounce" style={{ animationDelay: '1.5s' }} />
                    </div>
                  </div>
                  
                  {/* Floating elements around the card */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-violet-500/20 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-white mb-4">Professional Journey</h3>
                  <p className="text-white/70">Building impactful solutions across product-based and SaaS platforms</p>
                </div>
                
                <div className="grid gap-8">
                  {experiences.map((exp, index) => (
                    <ExperienceCard key={index} {...exp} index={index} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-white mb-4">Technical Expertise</h3>
                  <p className="text-white/70">Proficiency levels across core technologies and frameworks</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-white mb-6">Backend & Core</h4>
                    {skills.slice(0, 4).map((skill, index) => (
                      <SkillItem key={index} {...skill} delay={index * 100} />
                    ))}
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-white mb-6">AI & Integration</h4>
                    {skills.slice(4).map((skill, index) => (
                      <SkillItem key={index + 4} {...skill} delay={(index + 4) * 100} />
                    ))}
            </div>
          </div>
        </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-white mb-4">Featured Projects</h3>
                  <p className="text-white/70">Innovative solutions showcasing technical expertise and creativity</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <div 
                key={index}
                      className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/20"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white">{project.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          project.status === 'Live' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      
                      <p className="text-white/70 text-sm mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tech.split(', ').map((tech, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-violet-500/20 text-violet-300 text-xs rounded-full border border-violet-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
