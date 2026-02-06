
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
interface NavLink {
  name: string;
  href: string;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Hooks ---
const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [threshold]);

  return { ref, isVisible };
};

// --- Components ---

const RevealSection: React.FC<{ children: React.ReactNode; id: string; className?: string }> = ({ children, id, className = "" }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section 
      id={id} 
      ref={ref} 
      className={`transition-all duration-[1200ms] cubic-bezier(0.4, 0, 0.2, 1) transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </section>
  );
};

const Header: React.FC<{ onBookNow: () => void }> = ({ onBookNow }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks: NavLink[] = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 font-serif italic font-bold text-xl transition-transform group-hover:scale-110 shadow-sm border border-rose-200">B</div>
          <span className="text-xl font-serif font-bold tracking-tight text-slate-900 group-hover:text-rose-500 transition-colors">Bookkeeping & Tax Service</span>
        </a>
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-sm font-medium text-slate-500 hover:text-rose-500 transition-colors relative group uppercase tracking-widest">
              {link.name}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-rose-300 transition-all group-hover:w-full"></span>
            </a>
          ))}
          <button onClick={onBookNow} className="bg-rose-500 hover:bg-rose-600 text-white px-7 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-rose-200 active:scale-95">Consultation</button>
        </nav>
        <button className="md:hidden text-slate-900 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-rose-50 py-10 px-6 space-y-6 absolute top-full left-0 right-0 shadow-2xl animate-in slide-in-from-top duration-300 text-center">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="block text-xl font-serif text-slate-800 hover:text-rose-500" onClick={(e) => handleNavClick(e, link.href)}>{link.name}</a>
          ))}
          <button onClick={() => { onBookNow(); setMobileMenuOpen(false); }} className="w-full bg-rose-500 text-white py-4 rounded-full font-bold text-sm uppercase tracking-widest">Book Consultation</button>
        </div>
      )}
    </header>
  );
};

const Hero: React.FC<{ onBookNow: () => void }> = ({ onBookNow }) => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-52 lg:pb-36 overflow-hidden bg-[#FCF9F9]">
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[700px] h-[700px] bg-rose-50 rounded-full blur-[140px] opacity-60"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[140px] opacity-40"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
          <span className="inline-block py-1.5 px-5 rounded-full bg-rose-50 text-rose-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-8 shadow-sm border border-rose-100">
            Expertly Curated Finances
          </span>
          <h1 className="text-5xl lg:text-8xl font-serif italic text-slate-900 leading-[1.1] mb-8">
            Elegance in <br /><span className="text-rose-400">Every Number.</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-500 mb-12 max-w-2xl leading-relaxed font-light">
            We provide boutique personalized tax planning and bookkeeping for visionary individuals and female-led businesses across the GTA. Bringing clarity, intuition, and precision to your financial world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
            <button onClick={onBookNow} className="bg-rose-500 hover:bg-rose-600 text-white text-sm px-10 py-5 rounded-full font-bold uppercase tracking-widest transition-all shadow-xl shadow-rose-200 active:scale-95">
              Request a Consultation
            </button>
            <a href="#services" className="bg-white/50 backdrop-blur-sm hover:bg-white text-slate-900 text-sm px-10 py-5 rounded-full font-bold uppercase tracking-widest transition-all border border-rose-100 flex items-center justify-center gap-3 group">
              Explore Services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-20 relative">
        <div className="bg-white/30 backdrop-blur-md p-3 rounded-[3rem] shadow-2xl shadow-rose-100 border border-white/40">
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000" 
            alt="Elegant financial workspace" 
            className="w-full h-[400px] sm:h-[600px] lg:h-[750px] object-cover rounded-[2.5rem] grayscale-[20%] sepia-[10%]" 
          />
        </div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-rose-200/50 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          <div className="lg:w-1/2 relative group">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[1px] border-rose-100">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=2000" alt="Founder" className="w-full h-[600px] lg:h-[800px] object-cover object-center transition-transform duration-[3000ms] group-hover:scale-105" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-rose-50 rounded-full z-0 blur-3xl opacity-80"></div>
            <div className="absolute top-10 right-10 w-20 h-20 bg-rose-400/10 rounded-full z-0"></div>
          </div>
          <div className="lg:w-1/2">
            <span className="inline-block py-1.5 px-5 rounded-full bg-rose-50 text-rose-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-8 shadow-sm">Female Founded</span>
            <h3 className="text-4xl lg:text-7xl font-serif italic text-slate-900 mb-10 leading-[1.2]">A Legacy of <br />Empowered <br /><span className="text-rose-400">Success.</span></h3>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed font-light">Founded with a vision to redefine financial services, our practice brings a unique blend of analytical rigor and personalized care to the Mississauga community. We don't just see numbers; we see the dreams and effort behind them.</p>
            
            <div className="space-y-12">
              <div className="flex items-start gap-8 group">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0 text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500 shadow-sm border border-rose-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-slate-900 mb-2">Artisan Precision</h4>
                  <p className="text-slate-500 leading-relaxed text-sm font-light">Meticulous attention to detail that ensures your CRA compliance is handled with grace and absolute accuracy.</p>
                </div>
              </div>
              <div className="flex items-start gap-8 group">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0 text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500 shadow-sm border border-rose-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-slate-900 mb-2">Modern Intuition</h4>
                  <p className="text-slate-500 leading-relaxed text-sm font-light">Proactive planning that anticipates deadlines and opportunities before they arise, keeping you ahead of the curve.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services: React.FC = () => {
  const services: ServiceItem[] = [
    { id: 'personal', title: 'Personal Tax Returns', description: 'Curating your returns with sophisticated attention to eligible credits and deductions.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { id: 'corp', title: 'Corporate Tax Planning', description: 'Strategic vision for visionary enterprises, optimizing your corporate tax position with elegance.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg> },
    { id: 'bookkeeping', title: 'Boutique Bookkeeping', description: 'A fluid and organized financial record. We handle your daily numbers so you can lead.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6" /></svg> },
  ];
  return (
    <section className="py-32 bg-[#FCF9F9]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-rose-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block italic">Our Specialized Services</span>
          <h3 className="text-4xl lg:text-6xl font-serif text-slate-900 mb-8 italic">Finely Tailored Solutions</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((s) => (
            <div key={s.id} className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all border border-rose-50 group hover:-translate-y-2 duration-500">
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-400 mb-10 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500 border border-rose-100">{s.icon}</div>
              <h4 className="text-2xl font-serif text-slate-900 mb-6 group-hover:text-rose-500 transition-colors">{s.title}</h4>
              <p className="text-slate-500 leading-relaxed font-light text-sm">{s.description}</p>
              <div className="mt-10 pt-8 border-t border-rose-50">
                 <button className="text-xs font-bold uppercase tracking-widest text-rose-400 hover:text-rose-600 flex items-center gap-2">Learn More <span className="text-lg">→</span></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-[#1C1C1C] rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-rose-100/10">
          <div className="lg:w-1/2 p-12 lg:p-24 text-white relative">
            <div className="absolute top-0 left-0 w-full h-full bg-rose-900/10 -z-10"></div>
            <h2 className="text-rose-300 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 italic">Connect With Us</h2>
            <h3 className="text-4xl lg:text-6xl font-serif italic mb-12">Let's Discuss <br />Your Vision.</h3>
            <div className="space-y-12">
              <div className="flex items-start gap-8">
                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-rose-300 border border-white/10 flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg></div>
                <div><h4 className="font-serif text-xl mb-2">The Studio</h4><p className="text-slate-400 font-light">1530 Fairway Hills Dr, Mississauga, ON L5M 7G2</p></div>
              </div>
              <div className="flex items-start gap-8">
                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-rose-300 border border-white/10 flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>
                <div><h4 className="font-serif text-xl mb-2">Direct Line</h4><p className="text-slate-400 font-light">+1 (647) 385-6490</p></div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 bg-[#F8F5F5] flex items-center justify-center p-12 min-h-[500px] relative overflow-hidden">
            <div className="absolute inset-0 bg-rose-50/30 -z-10"></div>
            <div className="text-center">
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-rose-100 shadow-2xl border border-rose-50">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                </div>
              </div>
              <h4 className="text-3xl font-serif italic text-slate-900 mb-4">Visit Our Practice</h4>
              <p className="text-slate-500 font-light mb-10 text-sm">Experience financial clarity in our <br />serene Fairway Hills studio.</p>
              <a href="https://www.google.com/maps/place/TrueLine+Bookkeeping/@43.5552737,-79.7046466,17z" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-rose-400 border border-rose-100 px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-sm hover:shadow-xl hover:bg-rose-500 hover:text-white transition-all duration-500">View Map</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ConsultationForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <div className="p-20 text-center animate-in fade-in">
        <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"><svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" /></svg></div>
        <h3 className="text-3xl font-serif italic text-slate-900 mb-6">Request Received.</h3>
        <p className="text-slate-500 font-light mb-10">Our specialists will reach out to curate your consultation shortly.</p>
        <button onClick={onClose} className="bg-rose-500 text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs">Close Window</button>
      </div>
    );
  }

  return (
    <div className="p-12 lg:p-20 bg-[#FCF9F9]">
      <h3 className="text-4xl font-serif italic text-slate-900 mb-4 text-center">Inquire</h3>
      <p className="text-slate-400 font-light text-center mb-12 text-sm uppercase tracking-[0.3em]">Boutique Financial Consultation</p>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
             <label className="text-[10px] font-bold uppercase tracking-widest text-rose-300 ml-2">Full Name</label>
             <input type="text" required placeholder="Johnathan Doe" className="w-full bg-white border border-rose-50 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-rose-200 outline-none transition-all placeholder:text-slate-200 text-sm" />
          </div>
          <div className="space-y-2">
             <label className="text-[10px] font-bold uppercase tracking-widest text-rose-300 ml-2">Email Address</label>
             <input type="email" required placeholder="hello@example.com" className="w-full bg-white border border-rose-50 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-rose-200 outline-none transition-all placeholder:text-slate-200 text-sm" />
          </div>
        </div>
        <button type="submit" className="w-full bg-rose-500 text-white py-5 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl shadow-rose-100 hover:bg-rose-600 transition-all active:scale-95">Send Request</button>
      </form>
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-white border-t border-rose-50 pt-32 pb-16 text-center md:text-left">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
      <div>
        <div className="flex items-center space-x-3 mb-6 justify-center md:justify-start">
          <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 font-serif italic font-bold text-2xl border border-rose-100 shadow-sm">B</div>
          <span className="text-2xl font-serif font-bold text-slate-900 italic">Bookkeeping & Tax Service</span>
        </div>
        <p className="text-slate-400 text-sm font-light italic">Boutique financial excellence in the heart of Mississauga.</p>
      </div>
      <div className="flex flex-col items-center md:items-end gap-6">
        {/* Social Media Buttons */}
        <div className="flex items-center gap-4">
          <a href="#" className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-sm border border-rose-100 group" aria-label="Instagram">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-sm border border-rose-100 group" aria-label="Facebook">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
            </svg>
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-sm border border-rose-100 group" aria-label="LinkedIn">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>
        <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.4em]">© {new Date().getFullYear()} Bookkeeping & Tax Practice</p>
        <div className="flex gap-8 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
           <a href="#" className="hover:text-rose-400">Privacy</a>
           <a href="#" className="hover:text-rose-400">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([{ role: 'ai', text: 'Welcome to our practice. I am your concierge assistant. How may I assist with your financial journey today?' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(p => [...p, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: { systemInstruction: "You are an elegant, professional concierge for a boutique, female-founded tax firm in Mississauga. Speak with grace and clarity. Provide general tax advice for Canada, but always invite them to book a formal consultation for personalized guidance." },
      });
      setMessages(p => [...p, { role: 'ai', text: res.text || "I'm sorry, I couldn't process that request." }]);
    } catch (e) {
      setMessages(p => [...p, { role: 'ai', text: "Apologies, I'm having trouble connecting right now." }]);
    } finally { setIsLoading(false); }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-rose-500 rounded-full shadow-2xl flex items-center justify-center text-white transition-all hover:scale-110 active:rotate-12 border-4 border-white/20">
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[380px] h-[550px] bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 border border-rose-50">
          <div className="rose-gradient p-8 text-slate-800 border-b border-rose-50 flex items-center gap-4">
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-rose-500 font-serif italic font-bold border border-rose-100">C</div>
             <div>
               <h4 className="font-serif font-bold italic text-lg">Concierge</h4>
               <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">Available Now</p>
             </div>
          </div>
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 bg-white/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-light leading-relaxed ${m.role === 'user' ? 'bg-rose-500 text-white rounded-tr-none' : 'bg-rose-50/50 text-slate-700 border border-rose-50 rounded-tl-none shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-rose-50/50 p-4 rounded-3xl rounded-tl-none border border-rose-50 flex gap-1 items-center">
                  <div className="w-1 h-1 bg-rose-300 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-rose-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1 h-1 bg-rose-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>
          <div className="p-6 bg-white border-t border-rose-50 flex gap-3">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Ask a question..." className="flex-grow bg-rose-50/30 rounded-full px-6 py-4 text-xs font-light focus:ring-1 focus:ring-rose-200 outline-none transition-all placeholder:text-slate-300" />
            <button onClick={handleSend} disabled={isLoading} className="bg-rose-500 text-white w-12 h-12 flex items-center justify-center rounded-full disabled:opacity-50 transition-transform active:scale-90">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- App Root ---
const App: React.FC = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F9] selection:bg-rose-100 selection:text-rose-800">
      <Header onBookNow={() => setIsConsultationOpen(true)} />
      <main className="flex-grow">
        <RevealSection id="home"><Hero onBookNow={() => setIsConsultationOpen(true)} /></RevealSection>
        <RevealSection id="about" className="bg-white"><About /></RevealSection>
        <RevealSection id="services"><Services /></RevealSection>
        <RevealSection id="contact"><Contact /></RevealSection>
      </main>
      <Footer />
      <AIChatbot />
      {isConsultationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden relative border border-rose-50">
            <button onClick={() => setIsConsultationOpen(false)} className="absolute top-8 right-8 text-slate-300 hover:text-rose-500 transition-colors z-10"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg></button>
            <ConsultationForm onClose={() => setIsConsultationOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><App /></React.StrictMode>);
