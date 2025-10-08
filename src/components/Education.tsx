import React, { useEffect, useRef } from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="education" className="relative min-h-screen bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0a0a1f] overflow-hidden">
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
              Education
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-4xl mx-auto">
              Academic foundation in engineering and technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className="flex items-start gap-6 mb-6">
                  <div className="p-4 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-xl border border-violet-400/30 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap size={32} className="text-violet-400" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-violet-200 transition-colors">
                      Bachelor of Technology in Mechanical Engineering
                    </h3>
                    <p className="text-violet-400 font-semibold text-lg mb-3">
                      Sree Dattha Institute of Engineering and Science
                    </p>
                    
                    <div className="flex flex-wrap gap-6 text-white/60 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>2019 – 2022</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>Hyderabad, India</span>
                      </div>
                      <div className="px-4 py-2 bg-violet-600/20 rounded-full border border-violet-500/30">
                        <span className="text-violet-300 font-medium">CGPA: 7.2 / 10</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-white/80 leading-relaxed">
                    Developed strong analytical and problem-solving skills through comprehensive engineering coursework. 
                    Gained foundational knowledge in mechanics, thermodynamics, and manufacturing processes.
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-violet-400">Key Learning Areas:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                        <span className="text-white/70 text-sm">Mechanical Design</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                        <span className="text-white/70 text-sm">Thermodynamics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                        <span className="text-white/70 text-sm">Manufacturing Processes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                        <span className="text-white/70 text-sm">Problem Solving</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className="flex items-start gap-6 mb-6">
                  <div className="p-4 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-xl border border-amber-400/30 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                      Self-Directed Learning
                    </h3>
                    <p className="text-amber-400 font-semibold text-lg mb-3">
                      Software Engineering Transition
                    </p>
                    <p className="text-white/60 text-sm mb-4">2022 - Present</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-white/80 leading-relaxed">
                    Transitioned from mechanical engineering to software development through self-directed learning, 
                    focusing on backend development, AI integration, and modern web technologies.
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-amber-400">Learning Journey:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        <span className="text-white/70 text-sm">C# and .NET Framework mastery</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        <span className="text-white/70 text-sm">AI/ML integration and LLM workflows</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        <span className="text-white/70 text-sm">Microservices architecture design</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        <span className="text-white/70 text-sm">Database optimization and performance tuning</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;