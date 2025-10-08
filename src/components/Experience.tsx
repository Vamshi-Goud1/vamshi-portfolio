import React, { useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react';

interface ExperienceItemProps {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  achievements?: string[];
  index: number;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  title,
  company,
  duration,
  location,
  description,
  achievements,
  index
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            (entry.target as HTMLElement).style.animationDelay = `${index * 150}ms`;
          }
        });
      },
      { threshold: 0.2 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className="opacity-0 group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative">
        <div className="flex items-start gap-6 mb-6">
          <div className="p-4 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-xl border border-violet-400/30 group-hover:scale-110 transition-transform duration-300">
            <Briefcase size={24} className="text-violet-400" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-violet-200 transition-colors">{title}</h3>
            <p className="text-violet-400 font-semibold text-lg mb-3">{company}</p>
            
            <div className="flex flex-wrap gap-6 text-sm text-white/60 mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {description.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white/80 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        {achievements && achievements.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Award size={20} className="text-amber-400" />
              <span className="text-amber-400 font-semibold text-lg">Key Achievements</span>
            </div>
            <div className="space-y-3">
              {achievements.map((achievement, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-amber-200/90 text-sm leading-relaxed">🏆 {achievement}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const experiences = [
    {
      title: "Software Engineer",
      company: "Reccopilot (Product-based Recruitment AI Platform)",
      duration: "Dec 2024 – Present",
      location: "Hyderabad, India",
      description: [
        "Engineered a real-time, two-way ticketing integration with the Ondesk platform using webhooks, enabling automated ticket creation and status synchronization that significantly improved support workflows.",
        "Architected and delivered a comprehensive analytics dashboard to visualize user engagement, subscription metrics, and platform performance, providing key data for strategic decisions.",
        "Developed and enhanced scalable RESTful APIs using C#, ASP.NET, and Microservices, forming the core of the backend infrastructure.",
        "Designed AI-driven task orchestration using LLMs and advanced prompt engineering to automate complex recruiter workflows and improve efficiency.",
        "Led the integration of multiple external job boards (Dice, Monster, TechFetch), creating a unified system for automated job posting and candidate sourcing."
      ],
      achievements: [
        "Recognized with the 'Best Performer' award for outstanding contributions to the AI workflow and backend integration.",
        "Successfully resolved over 70 bugs and implemented 5+ user stories and 2 major features from conception to deployment."
      ]
    },
    {
      title: "Software Engineer (Full-time) — Former Intern",
      company: "OnBlick (HRMS & Immigration SaaS Platform)",
      duration: "Sep 2023 – Nov 2024",
      location: "Hyderabad, India",
      description: [
        "Started as an intern, gaining strong foundations in API tracing via browser dev tools, bug fixing, and MVC code refactoring.",
        "Progressed to backend development, enhancing API performance by optimizing logic and minimizing database hits.",
        "Worked on OBMS (Onboarding Microservice) project targeted at U.S. employee onboarding workflows.",
        "Implemented core features including Document Collection APIs and Column Setting configurations.",
        "Wrote comprehensive unit test cases using NUnit to ensure functionality, maintainability, and regression safety."
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="experience" className="relative min-h-screen bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0a0a1f] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-500/5 to-indigo-500/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6">
              Professional Experience
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-4xl mx-auto">
              Building scalable solutions and driving innovation in software engineering
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceItem
                key={index}
                {...exp}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;