'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ScrollingAds from './components/ScrollingAds';
import ContactForm from './components/ContactForm';
import BackToTop from './components/BackToTop';
import SearchBar from './components/SearchBar';
import AmbulanceAnimation from './components/AmbulanceAnimation';

const visionImages = [
  {
    src: '/images/ambulance.jpg',
    alt: 'Emergency Ambulance Response',
  },
  {
    src: '/images/blood.jpg',
    alt: 'Blood Donation Service',
  },
  {
    src: '/images/hospital.jpg',
    alt: 'Hospital Emergency Entrance',
  },
  {
    src: '/images/doctor.jpg',
    alt: 'Healthcare Professional',
  }
];

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 5000);

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % visionImages.length);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(imageInterval);
    };
  }, []);

  return (
    <main className="min-h-screen relative bg-[#1a1f3c]">
      <AmbulanceAnimation />
      <div className={`${showAnimation ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
        <nav className="bg-[#1a1f3c] fixed w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-white">
                  BobVitalCare
                </Link>
              </div>
              <div className="flex space-x-8">
                <Link href="/blood-availability" className="text-white hover:text-blue-400 px-3 py-2 rounded-md">
                  Blood Availability
                </Link>
                <Link href="/bed-availability" className="text-white hover:text-blue-400 px-3 py-2 rounded-md">
                  Bed Availability
                </Link>
                <Link href="/organ-donation" className="text-white hover:text-blue-400 px-3 py-2 rounded-md">
                  Organ Donation
                </Link>
                <Link href="/organ-retrieval" className="text-white hover:text-blue-400 px-3 py-2 rounded-md">
                  Organ Retrieval
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-16 bg-[#1a1f3c] py-4 px-4 sm:px-6 lg:px-8 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <SearchBar />
          </div>
        </div>

        <div className="pt-4">
          <section className="min-h-[80vh] flex items-center bg-gradient-to-b from-[#1a1f3c] via-[#1f2947] to-[#2d3748] px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Our Vision
                </h2>
                <div className="space-y-6 text-lg text-gray-300">
                  <p>
                    At BobVitalCare, we envision a future where critical healthcare resources are instantly accessible to those in need. Our mission is to bridge the gap between patients and life-saving medical services through innovative technology.
                  </p>
                  <p>
                    We strive to create a seamless network connecting hospitals, blood banks, and organ donation centers, ensuring that every second counts in emergency situations. Our platform empowers healthcare providers and patients alike with real-time information and immediate access to vital resources.
                  </p>
                  <p>
                    Through cutting-edge technology and dedicated service, we're building a healthier tomorrow where no one has to wait for critical care. Every life matters, and every moment counts.
                  </p>
        </div>
              </motion.div>

              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={visionImages[currentImageIndex].src}
                      alt={visionImages[currentImageIndex].alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </section>

          <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-[#2d3748] to-[#1a1f3c] py-6">
            <div className="max-w-7xl mx-auto px-4">
              <h1 className="text-5xl font-bold text-white mb-3 text-center">
                Real-Time Healthcare Resource Tracking
              </h1>
              <p className="text-xl text-gray-300 mb-4 text-center">
                Find critical healthcare resources when you need them most
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Link href="/bed-availability" className="block p-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl hover:bg-white/20 transition-all transform hover:scale-105">
                  <h3 className="text-2xl font-bold text-white mb-4">ICU Bed Tracking</h3>
                  <p className="text-gray-300">Find available ICU beds in hospitals near you</p>
                </Link>
                <Link href="/blood-availability" className="block p-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl hover:bg-white/20 transition-all transform hover:scale-105">
                  <h3 className="text-2xl font-bold text-white mb-4">Blood Bank Tracker</h3>
                  <p className="text-gray-300">Locate blood banks with your needed blood type</p>
                </Link>
                <Link href="/organ-donation" className="block p-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl hover:bg-white/20 transition-all transform hover:scale-105">
                  <h3 className="text-2xl font-bold text-white mb-4">Organ Donation</h3>
                  <p className="text-gray-300">Register to donate organs and save lives</p>
                </Link>
              </div>
            </div>
          </section>

          <section className="min-h-[80vh] flex items-center bg-gradient-to-b from-[#1a1f3c] via-[#1f2947] to-[#2d3748] px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="/images/team-image.jpg"
                  alt="BobVitalCare Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  About Us
                </h2>
                <div className="space-y-6 text-lg text-gray-300">
                  <p>
                    Founded in 2024, BobVitalCare emerged from a simple yet powerful idea: to revolutionize how people access critical healthcare resources. Our team of dedicated healthcare professionals, technologists, and innovators work tirelessly to bridge the gap between patients and life-saving medical services.
                  </p>
                  <p>
                    What sets us apart is our commitment to real-time healthcare solutions. We've developed cutting-edge technology that connects hospitals, blood banks, and organ donation centers into a seamless network, ensuring that critical resources are always just a click away.
                  </p>
                  <p>
                    Our team brings together decades of combined experience in healthcare, technology, and patient care. We understand the challenges faced by both healthcare providers and patients, and we're dedicated to creating solutions that make a real difference in people's lives.
                  </p>
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="text-center">
                      <h4 className="text-3xl font-bold text-blue-400">500+</h4>
                      <p className="text-gray-300">Healthcare Partners</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-3xl font-bold text-blue-400">24/7</h4>
                      <p className="text-gray-300">Support Available</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="min-h-[80vh] flex items-center bg-gradient-to-b from-[#2d3748] to-[#1a1f3c] px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Patient Success Stories
                </h2>
                <p className="text-xl text-gray-300">
                  Real experiences from people who found help through BobVitalCare
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-white/20"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                      SK
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-white">Sarah Kumar</h3>
                      <p className="text-gray-400">Kidney Transplant Recipient</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    "BobVitalCare helped me find a kidney donor within weeks. The real-time updates and wide network of hospitals made what seemed impossible, possible. I'm forever grateful for this platform."
                  </p>
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-white/20"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                      JM
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-white">James Martinez</h3>
                      <p className="text-gray-400">Emergency Blood Recipient</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    "During a critical emergency, BobVitalCare's blood bank tracking system helped locate my rare blood type within minutes. The quick response time literally saved my life."
                  </p>
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-white/20"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                      EP
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-white">Emily Parker</h3>
                      <p className="text-gray-400">ICU Bed Finder</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    "When my father needed urgent ICU care, BobVitalCare showed us real-time bed availability across multiple hospitals. We found the right care facility in minutes instead of hours."
                  </p>
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="min-h-[80vh] flex items-center bg-gradient-to-b from-[#1a1f3c] to-[#2d3748] px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Contact Us
                </h2>
                <p className="text-xl text-gray-300">
                  Get in touch with our team for any assistance or inquiries
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ContactForm />
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4">Our Location</h3>
                    <p className="text-gray-300">
                      Sharda University<br />
                      Plot No. 32-34<br />
                      Knowledge Park III<br />
                      Greater Noida, Dadri
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <p className="text-gray-300">
                        <span className="font-semibold">Email:</span><br />
                        vs905snu@gmail.com
                      </p>
                      <p className="text-gray-300">
                        <span className="font-semibold">Phone:</span><br />
                        +91 8865953423
                      </p>
                      <p className="text-gray-300">
                        <span className="font-semibold">Hours:</span><br />
                        24/7 Emergency Support
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>

        <div className="relative z-40">
          <ScrollingAds />
        </div>
      </div>

      <footer className="bg-[#1a1f3c] border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} BobVitalCare. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <BackToTop />
    </main>
  );
}
