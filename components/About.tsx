
import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/800/1000" 
                alt="Accountant working" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-indigo-600 rounded-2xl z-0 -rotate-6"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-indigo-50 rounded-full z-0"></div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-indigo-600 font-bold uppercase tracking-wider text-sm mb-4">About D-Co Management</h2>
            <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
              Trusted Experts in Financial Management for Over a Decade.
            </h3>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Based in the heart of Mississauga, D-Co Management Services has established itself as a cornerstone for local entrepreneurs and individuals seeking clarity in their financial lives. 
            </p>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Our philosophy is simple: we treat your business as if it were our own. We don't just crunch numbers; we provide strategic insights that help you grow, save, and secure your financial future. Whether it's complex corporate tax filings or simple personal returns, our precision is unmatched.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0 text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">CRA Compliant</h4>
                  <p className="text-slate-500 text-sm">Always up-to-date with latest regulations.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0 text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Timely Filing</h4>
                  <p className="text-slate-500 text-sm">Never miss a deadline again.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
