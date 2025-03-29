'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import HospitalDetails from '../components/HospitalDetails';

interface BloodBank {
  id: string;
  name: string;
  location: string;
  rating: number;
  bloodInventory: {
    [key: string]: {
      total: number;
      available: number;
    };
  };
  services: string[];
  distance: string;
  contact: string;
  city: string;
  lastUpdated: string;
  isOpen24Hours: boolean;
}

const sections = [
  { id: 'all', name: 'All Sections' },
  { id: 'emergency', name: 'Emergency Services' },
  { id: 'donation', name: 'Blood Donation' },
  { id: 'storage', name: 'Blood Storage' },
  { id: 'testing', name: 'Blood Testing' },
  { id: 'research', name: 'Research' }
];

const cities = ["Dehradun"];

const bloodGroups = [
  "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"
];

const initialBloodBanks: BloodBank[] = [
  {
    id: '1',
    name: 'Doon Hospital Blood Bank',
    location: 'New Road, Near Clock Tower, Dehradun, Uttarakhand - 248001',
    rating: 4.1,
    bloodInventory: {
      'A+': { total: 50, available: 15 },
      'A-': { total: 30, available: 8 },
      'B+': { total: 45, available: 12 },
      'B-': { total: 25, available: 6 },
      'O+': { total: 60, available: 20 },
      'O-': { total: 35, available: 10 },
      'AB+': { total: 20, available: 5 },
      'AB-': { total: 15, available: 4 }
    },
    services: ['Whole blood storage', 'Blood component separation', 'Emergency blood supply', 'Donor registration'],
    distance: '0.5',
    contact: '0135-2655422',
    city: 'Dehradun',
    lastUpdated: new Date().toISOString(),
    isOpen24Hours: true
  },
  {
    id: '2',
    name: 'HIHT Jolly Grant Blood Bank',
    location: 'Swami Ram Nagar, Jolly Grant, Dehradun, Uttarakhand - 248016',
    rating: 4.4,
    bloodInventory: {
      'A+': { total: 55, available: 18 },
      'A-': { total: 35, available: 10 },
      'B+': { total: 50, available: 15 },
      'B-': { total: 30, available: 8 },
      'O+': { total: 65, available: 22 },
      'O-': { total: 40, available: 12 },
      'AB+': { total: 25, available: 7 },
      'AB-': { total: 20, available: 6 }
    },
    services: ['24/7 blood donation camps', 'Rare blood group storage', 'Platelet separation', 'Transfusion services'],
    distance: '1.2',
    contact: '0135-2412081 to 86',
    city: 'Dehradun',
    lastUpdated: new Date().toISOString(),
    isOpen24Hours: true
  },
  {
    id: '3',
    name: 'ONGC Hospital Blood Bank',
    location: 'ONGC Colony, Kaulagarh Road, Dehradun, Uttarakhand - 248195',
    rating: 4.0,
    bloodInventory: {
      'A+': { total: 45, available: 12 },
      'A-': { total: 25, available: 6 },
      'B+': { total: 40, available: 10 },
      'B-': { total: 20, available: 5 },
      'O+': { total: 50, available: 15 },
      'O-': { total: 30, available: 8 },
      'AB+': { total: 15, available: 4 },
      'AB-': { total: 10, available: 3 }
    },
    services: ['Blood storage', 'Donor screening', 'Emergency transfusion', 'Plasma exchange'],
    distance: '1.5',
    contact: '0135-2795887',
    city: 'Dehradun',
    lastUpdated: new Date().toISOString(),
    isOpen24Hours: true
  },
  {
    id: '4',
    name: 'Army Hospital Blood Bank',
    location: 'Clement Town, Dehradun, Uttarakhand - 248002',
    rating: 4.3,
    bloodInventory: {
      'A+': { total: 60, available: 20 },
      'A-': { total: 40, available: 12 },
      'B+': { total: 55, available: 18 },
      'B-': { total: 35, available: 10 },
      'O+': { total: 70, available: 25 },
      'O-': { total: 45, available: 15 },
      'AB+': { total: 30, available: 8 },
      'AB-': { total: 25, available: 7 }
    },
    services: ['Military personnel priority services', 'Whole blood reserves', 'Apheresis'],
    distance: '1.8',
    contact: '0135-2706520, 2706507',
    city: 'Dehradun',
    lastUpdated: new Date().toISOString(),
    isOpen24Hours: true
  },
  {
    id: '5',
    name: 'Chaabra Blood Bank',
    location: 'Chaabra Chowk, Saharanpur Road, Dehradun, Uttarakhand - 248001',
    rating: 3.9,
    bloodInventory: {
      'A+': { total: 40, available: 10 },
      'A-': { total: 20, available: 5 },
      'B+': { total: 35, available: 8 },
      'B-': { total: 15, available: 4 },
      'O+': { total: 45, available: 12 },
      'O-': { total: 25, available: 6 },
      'AB+': { total: 10, available: 3 },
      'AB-': { total: 8, available: 2 }
    },
    services: ['Voluntary donations', 'Blood group testing', 'Storage for thalassemia patients'],
    distance: '2.0',
    contact: '0135-2654134 / 2783504',
    city: 'Dehradun',
    lastUpdated: new Date().toISOString(),
    isOpen24Hours: false
  },
  {
    id: '6',
    name: 'Shri Mahant Indresh Hospital Blood Bank',
    location: 'Patel Nagar, Dehradun, Uttarakhand - 248001',
    rating: 4.2,
    bloodInventory: {
      'A+': { total: 50, available: 15 },
      'A-': { total: 30, available: 8 },
      'B+': { total: 45, available: 12 },
      'B-': { total: 25, available: 6 },
      'O+': { total: 60, available: 20 },
      'O-': { total: 35, available: 10 },
      'AB+': { total: 20, available: 5 },
      'AB-': { total: 15, available: 4 }
    },
    services: ['Blood component separation', 'Donor drives', 'Emergency reserves'],
    distance: '2.2',
    contact: '0135-2728107',
    city: 'Dehradun',
    lastUpdated: new Date().toISOString(),
    isOpen24Hours: true
  },
  {
    id: '7',
    name: 'IMA Blood Bank of Uttarakhand',
    location: 'Ballupur Road, Near Doon Hospital, Dehradun, Uttarakhand - 248001',
    rating: 4.0,
    bloodInventory: {
      'A+': { total: 45, available: 12 },
      'A-': { total: 25, available: 6 },
      'B+': { total: 40, available: 10 },
      'B-': { total: 20, available: 5 },
      'O+': { total: 55, available: 18 },
      'O-': { total: 30, available: 8 },
      'AB+': { total: 15, available: 4 },
      'AB-': { total: 10, available: 3 }
    },
    services: ['Community donor programs', 'Rare blood group registry'],
    distance: '2.4',
    contact: '9876543210',
    city: 'Dehradun',
    lastUpdated: new Date().toISOString(),
    isOpen24Hours: true
  },
  {
    id: '8',
    name: 'Parivartan Charitable Blood Centre',
    location: 'Haridwar Road, Near Rishikesh Bus Stand, Dehradun - 248001',
    rating: 4.5,
    bloodInventory: {
      'A+': { total: 55, available: 18 },
      'A-': { total: 35, available: 10 },
      'B+': { total: 50, available: 15 },
      'B-': { total: 30, available: 8 },
      'O+': { total: 65, available: 22 },
      'O-': { total: 40, available: 12 },
      'AB+': { total: 25, available: 7 },
      'AB-': { total: 20, available: 6 }
    },
    services: ['Free blood for BPL families', 'Donor awareness campaigns'],
    distance: '2.6',
    contact: '9756841230',
    city: 'Dehradun',
    lastUpdated: new Date().toISOString(),
    isOpen24Hours: true
  },
  {
    id: '9',
    name: 'Devbhoomi Blood Bank Dehradun',
    location: 'No. 94, Haridwar Road, Nehru Colony (Near LIC Building), Dehradun - 248001',
    rating: 4.6,
    bloodInventory: {
      'A+': { total: 60, available: 20 },
      'A-': { total: 40, available: 12 },
      'B+': { total: 55, available: 18 },
      'B-': { total: 35, available: 10 },
      'O+': { total: 70, available: 25 },
      'O-': { total: 45, available: 15 },
      'AB+': { total: 30, available: 8 },
      'AB-': { total: 25, available: 7 }
    },
    services: ['24/7 emergency supply', 'Mobile blood collection vans'],
    distance: '2.8',
    contact: '9412345678',
    city: 'Dehradun',
    lastUpdated: new Date().toISOString(),
    isOpen24Hours: true
  },
  {
    id: '10',
    name: 'Dehradun Charitable Blood Center',
    location: 'Old Nehru Colony, Laxmi Road, Dalanwala, Dehradun - 248001',
    rating: 4.2,
    bloodInventory: {
      'A+': { total: 45, available: 12 },
      'A-': { total: 25, available: 6 },
      'B+': { total: 40, available: 10 },
      'B-': { total: 20, available: 5 },
      'O+': { total: 50, available: 15 },
      'O-': { total: 30, available: 8 },
      'AB+': { total: 15, available: 4 },
      'AB-': { total: 10, available: 3 }
    },
    services: ['Blood group testing', 'Donor incentives', 'Pediatric transfusion'],
    distance: '3.0',
    contact: '9634512870',
    city: 'Dehradun',
    lastUpdated: new Date().toISOString(),
    isOpen24Hours: false
  }
];

