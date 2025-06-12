
import { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/hooks/useTheme';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border header-moroccan">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-terracotta via-golden to-deep-blue rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-background rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-terracotta via-golden to-deep-blue bg-clip-text text-transparent">
                حرفي Hrayfi
              </h1>
              <span className="text-xs text-muted-foreground hidden sm:block">
                الحرف المغربية الأصيلة • Authentic Moroccan Crafts
              </span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="ابحث عن منتجات حرفية... Search for artisan products..."
                className="pl-10 pr-4 bg-background/50 border-border/50 focus:border-primary/50"
                aria-label="Search products"
              />
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-terracotta/10 via-transparent to-golden/10 pointer-events-none"></div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-accent/50 transition-colors duration-300"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-accent/50 transition-colors duration-300"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-accent/50 transition-colors duration-300 relative"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-terracotta to-golden text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-accent/50 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="ابحث عن منتجات حرفية..."
              className="pl-10 pr-4 bg-background/50 border-border/50"
              aria-label="Search products"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 moroccan-pattern">
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2 px-2 rounded hover:bg-accent/20">
                الفئات • Categories
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2 px-2 rounded hover:bg-accent/20">
                الحرفيون • Artisans
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2 px-2 rounded hover:bg-accent/20">
                حولنا • About
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2 px-2 rounded hover:bg-accent/20">
                اتصل بنا • Contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
