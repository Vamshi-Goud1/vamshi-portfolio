
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';
import { 
  Code, 
  Database, 
  Brain, 
  Wrench, 
  Cpu, 
  Globe, 
  Bot, 
  GitBranch,
  Terminal,
  Shield,
  Zap,
  Layers,
  Cloud,
  Settings,
  Search
} from 'lucide-react';

interface SkillItemProps {
  name: string;
  level: number;
  icon: React.ComponentType<any>;
  color: string;
  delay: number;
}

const COLOR_HEX: Record<string, string> = {
  'text-blue-400': '#60A5FA',
  'text-orange-400': '#FB923C',
  'text-yellow-400': '#FDE047',
  'text-cyan-400': '#22D3EE',
  'text-pink-400': '#F472B6',
  'text-green-400': '#34D399',
  'text-red-400': '#F87171',
  'text-purple-400': '#A78BFA',
  'text-blue-500': '#3B82F6',
  'text-purple-500': '#A855F7',
  'text-pink-500': '#EC4899',
  'text-green-500': '#10B981',
  'text-yellow-600': '#D97706'
};

const SkillItem: React.FC<SkillItemProps> = ({ name, level, icon: Icon, color, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            
            setTimeout(() => {
              const duration = 2000;
              const startTime = Date.now();
              
              const animateCounter = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOutProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(easeOutProgress * level);
                
                setCurrentLevel(currentValue);
                
                if (progress < 1) {
                  requestAnimationFrame(animateCounter);
                }
              };
              
              animateCounter();
            }, delay);
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
  }, [level, delay, isVisible]);

  const colorHex = COLOR_HEX[color] || '#7c3aed';

  return (
    <div ref={itemRef} className="group">
      <div className="flex items-center gap-3 mb-3">
        <div className="transition-transform duration-300 group-hover:scale-110" style={{ display: 'flex', alignItems: 'center' }}>
          <Icon size={20} style={{ color: colorHex }} />
        </div>
        <span className="text-white/90 font-medium flex-1">{name}</span>
        <span className="text-white/60 text-sm">{currentLevel}%</span>
      </div>

      <div className="w-full bg-white/8 rounded-full h-3 overflow-hidden" style={{ boxShadow: `inset 0 0 8px rgba(0,0,0,0.5)` }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${currentLevel}%` : '0%',
            background: `linear-gradient(90deg, ${colorHex}, ${colorHex}99)`,
            boxShadow: `0 6px 18px ${colorHex}33`
          }}
        />
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Languages & Databases",
      icon: <Code className="w-8 h-8" />,
      color: "text-blue-500",
      bgColor: "from-blue-500/20 to-blue-600/10",
      skills: [
        { name: 'C#', level: 95, icon: Code, color: 'text-blue-400' },
        { name: 'Java', level: 85, icon: Cpu, color: 'text-orange-400' },
        { name: 'JavaScript', level: 90, icon: Zap, color: 'text-yellow-400' },
        { name: 'SQL', level: 88, icon: Database, color: 'text-cyan-400' },
        { name: 'HTML/CSS', level: 85, icon: Layers, color: 'text-pink-400' },
        { name: 'MongoDB', level: 90, icon: Database, color: 'text-green-400' },
        { name: 'Redis', level: 82, icon: Database, color: 'text-red-400' },
        { name: 'Elasticsearch', level: 75, icon: Search, color: 'text-purple-400' }
      ]
    },
    {
      title: "Backend & Frameworks",
      icon: <Cpu className="w-8 h-8" />,
      color: "text-purple-500",
      bgColor: "from-purple-500/20 to-purple-600/10",
      skills: [
        { name: 'ASP.NET', level: 95, icon: Cpu, color: 'text-purple-400' },
        { name: '.NET MVC', level: 90, icon: Settings, color: 'text-indigo-400' },
        { name: 'REST APIs', level: 92, icon: Globe, color: 'text-green-400' },
        { name: 'Microservices', level: 88, icon: GitBranch, color: 'text-cyan-400' },
        { name: 'Middleware', level: 85, icon: Layers, color: 'text-orange-400' },
        { name: 'Integrations', level: 87, icon: Cloud, color: 'text-blue-400' }
      ]
    },
    {
      title: "AI & LLM Development",
      icon: <Brain className="w-8 h-8" />,
      color: "text-pink-500",
      bgColor: "from-pink-500/20 to-pink-600/10",
      skills: [
        { name: 'OpenAI API', level: 90, icon: Bot, color: 'text-green-400' },
        { name: 'Google Gemini', level: 88, icon: Brain, color: 'text-blue-400' },
        { name: 'Prompt Engineering', level: 92, icon: Terminal, color: 'text-purple-400' },
        { name: 'Vector DB', level: 85, icon: Database, color: 'text-cyan-400' }
      ]
    },
    {
      title: "Frontend & Tools",
      icon: <Wrench className="w-8 h-8" />,
      color: "text-green-500",
      bgColor: "from-green-500/20 to-green-600/10",
      skills: [
        { name: 'React.js', level: 85, icon: Zap, color: 'text-cyan-400' },
        { name: 'Vue.js', level: 80, icon: Code, color: 'text-green-400' },
        { name: 'Git & GitHub', level: 92, icon: GitBranch, color: 'text-orange-400' },
        { name: 'Visual Studio', level: 95, icon: Settings, color: 'text-blue-400' },
        { name: 'Docker', level: 85, icon: Shield, color: 'text-cyan-400' },
        { name: 'Postman', level: 90, icon: Globe, color: 'text-orange-400' },
        { name: 'NUnit', level: 88, icon: Wrench, color: 'text-green-400' },
        { name: 'Vercel', level: 82, icon: Cloud, color: 'text-purple-400' },
        { name: 'Firebase', level: 80, icon: Cloud, color: 'text-yellow-400' }
      ]
    }
  ];

  return (
    <section id="skills" className="relative min-h-screen bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0a0a1f] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-500/5 to-indigo-500/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedText 
              text="Technical Expertise"
              tag="h2"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              variant="gradient"
            />
            
            <AnimatedText 
              text="Comprehensive skills across backend development, AI integration, and modern web technologies"
              tag="p"
              className="max-w-4xl mx-auto text-lg sm:text-xl text-white/70 mt-6"
              delay={200}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div 
                key={category.title}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20"
                style={{ animationDelay: `${categoryIndex * 200}ms` }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${category.bgColor} border border-white/20`}>
                    {category.icon}
                  </div>
                  <h3 className={`text-2xl font-bold ${category.color}`}>
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, index) => (
                    <SkillItem 
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      icon={skill.icon}
                      color={skill.color}
                      delay={categoryIndex * 200 + index * 100}
                    />
                  ))}
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 bg-gradient-to-br ${category.bgColor}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
