
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Download, X } from 'lucide-react';

const ResumeViewer: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl min-h-[600px] text-white">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Vamshi Chinthakatla</h1>
          <p className="text-lg text-violet-400">Software Engineer & Backend Developer</p>
        </div>
        <div className="text-right text-sm text-white/70">
          <p>goudvamshi798@gmail.com</p>
          <p>7995182903</p>
          <p>Hyderabad, India</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-violet-400 mb-3">Professional Summary</h2>
        <p className="text-white/80 leading-relaxed">
          Software Engineer with 1.5+ years of experience in building robust backend systems and integrating 
          cutting-edge AI technologies. Specializing in C#, ASP.NET, microservices architecture, and LLM workflows. 
          Recognized as "Best Performer" and "Employee of Quarter" for exceptional contributions.
        </p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-violet-400 mb-3">Work Experience</h2>
        
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-white">Software Engineer</h3>
              <p className="text-violet-400">Reccopilot (Product-based Recruitment AI Platform)</p>
            </div>
            <span className="text-sm text-white/60">Dec 2024 - Present</span>
          </div>
          <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
            <li>Engineered real-time ticketing integration with Ondesk platform using webhooks</li>
            <li>Architected comprehensive analytics dashboard for user engagement metrics</li>
            <li>Developed scalable RESTful APIs using C#, ASP.NET, and Microservices</li>
            <li>Designed AI-driven task orchestration using LLMs and prompt engineering</li>
            <li>Led integration of multiple external job boards (Dice, Monster, TechFetch)</li>
            <li>Resolved 70+ bugs and implemented 5+ user stories and 2 major features</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-white">Software Engineer (Full-time) — Former Intern</h3>
              <p className="text-violet-400">OnBlick (HRMS & Immigration SaaS Platform)</p>
            </div>
            <span className="text-sm text-white/60">Sep 2023 - Nov 2024</span>
          </div>
          <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
            <li>Enhanced API performance by optimizing logic and minimizing database hits</li>
            <li>Worked on OBMS (Onboarding Microservice) for U.S. employee workflows</li>
            <li>Implemented Document Collection APIs and Column Setting configurations</li>
            <li>Wrote comprehensive unit test cases using NUnit for functionality and regression safety</li>
          </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-violet-400 mb-3">Technical Skills</h2>
          <div className="space-y-2">
            <div>
              <h4 className="font-semibold text-white">Languages & Databases</h4>
              <p className="text-sm text-white/70">C#, Java, JavaScript, SQL, HTML/CSS, MongoDB, Redis, React.js, Vue.js, Elasticsearch</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Backend & Frameworks</h4>
              <p className="text-sm text-white/70">ASP.NET, .NET MVC, REST APIs, Microservices, Middleware, Integrations</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">AI & LLM Development</h4>
              <p className="text-sm text-white/70">OpenAI API, Google Gemini, Prompt Engineering, Vector DB</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Tools & Platforms</h4>
              <p className="text-sm text-white/70">Git, GitHub, Visual Studio, Docker, Postman, NUnit, Vercel, Firebase</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-violet-400 mb-3">Education & Achievements</h2>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-white">B.Tech Mechanical Engineering</h4>
              <p className="text-sm text-white/70">Sree Dattha Institute of Engineering and Science</p>
              <p className="text-sm text-white/70">2019-2022 | CGPA: 7.2/10</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Awards & Recognition</h4>
              <p className="text-sm text-white/70">• Employee of Quarter Q1 2025</p>
              <p className="text-sm text-white/70">• Employee of Quarter Q2 2024</p>
              <p className="text-sm text-white/70">• Best Performer Award</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResumeHighlights: React.FC = () => {
  const highlights = [
    { label: 'Years of Experience', value: '1.5+', description: 'Years' },
    { label: 'Issues Resolved', value: '70+', description: 'Bugs Fixed' },
    { label: 'Projects Built', value: '5+', description: 'Major Features' },
    { label: 'Awards Won', value: '3x', description: 'Excellence Awards' },
  ];

  return (
    <div className="space-y-6">
      {highlights.map((highlight, index) => (
        <div key={highlight.label} className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-lg p-6 border border-white/20 hover:scale-105 transition-all duration-300">
          <h4 className="text-sm text-white/60 mb-2">{highlight.label}</h4>
          <div className="text-2xl font-bold text-white mb-1">{highlight.value}</div>
          <p className="text-white/70 text-sm">{highlight.description}</p>
        </div>
      ))}
    </div>
  );
};

const Resume: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('opacity-100', 'translate-y-0');
                el.classList.remove('opacity-0', 'translate-y-10');
              }, index * 200);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="resume" ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0a0a1f] overflow-hidden">
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
              text="Resume"
              tag="h2"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              variant="gradient"
            />
            <p className="text-lg sm:text-xl text-white/70 max-w-4xl mx-auto">
              Comprehensive overview of my professional journey, skills, and achievements
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-8">
              <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-4 text-white">Resume Actions</h3>
                <p className="text-white/70 mb-6">
                  Preview or download my comprehensive resume with professional experience, skills, and education.
                </p>
                
                <div className="space-y-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 flex items-center justify-center gap-2">
                        <Eye size={18} />
                        Preview Resume
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0a0a1f] to-[#1a1a3e] border-white/20">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-white text-center">Resume Preview</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <ResumeViewer />
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <a 
                    href="https://drive.google.com/file/d/1Jc7xhl6-C7q806mwL3snShBb_ULa6L4g/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    Download PDF
                  </a>
                </div>
              </div>

              <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-4 text-white">Resume Highlights</h3>
                <ResumeHighlights />
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                <ResumeViewer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
