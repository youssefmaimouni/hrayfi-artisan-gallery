
import { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, Moon, Sun, LogIn, LogOut, User } from 'lucide-react';
import logoImg from '@/assets/hrayfia-logo.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/hooks/useTheme';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  const handleProfileClick = () => {
    const artisanId = localStorage.getItem('artisanId');
    if (artisanId) {
      navigate(`/artisan/${artisanId}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('artisanEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logoImg} 
              alt="Hrayfia Logo" 
              className="h-10 w-auto"
            />
            <span className="text-xs sm:text-sm text-muted-foreground hidden md:block">
              Authentic Moroccan Crafts
            </span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="hover:bg-accent"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {isAuthenticated ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-accent"
                  onClick={handleProfileClick}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-accent"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm" className="hover:bg-accent">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="px-2 py-4 space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="w-full justify-start hover:bg-accent"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
              
              {isAuthenticated ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start hover:bg-accent"
                    onClick={handleProfileClick}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start hover:bg-accent"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login" className="block">
                  <Button variant="ghost" size="sm" className="w-full justify-start hover:bg-accent">
                    <LogIn className="w-4 h-4 mr-2" />
                    Artisan Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
