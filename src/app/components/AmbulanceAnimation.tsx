'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function AmbulanceAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const [animationData, setAnimationData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load animation data
    import('../../../public/animations/ambulance.json')
      .then(data => {
        setAnimationData(data.default);
      })
      .catch(err => {
        console.error('Error loading animation:', err);
        setError('Failed to load animation');
      });

    // Set timer to hide animation after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    console.error('Animation error:', error);
    return null;
  }

  if (!isVisible || !animationData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1f3c]">
      <div className="w-full max-w-2xl">
        <div className="aspect-video">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
} 