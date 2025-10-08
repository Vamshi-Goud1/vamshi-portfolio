
import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black py-12 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-3xl font-bold text-gradient tracking-tight">
              Vamshi<span className="text-white">.dev</span>
            </a>
            <p className="mt-2 text-white/60 max-w-sm">
              Software Engineer crafting scalable backend systems with AI integration and modern technologies.
            </p>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://github.com/Vamshi-Goud1" 
                target="_blank" 
                rel="noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/chintakatla-vamshi" 
                target="_blank" 
                rel="noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:goudvamshi798@gmail.com"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            © {currentYear} Vamshi Chinthakatla. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Background gradient */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;
