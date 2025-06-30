
import { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, Moon, Sun, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/hooks/useTheme';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-teal/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-terracotta to-teal bg-clip-text text-transparent">
              Hraifia
            </h1>
            <span className="text-sm text-muted-foreground hidden sm:block">
              Authentic Moroccan Crafts
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            {/* <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal/60 w-4 h-4" />
              <Input
                placeholder="Search for artisan products..."
                className="pl-10 pr-4 border-teal/30 focus:border-teal focus:ring-teal/20"
                aria-label="Search products"
              />
            </div> */}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-teal/10 hover:text-teal"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* <Button variant="ghost" size="icon" className="hover:bg-teal/10 hover:text-teal" aria-label="Favorites">
              <Heart className="w-5 h-5" />
            </Button> */}

            <Link to="/login">
              <Button variant="ghost" size="icon" className="hover:bg-terracotta/10 hover:text-terracotta" aria-label="Artisan Login">
                <LogIn className="w-5 h-5" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-teal/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal/60 w-4 h-4" />
            <Input
              placeholder="Search for artisan products..."
              className="pl-10 pr-4 border-teal/30 focus:border-teal focus:ring-teal/20"
              aria-label="Search products"
            />
          </div> */}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-teal/20 pt-4">
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-foreground hover:text-teal transition-colors py-2">
                Categories
              </a>
              <a href="#" className="text-foreground hover:text-teal transition-colors py-2">
                Artisans
              </a>
              <a href="#" className="text-foreground hover:text-teal transition-colors py-2">
                About
              </a>
              <a href="#" className="text-foreground hover:text-teal transition-colors py-2">
                Contact
              </a>
              <Link to="/login" className="text-foreground hover:text-terracotta transition-colors py-2">
                Artisan Login
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
