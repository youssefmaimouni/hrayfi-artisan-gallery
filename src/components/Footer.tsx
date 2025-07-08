import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';

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
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JLM ENSA Khouribga. All rights reserved.
          </div>
          <div className="text-sm text-muted-foreground">
            Visitors: {visitorCount.toLocaleString()}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;