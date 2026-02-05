
import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-32">
          <div className="lg:w-1/2 relative group">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000" 
                alt="Professional consultation" 
                className="w-full h-[500px] lg:h-[750px] object-cover object-center transition-transform duration-[2000ms] group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-indigo-600 rounded-[3rem] z-0 -rotate-6 transition-transform group-hover:rotate-0 duration-700 shadow-2xl shadow-indigo-200"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-indigo-50 rounded-full z-0 pointer-events-none opacity-40"></div>
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
              Our Legacy
            </span>
            <h3 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-8 leading-[1.15]">
              Trusted Financial <br />Partners Since 2014.
            </h3>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Based in Mississauga, our Bookkeeping & Tax Service provides a personal touch to tax and accounting. We bridge the gap between complex government regulations and your unique financial goals.
            </p>
            <p className="text-lg text-slate-500 mb-12 leading-relaxed">
              Our team consists of dedicated professionals who specialize in the Canadian tax landscape. From CRA audit support to strategic corporate restructuring, we offer the depth of a large firm with the agility of a boutique consultancy.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-indigo-600 shadow-md group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xl mb-1">CRA Compliant</h4>
                  <p className="text-slate-500 leading-relaxed text-sm">Rigorous adherence to current tax codes and digital filing mandates.</p>
                </div>
              </div>
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-indigo-600 shadow-md group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xl mb-1">Always On Time</h4>
                  <p className="text-slate-500 leading-relaxed text-sm">Proactive scheduling ensures your submissions are early, every time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Small Business Night Section */}
        <div className="bg-slate-900 rounded-[4rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-slate-300">
          <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
            <span className="text-indigo-400 font-bold uppercase tracking-[0.2em] text-xs mb-8">Midnight Dedication</span>
            <h3 className="text-4xl lg:text-6xl font-bold text-white mb-10 leading-tight">
              Scaling Startups <br />With Confidence.
            </h3>
            <p className="text-slate-300 text-xl leading-relaxed mb-12 opacity-90">
              We know that as an entrepreneur, your best ideas often happen when the world is quiet. We provide the financial infrastructure that works as hard as you do, day or night.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {[
                "Real-time Expense Tracking",
                "Start-up Grant Consulting",
                "Incorporation Strategy",
                "Digital POS Connectivity"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-white text-lg font-semibold">
                  <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.6)]"></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 min-h-[500px] lg:min-h-[800px] relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000" 
              alt="Data driven financial analysis" 
              className="absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-70"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
