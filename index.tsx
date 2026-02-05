
import React, { useState, useEffect, useRef, useMemo } from 'react';
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
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
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
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">B</div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Bookkeeping & Tax Service</span>
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </a>
          ))}
          <button onClick={onBookNow} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95">Book Consultation</button>
        </nav>
        <button className="md:hidden text-slate-900 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-6 px-6 space-y-4 absolute top-full left-0 right-0 shadow-2xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="block text-lg font-bold text-slate-800 hover:text-indigo-600" onClick={(e) => handleNavClick(e, link.href)}>{link.name}</a>
          ))}
          <button onClick={() => { onBookNow(); setMobileMenuOpen(false); }} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg">Book Consultation</button>
        </div>
      )}
    </header>
  );
};

const Hero: React.FC<{ onBookNow: () => void }> = ({ onBookNow }) => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[120px] opacity-40"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto lg:mx-0">
          <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">Professional Tax & Bookkeeping</span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">Simplify Your Finances. <br /><span className="text-indigo-600">Empower Your Future.</span></h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">Our Bookkeeping & Tax Service provides expert personalized tax planning and bookkeeping for individuals and small businesses across the GTA. We take the stress out of your numbers so you can focus on what matters most.</p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button onClick={onBookNow} className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-200 active:scale-95">Book Free Consultation</button>
            <a href="#services" className="bg-white hover:bg-slate-50 text-slate-900 text-lg px-8 py-4 rounded-2xl font-bold transition-all border border-slate-200 flex items-center justify-center gap-2 group shadow-sm">
              Our Services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-8">
        <div className="bg-white p-2 sm:p-4 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
          <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000" alt="Professional workspace" className="w-full h-[300px] sm:h-[500px] lg:h-[700px] object-cover rounded-[1.8rem]" />
        </div>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-32">
          <div className="lg:w-1/2 relative group">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-slate-100">
              <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000" alt="Consultation" className="w-full h-[500px] lg:h-[750px] object-cover object-center transition-transform duration-[2000ms] group-hover:scale-110" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-indigo-600 rounded-[3rem] z-0 -rotate-6 transition-transform group-hover:rotate-0 duration-700 shadow-2xl"></div>
          </div>
          <div className="lg:w-1/2">
            <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">Our Legacy</span>
            <h3 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-8 leading-[1.15]">Trusted Financial <br />Partners Since 2014.</h3>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">Based in Mississauga, our Bookkeeping & Tax Service provides a personal touch to tax and accounting. We bridge the gap between complex government regulations and your unique financial goals.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div><h4 className="font-bold text-slate-900 text-xl mb-1">CRA Compliant</h4><p className="text-slate-500 leading-relaxed text-sm">Rigorous adherence to current tax codes and digital filing mandates.</p></div>
              </div>
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div><h4 className="font-bold text-slate-900 text-xl mb-1">Always On Time</h4><p className="text-slate-500 leading-relaxed text-sm">Proactive scheduling ensures your submissions are early, every time.</p></div>
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
    { id: 'personal', title: 'Personal Tax Returns', description: 'Maximizing your returns with meticulous attention to eligible credits and deductions.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { id: 'corp', title: 'Corporate Tax Planning', description: 'Strategic planning and filing for small and medium-sized corporations to optimize tax position.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg> },
    { id: 'bookkeeping', title: 'Full-Cycle Bookkeeping', description: 'Accurate and organized financial records. We handle your daily entries and reconciliations.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6" /></svg> },
  ];
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-indigo-600 font-bold uppercase tracking-wider text-sm mb-4">Our Expertise</h2>
          <h3 className="text-4xl font-extrabold text-slate-900 mb-6">Comprehensive Financial Solutions</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.id} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group hover:-translate-y-1 duration-300">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">{s.icon}</div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">{s.title}</h4>
              <p className="text-slate-600 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-8 lg:p-16 text-white">
            <h2 className="text-indigo-400 font-bold uppercase tracking-wider text-sm mb-4">Contact Us</h2>
            <h3 className="text-4xl font-extrabold mb-8">Get In Touch With Our Experts</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-indigo-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg></div>
                <div><h4 className="font-bold text-lg mb-1">Location</h4><p className="text-slate-400">1530 Fairway Hills Dr, Mississauga, ON L5M 7G2</p></div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-indigo-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>
                <div><h4 className="font-bold text-lg mb-1">Call Us</h4><p className="text-slate-400">+1 (647) 385-6490</p></div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 bg-slate-100 flex items-center justify-center p-8">
            <div className="text-center">
              <h4 className="text-xl font-bold text-slate-900 mb-6">Find Us on Google Maps</h4>
              <a href="https://www.google.com/maps/place/TrueLine+Bookkeeping/@43.5552737,-79.7046466,17z" target="_blank" rel="noopener noreferrer" className="inline-block bg-white border border-slate-200 px-8 py-3 rounded-xl font-bold text-indigo-600 shadow-sm hover:shadow-md transition-all">Open Map View</a>
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
      <div className="p-12 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Request Received!</h3>
        <p className="text-slate-600 mb-8">A specialist from our team will contact you within 24 hours.</p>
        <button onClick={onClose} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold">Close</button>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12">
      <h3 className="text-3xl font-bold text-slate-900 mb-2">Book Your Consultation</h3>
      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" required placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all" />
          <input type="email" required placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-100">Submit Request</button>
      </form>
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-slate-50 border-t border-slate-200 pt-24 pb-12 text-center md:text-left">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div>
        <div className="flex items-center space-x-2 mb-4 justify-center md:justify-start">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">B</div>
          <span className="text-xl font-bold text-slate-900">Bookkeeping & Tax Service</span>
        </div>
        <p className="text-slate-500 text-sm">Professional personal and corporate tax and bookkeeping services since 2014.</p>
      </div>
      <p className="text-slate-400 text-xs">© {new Date().getFullYear()} Bookkeeping & Tax Service. Mississauga, Ontario.</p>
    </div>
  </footer>
);

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([{ role: 'ai', text: 'Hello! How can I help you with your tax or bookkeeping questions today?' }]);
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
        config: { systemInstruction: "Professional financial assistant for a boutique tax firm in Mississauga. Provide concise general tax advice. Remind users to book a formal consultation for specifics." },
      });
      setMessages(p => [...p, { role: 'ai', text: res.text || "I'm sorry, I couldn't process that." }]);
    } catch (e) {
      setMessages(p => [...p, { role: 'ai', text: "Error connecting to AI assistant." }]);
    } finally { setIsLoading(false); }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white transition-all hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg></button>
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
          <div className="bg-indigo-600 p-4 text-white font-bold">Financial Assistant</div>
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Ask a question..." className="flex-grow bg-slate-100 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500" />
            <button onClick={handleSend} disabled={isLoading} className="bg-indigo-600 text-white p-2 rounded-xl disabled:opacity-50">Send</button>
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
    <div className="min-h-screen flex flex-col bg-slate-50">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative">
            <button onClick={() => setIsConsultationOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            <ConsultationForm onClose={() => setIsConsultationOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><App /></React.StrictMode>);
