
import React from 'react';

interface HeroProps {
  onBookNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookNow }) => {
  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('services');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-40"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto lg:mx-0">
          <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            Professional Tax & Bookkeeping
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
            Simplify Your Finances. <br />
            <span className="text-indigo-600">Empower Your Future.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
            D-Co Management Services provides expert personalized tax planning and bookkeeping for individuals and small businesses across the GTA. We take the stress out of your numbers so you can focus on what matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button 
              onClick={onBookNow}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-200 hover:shadow-indigo-300 active:scale-95"
            >
              Book Free Consultation
            </button>
            <a 
              href="#services"
              onClick={scrollToServices}
              className="bg-white hover:bg-slate-50 text-slate-900 text-lg px-8 py-4 rounded-2xl font-bold transition-all border border-slate-200 flex items-center justify-center gap-2 group shadow-sm"
            >
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
          <img 
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000" 
            alt="Professional financial workspace" 
            className="w-full h-[300px] sm:h-[500px] lg:h-[700px] object-cover rounded-[1.8rem] shadow-inner"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};
