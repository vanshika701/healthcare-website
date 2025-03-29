import React from 'react';
import { motion } from 'framer-motion';

interface HospitalDetailsProps {
  hospital: {
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
    visitingHours?: {
      general: string;
      icu: string;
    };
  };
  onClose: () => void;
}

const HospitalDetails: React.FC<HospitalDetailsProps> = ({ hospital, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{hospital.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Location</h3>
            <p className="text-gray-600">{hospital.location}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
            <p className="text-gray-600">{hospital.contact}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Bed Availability</h3>
            <p className="text-gray-600">
              Available: {hospital.beds.available} / Total: {hospital.beds.total}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Rating</h3>
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-gray-600">{hospital.rating}/5</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {hospital.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {hospital.visitingHours && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Visiting Hours</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">General Wards:</span> {hospital.visitingHours.general}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">ICU:</span> {hospital.visitingHours.icu}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <a
            href={`https://maps.google.com/maps?q=${encodeURIComponent(hospital.name + ' ' + hospital.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Get Directions
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HospitalDetails; 