
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
      className={`transition-all duration-[1000ms] cubic-bezier(0.4, 0, 0.2, 1) transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-[#1A1A1A] rounded flex items-center justify-center text-[#B4833E] font-bold text-xl border border-[#B4833E]/30 shadow-inner">G</div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#1A1A1A] group-hover:text-[#B4833E] transition-colors leading-none uppercase">General</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B4833E] font-medium">Bookkeeping Co.</span>
          </div>
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#B4833E] transition-colors relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#B4833E] transition-all group-hover:w-full"></span>
            </a>
          ))}
          <button onClick={onBookNow} className="bg-[#1A1A1A] hover:bg-[#B4833E] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95">Consult Now</button>
        </nav>
        <button className="md:hidden text-slate-900 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle navigation menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-10 px-6 space-y-6 absolute top-full left-0 right-0 shadow-2xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="block text-xl font-serif text-[#1A1A1A] text-center" onClick={(e) => handleNavClick(e, link.href)}>{link.name}</a>
          ))}
          <button onClick={() => { onBookNow(); setMobileMenuOpen(false); }} className="w-full bg-[#1A1A1A] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest">Book Consultation</button>
        </div>
      )}
    </header>
  );
};

const Hero: React.FC<{ onBookNow: () => void }> = ({ onBookNow }) => {
  return (
    <div className="relative pt-40 pb-40 lg:pt-72 lg:pb-72 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[600px] h-[600px] bg-slate-50 rounded-full blur-[120px] opacity-40"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
            <span className="h-[1px] w-12 bg-[#B4833E]"></span>
            <span className="text-[#B4833E] text-[11px] font-bold tracking-[0.4em] uppercase">Trusted Financial Management</span>
          </div>
          <h1 className="text-6xl lg:text-9xl font-serif text-[#1A1A1A] leading-[1] mb-8">
            Expert Guidance. <br />
            <span className="italic">Simplified Books.</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-500 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
            General Bookkeeping Co. provides boutique accounting and tax strategies for small businesses and professionals across the Greater Toronto Area. We bring clarity to your compliance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
            <button onClick={onBookNow} className="bg-[#1A1A1A] hover:bg-[#B4833E] text-white text-sm px-10 py-5 rounded-lg font-bold uppercase tracking-widest transition-all shadow-2xl shadow-slate-100 active:scale-95">
              Request a Consultation
            </button>
            <a href="#services" className="bg-white hover:bg-slate-50 text-slate-900 text-sm px-10 py-5 rounded-lg font-bold uppercase tracking-widest transition-all border border-slate-200 flex items-center justify-center gap-3 group">
              Our Services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-[#B4833E]/5 rounded-full blur-[120px] -z-10"></div>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <section className="py-32 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-[8px] border-white ring-1 ring-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000" 
                alt="Executive financial documents representing professional bookkeeping" 
                className="w-full h-[500px] lg:h-[750px] object-cover object-center" 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-slate-200 rounded-full z-0 pointer-events-none opacity-50"></div>
          </div>
          <div className="lg:w-1/2">
            <span className="text-[#B4833E] text-[11px] font-bold tracking-[0.4em] uppercase mb-8 block">Legacy of Excellence</span>
            <h3 className="text-4xl lg:text-7xl font-serif text-[#1A1A1A] mb-10 leading-[1.1]">The Power of <br /><span className="italic">Expert Analysis.</span></h3>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed font-light">With nearly a decade of dedicated service in Mississauga and the GTA, General Bookkeeping Co. has built a reputation for meticulous accuracy and proactive financial planning. We empower our clients with data-driven confidence.</p>
            
            <div className="space-y-12">
              <div className="flex items-start gap-8 group">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0 text-[#B4833E] shadow-sm border border-slate-100 group-hover:bg-[#B4833E] group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#1A1A1A] mb-2 uppercase tracking-wide">CRA Compliance</h4>
                  <p className="text-slate-500 leading-relaxed text-sm font-light">We stay current with evolving Canadian tax laws to ensure your business remains perfectly compliant.</p>
                </div>
              </div>
              <div className="flex items-start gap-8 group">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0 text-[#B4833E] shadow-sm border border-slate-100 group-hover:bg-[#B4833E] group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#1A1A1A] mb-2 uppercase tracking-wide">Absolute Precision</h4>
                  <p className="text-slate-500 leading-relaxed text-sm font-light">Our detail-oriented approach means your records are always audit-ready and insightful.</p>
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
    { id: 'tax', title: 'Tax Strategy & Filing', description: 'Comprehensive planning for individuals and corporations to optimize returns and minimize liabilities.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    { id: 'bookkeeping', title: 'Full-Cycle Bookkeeping', description: 'Daily management of ledgers, reconciliations, and financial reporting with total transparency.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'payroll', title: 'Payroll & HST Services', description: 'Streamlined administration of employee deductions and sales tax reporting for modern operations.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
  ];
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#B4833E] font-bold uppercase tracking-[0.4em] text-[11px] mb-6 block">Our Core Capabilities</span>
          <h3 className="text-4xl lg:text-6xl font-serif text-[#1A1A1A] mb-8">Professional Services</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((s) => (
            <div key={s.id} className="bg-white p-12 rounded-2xl shadow-sm hover:shadow-3xl transition-all border border-slate-100 group hover:-translate-y-2 duration-500">
              <div className="w-16 h-16 bg-slate-50 rounded-lg flex items-center justify-center text-[#B4833E] mb-10 group-hover:bg-[#B4833E] group-hover:text-white transition-all duration-500">{s.icon}</div>
              <h4 className="text-2xl font-bold text-[#1A1A1A] mb-6 tracking-tight uppercase">{s.title}</h4>
              <p className="text-slate-500 leading-relaxed font-light text-sm">{s.description}</p>
              <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
                 <button className="text-[10px] font-bold uppercase tracking-widest text-[#B4833E] hover:text-black flex items-center gap-2">Details <span>→</span></button>
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
    <section className="py-32 bg-[#1A1A1A] text-white overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2">
            <span className="text-[#B4833E] font-bold uppercase tracking-[0.4em] text-[11px] mb-8 block">Connect</span>
            <h3 className="text-4xl lg:text-7xl font-serif mb-12 italic">Reach Our <br />Partners.</h3>
            <div className="space-y-12">
              <div className="flex items-start gap-8">
                <div className="w-12 h-12 bg-white/5 rounded flex items-center justify-center text-[#B4833E] border border-white/10 flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg></div>
                <div><h4 className="font-bold text-lg mb-2 uppercase tracking-wide">Primary Location</h4><p className="text-slate-400 font-light">Mississauga, Ontario, Canada</p></div>
              </div>
              <div className="flex items-start gap-8">
                <div className="w-12 h-12 bg-white/5 rounded flex items-center justify-center text-[#B4833E] border border-white/10 flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>
                <div><h4 className="font-bold text-lg mb-2 uppercase tracking-wide">Direct Line</h4><p className="text-slate-400 font-light">+1 (647) 385-6490</p></div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 bg-white rounded-2xl p-12 lg:p-20 text-[#1A1A1A] shadow-inner">
            <h4 className="text-3xl font-serif mb-4">Request a Consultation</h4>
            <p className="text-slate-400 font-light mb-10 text-sm">Submit your information for a confidential review of your situation.</p>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Request submitted."); }}>
               <div className="grid md:grid-cols-2 gap-6">
                 <input type="text" placeholder="Full Name" aria-label="Full Name" className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-lg focus:ring-1 focus:ring-[#B4833E] outline-none text-sm transition-all" />
                 <input type="email" placeholder="Business Email" aria-label="Email Address" className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-lg focus:ring-1 focus:ring-[#B4833E] outline-none text-sm transition-all" />
               </div>
               <textarea rows={4} placeholder="Specific Requirements..." aria-label="Requirements" className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-lg focus:ring-1 focus:ring-[#B4833E] outline-none text-sm transition-all"></textarea>
               <button className="w-full bg-[#1A1A1A] hover:bg-[#B4833E] text-white py-5 rounded-lg font-bold uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95">Send Request</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-white border-t border-slate-100 py-20 text-center md:text-left">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
        <div>
          <div className="flex items-center space-x-3 mb-6 justify-center md:justify-start">
             <div className="flex flex-col">
               <span className="text-xl font-bold tracking-tight text-[#1A1A1A] leading-none uppercase">General</span>
               <span className="text-[9px] uppercase tracking-[0.2em] text-[#B4833E] font-medium">Bookkeeping Co.</span>
             </div>
          </div>
          <p className="text-slate-400 text-sm font-light">Boutique financial intelligence for the Greater Toronto Area.</p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-6">
          <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.4em]">© {new Date().getFullYear()} General Bookkeeping Co.</p>
          <div className="flex gap-8 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
             <a href="#" className="hover:text-[#B4833E] transition-colors">Confidentiality Policy</a>
             <a href="#" className="hover:text-[#B4833E] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([{ role: 'ai', text: 'Welcome to General Bookkeeping Co. I am your automated financial concierge. How may I assist with your management or tax inquiry today?' }]);
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
        config: { systemInstruction: "You are the professional concierge for General Bookkeeping Co., a premium firm in Mississauga. Your tone is executive, precise, and highly capable. Provide general Canadian tax and bookkeeping guidance. Emphasize that for specific strategy, they must book a formal consultation with our principals." },
      });
      const aiText = res.text;
      setMessages(p => [...p, { role: 'ai', text: aiText || "I'm sorry, I couldn't process that request." }]);
    } catch (e) {
      setMessages(p => [...p, { role: 'ai', text: "Error connecting to our concierge. Please try again later." }]);
    } finally { setIsLoading(false); }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-[#1A1A1A] rounded-lg shadow-2xl flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 border-b-4 border-[#B4833E]" aria-label="Open AI financial assistant">
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[380px] h-[550px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 border border-slate-200">
          <div className="bg-[#1A1A1A] p-8 text-white border-b border-slate-800">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#B4833E] rounded flex items-center justify-center text-[10px] font-bold tracking-tighter shadow-inner">GBC</div>
                <div>
                   <h4 className="font-serif font-bold text-lg leading-tight tracking-tight">Financial Assistant</h4>
                   <p className="text-[10px] text-[#B4833E] font-bold uppercase tracking-[0.2em] mt-1">Status: Operational</p>
                </div>
             </div>
          </div>
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-[#1A1A1A] text-white shadow-lg' : 'bg-white text-slate-700 border border-slate-200 shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-[#B4833E] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#B4833E] rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-[#B4833E] rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>
          <div className="p-6 bg-white border-t border-slate-100 flex gap-3">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Confidential Inquiry..." aria-label="Chat input" className="flex-grow bg-slate-50 rounded-lg px-6 py-4 text-xs font-medium focus:ring-1 focus:ring-[#B4833E] outline-none transition-all placeholder:text-slate-300" />
            <button onClick={handleSend} disabled={isLoading} className="bg-[#1A1A1A] text-white w-12 h-12 flex items-center justify-center rounded-lg disabled:opacity-50 transition-transform active:scale-95 shadow-md">
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
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#B4833E] selection:text-white">
      <Header onBookNow={() => setIsConsultationOpen(true)} />
      <main className="flex-grow">
        <RevealSection id="home"><Hero onBookNow={() => setIsConsultationOpen(true)} /></RevealSection>
        <RevealSection id="about" className="bg-slate-50"><About /></RevealSection>
        <RevealSection id="services"><Services /></RevealSection>
        <RevealSection id="contact"><Contact /></RevealSection>
      </main>
      <Footer />
      <AIChatbot />
      {isConsultationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-3xl w-full max-w-2xl overflow-hidden relative border border-slate-200">
            <button onClick={() => setIsConsultationOpen(false)} className="absolute top-8 right-8 text-slate-300 hover:text-[#B4833E] transition-colors z-10" aria-label="Close modal"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            <div className="p-12 lg:p-20">
               <h3 className="text-4xl font-serif text-[#1A1A1A] mb-4 text-center">Consultation Request</h3>
               <p className="text-slate-400 font-light text-center mb-12 text-xs uppercase tracking-[0.4em]">Confidential Advisory Services</p>
               <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert("Consultation request sent."); setIsConsultationOpen(false); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#B4833E] ml-2">Full Name</label>
                        <input type="text" required placeholder="Name" aria-label="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-6 py-4 focus:ring-1 focus:ring-[#B4833E] outline-none text-sm transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#B4833E] ml-2">Email Address</label>
                        <input type="email" required placeholder="name@company.com" aria-label="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-6 py-4 focus:ring-1 focus:ring-[#B4833E] outline-none text-sm transition-all" />
                     </div>
                  </div>
                  <button type="submit" className="w-full bg-[#1A1A1A] text-white py-5 rounded-lg font-bold uppercase tracking-widest text-xs shadow-xl shadow-slate-100 hover:bg-[#B4833E] transition-all active:scale-95">Submit Request</button>
               </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><App /></React.StrictMode>);
