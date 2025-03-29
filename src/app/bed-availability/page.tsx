'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import HospitalReviews from '../components/HospitalReviews';
import ReportIssue from '../components/ReportIssue';
import PullToRefresh from '../components/PullToRefresh';
import HospitalDetails from '../components/HospitalDetails';

interface Hospital {
  id: string;
  name: string;
  location: string;
  rating: number;
  beds: {
    total: number;
    available: number;
  };
  specialties: string[];
  distance: string;
  contact: string;
  city: string;
  visitingHours: {
    general: string;
    icu: string;
  };
}

const cities = ["Dehradun"];

const allSpecialties = [
  "Cardiology",
  "Neurology",
  "Emergency Care",
  "Trauma",
  "Pediatrics",
  "Oncology",
  "Family Medicine",
  "Orthopedics",
  "Dental Care",
  "Mental Health",
  "Gastroenterology",
  "Urology",
  "Pulmonology",
  "Nephrology",
  "Gynecology",
  "ENT",
  "Ophthalmology",
  "Dermatology",
  "Psychiatry",
  "Ayurvedic Medicine"
];

const initialHospitals: Hospital[] = [
  {
    id: '1',
    name: 'AIIMS Rishikesh',
    location: 'Virbhadra Road, Shivaji Nagar, near Barrage, Sturida Colony, Rishikesh',
    rating: 4.3,
    beds: {
      total: 960,
      available: 120
    },
    specialties: ['Cardiology', 'Neurology', 'Gastroenterology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Nephrology', 'Urology', 'Pulmonology', 'General Surgery', 'Internal Medicine'],
    distance: '0.5',
    contact: '0135-2462933',
    city: 'Dehradun',
    visitingHours: {
      general: '10:00 AM - 12:00 PM and 4:00 PM - 6:00 PM',
      icu: '11:00 AM - 11:30 AM and 5:00 PM - 5:30 PM'
    }
  },
  {
    id: '2',
    name: 'Doon Medical College Hospital',
    location: 'New Road, Race Course, Dehradun',
    rating: 3.8,
    beds: {
      total: 500,
      available: 75
    },
    specialties: ['General Medicine', 'General Surgery', 'Orthopedics', 'Gynecology', 'Pediatrics', 'ENT', 'Ophthalmology', 'Dermatology', 'Psychiatry'],
    distance: '1.2',
    contact: '0135-2720027',
    city: 'Dehradun',
    visitingHours: {
      general: '9:30 AM - 11:30 AM and 4:00 PM - 7:00 PM',
      icu: '10:00 AM - 10:30 AM and 5:00 PM - 5:30 PM'
    }
  },
  {
    id: '3',
    name: 'Shri Mahant Indiresh Hospital',
    location: 'Patel Nagar, Dehradun',
    rating: 4.2,
    beds: {
      total: 750,
      available: 95
    },
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Nephrology', 'Orthopedics', 'Gastroenterology', 'Urology'],
    distance: '1.5',
    contact: '0135-6672600',
    city: 'Dehradun',
    visitingHours: {
      general: '10:00 AM - 12:00 PM and 4:00 PM - 7:00 PM',
      icu: '11:00 AM - 11:30 AM and 5:00 PM - 5:30 PM'
    }
  },
  {
    id: '4',
    name: 'Pandit Deen Dayal Upadhyay Govt Hospital',
    location: 'Haridwar Road, Dehradun',
    rating: 3.5,
    beds: {
      total: 200,
      available: 30
    },
    specialties: ['General Medicine', 'General Surgery', 'Orthopedics', 'Gynecology', 'Pediatrics', 'ENT'],
    distance: '1.8',
    contact: '0135-2712011',
    city: 'Dehradun',
    visitingHours: {
      general: '10:00 AM - 12:00 PM and 4:00 PM - 6:00 PM',
      icu: '10:30 AM - 11:00 AM and 5:00 PM - 5:30 PM'
    }
  },
  {
    id: '5',
    name: 'Uphc Bakralwala',
    location: 'Bakralwala, Dehradun',
    rating: 3.6,
    beds: {
      total: 25,
      available: 5
    },
    specialties: ['Primary Healthcare', 'General Medicine', 'Pediatrics', 'Obstetrics & Gynecology'],
    distance: '2.0',
    contact: '7895423610',
    city: 'Dehradun',
    visitingHours: {
      general: '9:00 AM - 11:00 AM and 4:00 PM - 6:00 PM',
      icu: 'Not available'
    }
  },
  {
    id: '6',
    name: 'Max Super Speciality Hospital',
    location: 'Mussoorie Diversion Road, Dehradun',
    rating: 4.5,
    beds: {
      total: 300,
      available: 45
    },
    specialties: ['Cardiology', 'Neurology', 'Gastroenterology', 'Orthopedics', 'Oncology', 'Pulmonology', 'Nephrology', 'Urology', 'Plastic Surgery'],
    distance: '2.2',
    contact: '0135-6673000',
    city: 'Dehradun',
    visitingHours: {
      general: '10:00 AM - 12:00 PM and 5:00 PM - 8:00 PM',
      icu: '11:00 AM - 11:30 AM and 6:00 PM - 6:30 PM'
    }
  },
  {
    id: '7',
    name: 'Doon Public Hospital',
    location: 'Circular Road, Clock Tower, Dehradun',
    rating: 3.7,
    beds: {
      total: 150,
      available: 25
    },
    specialties: ['General Medicine', 'General Surgery', 'Orthopedics', 'Gynecology', 'Pediatrics'],
    distance: '2.4',
    contact: '0135-2654321',
    city: 'Dehradun',
    visitingHours: {
      general: '9:30 AM - 11:30 AM and 4:30 PM - 7:30 PM',
      icu: '10:00 AM - 10:30 AM and 5:00 PM - 5:30 PM'
    }
  },
  {
    id: '8',
    name: 'Kanishk Surgical & Super Speciality Hospital',
    location: 'Saharanpur Road, Nehru Colony, Dehradun',
    rating: 4.0,
    beds: {
      total: 80,
      available: 15
    },
    specialties: ['General Surgery', 'Laparoscopic Surgery', 'Gastroenterology', 'Orthopedics', 'Urology'],
    distance: '2.6',
    contact: '8954672301',
    city: 'Dehradun',
    visitingHours: {
      general: '10:00 AM - 12:00 PM and 4:00 PM - 7:00 PM',
      icu: '11:00 AM - 11:30 AM and 5:00 PM - 5:30 PM'
    }
  },
  {
    id: '9',
    name: 'Arihant Hospital Super Speciality Centre',
    location: '18-Main Haridwar Road, Shastri Nagar, Dehradun',
    rating: 4.1,
    beds: {
      total: 120,
      available: 20
    },
    specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'General Surgery', 'Internal Medicine'],
    distance: '2.8',
    contact: '8477015555',
    city: 'Dehradun',
    visitingHours: {
      general: '10:00 AM - 12:00 PM and 4:00 PM - 7:00 PM',
      icu: '11:00 AM - 11:30 AM and 5:00 PM - 5:30 PM'
    }
  },
  {
    id: '10',
    name: 'Prakashdeep Hospital',
    location: 'GMS Road, Ballupur Chowk, Dehradun',
    rating: 4.2,
    beds: {
      total: 50,
      available: 8
    },
    specialties: ['Ophthalmology', 'Cataract Surgery', 'Retina Surgery', 'Cornea Transplant', 'Glaucoma Treatment'],
    distance: '3.0',
    contact: '9876543210',
    city: 'Dehradun',
    visitingHours: {
      general: '9:00 AM - 12:00 PM and 4:00 PM - 7:00 PM',
      icu: '10:00 AM - 10:30 AM and 5:00 PM - 5:30 PM'
    }
  },
  {
    id: '11',
    name: 'Baluni Hospital',
    location: 'Rajpur Road, Dehradun',
    rating: 3.9,
    beds: {
      total: 75,
      available: 12
    },
    specialties: ['General Medicine', 'General Surgery', 'Orthopedics', 'Gynecology'],
    distance: '3.2',
    contact: '9412058764',
    city: 'Dehradun',
    visitingHours: {
      general: '10:00 AM - 12:00 PM and 4:00 PM - 7:00 PM',
      icu: '11:00 AM - 11:30 AM and 5:00 PM - 5:30 PM'
    }
  },
  {
    id: '12',
    name: 'Medicare Hospital',
    location: 'Chakrata Road, Dehradun',
    rating: 4.0,
    beds: {
      total: 100,
      available: 18
    },
    specialties: ['Cardiology', 'General Medicine', 'Orthopedics', 'Gynecology', 'Pediatrics'],
    distance: '3.4',
    contact: '9897652341',
    city: 'Dehradun',
    visitingHours: {
      general: '9:30 AM - 11:30 AM and 4:30 PM - 7:30 PM',
      icu: '10:00 AM - 10:30 AM and 5:00 PM - 5:30 PM'
    }
  },
  {
    id: '13',
    name: 'SMI Hospital',
    location: 'Patel Nagar, Dehradun',
    rating: 4.2,
    beds: {
      total: 750,
      available: 95
    },
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Nephrology', 'Orthopedics', 'Gastroenterology', 'Urology'],
    distance: '3.6',
    contact: '0135-6672600',
    city: 'Dehradun',
    visitingHours: {
      general: '10:00 AM - 12:00 PM and 4:00 PM - 7:00 PM',
      icu: '11:00 AM - 11:30 AM and 5:00 PM - 5:30 PM'
    }
  },
  {
    id: '14',
    name: 'Ashirwad Hospital',
    location: 'Saharanpur Road, Majra, Dehradun',
    rating: 3.8,
    beds: {
      total: 60,
      available: 10
    },
    specialties: ['General Medicine', 'General Surgery', 'Orthopedics', 'Gynecology', 'Pediatrics'],
    distance: '3.8',
    contact: '7895632104',
    city: 'Dehradun',
    visitingHours: {
      general: '10:00 AM - 12:00 PM and 4:00 PM - 7:00 PM',
      icu: '11:00 AM - 11:30 AM and 5:00 PM - 5:30 PM'
    }
  },
  {
    id: '15',
    name: 'Uttaranchal Hospital',
    location: 'Rajpur Road, Dehradun',
    rating: 4.0,
    beds: {
      total: 120,
      available: 20
    },
    specialties: ['General Medicine', 'Cardiology', 'Neurology', 'Orthopedics', 'Gynecology'],
    distance: '4.0',
    contact: '8765439012',
    city: 'Dehradun',
    visitingHours: {
      general: '9:30 AM - 11:30 AM and 4:30 PM - 7:30 PM',
      icu: '10:00 AM - 10:30 AM and 5:00 PM - 5:30 PM'
    }
  },
  {
    id: '16',
    name: 'Healing Touch Hospital',
    location: 'Turner Road, Clement Town, Dehradun',
    rating: 4.1,
    beds: {
      total: 80,
      available: 15
    },
    specialties: ['General Medicine', 'Orthopedics', 'Gynecology', 'Pediatrics', 'Neurology'],
    distance: '4.2',
    contact: '9756841230',
    city: 'Dehradun',
    visitingHours: {
      general: '10:00 AM - 12:00 PM and 4:00 PM - 7:00 PM',
      icu: '11:00 AM - 11:30 AM and 5:00 PM - 5:30 PM'
    }
  },
  {
    id: '17',
    name: 'Nanda Hospital',
    location: 'Chakrata Road, Dehradun',
    rating: 3.9,
    beds: {
      total: 70,
      available: 12
    },
    specialties: ['General Medicine', 'General Surgery', 'Orthopedics', 'Gynecology', 'Pediatrics'],
    distance: '4.4',
    contact: '9634512780',
    city: 'Dehradun',
    visitingHours: {
      general: '9:30 AM - 11:30 AM and 4:30 PM - 7:30 PM',
      icu: '10:00 AM - 10:30 AM and 5:00 PM - 5:30 PM'
    }
  },
  {
    id: '18',
    name: 'Drishti Eye Institute & Dehradun Wave Lasik Centre',
    location: 'Vasant Vihar, Dehradun',
    rating: 4.5,
    beds: {
      total: 30,
      available: 5
    },
    specialties: ['Ophthalmology', 'Cataract Surgery', 'Refractive Surgery (LASIK)', 'Glaucoma Treatment', 'Retina Surgery'],
    distance: '4.6',
    contact: '7865432109',
    city: 'Dehradun',
    visitingHours: {
      general: '9:00 AM - 12:00 PM and 4:00 PM - 7:00 PM',
      icu: 'Not applicable'
    }
  },
  {
    id: '19',
    name: 'Luthra Maternity & Infertility Centre',
    location: 'Rajpur Road, Dehradun',
    rating: 4.3,
    beds: {
      total: 40,
      available: 8
    },
    specialties: ['Obstetrics', 'Gynecology', 'Infertility Treatment', 'IVF', 'Laparoscopic Surgery'],
    distance: '4.8',
    contact: '9412876543',
    city: 'Dehradun',
    visitingHours: {
      general: '10:00 AM - 12:00 PM and 4:00 PM - 7:00 PM',
      icu: '11:00 AM - 11:30 AM and 5:00 PM - 5:30 PM'
    }
  },
  {
    id: '20',
    name: 'Rewati Nursing Home',
    location: 'Sahastradhara Road, Dehradun',
    rating: 3.7,
    beds: {
      total: 35,
      available: 6
    },
    specialties: ['Obstetrics', 'Gynecology', 'Pediatrics', 'General Medicine'],
    distance: '5.0',
    contact: '7698541230',
    city: 'Dehradun',
    visitingHours: {
      general: '9:30 AM - 11:30 AM and 4:30 PM - 7:30 PM',
      icu: '10:30 AM - 11:00 AM and 5:30 PM - 6:00 PM'
    }
  }
];

