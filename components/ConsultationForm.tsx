
import React, { useState } from 'react';

interface ConsultationFormProps {
  onClose: () => void;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-12 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Request Received!</h3>
        <p className="text-slate-600 mb-8">
          Thank you for reaching out. A specialist from D-Co Management Services will contact you within 24 hours to confirm your consultation.
        </p>
        <button 
          onClick={onClose}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all"
        >
          Close Window
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12">
      <h3 className="text-3xl font-bold text-slate-900 mb-2">Book Your Consultation</h3>
      <p className="text-slate-600 mb-8">Fill out the form below and we'll get back to you shortly.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Phone Number</label>
            <input 
              type="tel" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="(647) 000-0000"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Service Needed</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
              <option>Personal Tax Return</option>
              <option>Corporate Tax Services</option>
              <option>Bookkeeping</option>
              <option>Payroll & HST</option>
              <option>Business Consulting</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Message (Optional)</label>
          <textarea 
            rows={4}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Tell us a bit about your situation..."
          ></textarea>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-indigo-100"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};
