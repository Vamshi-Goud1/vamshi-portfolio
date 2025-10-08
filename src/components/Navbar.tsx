
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#portfolio' },
    { name: 'Experience', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Vamshi-Goud1' },
    { icon: Linkedin, href: 'https://linkedin.com/in/chintakatla-vamshi' },
    { icon: Mail, href: 'mailto:goudvamshi798@gmail.com' }
  ];

  return (
    <header 
      className={cn(
        'fixed top-4 left-4 right-4 z-50 transition-all duration-500 rounded-2xl',
        scrolled 
          ? 'bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl' 
          : 'bg-white/5 backdrop-blur-md border border-white/10'
      )}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <a href="#home" className="text-2xl font-bold tracking-tight">
          <span className="text-gradient">Vamshi</span><span className="text-white">.dev</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  className="relative text-white/80 hover:text-white transition-colors after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center space-x-4">
            <Button 
              asChild
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-6"
            >
              <a href="#contact">Let's Connect</a>
            </Button>
          </div>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 bg-black z-40 flex flex-col items-center justify-center p-8 md:hidden transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <ul className="flex flex-col items-center space-y-8 mb-12">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                className="text-2xl font-medium text-white/90 hover:text-gradient transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        
        <div className="flex items-center space-x-6">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <link.icon size={24} />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
