import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getGeminiApiKey } from '@/config/gemini';
import emailjs from '@emailjs/browser';
// Add asset imports with relative paths
import vamshiBotImage from '../assets/vamshi-bot.png';
import profilePhoto from '../assets/profile-photo.png';
import userImage from '../assets/user.png';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Vamshi. I can answer questions about my experience, skills, projects, and background. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // simple formatter: escape HTML, convert **bold** to <strong> and newlines to <br>
  const formatMessage = (text: string) => {
    if (!text) return '';
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    let out = esc(text);
    // bold **text**
    out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // line breaks
    out = out.replace(/\n/g, '<br/>');
    return out;
  };

  // Enhanced wave animation and floating effect for the bot image
  const waveAnimation = `
    @keyframes wave {
      0% { transform: rotate(0deg) scale(1); }
      10% { transform: rotate(14deg) scale(1.02); }
      20% { transform: rotate(-8deg) scale(1.01); }
      30% { transform: rotate(14deg) scale(1.02); }
      40% { transform: rotate(-4deg) scale(1.01); }
      50% { transform: rotate(10deg) scale(1.02); }
      60% { transform: rotate(0deg) scale(1); }
      100% { transform: rotate(0deg) scale(1); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-3px) rotate(1deg); }
      50% { transform: translateY(-6px) rotate(0deg); }
      75% { transform: translateY(-3px) rotate(-1deg); }
    }
    
    @keyframes glow {
      0%, 100% { filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2)) drop-shadow(0 0 12px rgba(139, 92, 246, 0.3)); }
      50% { filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2)) drop-shadow(0 0 20px rgba(139, 92, 246, 0.5)); }
    }
    
    .bot-wave {
      display: block;
      animation: float 3s ease-in-out infinite;
      animation-play-state: running;
      transform-origin: center center;
      transition: all 0.3s ease;
    }
    
    .chat-badge:hover .bot-wave, .chat-badge:focus .bot-wave, .chat-badge.active .bot-wave {
      animation: wave 2.5s ease-in-out infinite, float 3s ease-in-out infinite, glow 2s ease-in-out infinite;
      animation-play-state: running;
    }
    
    .bot-container {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .chat-badge:hover .bot-container {
      transform: scale(1.05);
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2)) !important;
      box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3), 0 0 0 2px rgba(255, 255, 255, 0.1);
    }
    
    .pulse-ring {
      animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    @keyframes pulse-ring {
      0% {
        transform: scale(0.8);
        opacity: 1;
      }
      80%, 100% {
        transform: scale(1.8);
        opacity: 0;
      }
    }
    
    .chat-badge:hover .chat-badge-tooltip, .chat-badge:focus .chat-badge-tooltip {
      opacity: 1 !important;
      transform: translateX(-50%) translateY(-10px) !important;
      visibility: visible !important;
    }
  `;

  // Typing indicator: three bouncing dots with improved animationy
  const TypingIndicator: React.FC = () => (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '4px 0' }}>
      <style>{`
        @keyframes typing-bounce { 
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4 } 
          40% { transform: translateY(-4px); opacity: 0.8 } 
        }
        .typing-dot { 
          width: 6px; 
          height: 6px; 
          border-radius: 50%; 
          background: #9CA3AF;
          display: inline-block;
          box-shadow: 0 0 2px rgba(156, 163, 175, 0.5);
        }
        .typing-dot.d1 { animation: typing-bounce 1s infinite ease-in-out; }
        .typing-dot.d2 { animation: typing-bounce 1s infinite ease-in-out 0.2s; }
        .typing-dot.d3 { animation: typing-bounce 1s infinite ease-in-out 0.4s; }
      `}</style>
      <div className="typing-dot d1" />
      <div className="typing-dot d2" />
      <div className="typing-dot d3" />
    </div>
  );

  // Bot badge with animated wave and tooltip
  const ChatBadge: React.FC = () => {
    // Reference for audio element
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    
    // State to track if tooltip should be shown
    const [showTooltip, setShowTooltip] = React.useState(true);
    
    // Effect to handle periodic tooltip display with sound
    React.useEffect(() => {
      // Show tooltip initially
      setShowTooltip(true);
      
      // Hide tooltip after 6 seconds
      const initialTimeout = setTimeout(() => {
        setShowTooltip(false);
      }, 6000);
      
      // Set up interval to show tooltip every 90 seconds (more frequent)
      const intervalId = setInterval(() => {
        setShowTooltip(true);
        
        // Play subtle notification sound
        if (audioRef.current) {
          audioRef.current.volume = 0.3; // Subtle volume
          audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
        
        // Hide tooltip after 6 seconds
        setTimeout(() => {
          setShowTooltip(false);
        }, 6000);
      }, 90000); // 90 seconds for more engagement
      
      // Clean up interval on component unmount
      return () => {
        clearInterval(intervalId);
        clearTimeout(initialTimeout);
      };
    }, []);
    
    return (
      <div 
        tabIndex={0} 
        aria-label="Chat with me" 
        style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', outline: 'none' }} 
        className="chat-badge"
        onMouseEnter={() => {
          setShowTooltip(true);
          // Play subtle hover sound
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 0.2;
            audioRef.current.play().catch(e => console.log("Hover audio failed:", e));
          }
        }}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div style={{ 
          width: 64, 
          height: 64, 
          borderRadius: '50%', 
          overflow: 'visible',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }} className="bot-container">
          <img 
            src={vamshiBotImage} 
            alt="Vamshi Bot" 
            style={{ 
              width: '90%', 
              height: '90%', 
              objectFit: 'contain', 
              background: 'transparent',
              borderRadius: '50%',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))'
            }} 
            className="bot-wave" 
          />
        </div>
        <div style={{ 
          position: 'absolute', 
          left: '50%',
          transform: showTooltip ? 'translateX(-50%) translateY(-15px) scale(1)' : 'translateX(-50%) translateY(-25px) scale(0.8)', 
          bottom: '100%', 
          marginBottom: 15, 
          padding: '12px 20px', 
          borderRadius: 25, 
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.95) 0%, rgba(59, 130, 246, 0.95) 100%)', 
          backdropFilter: 'blur(16px)', 
          color: '#fff', 
          fontSize: 14, 
          fontWeight: 600,
          lineHeight: '20px', 
          boxShadow: showTooltip ? '0 15px 40px rgba(139, 92, 246, 0.5), 0 5px 20px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : '0 4px 20px rgba(139, 92, 246, 0.2)', 
          opacity: showTooltip ? 1 : 0, 
          pointerEvents: 'none', 
          transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          zIndex: 1000,
          visibility: showTooltip ? 'visible' : 'hidden',
          border: '2px solid rgba(255, 255, 255, 0.25)',
          animation: showTooltip ? 'tooltip-glow 3s ease-in-out infinite, tooltip-float 2s ease-in-out infinite' : 'none',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          minWidth: 'max-content'
        }} className="chat-badge-tooltip">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px', filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.3))' }}>👋</span>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Hey! I am Vamshi</span>
          </div>

        </div>
        {/* Audio element for notification sound - using a subtle notification tone */}
        <audio ref={audioRef} preload="auto">
          <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwgBEOa3O60jkQ=" type="audio/wav" />
        </audio>
        <style>{`
          @keyframes tooltip-glow {
            0%, 100% { 
              box-shadow: 0 20px 60px rgba(139, 92, 246, 0.6), 0 8px 32px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
            }
            50% { 
              box-shadow: 0 25px 80px rgba(139, 92, 246, 0.8), 0 12px 48px rgba(59, 130, 246, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4);
            }
          }
          
          @keyframes tooltip-float {
            0%, 100% { transform: translateX(-50%) translateY(-15px) scale(1); }
            50% { transform: translateX(-50%) translateY(-18px) scale(1.02); }
          }
          
          .chat-badge-tooltip {
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          }
          
          ${waveAnimation}
          .chat-badge { 
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .chat-badge:hover {
            transform: scale(1.05);
          }
        `}</style>
      </div>
    );
  };

  const baseQuestions = [
    "What's your experience with C# and .NET?",
    "Tell me about your AI projects",
    "What are your key achievements?",
    "What technologies do you specialize in?",
    "Tell me about your education"
  ];

  // Dynamic follow-up prompts based on conversation context
  const followUpPrompts = [
    "What's your experience with microservices?",
    "Tell me about your MongoDB projects",
    "How do you approach API development?",
    "What's your favorite programming language?",
    "Tell me about your recent projects",
    "What technologies are you learning?",
    "How do you handle complex integrations?",
    "What's your experience with AI/LLMs?",
    "Tell me about your problem-solving approach",
    "What's your experience with cloud platforms?",
    "How do you ensure code quality?",
    "What's your experience with team collaboration?"
  ];

  // Function to get random follow-up questions
  const getRandomFollowUps = (count = 3) => {
    const shuffled = [...followUpPrompts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // State to track if we should show follow-ups
  const [showFollowUps, setShowFollowUps] = useState(false);

  // Resume context data
  const resumeContext = `
    Vamshi Chinthakatla - Software Engineer & Backend Developer
    
    CONTACT INFORMATION:
    - Email: goudvamshi798@gmail.com
    - Phone: 7995182903
    - Location: Hyderabad, India
    - LinkedIn: linkedin.com/in/chintakatla-vamshi
    - GitHub: github.com/Vamshi-Goud1
    
    PROFESSIONAL EXPERIENCE:
    
    1. Reccopilot (Product-based Recruitment AI Platform) - Dec 2024–Present
       - Software Engineer
       - Engineered real-time, two-way ticketing integration with Ondesk platform using webhooks
       - Architected comprehensive analytics dashboard for user engagement and subscription metrics
       - Developed scalable RESTful APIs using C#, ASP.NET, and Microservices
       - Designed AI-driven task orchestration using LLMs and advanced prompt engineering
       - Led integration of multiple external job boards (Dice, Monster, TechFetch)
       - Resolved 70+ bugs and implemented 5+ user stories and 2 major features
       - Wrote comprehensive unit tests using NUnit for controllers and service layers
       - Received "Best Performer" award for outstanding contributions to AI workflow and backend integration
    
    2. OnBlick (HRMS & Immigration SaaS Platform) - Sep 2023–Nov 2024
       - Software Engineer (Full-time) — Former Intern
       - Started as intern, gained foundations in API tracing, bug fixing, and MVC code refactoring
       - Progressed to backend development, enhancing API performance by optimizing logic
       - Worked on OBMS (Onboarding Microservice) project for U.S. employee onboarding workflows
       - Implemented Document Collection APIs and Column Setting configurations
       - Wrote unit test cases ensuring functionality, maintainability, and regression safety
    
    TECHNICAL SKILLS:
    
    Languages & Databases:
    - C# (95% proficiency)
    - Java (85% proficiency)
    - JavaScript (90% proficiency)
    - SQL (88% proficiency)
    - HTML/CSS (85% proficiency)
    - MongoDB (90% proficiency)
    - Redis (82% proficiency)
    - React.js (85% proficiency)
    - Vue.js (80% proficiency)
    - Elasticsearch (75% proficiency)
    
    Backend & Frameworks:
    - ASP.NET (95% proficiency)
    - .NET MVC (90% proficiency)
    - REST APIs (92% proficiency)
    - Microservices (88% proficiency)
    - Middleware (85% proficiency)
    - Integrations (87% proficiency)
    
    AI & LLM Development:
    - OpenAI API (90% proficiency)
    - Google Gemini (88% proficiency)
    - Prompt Engineering (92% proficiency)
    - Vector DB (85% proficiency)
    
    Tools & Platforms:
    - Git & GitHub (92% proficiency)
    - Visual Studio (95% proficiency)
    - Docker (85% proficiency)
    - Postman (90% proficiency)
    - NUnit (88% proficiency)
    - Vercel (82% proficiency)
    - Firebase (80% proficiency)
    
    PROJECTS:
    
    1. AI-Powered Student Career Assistant (2025)
       - Tech: Gemini, Firebase, Vercel
       - Live Link: https://roadmap-generator-ykxd.vercel.app
       - AI-based web app for college students seeking career guidance
       - Implemented roadmap generator providing detailed learning paths
       - Built resume keyword extractor analyzing job descriptions
       - Enabled user authentication and data persistence using Firebase
       - Integrated chat-style UI using Google Gemini LLM
    
    2. NaturalLangMetrics– AI-Powered Database Query API (2025)
       - Tech: .NET 9.0, Azure OpenAI, MongoDB, Docker
       - Developed .NET 9.0 Web API translating natural language to MongoDB queries
       - Engineered dual-phase AI process for query generation and result summarization
       - Built scalable RESTful API with dependency injection and error handling
       - Reduced manual query time by 80% and enhanced data accessibility
    
    3. FileStoreConnector– Universal Cloud Storage API (2025)
       - Tech: .NET 9.0, Google Drive & Dropbox APIs, OAuth2
       - Architected unified .NET 9.0 Web API for multi-cloud file management
       - Implemented full OAuth2 authorization flow and JWT with BCrypt hashing
       - Optimized for large file handling (100MB+) with memory-efficient streaming
       - Designed MongoDB backend for user data and OAuth2 token management
    
    EDUCATION:
    - Sree Dattha Institute of Engineering and Science
    - B.Tech in Mechanical Engineering
    - CGPA: 7.2/10
    - Years: 2019-2022
    - Location: Hyderabad, India
    
    ACHIEVEMENTS:
    1. Lei of Excellence Award – Employee of the Quarter (Q1 2025) at Reccopilot
    2. Lei of Excellence Award – Employee of the Quarter (Q2 2024) at Reccopilot
    3. Best Performer Award (2024) at Reccopilot
    
    Please provide helpful, accurate responses about Vamshi's background, experience, skills, and projects based on this information. Be conversational and professional.
  `;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // draggable state
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{startX:number,startY:number, origX:number, origY:number} | null>(null);
  const [chatPos, setChatPos] = useState<{left?: number; top?: number} | null>(null);
  
  // Reset position when chat is closed
  useEffect(() => {
    if (!isOpen) {
      setChatPos(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging || !dragRef.current) return;
      const clientX = e.clientX;
      const clientY = e.clientY;
      const dx = clientX - dragRef.current.startX;
      const dy = clientY - dragRef.current.startY;
      setChatPos({ left: dragRef.current.origX + dx, top: dragRef.current.origY + dy });
    };

    const onUp = () => {
      setDragging(false);
      dragRef.current = null;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // no TTS: interaction should be text-based and from Vamshi (first-person)

  // Add state for contact form
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Function to send email via EmailJS
  const sendEmail = async (name: string, email: string, message: string) => {
    setIsSending(true);
    try {
      // Initialize EmailJS with your public key
      emailjs.init("bj4GMvxttS64lbBiX");
      
      // Prepare email parameters
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: 'Vamshi',
        to_email: 'goudvamshi798@gmail.com'
      };
      
      // Send email using EmailJS
      await emailjs.send(
        'service_sjao55j', // Service ID
        'template_cxx1i59', // Template ID
        templateParams
      );
      
      // Reset form and show success message
      setContactInfo({ name: '', email: '', message: '' });
      setEmailSent(true);
      
      // Add confirmation message to chat
      const confirmationMessage: Message = {
        id: `email-${Date.now()}`,
        text: "Thanks for reaching out! I've received your message and will get back to you soon.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, confirmationMessage]);
      
      // Hide contact form and reset after delay
      setTimeout(() => {
        setShowContactForm(false);
        setEmailSent(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Add error message to chat
      const errorMessage: Message = {
        id: `email-error-${Date.now()}`,
        text: "Sorry, there was an issue sending your message. Please try again or contact goudvamshi798@gmail.com directly.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactInfo.name && contactInfo.email && contactInfo.message) {
      sendEmail(contactInfo.name, contactInfo.email, contactInfo.message);
    }
  };

  // Modified sendMessage function to detect contact requests
  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Check if user is asking to contact directly
    const contactKeywords = ['contact', 'email', 'direct message', 'reach out', 'get in touch', 'talk to you', 'speak with you'];
    const shouldShowContactForm = contactKeywords.some(keyword => 
      text.toLowerCase().includes(keyword)
    ) && !showContactForm;
    
    if (shouldShowContactForm) {
      // Show contact form option
      setTimeout(() => {
        setShowContactForm(true);
        scrollToBottom();
      }, 1000);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + getGeminiApiKey(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${resumeContext}

User Question: ${text}

INSTRUCTION: You are Vamshi. Answer in first-person as Vamshi (use "I", "my"). Do not say you are an AI assistant. Use the context above and respond conversationally and directly. Keep answers focused and helpful.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process your request at the moment. Please try again.";

      // Create the AI response message with streaming effect
      const streamId = `stream-${Date.now()}`;
      setStreamingMessageId(streamId);
      
      const aiMessage: Message = {
        id: streamId,
        text: '',
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);

      // Simulate streaming progressive reveal
      let cursor = 0;
      const revealInterval = 15; // ms per character
      const sanitized = aiResponse;

      const streamInterval = setInterval(() => {
        cursor += 1;
        const slice = sanitized.slice(0, cursor);
        
        setMessages(prev => prev.map(m => 
          m.id === streamId ? { ...m, text: slice } : m
        ));
        
        if (cursor >= sanitized.length) {
          clearInterval(streamInterval);
          setStreamingMessageId(null);
          setIsLoading(false);
          
          // Show follow-up prompts after AI response is complete
          setTimeout(() => {
            setShowFollowUps(true);
            scrollToBottom();
          }, 500);
        }
      }, revealInterval);

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later or contact Vamshi directly at goudvamshi798@gmail.com",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setStreamingMessageId(null);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const handleQuestionClick = (question: string) => {
    // Hide follow-ups when user asks a new question
    setShowFollowUps(false);
    sendMessage(question);
  };

  if (!isOpen) {
    return (
      <div 
        onClick={onToggle}
        className="fixed bottom-6 right-8 z-50 cursor-pointer group"
        style={{
          background: 'rgba(139, 92, 246, 0.2)',
          backdropFilter: 'blur(15px)',
          borderRadius: '50%',
          padding: '8px',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.2)',
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)';
          e.currentTarget.style.boxShadow = '0 12px 48px rgba(139, 92, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.2)';
        }}
      >
        <ChatBadge />
      </div>
    );
  }

  // Add contact form rendering when needed
  const renderContactForm = () => {
    if (!showContactForm) return null;
    
    return (
      <div className="p-4 border-t border-white/20 animate-in slide-in-from-bottom-2 duration-500">
        <div className="mb-3">
          <h3 className="text-white font-medium flex items-center gap-2">
            <Mail size={16} />
            Send me a direct message
          </h3>
          <p className="text-xs text-white/70 mt-1">
            I'll receive this directly in my inbox
          </p>
        </div>
        
        {emailSent ? (
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-center">
            <p className="text-green-300 text-sm">
              ✅ Message sent successfully!
            </p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={contactInfo.name}
                onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all duration-200 text-sm"
                disabled={isSending}
                required
              />
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Your email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all duration-200 text-sm"
                disabled={isSending}
                required
              />
            </div>
            
            <div>
              <textarea
                placeholder="Your message"
                value={contactInfo.message}
                onChange={(e) => setContactInfo({...contactInfo, message: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all duration-200 text-sm resize-none"
                disabled={isSending}
                required
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => setShowContactForm(false)}
                variant="outline"
                className="flex-1 text-xs py-2 border-white/20 hover:bg-white/10 text-white"
                disabled={isSending}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                className="flex-1 text-xs py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white disabled:opacity-50 transition-all duration-200"
                disabled={isSending || !contactInfo.name || !contactInfo.email || !contactInfo.message}
              >
                {isSending ? (
                  <span className="flex items-center gap-1">
                    <Loader2 size={14} className="animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Send size={14} />
                    Send
                  </span>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    );
  };

  return (
    <div 
      className="fixed bottom-6 right-8 w-96 h-[600px] bg-gradient-to-br from-[#0f0820]/95 to-[#131033]/85 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl z-50 flex flex-col animate-in slide-in-from-bottom-4 duration-300 chat-window"
      style={{
        ...(chatPos ? { left: chatPos.left, top: chatPos.top, right: 'auto', bottom: 'auto' } : {}),
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 border-b border-white/20 bg-gradient-to-r from-white/5 to-white/10 rounded-t-2xl backdrop-blur-sm"
        onMouseDown={(e) => {
          // start dragging
          const el = (e.currentTarget as HTMLDivElement).closest('.chat-window') as HTMLDivElement | null;
          if (!el) return;
          
          const rect = el.getBoundingClientRect();
          const startX = e.clientX;
          const startY = e.clientY;
          
          // If no custom position is set, use current fixed position
          const currentLeft = chatPos?.left ?? rect.left;
          const currentTop = chatPos?.top ?? rect.top;
          
          dragRef.current = { 
            startX, 
            startY, 
            origX: currentLeft, 
            origY: currentTop 
          };
          setDragging(true);
          e.preventDefault();
        }}
        style={{ cursor: dragging ? 'grabbing' : 'grab' }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={profilePhoto} 
              alt="Vamshi" 
              className="w-10 h-10 rounded-lg border border-white/20" 
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))'
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0f0820] animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Hi, I'm Vamshi</h3>
            <p className="text-xs text-white/70">I can answer questions about my experience, projects and skills.</p>
          </div>
        </div>
        <Button
          onClick={onToggle}
          variant="ghost"
          size="sm"
          className="text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-110"
        >
          <X size={16} />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 animate-in slide-in-from-bottom-2 duration-300",
              message.isUser ? "justify-end" : "justify-start"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
              {!message.isUser && (
                <div className="flex-shrink-0" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={vamshiBotImage} alt="V" style={{ width: 40, height: 40, borderRadius: 20 }} />
                </div>
              )}

              <div style={{
                maxWidth: '85%',
                padding: '12px 16px',
                borderRadius: 20,
                fontSize: 14,
                lineHeight: '20px',
                background: message.isUser ? '#4F46E5' : '#1E293B',
                color: message.isUser ? '#FFFFFF' : '#E2E8F0',
                boxShadow: message.isUser ? 'none' : '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                <div className="whitespace-pre-wrap text-sm" dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }} />
                <p className="text-xs mt-1" style={{ marginTop: 6, opacity: 0.5 }}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.isUser && (
                <div className="flex-shrink-0" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={userImage} alt="User" style={{ width: 40, height: 40, borderRadius: 20 }} />
                </div>
              )}
          </div>
        ))}
          {isLoading && !streamingMessageId && (
            <div className="flex items-start gap-3 animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex-shrink-0" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={vamshiBotImage} alt="V" style={{ width: 40, height: 40, borderRadius: 20 }} />
              </div>
              <div style={{
                maxWidth: '85%',
                padding: '12px 16px',
                borderRadius: 20,
                fontSize: 14,
                lineHeight: '20px',
                background: '#1E293B',
                color: '#E2E8F0',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                <TypingIndicator />
              </div>
            </div>
          )}
        <div ref={messagesEndRef} />
      </div>

      {/* Contact Form - Show when needed */}
      {renderContactForm()}

      {/* Follow-up Prompts - Show after AI response */}
      {showFollowUps && messages.length > 1 && !showContactForm && (
        <div className="p-4 border-t border-white/20 animate-in slide-in-from-bottom-2 duration-500">
          <p className="text-xs text-white/70 mb-3 flex items-center gap-2">
            <span>💡</span>
            <span>You might also ask:</span>
          </p>
          <div className="space-y-2">
            {getRandomFollowUps().map((question, index) => (
              <button
                key={`followup-${index}`}
                onClick={() => handleQuestionClick(question)}
                className="w-full text-left p-3 text-xs bg-white/5 hover:bg-white/10 rounded-xl text-white/80 hover:text-white transition-all duration-200 border border-white/10 hover:border-white/20 hover:scale-[1.02] transform"
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <span className="text-white/60 mr-2">→</span>
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Base Questions */}
      {messages.length === 1 && !showContactForm && (
        <div className="p-4 border-t border-white/20">
          <p className="text-xs text-white/60 mb-3">Try asking:</p>
          <div className="space-y-2">
            {baseQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(question)}
                className="w-full text-left p-2 text-xs bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      {!showContactForm && (
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/20 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about Vamshi's experience..."
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-3 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white disabled:opacity-50 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Chatbot;
