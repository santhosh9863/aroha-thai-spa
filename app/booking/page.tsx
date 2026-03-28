'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type SubmissionState = 'idle' | 'loading' | 'success';

export default function BookingPage() {
  const router = useRouter();
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    service: 'thai-massage',
    date: '',
    time: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionState('loading');

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Booking submitted successfully');
        setSubmissionState('success');
      } else {
        console.error('Booking submission failed:', response.statusText);
        setSubmissionState('idle');
      }
    } catch (error) {
      console.error('API Error:', error);
      setSubmissionState('idle');
    }
  };

  const handleBookAnother = () => {
    setFormData({
      fullName: '',
      phone: '',
      service: 'thai-massage',
      date: '',
      time: '',
      notes: '',
    });
    setSubmissionState('idle');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />

      <main className="flex-1 py-16 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-5 bg-gradient-to-b from-yellow-500/10 to-transparent pointer-events-none"></div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* LOADING STATE */}
          {submissionState === 'loading' && (
            <div className="flex flex-col items-center justify-center min-h-96 opacity-100 transition-opacity duration-300">
              <div className="relative w-24 h-24 mb-8">
                {/* Outer rotating ring */}
                <div className="absolute inset-0 rounded-full border-4 border-gray-800 border-t-yellow-500 animate-spin"></div>
                {/* Inner subtle pulse */}
                <div className="absolute inset-2 rounded-full border-2 border-yellow-500/20 animate-pulse"></div>
              </div>
              <p className="text-white font-serif text-xl">Confirming...</p>
              <p className="text-gray-500 text-sm mt-3">Please wait while we process your booking</p>
            </div>
          )}

          {/* SUCCESS STATE */}
          {submissionState === 'success' && (
            <div className="flex items-center justify-center min-h-96 opacity-100 transition-opacity duration-300">
              <div className="w-full">
                <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl text-center scale-100 opacity-100 transition-all duration-500">
                  {/* Animated Checkmark */}
                  <div className="flex justify-center mb-8 opacity-100 transition-opacity duration-500">
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 rounded-full bg-yellow-500/20 animate-pulse"></div>
                      <svg
                        className="w-24 h-24 text-yellow-500 mx-auto scale-100 opacity-100 transition-all duration-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 opacity-100 transition-opacity duration-500">
                    Booking Confirmed
                  </h2>

                  {/* Subtext */}
                  <p className="text-gray-400 text-lg mb-10 opacity-100 transition-opacity duration-500">
                    Your appointment has been successfully scheduled. We look forward to welcoming you.
                  </p>

                  {/* Booking Details Summary */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-10 text-left opacity-100 transition-opacity duration-500">
                    <p className="text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wide">Booking Details</p>
                    <div className="space-y-3 text-white">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Name:</span>
                        <span className="font-semibold">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Service:</span>
                        <span className="font-semibold capitalize">{formData.service.replace('-', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date:</span>
                        <span className="font-semibold">{formData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time:</span>
                        <span className="font-semibold">{formData.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-100 transition-opacity duration-500">
                    <button
                      onClick={handleBookAnother}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:shadow-2xl hover:shadow-yellow-500/50 text-black font-serif font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      Book Another Appointment
                    </button>
                    <button
                      onClick={handleBackToHome}
                      className="border-2 border-yellow-500 hover:bg-yellow-500/10 text-yellow-500 font-serif font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      Back to Home
                    </button>
                  </div>

                  {/* Confirmation Message */}
                  <p className="text-gray-500 text-sm mt-8">
                    A confirmation email has been sent to you. Thank you for choosing Aaroh Thai Spa!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* FORM STATE (default/idle) */}
          {submissionState === 'idle' && (
            <>
              {/* Back Button */}
              <button
                onClick={handleBackToHome}
                className="mb-8 text-gray-400 hover:text-yellow-500 font-serif text-sm transition-colors duration-300 flex items-center gap-2"
              >
                <span>←</span>
                <span>Back to Home</span>
              </button>

              {/* Header */}
              <div className="text-center mb-12 opacity-100 transition-opacity duration-500">
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">
                  Book Your Appointment
                </h1>
                <p className="text-gray-400 text-lg">
                  Secure your spot for a premium wellness experience
                </p>
              </div>

              {/* Form Container */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl hover:border-yellow-500/30 transition-all duration-300 opacity-100">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Full Name */}
                  <div>
                    <label className="block text-white font-serif font-bold mb-3 text-lg">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:shadow-lg focus:shadow-yellow-500/20 transition-all duration-300"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-white font-serif font-bold mb-3 text-lg">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 (080) XXXX-XXXX"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:shadow-lg focus:shadow-yellow-500/20 transition-all duration-300"
                    />
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-white font-serif font-bold mb-3 text-lg">
                      Select Service
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-5 py-4 text-white focus:outline-none focus:border-yellow-500 focus:shadow-lg focus:shadow-yellow-500/20 transition-all duration-300 cursor-pointer"
                    >
                      <option value="thai-massage">Thai Massage</option>
                      <option value="swedish-massage">Swedish Massage</option>
                      <option value="deep-tissue">Deep Tissue Therapy</option>
                      <option value="aromatherapy">Aromatherapy</option>
                    </select>
                  </div>

                  {/* Date and Time Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Date Picker */}
                    <div>
                      <label className="block text-white font-serif font-bold mb-3 text-lg">
                        Date
                      </label>
                     <input
  type="date"
  name="date"
  value={formData.date}
  onChange={handleChange}
  min={new Date().toISOString().split('T')[0]}
  required
  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-5 py-4 text-white focus:outline-none focus:border-yellow-500 focus:shadow-lg focus:shadow-yellow-500/20 transition-all duration-300"
/>
                    </div>

                    {/* Time Picker */}
                    <div>
                      <label className="block text-white font-serif font-bold mb-3 text-lg">
                        Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-5 py-4 text-white focus:outline-none focus:border-yellow-500 focus:shadow-lg focus:shadow-yellow-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-white font-serif font-bold mb-3 text-lg">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Tell us about any preferences, allergies, or special requests..."
                      rows={5}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:shadow-lg focus:shadow-yellow-500/20 transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:shadow-2xl hover:shadow-yellow-500/50 text-black font-serif font-bold text-lg px-8 py-5 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 mt-10"
                  >
                    Confirm Booking
                  </button>

                  {/* Info Text */}
                  <p className="text-center text-gray-400 text-sm">
                    We will contact you shortly to confirm your appointment. Thank you for choosing Aaroh Thai Spa!
                  </p>
                </form>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