export default function BedAvailability() {
  const [selectedCity, setSelectedCity] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [filterRating, setFilterRating] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [showReviews, setShowReviews] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>(initialHospitals);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedHospitalForDetails, setSelectedHospitalForDetails] = useState<Hospital | null>(null);

  const filteredHospitals = hospitals
    .filter(hospital => {
      const matchesCity = !selectedCity || hospital.city === selectedCity;
      const matchesRating = filterRating === 'all' || hospital.rating >= parseFloat(filterRating);
      const matchesSpecialty = !selectedSpecialty || hospital.specialties.includes(selectedSpecialty);
      return matchesCity && matchesRating && matchesSpecialty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'rating':
          return b.rating - a.rating;
        case 'beds':
          return b.beds.available - a.beds.available;
        default:
          return 0;
      }
    });

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const getDirections = (hospital: Hospital) => {
    // Open Google Maps with the hospital location
    const encodedLocation = encodeURIComponent(hospital.location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank');
  };

  // Function to generate random bed availability data
  const generateRandomBeds = () => {
    return {
      total: Math.floor(Math.random() * (500 - 100) + 100),
      available: Math.floor(Math.random() * (100 - 10) + 10)
    };
  };

  // Function to update hospital data
  const updateHospitalData = () => {
    const updatedHospitals = hospitals.map(hospital => ({
      ...hospital,
      beds: generateRandomBeds(),
      rating: Number((hospital.rating + (Math.random() * 0.2 - 0.1)).toFixed(1))
    }));
    setHospitals(updatedHospitals);
    setLastUpdated(new Date());
  };

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(updateHospitalData, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Add useEffect for client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

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
          <h1 className="text-4xl font-bold text-white mb-4">Bed Availability Tracker</h1>
          <p className="text-xl text-gray-300">Find available hospital beds in your area</p>
        </motion.div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-white/20 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Hospital Bed Availability</h2>
            {mounted && (
              <div className="text-sm text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Rating</label>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
                <option value="beds">Available Beds</option>
              </select>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">Specialty</label>
              <div className="relative">
                <button
                  onClick={() => setShowSpecialtyDropdown(!showSpecialtyDropdown)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
                >
                  <span>{selectedSpecialty || 'All Specialties'}</span>
                  <svg 
                    className={`w-4 h-4 text-gray-400 transform transition-transform ${showSpecialtyDropdown ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="fixed inset-0 z-50" style={{ display: showSpecialtyDropdown ? 'block' : 'none' }} onClick={() => setShowSpecialtyDropdown(false)} />
                {showSpecialtyDropdown && (
                  <div className="absolute z-[60] w-full mt-1 bg-[#1a1f3c] border border-white/10 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setSelectedSpecialty('');
                          setShowSpecialtyDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        All Specialties
                      </button>
                      {allSpecialties.map((specialty) => (
                        <button
                          key={specialty}
                          onClick={() => {
                            setSelectedSpecialty(specialty);
                            setShowSpecialtyDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedSpecialty === specialty
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'text-white hover:bg-white/10'
                          }`}
                        >
                          {specialty}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <PullToRefresh onRefresh={handleRefresh}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredHospitals.map((hospital, index) => (
              <motion.div
                key={hospital.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-white/20 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">{hospital.name}</h3>
                  <div className="flex items-center space-x-2">
                    <ReportIssue hospitalId={hospital.id} hospitalName={hospital.name} />
                    <button
                      onClick={() => {
                        setSelectedHospital(hospital);
                        setShowReviews(true);
                      }}
                      className="text-blue-400 hover:text-blue-300"
                      aria-label="View reviews"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Bed Availability</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm">Total Beds</div>
                        <div className="text-white">{hospital.beds.total}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Available</div>
                        <div className="text-white">{hospital.beds.available}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hospital.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                      <span>{hospital.distance} away</span>
                      <span>{hospital.contact}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => getDirections(hospital)}
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
                      setSelectedHospitalForDetails(hospital);
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
          </motion.div>
        </PullToRefresh>
      </div>

      {/* Reviews Modal */}
      <AnimatePresence>
        {showReviews && selectedHospital && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowReviews(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1a1f3c] rounded-lg p-6 max-w-2xl w-full shadow-xl border border-white/20"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-white">
                  Reviews for {selectedHospital.name}
                </h2>
                <button
                  onClick={() => setShowReviews(false)}
                  className="text-gray-400 hover:text-white"
                  aria-label="Close reviews"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <HospitalReviews
                hospitalId={selectedHospital.id}
                reviews={[
                  {
                    id: '1',
                    userName: 'John Doe',
                    rating: 5,
                    date: '2024-03-15',
                    comment: 'Excellent care and very professional staff. The emergency department was quick to respond.',
                    helpful: 12
                  },
                  {
                    id: '2',
                    userName: 'Jane Smith',
                    rating: 4,
                    date: '2024-03-10',
                    comment: 'Good hospital overall. Clean facilities and attentive nurses.',
                    helpful: 8
                  },
                  {
                    id: '3',
                    userName: 'Mike Johnson',
                    rating: 5,
                    date: '2024-03-05',
                    comment: 'The doctors here are very knowledgeable and caring. Would recommend!',
                    helpful: 15
                  }
                ]}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add the HospitalDetails modal */}
      <AnimatePresence>
        {showDetails && selectedHospitalForDetails && (
          <HospitalDetails
            hospital={selectedHospitalForDetails}
            onClose={() => {
              setShowDetails(false);
              setSelectedHospitalForDetails(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 