import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  age: string;
  gender: string;
  bloodGroup: string;
  organsToDonate: string[];
  contactNumber: string;
  email: string;
  location: string;
  message: string;
  medicalHistory: string;
}

interface OrganDonorFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

const OrganDonorForm: React.FC<OrganDonorFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    organsToDonate: [],
    contactNumber: '',
    email: '',
    location: '',
    message: '',
    medicalHistory: ''
  });
  const [error, setError] = useState<string>('');

  const organs = [
    'Heart',
    'Lungs',
    'Liver',
    'Kidneys',
    'Pancreas',
    'Intestines',
    'Eyes',
    'Skin',
    'Bone Marrow'
  ];

  const handleOrganToggle = (organ: string) => {
    setFormData(prev => ({
      ...prev,
      organsToDonate: prev.organsToDonate.includes(organ)
        ? prev.organsToDonate.filter(o => o !== organ)
        : [...prev.organsToDonate, organ]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData); // Debug log

    // Validate required fields
    const requiredFields = ['name', 'age', 'gender', 'bloodGroup', 'organsToDonate', 'contactNumber', 'email', 'location'] as const;
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields); // Debug log
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      console.error('Invalid email format:', formData.email); // Debug log
      setError('Please enter a valid email address');
      return;
    }

    // Validate organs array
    if (!Array.isArray(formData.organsToDonate) || formData.organsToDonate.length === 0) {
      console.error('Invalid organs array:', formData.organsToDonate); // Debug log
      setError('Please select at least one organ to donate');
      return;
    }

    try {
      console.log('Calling onSubmit with data:', JSON.stringify(formData, null, 2)); // Debug log
      await onSubmit(formData);
      console.log('Form submission successful'); // Debug log
      setFormData({
        name: '',
        age: '',
        gender: '',
        bloodGroup: '',
        organsToDonate: [],
        contactNumber: '',
        email: '',
        location: '',
        message: '',
        medicalHistory: ''
      });
      setError('');
    } catch (err) {
      console.error('Error in form submission:', err); // Debug log
      if (err instanceof Error) {
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
      }
      setError(err instanceof Error ? err.message : 'Failed to submit form. Please try again.');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Organ Donor Registration</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name *</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Age *</label>
            <input
              type="number"
              required
              min="18"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender *</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Group *</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.bloodGroup}
            onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Organs to Donate *</label>
          <div className="grid grid-cols-2 gap-2">
            {organs.map((organ) => (
              <label key={organ} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={formData.organsToDonate.includes(organ)}
                  onChange={() => handleOrganToggle(organ)}
                />
                <span className="text-sm text-gray-700">{organ}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Number *</label>
          <input
            type="tel"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location *</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Message (Optional)</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Medical History (Optional)</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            value={formData.medicalHistory}
            onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Register as Organ Donor
        </button>
      </div>
    </motion.form>
  );
};

export default OrganDonorForm; 