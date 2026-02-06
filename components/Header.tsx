
import React, { useState, useEffect } from 'react';
import { NavLink } from '../types';

interface HeaderProps {
  onBookNow: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookNow }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const navLinks: NavLink[] = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center space-x-3 group"
        >
          {!logoError ? (
            <img 
              src="logo.png" 
              alt="Numeracy Accounting Solutions Logo" 
              className="h-10 lg:h-12 w-auto object-contain" 
              onError={() => setLogoError(true)} 
            />
          ) : (
            <div className="w-10 h-10 bg-[#1A1A1A] rounded flex items-center justify-center text-[#B4833E] font-bold text-xl border border-[#B4833E]/30">N</div>
          )}
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#1A1A1A] group-hover:text-[#B4833E] transition-colors leading-none">NUMERACY</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B4833E] font-medium">Accounting Solutions</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#B4833E] transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#B4833E] transition-all group-hover:w-full"></span>
            </a>
          ))}
          <button 
            onClick={onBookNow}
            className="bg-[#1A1A1A] hover:bg-[#B4833E] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95"
          >
            Book Consultation
          </button>
        </nav>

        <button 
          className="md:hidden text-slate-900 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-10 px-6 space-y-6 absolute top-full left-0 right-0 shadow-2xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="block text-xl font-serif text-[#1A1A1A] text-center hover:text-[#B4833E]"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => {
              onBookNow();
              setMobileMenuOpen(false);
            }}
            className="w-full bg-[#1A1A1A] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg"
          >
            Book Consultation
          </button>
        </div>
      )}
    </header>
  );
};
