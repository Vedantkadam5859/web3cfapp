'use client';
import { useState } from 'react';

export default function RefundPage() {
  const [address, setAddress] = useState('');
  const [reason, setReason] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevent page reload on form submission

    if (!address || !reason) {
      setErrorMessage('Please fill in all the fields.');
      setSuccessMessage('');
      return;
    }

    // Simulate a successful refund process (replace with actual logic)
    setSuccessMessage('Refund request submitted successfully! Check your wallet.');
    setErrorMessage(''); // Clear any previous error
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-900 via-gray-800 to-gray-900 text-white">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-6 sm:px-12 lg:px-24 py-8">
        <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/20">
          <h1 className="text-4xl font-extrabold text-center mb-6 text-white drop-shadow-lg">
            Request a Refund
          </h1>
          <p className="text-lg leading-relaxed text-gray-300 text-center">
            If you have contributed to a campaign that has failed, please fill in the form below to request a refund.
          </p>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="bg-white text-black p-8 rounded-lg shadow-xl w-full max-w-md mt-6 mx-auto">
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Your Wallet Address
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your wallet address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                Reason for Refund
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please provide a reason for your refund request"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            {errorMessage && (
              <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-600 text-sm mb-4">{successMessage}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Refund Request
            </button>
          </form>
        </div>
      </div>

      {/* Footer (stays at bottom) */}
      <footer className="w-full bg-gray-900 text-gray-300 text-center py-4">
        CrowdChain - Empowering Dreams, One Block at a Time
      </footer>
    </div>
  );
}
