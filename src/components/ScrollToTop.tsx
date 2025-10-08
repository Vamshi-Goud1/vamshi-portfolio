import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 left-8 z-50 p-4 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      style={{
        background: 'rgba(139, 92, 246, 0.2)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3), 0 0 20px rgba(139, 92, 246, 0.2)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)';
        e.currentTarget.style.boxShadow = '0 12px 48px rgba(139, 92, 246, 0.5), 0 0 30px rgba(139, 92, 246, 0.4)';
        e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.3), 0 0 20px rgba(139, 92, 246, 0.2)';
        e.currentTarget.style.transform = 'scale(1) translateY(0px)';
      }}
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} className="group-hover:animate-bounce" />
    </button>
  );
};

export default ScrollToTop;

