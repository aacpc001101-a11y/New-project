
import { useEffect, useRef, useState } from 'react';

export const useScrollReveal = (threshold = 0.15) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once it's visible, we don't need to observe it anymore for the entrance animation
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { 
        threshold,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element fully enters
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};
