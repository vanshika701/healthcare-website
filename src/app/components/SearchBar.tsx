'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  title: string;
  description: string;
  link: string;
  category: 'blood' | 'bed' | 'organ' | 'hospital';
}

const searchData: SearchResult[] = [
  {
    title: 'Blood Bank Search',
    description: 'Find blood banks near you with real-time availability',
    link: '/blood-availability',
    category: 'blood'
  },
  {
    title: 'ICU Bed Tracker',
    description: 'Check ICU bed availability in hospitals',
    link: '/bed-availability',
    category: 'bed'
  },
  {
    title: 'Organ Donation',
    description: 'Register for organ donation or find donors',
    link: '/organ-donation',
    category: 'organ'
  },
  {
    title: 'Hospital Locator',
    description: 'Find hospitals in your area',
    link: '/hospitals',
    category: 'hospital'
  }
];

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'blood':
        return '🩸';
      case 'bed':
        return '🛏️';
      case 'organ':
        return '❤️';
      case 'hospital':
        return '🏥';
      default:
        return '🔍';
    }
  };

  return (
    <div ref={searchRef} className="relative max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for services..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-2 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <svg
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 shadow-xl overflow-hidden z-50"
          >
            {results.map((result, index) => (
              <motion.a
                key={index}
                href={result.link}
                className="block px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/10 last:border-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{getCategoryIcon(result.category)}</span>
                  <div>
                    <h4 className="text-white font-semibold">{result.title}</h4>
                    <p className="text-gray-400 text-sm">{result.description}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 