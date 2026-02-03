
import React from 'react';

interface HeroProps {
  onBookNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookNow }) => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-100 rounded-full blur-3xl opacity-50"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <span className="inline-block py-1 px-4 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Professional Tax & Bookkeeping Solutions
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Simplify Your Finances. <br />
            <span className="text-indigo-600">Empower Your Future.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
            D-Co Management Services provides expert personalized tax planning and bookkeeping for individuals and small businesses across the GTA. We take the stress out of your numbers so you can focus on what matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <button 
              onClick={onBookNow}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-4 rounded-xl font-bold transition-all shadow-xl hover:shadow-indigo-200 active:scale-95"
            >
              Book a Free Consultation
            </button>
            <a 
              href="#services"
              className="bg-white hover:bg-slate-50 text-slate-900 text-lg px-8 py-4 rounded-xl font-bold transition-all border border-slate-200 flex items-center justify-center gap-2 group"
            >
              Our Services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-4 lg:p-8 shadow-2xl overflow-hidden">
          <img 
            src="https://picsum.photos/1200/600?grayscale&blur=2" 
            alt="Financial Planning Office" 
            className="w-full h-[300px] lg:h-[500px] object-cover rounded-2xl shadow-inner"
          />
        </div>
      </div>
    </div>
  );
};
