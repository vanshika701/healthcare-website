'use client';

import React, { useState } from 'react';
import OrganDonorForm from '../components/OrganDonorForm';
import { motion, AnimatePresence } from 'framer-motion';

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

const OrganDonorPage = () => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      const requiredFields = ['name', 'age', 'gender', 'bloodGroup', 'organsToDonate', 'contactNumber', 'email', 'location'];
      const missingFields = requiredFields.filter(field => !data[field as keyof FormData]);
      
      if (missingFields.length > 0) {
        setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setIsSubmitting(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        setError('Please enter a valid email address');
        setIsSubmitting(false);
        return;
      }

      // Validate organs array
      if (!Array.isArray(data.organsToDonate) || data.organsToDonate.length === 0) {
        setError('Please select at least one organ to donate');
        setIsSubmitting(false);
        return;
      }

      console.log('Submitting form data:', data); // Debug log

      const response = await fetch('http://localhost:5001/api/organ-donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      console.log('Response status:', response.status); // Debug log
      const responseData = await response.json();
      console.log('Response data:', responseData); // Debug log

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to submit form');
      }

      setSuccess('Form submitted successfully!');
      // Reset form data
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

      // Hide success message after 5 seconds and refresh the page
      setTimeout(() => {
        setSuccess('');
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error); // Debug log
      setError(error instanceof Error ? error.message : 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Organ Donor Registration
          </h1>
          <p className="text-lg text-gray-600">
            Join our network of organ donors and help save lives
          </p>
        </div>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
            >
              {success}
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <OrganDonorForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default OrganDonorPage; 