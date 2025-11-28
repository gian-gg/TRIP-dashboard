import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Features', href: '#features' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 shadow-sm backdrop-blur-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="TRIP"
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <span className="text-foreground text-lg font-bold tracking-tight md:text-xl">
              TRIP
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden items-center gap-3 md:flex">
            <Link to="/">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
            <a href="#contact">
              <Button size="lg" className="shadow-lg">
                Get Started
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader className="border-b">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 flex flex-col gap-4 p-4 py-0">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary text-muted-foreground rounded-lg p-2 text-base font-medium transition-colors hover:bg-white"
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button size="lg" variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button size="lg" className="w-full shadow-lg">
                  Get Started
                </Button>
              </a>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </motion.header>
  );
}
