import { useEffect, useState } from 'react';
import { Linkedin, Instagram, Github } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import  logoJLM  from '@/assets/JLM2.png'; // Adjust the path as necessary

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Get current visitor count from localStorage
    const currentCount = parseInt(localStorage.getItem('visitorCount') || '0');
    const newCount = currentCount + 1;
    
    // Update visitor count
    localStorage.setItem('visitorCount', newCount.toString());
    setVisitorCount(newCount);
  }, []);

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6">
        <Separator className="mb-4" />
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JLM ENSA Khouribga. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.linkedin.com/company/jeunesleaders-ensakh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://www.instagram.com/jeunesleaders_ensakh/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://github.com/jeunesleaders-ensakh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <img src={logoJLM} alt="JLM Logo" className="h-8 w-auto" />
              <span className="text-sm text-muted-foreground">Powered by JLMENSAKH 2025</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Visitors: {visitorCount.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;