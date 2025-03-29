'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface OrganAd {
  id: number;
  organ: string;
  bloodType: string;
  urgency: 'High' | 'Medium' | 'Low';
  location: string;
  contact: string;
  image: string;
  description: string;
  hospital: string;
  age: string;
}

const sampleAds: OrganAd[] = [
  {
    id: 1,
    organ: 'Kidney',
    bloodType: 'O+',
    urgency: 'High',
    location: 'New York',
    contact: 'Contact: +1 (555) 123-4567',
    image: '/organs/kidney.png',
    description: 'Patient urgently needs a kidney transplant. Compatible donor needed within 48 hours.',
    hospital: 'Mount Sinai Hospital',
    age: '32 years'
  },
  {
    id: 2,
    organ: 'Liver',
    bloodType: 'A+',
    urgency: 'High',
    location: 'Los Angeles',
    contact: 'Contact: +1 (555) 234-5678',
    image: '/organs/liver.png',
    description: 'Critical liver transplant required. Patient in stable condition but deteriorating.',
    hospital: 'Cedars-Sinai Medical Center',
    age: '45 years'
  },
  {
    id: 3,
    organ: 'Heart',
    bloodType: 'B+',
    urgency: 'High',
    location: 'Chicago',
    contact: 'Contact: +1 (555) 345-6789',
    image: '/organs/heart.png',
    description: 'Emergency heart transplant needed. Patient on life support.',
    hospital: 'Northwestern Memorial Hospital',
    age: '28 years'
  },
  {
    id: 4,
    organ: 'Lungs',
    bloodType: 'AB+',
    urgency: 'Medium',
    location: 'Houston',
    contact: 'Contact: +1 (555) 456-7890',
    image: '/organs/lungs.png',
    description: 'Double lung transplant required. Patient stable but needs surgery within a week.',
    hospital: 'Houston Methodist Hospital',
    age: '55 years'
  },
  {
    id: 5,
    organ: 'Pancreas',
    bloodType: 'O-',
    urgency: 'Low',
    location: 'Phoenix',
    contact: 'Contact: +1 (555) 567-8901',
    image: '/organs/pancreas.png',
    description: 'Pancreas transplant needed. Patient managing with medication but requires surgery.',
    hospital: 'Banner University Medical Center',
    age: '41 years'
  },
  {
    id: 6,
    organ: 'Kidney',
    bloodType: 'A-',
    urgency: 'High',
    location: 'Boston',
    contact: 'Contact: +1 (555) 678-9012',
    image: '/organs/kidney.png',
    description: 'Urgent kidney transplant needed. Patient on dialysis and deteriorating.',
    hospital: 'Massachusetts General Hospital',
    age: '38 years'
  },
  {
    id: 7,
    organ: 'Liver',
    bloodType: 'B-',
    urgency: 'Medium',
    location: 'Seattle',
    contact: 'Contact: +1 (555) 789-0123',
    image: '/organs/liver.png',
    description: 'Liver transplant required. Patient stable but needs surgery within two weeks.',
    hospital: 'University of Washington Medical Center',
    age: '49 years'
  },
  {
    id: 8,
    organ: 'Heart',
    bloodType: 'AB-',
    urgency: 'High',
    location: 'Miami',
    contact: 'Contact: +1 (555) 890-1234',
    image: '/organs/heart.png',
    description: 'Critical heart transplant needed. Patient in critical condition.',
    hospital: 'Jackson Memorial Hospital',
    age: '33 years'
  }
];

export default function ScrollingAds() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % sampleAds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-lg p-4 shadow-xl border border-white/20 max-w-sm"
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white">Urgent Organ Donation Needed</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-2">
          <p className="text-white">
            <span className="font-semibold">Organ:</span> {sampleAds[currentAdIndex].organ}
          </p>
          <p className="text-white">
            <span className="font-semibold">Blood Type:</span> {sampleAds[currentAdIndex].bloodType}
          </p>
          <p className="text-white">
            <span className="font-semibold">Location:</span> {sampleAds[currentAdIndex].location}
          </p>
          <p className="text-white">
            <span className="font-semibold">Contact:</span> {sampleAds[currentAdIndex].contact}
          </p>
          <div className="flex items-center">
            <span className="font-semibold text-white mr-2">Urgency:</span>
            <span className={`px-2 py-1 rounded text-sm ${
              sampleAds[currentAdIndex].urgency === 'High' ? 'bg-red-500' :
              sampleAds[currentAdIndex].urgency === 'Medium' ? 'bg-yellow-500' :
              'bg-green-500'
            } text-white`}>
              {sampleAds[currentAdIndex].urgency.charAt(0).toUpperCase() + sampleAds[currentAdIndex].urgency.slice(1)}
            </span>
          </div>
        </div>
        <Link href="/organ-donation" className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors block text-center">
          Help Now
        </Link>
      </motion.div>
    </div>
  );
} 