export default function BloodAvailability() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [filterRating, setFilterRating] = useState('all');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedBankForDetails, setSelectedBankForDetails] = useState<BloodBank | null>(null);

  const filteredBloodBanks = initialBloodBanks
    .filter(bank => {
      const matchesCity = !selectedCity || bank.city === selectedCity;
      const matchesRating = filterRating === 'all' || bank.rating >= parseFloat(filterRating);
      let matchesBloodGroup = true;
      
      if (selectedBloodGroup && selectedBloodGroup !== 'all') {
        const bloodCount = bank.bloodInventory[selectedBloodGroup];
        matchesBloodGroup = bloodCount && bloodCount.available > 0;
      }
      
      return matchesCity && matchesRating && matchesBloodGroup;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'rating':
          return b.rating - a.rating;
        case 'beds':
          return b.bloodInventory[selectedBloodGroup || 'A+'].available - a.bloodInventory[selectedBloodGroup || 'A+'].available;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-[#1a1f3c] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">Blood Availability Tracker</h1>
          <p className="text-xl text-gray-300">Find blood banks and check blood availability in your area</p>
        </motion.div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-white/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Select City</label>
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Blood Group</label>
              <div className="relative">
                <select
                  value={selectedBloodGroup}
                  onChange={(e) => setSelectedBloodGroup(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
                >
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="rating">Rating</option>
                <option value="name">Name</option>
                <option value="distance">Distance</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBloodBanks.map((bank) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{bank.name}</h3>
                  <p className="text-gray-400">{bank.location}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-white">{bank.rating}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {Object.entries(bank.bloodInventory).map(([type, { total, available }]) => (
                  <div key={type} className="bg-white/5 rounded-lg p-3">
                    <div className="text-blue-400 font-medium mb-1">Type {type}</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-400">Total</div>
                        <div className="text-white">{total}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Available</div>
                        <div className="text-white">{available}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2">Available Sections</h4>
                <div className="flex flex-wrap gap-2">
                  {bank.services.map(service => (
                    <span
                      key={service}
                      className="px-2 py-1 bg-white/5 rounded-full text-xs text-gray-300"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <span>{bank.distance} away</span>
                  <span>Updated {bank.lastUpdated}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{bank.contact}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    bank.isOpen24Hours ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {bank.isOpen24Hours ? '24/7 Available' : 'Limited Hours'}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bank.location)}`, '_blank')}
                  className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Get Directions</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedBankForDetails(bank);
                    setShowDetails(true);
                  }}
                  className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Details</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredBloodBanks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No blood banks found matching your criteria</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search filters</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showDetails && selectedBankForDetails && (
          <HospitalDetails
            hospital={{
              id: selectedBankForDetails.id,
              name: selectedBankForDetails.name,
              location: selectedBankForDetails.location,
              rating: selectedBankForDetails.rating,
              beds: {
                total: Object.values(selectedBankForDetails.bloodInventory).reduce((acc, curr) => acc + curr.total, 0),
                available: Object.values(selectedBankForDetails.bloodInventory).reduce((acc, curr) => acc + curr.available, 0)
              },
              specialties: selectedBankForDetails.services,
              distance: selectedBankForDetails.distance,
              contact: selectedBankForDetails.contact,
              city: selectedBankForDetails.city
            }}
            onClose={() => {
              setShowDetails(false);
              setSelectedBankForDetails(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 