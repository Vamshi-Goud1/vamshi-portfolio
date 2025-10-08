import React, { useEffect, useRef, useState } from 'react';
import { Award, Trophy, Star, Crown } from 'lucide-react';

interface AchievementItemProps {
  title: string;
  organization: string;
  date: string;
  description: string;
  icon: React.ElementType;
  certificate: string;
  index: number;
}

const AchievementItem: React.FC<AchievementItemProps> = ({
  title,
  organization,
  date,
  description,
  icon: Icon,
  certificate,
  index
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
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

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [index, isVisible]);

  return (
    <div
      ref={itemRef}
      className={`opacity-0 group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:border-violet-400/40 transition-all duration-700 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-500/20 ${
        isVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'
      }`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-xl border border-violet-400/30 group-hover:scale-110 transition-all duration-500">
            <Icon size={28} className="text-violet-400" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-violet-200 transition-all duration-500">
              {title}
            </h3>
            <p className="text-violet-400 font-semibold text-lg mb-2">
              {organization}
            </p>
            <p className="text-violet-300/80 font-medium mb-4">
              {date}
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              {description}
            </p>
            
            {/* Certificate Link */}
            <a 
              href={certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-violet-500/50"
            >
              <span className="font-semibold">View Certificate</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Static Achievement Badge */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">🏆</span>
        </div>
      </div>
    </div>
  );
};

const Achievements: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const achievements = [
    {
      title: "Lei of Excellence Award - Employee of the Quarter (Q1 2025)",
      organization: "Reccopilot",
      date: "Q1 2025",
      description: "Recognized for exceptional performance and unwavering dedication to excellence. Outstanding contributions earned the distinction of Employee of the Quarter for Q1 2025, highlighting exceptional performance in AI-driven solutions and backend architecture.",
      icon: Crown,
      certificate: "https://drive.google.com/file/d/1Jc7xhl6-C7q806mwL3snShBb_ULa6L4g/view?usp=drive_link"
    },
    {
      title: "Lei of Excellence Award - Employee of the Quarter (Q2 2024)",
      organization: "Reccopilot", 
      date: "Q2 2024",
      description: "Awarded for outstanding contributions and impact in backend development, API integrations, and delivering high-quality software solutions that exceeded performance expectations and drove significant business value.",
      icon: Trophy,
      certificate: "https://drive.google.com/file/d/1QEBIRdZHBERlQ73F6BLjQgGFNFrE_Gop/view?usp=drive_link"
    },
    {
      title: "Best Performer Award",
      organization: "Reccopilot",
      date: "2024",
      description: "Recognized as 'Best Performer' for outstanding contributions to AI workflow and backend integration, demonstrating exceptional technical skills and innovative problem-solving capabilities.",
      icon: Star,
      certificate: "https://drive.google.com/file/d/1rjzXMnqWNPcUUwYLgzdJPv5jJoAeIhWk/view?usp=drive_link"
    }
  ];

  return (
    <section ref={sectionRef} id="achievements" className="relative min-h-screen bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0a0a1f] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-500/5 to-indigo-500/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
              <Award className="text-violet-400" size={40} />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient">
              Recognition & Awards
            </h2>
          </div>
            <p className="text-lg sm:text-xl text-white/70 max-w-4xl mx-auto">
            Celebrating excellence and outstanding contributions in software engineering
          </p>
        </div>

          <div className="space-y-8 mb-16">
          {achievements.map((achievement, index) => (
            <AchievementItem
              key={index}
              {...achievement}
              index={index}
            />
          ))}
        </div>

        {/* Achievement Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
              { value: '3x', label: 'Excellence Awards', icon: Star },
            { value: '70+', label: 'Issues Resolved', icon: Award },
            { value: '5+', label: 'Major Features', icon: Trophy },
            { value: '100%', label: 'Dedication', icon: Crown }
          ].map((stat, index) => (
            <div
              key={index}
                className="text-center p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-xl border border-white/20 hover:border-violet-400/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20"
            >
                <stat.icon className="mx-auto mb-3 text-violet-400" size={32} />
              <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-white/60 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;