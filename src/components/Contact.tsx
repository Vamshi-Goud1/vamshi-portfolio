
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AnimatedText from './AnimatedText';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Initialize EmailJS with your public key
      emailjs.init("bj4GMvxttS64lbBiX");
      
      // Prepare email parameters - matching exactly what your template expects
      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };
      
      // Send email using EmailJS with your service and template IDs
      await emailjs.send(
        'service_sjao55j', // Service ID
        'template_cxx1i59', // Template ID
        templateParams
      );
      
      // Show success toast
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact me directly at goudvamshi798@gmail.com",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: Github, 
      url: 'https://github.com/Vamshi-Goud1',
      color: 'hover:bg-white hover:text-black' 
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      url: 'https://linkedin.com/in/chintakatla-vamshi',
      color: 'hover:bg-[#0077B5] hover:text-white' 
    },
    { 
      name: 'Email', 
      icon: Mail, 
      url: 'mailto:goudvamshi798@gmail.com',
      color: 'hover:bg-[#EA4335] hover:text-white' 
    }
  ];
  
  return (
    <section id="contact" className="relative min-h-screen bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0a0a1f] overflow-hidden">
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
              text="Get In Touch"
              tag="h2"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              variant="gradient"
            />
            
            <AnimatedText 
              text="Have a project in mind or want to collaborate? I'd love to hear from you!"
              tag="p"
              className="max-w-4xl mx-auto text-lg sm:text-xl text-white/70 mt-6"
              delay={200}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <AnimatedText 
                text="Send Me a Message"
                tag="h3"
                className="text-2xl font-bold mb-6"
                delay={300}
              />
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/20 focus-visible:ring-violet-500 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/20 focus-visible:ring-violet-500 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What's this regarding?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/20 focus-visible:ring-violet-500 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[150px] bg-white/5 border-white/20 focus-visible:ring-violet-500 text-white placeholder:text-white/50"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 py-6 text-base shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/40"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </form>
            </div>
            
            <div>
              <AnimatedText 
                text="Connect With Me"
                tag="h3"
                className="text-2xl font-bold mb-6"
                delay={400}
              />
              
              <p className="text-white/70 mb-8 text-lg">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through any of the platforms below.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                {socialLinks.map((link, index) => (
                  <a 
                    key={link.name} 
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-xl border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20 ${link.color}`}
                  >
                    <link.icon size={32} className="mb-3" />
                    <span className="font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
              
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <AnimatedText 
                  text="Location"
                  tag="h4"
                  className="text-xl font-bold mb-4"
                  delay={500}
                />
                
                <p className="text-white/70 mb-6">
                  Based in Hyderabad, India, but available for remote work worldwide.
                </p>
                
                <div className="aspect-[16/9] overflow-hidden rounded-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.261317354889!2d78.367805415304!3d17.385044988085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebddfb%3A0xae77c3b0a562a701!2sHyderabad%2C%20Telangana%2C%20India!5e0!3m2!1sen!2s!4v1684321884407!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
