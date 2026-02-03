
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <a href="#home" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                D-Co Management
              </span>
            </a>
            <p className="text-slate-500 leading-relaxed">
              Premium tax and bookkeeping services for individuals and corporations. Delivering precision and peace of mind since 2014.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-slate-500 hover:text-indigo-600 transition-colors">Home</a></li>
              <li><a href="#about" className="text-slate-500 hover:text-indigo-600 transition-colors">About Us</a></li>
              <li><a href="#services" className="text-slate-500 hover:text-indigo-600 transition-colors">Services</a></li>
              <li><a href="#contact" className="text-slate-500 hover:text-indigo-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors">Personal Tax</a></li>
              <li><a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors">Corporate Tax</a></li>
              <li><a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors">Bookkeeping</a></li>
              <li><a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors">Payroll</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Newsletter</h4>
            <p className="text-slate-500 mb-4">Stay updated with the latest tax tips and deadlines.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white border border-slate-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              />
              <button className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} D-Co Management Services. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
