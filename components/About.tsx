
import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-32">
          <div className="lg:w-1/2 relative group">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000" 
                alt="Professional team meeting in a high-end office environment" 
                className="w-full h-[500px] lg:h-[750px] object-cover object-center transition-transform duration-[2000ms] group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#B4833E] rounded-[3rem] z-0 -rotate-6 transition-transform group-hover:rotate-0 duration-700 shadow-2xl shadow-slate-200"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-slate-100 rounded-full z-0 pointer-events-none opacity-40"></div>
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <span className="inline-block py-1.5 px-4 rounded-full bg-slate-50 text-[#B4833E] text-xs font-bold tracking-widest uppercase mb-6 shadow-sm border border-slate-100">
              Our Legacy
            </span>
            <h3 className="text-4xl lg:text-6xl font-serif text-[#1A1A1A] mb-8 leading-[1.15]">
              Trusted Financial <br />Partners Since 2014.
            </h3>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed font-light">
              Numeracy Accounting Solutions provides a personal touch to tax and accounting. We bridge the gap between complex government regulations and your unique financial goals.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-[#B4833E] shadow-sm group-hover:bg-[#B4833E] group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-xl mb-1 uppercase tracking-tight">CRA Compliant</h4>
                  <p className="text-slate-500 leading-relaxed text-sm font-light">Rigorous adherence to current tax codes and digital filing mandates.</p>
                </div>
              </div>
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-[#B4833E] shadow-sm group-hover:bg-[#B4833E] group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-xl mb-1 uppercase tracking-tight">Absolute Precision</h4>
                  <p className="text-slate-500 leading-relaxed text-sm font-light">Proactive scheduling ensures your submissions are accurate and early, every time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
