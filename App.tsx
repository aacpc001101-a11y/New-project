
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { ConsultationForm } from './components/ConsultationForm';
import { Footer } from './components/Footer';
import { AIChatbot } from './components/AIChatbot';
import { useScrollReveal } from './hooks/useScrollReveal';

const RevealSection: React.FC<{ children: React.ReactNode; id: string }> = ({ children, id }) => {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <section id={id} ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      {children}
    </section>
  );
};

const App: React.FC = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const toggleConsultation = () => setIsConsultationOpen(!isConsultationOpen);

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      <Header onBookNow={toggleConsultation} />
      
      <main className="flex-grow">
        <RevealSection id="home">
          <Hero onBookNow={toggleConsultation} />
        </RevealSection>
        
        <RevealSection id="about">
          <About />
        </RevealSection>
        
        <RevealSection id="services">
          <Services />
        </RevealSection>
        
        <RevealSection id="contact">
          <Contact />
        </RevealSection>
      </main>

      <Footer />
      <AIChatbot />

      {/* Modal for Consultation */}
      {isConsultationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative">
            <button 
              onClick={toggleConsultation}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ConsultationForm onClose={toggleConsultation} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
