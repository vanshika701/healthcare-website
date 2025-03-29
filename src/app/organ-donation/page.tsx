'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface DonorForm {
  name: string;
  age: string;
  bloodType: string;
  organs: string[];
  contact: string;
  location: string;
  medicalHistory: string;
}

const organs = [
  { id: 'heart', name: 'Heart', description: 'Can save lives of patients with end-stage heart failure' },
  { id: 'liver', name: 'Liver', description: 'Can be split and used for two recipients' },
  { id: 'kidney', name: 'Kidney', description: 'Most commonly donated organ' },
  { id: 'lungs', name: 'Lungs', description: 'Can be donated individually or as a pair' },
  { id: 'pancreas', name: 'Pancreas', description: 'Can help treat diabetes' },
  { id: 'intestines', name: 'Intestines', description: 'Can help patients with intestinal failure' },
  { id: 'tissues', name: 'Tissues', description: 'Includes corneas, skin, bones, and more' }
];

const statistics = [
  { number: '100,000+', label: 'People Waiting' },
  { number: '39,000+', label: 'Transplants in 2023' },
  { number: '17', label: 'Daily Deaths' },
  { number: '8', label: 'Organs per Donor' }
];

export default function OrganDonation() {
  const [formData, setFormData] = useState<DonorForm>({
    name: '',
    age: '',
    bloodType: '',
    organs: [],
    contact: '',
    location: '',
    medicalHistory: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const toggleOrgan = (organId: string) => {
    setFormData(prev => ({
      ...prev,
      organs: prev.organs.includes(organId)
        ? prev.organs.filter(id => id !== organId)
        : [...prev.organs, organId]
    }));
  };

  return (
    <div className="min-h-screen bg-[#1a1f3c] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
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
          <h1 className="text-4xl font-bold text-white mb-4">Organ Donation</h1>
          <p className="text-xl text-gray-300">Be a hero. Save lives through organ donation.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Information */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-white/20"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Why Donate?</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Save up to 8 lives through organ donation
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Help more than 75 people through tissue donation
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Give hope to those waiting for transplants
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Create a lasting legacy of generosity
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-white/20"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                {statistics.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-blue-400">{stat.number}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-white/20"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Available Organs</h2>
              <div className="grid grid-cols-1 gap-4">
                {organs.map(organ => (
                  <div
                    key={organ.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      formData.organs.includes(organ.id)
                        ? 'bg-blue-500/20 border-blue-500'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    } border`}
                    onClick={() => toggleOrgan(organ.id)}
                  >
                    <h3 className="text-white font-semibold">{organ.name}</h3>
                    <p className="text-gray-400 text-sm">{organ.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-white/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Register as a Donor</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                  <input
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Blood Type</label>
                  <select
                    required
                    value={formData.bloodType}
                    onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Contact Number</label>
                <input
                  type="tel"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Medical History</label>
                <textarea
                  required
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/20 text-green-400 p-4 rounded-lg"
                >
                  Thank you for registering as an organ donor! We will contact you shortly.
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register as Donor
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 