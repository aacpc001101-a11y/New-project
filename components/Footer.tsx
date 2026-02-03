
import React from 'react';

export const Footer: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <a 
              href="#home" 
              onClick={(e) => handleScrollTo(e, '#home')}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                D-Co Management
              </span>
            </a>
            <p className="text-slate-500 leading-relaxed text-sm">
              Premium tax and bookkeeping services for individuals and corporations. Delivering precision and peace of mind since 2014.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '')}`} 
                    onClick={(e) => handleScrollTo(e, `#${item.toLowerCase().replace(' ', '')}`)}
                    className="text-slate-500 hover:text-indigo-600 transition-colors text-sm font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Services</h4>
            <ul className="space-y-4">
              {['Personal Tax', 'Corporate Tax', 'Bookkeeping', 'Payroll'].map((item) => (
                <li key={item}>
                  <a 
                    href="#services" 
                    onClick={(e) => handleScrollTo(e, '#services')}
                    className="text-slate-500 hover:text-indigo-600 transition-colors text-sm font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Newsletter</h4>
            <p className="text-slate-500 mb-4 text-sm">Stay updated with the latest tax tips and Canada Revenue Agency deadlines.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full text-sm shadow-sm"
              />
              <button className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-400 text-xs font-medium">
            © {new Date().getFullYear()} D-Co Management Services. Mississauga, Ontario.
          </p>
          <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-600 transition-colors" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors" onClick={(e) => e.preventDefault()}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
