// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import { Button } from '../common/Button';
import { useTheme } from '@/components/ui/theme-context';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
    const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              API Visualizer
            </span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/visualizer" className="text-sm font-medium hover:text-primary">
              Visualizer
            </Link>
            <a
              href="https://github.com/yourusername/api-visualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-primary"
            >
              Documentation
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <a
              href="https://github.com/Sarthaklad1034/api-response-visualizer.git"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
