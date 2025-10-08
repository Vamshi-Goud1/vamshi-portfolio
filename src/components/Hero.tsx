import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Briefcase, Code, Award, Zap } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.png';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { value: '1.5+', label: 'YEARS EXPERIENCE' },
    { value: '70+', label: 'ISSUES SOLVED' },
    { value: '5+', label: 'PROJECTS BUILT' },
    { value: '2x', label: 'RECOGNITION' }
  ];

  const badges = [
    { icon: Award, text: 'Employee of Quarter', gradient: 'from-amber-500/20 to-yellow-500/20 border-amber-500/30' },
    { icon: Code, text: 'Backend Developer', gradient: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' },
    { icon: Zap, text: 'API Specialist', gradient: 'from-purple-500/20 to-pink-500/20 border-purple-500/30' },
    { icon: Briefcase, text: 'Problem Solver', gradient: 'from-green-500/20 to-emerald-500/20 border-green-500/30' }
  ];

  const techStack = [
    'C# & .NET', 'ASP.NET Core', 'REST APIs', 'MongoDB',
    'React.js', 'JavaScript', 'Git & GitHub'
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0a0a1f]"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-500/5 to-indigo-500/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className={`space-y-6 lg:space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Greeting */}
            <div className="flex items-center gap-3 text-white/80 pt-4">
              <span className="text-2xl">👋</span>
              <span className="text-lg font-medium">Hello, I'm</span>
            </div>

            {/* Name with Gradient Blob */}
            <div className="relative">
              <div className="absolute -left-4 lg:-left-8 top-4 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-violet-500/30 to-indigo-500/30 rounded-full blur-3xl"></div>
              <h1 className="relative text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block text-gradient mb-2">Vamshi</span>
                <span className="block text-gradient">Chinthakatla</span>
              </h1>
            </div>

            {/* Title */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-violet-400 font-semibold">
              Software Engineer & Backend Developer
            </p>

            {/* Description */}
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
              Building robust backend systems with <span className="text-violet-400 font-semibold">C#/.NET</span> and modern web technologies. 
              Passionate about creating scalable solutions, API development, and exploring AI integration to solve real-world problems.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="transition-all duration-500 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/60 font-medium tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${badge.gradient} border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <badge.icon size={16} className="text-white/80" />
                  <span className="text-sm text-white/90 font-medium">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/40"
              >
                <a href="#portfolio" className="flex items-center justify-center gap-3">
                  <Briefcase size={18} />
                  View My Work
                </a>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-2 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:border-violet-400/50"
              >
                <a href="#contact" className="flex items-center justify-center gap-3">
                  <Code size={18} />
                  Get In Touch
                </a>
              </Button>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-3 pt-4">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 hover:text-white hover:border-violet-400/30 transition-all duration-300 hover:scale-105 cursor-default backdrop-blur-sm"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Simple Profile Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative group max-w-sm mx-auto lg:mx-0">
              {/* Simple Card */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl overflow-hidden">
                {/* Profile Image */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4">
                  <img 
                    src={profilePhoto} 
                    alt="Vamshi Chinthakatla"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Status */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">Available</span>
                  </div>
                  <span className="text-white/60">📍 Hyderabad</span>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;